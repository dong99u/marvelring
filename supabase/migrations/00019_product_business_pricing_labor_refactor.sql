-- Migration: Move user-facing labor cost source to product_business_pricing
-- and remove legacy labor columns from product table.

-- 1) Rebuild product_full_details to source price/labor from product_business_pricing
CREATE OR REPLACE VIEW public.product_full_details AS
WITH user_context AS (
  SELECT
    CASE
      WHEN is_wholesale_member() OR is_admin() THEN 'WHOLESALE'::business_type_enum
      ELSE 'RETAIL'::business_type_enum
    END AS business_type,
    (is_approved_member() OR is_admin()) AS can_view_member_fields
)
SELECT
  p.product_id,
  p.collection_id,
  p.category_id,
  p.product_name,
  p.product_code,
  CASE
    WHEN uc.can_view_member_fields THEN pbp_selected.base_labor_cost
    ELSE NULL::numeric(12,2)
  END::numeric(12,2) AS base_labor_cost,
  CASE
    WHEN uc.can_view_member_fields THEN pbp_selected.stone_setting_cost
    ELSE NULL::numeric(12,2)
  END::numeric(12,2) AS stone_setting_cost,
  p.weight,
  p.ring_size,
  p.size,
  p.description,
  p.additional_information,
  COALESCE(pbp_retail.price, p.retail_price)::numeric(12,2) AS retail_price,
  CASE
    WHEN uc.business_type = 'WHOLESALE'::business_type_enum THEN COALESCE(pbp_wholesale.price, p.wholesale_price)
    ELSE NULL::numeric
  END AS wholesale_price,
  p.is_sale,
  p.sale_price,
  p.created_at,
  p.updated_at,
  p.is_new,
  c.brand_name AS collection_name,
  c.slug AS collection_slug,
  cat.category_name,
  cat.slug AS category_slug,
  pi.image_url AS main_image_url,
  CASE
    WHEN uc.can_view_member_fields THEN
      CASE
        WHEN p.is_sale AND p.sale_price IS NOT NULL THEN p.sale_price
        ELSE COALESCE(
          pbp_selected.price,
          CASE
            WHEN uc.business_type = 'WHOLESALE'::business_type_enum THEN p.wholesale_price
            ELSE p.retail_price
          END
        )
      END
    ELSE NULL::numeric(12,2)
  END::numeric(12,2) AS display_price,
  (
    SELECT COALESCE(array_agg(DISTINCT pmi.material_type), ARRAY[]::material_type_enum[])
    FROM product_material_info pmi
    WHERE pmi.product_id = p.product_id
  ) AS material_types,
  (
    SELECT
      (COUNT(*) > 0) AND
      (COUNT(*) = COUNT(CASE WHEN pmi.material_type = '24K'::material_type_enum THEN 1 END))
    FROM product_material_info pmi
    WHERE pmi.product_id = p.product_id
  ) AS is_pure_gold_only
FROM product p
CROSS JOIN user_context uc
LEFT JOIN product_business_pricing pbp_selected
  ON pbp_selected.product_id = p.product_id
 AND pbp_selected.business_type = uc.business_type
LEFT JOIN product_business_pricing pbp_retail
  ON pbp_retail.product_id = p.product_id
 AND pbp_retail.business_type = 'RETAIL'::business_type_enum
LEFT JOIN product_business_pricing pbp_wholesale
  ON pbp_wholesale.product_id = p.product_id
 AND pbp_wholesale.business_type = 'WHOLESALE'::business_type_enum
LEFT JOIN collection c ON p.collection_id = c.collection_id
LEFT JOIN category cat ON p.category_id = cat.category_id
LEFT JOIN LATERAL (
  SELECT pi_inner.image_url
  FROM product_image pi_inner
  WHERE pi_inner.product_id = p.product_id
  ORDER BY pi_inner.is_main DESC, pi_inner.display_order
  LIMIT 1
) pi ON true;

COMMENT ON VIEW public.product_full_details IS 'Comprehensive product view with business-type specific price/labor sourced from product_business_pricing';

-- 2) Rebuild product_for_user from product_full_details (drop/create to allow column shape change)
DROP VIEW IF EXISTS public.product_for_user;
CREATE VIEW public.product_for_user AS
SELECT
  pfd.product_id,
  pfd.collection_id,
  pfd.category_id,
  pfd.product_name,
  pfd.product_code,
  pfd.base_labor_cost,
  pfd.stone_setting_cost,
  pfd.weight,
  pfd.ring_size,
  pfd.size,
  pfd.description,
  pfd.additional_information,
  pfd.is_sale,
  pfd.is_new,
  pfd.created_at,
  pfd.updated_at,
  pfd.display_price AS price,
  pfd.collection_name AS brand_name,
  pfd.collection_slug,
  pfd.category_name,
  pfd.category_slug,
  pfd.main_image_url,
  pfd.material_types,
  pfd.is_pure_gold_only
FROM public.product_full_details pfd;

COMMENT ON VIEW public.product_for_user IS 'Products with business-type specific price/labor for approved users. Price/labor are NULL for anonymous/unapproved users.';

-- 3) Keep compatibility view used by operational checks/docs
DROP VIEW IF EXISTS public.product_with_price;
CREATE VIEW public.product_with_price AS
SELECT
  pfd.product_id,
  pfd.collection_id,
  pfd.category_id,
  pfd.product_name,
  pfd.product_code,
  pfd.base_labor_cost,
  pfd.stone_setting_cost,
  pfd.weight,
  pfd.ring_size,
  pfd.size,
  pfd.description,
  pfd.additional_information,
  pfd.retail_price,
  pfd.wholesale_price,
  pfd.is_sale,
  pfd.sale_price,
  pfd.created_at,
  pfd.updated_at,
  pfd.collection_name,
  pfd.category_name
FROM public.product_full_details pfd;

COMMENT ON VIEW public.product_with_price IS 'Compatibility view sourced from product_full_details';

GRANT SELECT ON public.product_full_details TO authenticated;
GRANT SELECT ON public.product_full_details TO anon;
GRANT SELECT ON public.product_for_user TO authenticated;
GRANT SELECT ON public.product_for_user TO anon;
GRANT SELECT ON public.product_with_price TO authenticated;
GRANT SELECT ON public.product_with_price TO anon;

-- 4) Drop legacy labor columns from product table
ALTER TABLE public.product
  DROP COLUMN IF EXISTS base_labor_cost,
  DROP COLUMN IF EXISTS stone_setting_cost;

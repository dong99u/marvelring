-- Migration: Add fallback logic for main_image_url in product_full_details view
-- Description: When no image has is_main=true, falls back to the first image by display_order
-- Created: 2026-02-08

DROP VIEW IF EXISTS product_full_details;

CREATE VIEW product_full_details AS
SELECT
  p.product_id,
  p.collection_id,
  p.category_id,
  p.product_name,
  p.product_code,
  p.base_labor_cost,
  p.stone_setting_cost,
  p.weight,
  p.ring_size,
  p.size,
  p.description,
  p.additional_information,
  p.retail_price,

  CASE
    WHEN is_wholesale_member() OR is_admin() THEN p.wholesale_price
    ELSE NULL::numeric
  END AS wholesale_price,

  p.is_sale,
  p.sale_price,
  p.created_at,
  p.updated_at,
  p.is_new,

  -- Collection info
  c.brand_name AS collection_name,
  c.slug AS collection_slug,

  -- Category info
  cat.category_name,
  cat.slug AS category_slug,

  -- Main image with fallback: is_main=true first, otherwise first by display_order
  pi.image_url AS main_image_url,

  -- Display price
  CASE
    WHEN p.is_sale AND p.sale_price IS NOT NULL THEN p.sale_price
    ELSE p.retail_price
  END AS display_price,

  -- Material types array
  (
    SELECT COALESCE(array_agg(DISTINCT pmi.material_type), ARRAY[]::material_type_enum[])
    FROM product_material_info pmi
    WHERE pmi.product_id = p.product_id
  ) AS material_types,

  -- True if product has ONLY 24K material entries (pure gold product)
  (
    SELECT COUNT(*) > 0 AND COUNT(*) = COUNT(CASE WHEN pmi.material_type = '24K' THEN 1 END)
    FROM product_material_info pmi
    WHERE pmi.product_id = p.product_id
  ) AS is_pure_gold_only

FROM product p
LEFT JOIN collection c ON p.collection_id = c.collection_id
LEFT JOIN category cat ON p.category_id = cat.category_id
LEFT JOIN LATERAL (
  SELECT pi_inner.image_url
  FROM product_image pi_inner
  WHERE pi_inner.product_id = p.product_id
  ORDER BY pi_inner.is_main DESC, pi_inner.display_order ASC
  LIMIT 1
) pi ON true;

GRANT SELECT ON product_full_details TO authenticated;
GRANT SELECT ON product_full_details TO anon;

COMMENT ON VIEW product_full_details IS 'Comprehensive product view with collection, category, pricing, images (with fallback), and material information';

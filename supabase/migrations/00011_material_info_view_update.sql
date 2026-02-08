-- Migration: Update product_full_details view with material info columns
-- Description: Adds material_types array and is_pure_gold_only flag to product_full_details view
-- Created: 2026-02-08

-- Drop existing view (required because CREATE OR REPLACE VIEW cannot add new columns)
DROP VIEW IF EXISTS product_full_details;

-- Recreate view with new material info columns
-- Based on actual current view definition from database
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

  -- Wholesale price: only visible to wholesale members and admins
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

  -- Main image
  pi.image_url AS main_image_url,

  -- Display price
  CASE
    WHEN p.is_sale AND p.sale_price IS NOT NULL THEN p.sale_price
    ELSE p.retail_price
  END AS display_price,

  -- NEW: Material types array (aggregated from product_material_info)
  (
    SELECT COALESCE(array_agg(DISTINCT pmi.material_type), ARRAY[]::material_type_enum[])
    FROM product_material_info pmi
    WHERE pmi.product_id = p.product_id
  ) AS material_types,

  -- NEW: True if product has ONLY 24K material entries (pure gold product)
  (
    SELECT COUNT(*) > 0 AND COUNT(*) = COUNT(CASE WHEN pmi.material_type = '24K' THEN 1 END)
    FROM product_material_info pmi
    WHERE pmi.product_id = p.product_id
  ) AS is_pure_gold_only

FROM product p
LEFT JOIN collection c ON p.collection_id = c.collection_id
LEFT JOIN category cat ON p.category_id = cat.category_id
LEFT JOIN product_image pi ON p.product_id = pi.product_id AND pi.is_main = true;

-- Grant permissions
GRANT SELECT ON product_full_details TO authenticated;
GRANT SELECT ON product_full_details TO anon;

-- Add composite index for efficient material type queries
CREATE INDEX IF NOT EXISTS idx_product_material_type ON product_material_info(product_id, material_type);

-- Add comments
COMMENT ON VIEW product_full_details IS 'Comprehensive product view with collection, category, pricing, images, and material information';

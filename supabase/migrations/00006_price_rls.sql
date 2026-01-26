-- Price-Based Row Level Security (RLS)
-- Ensures users only see prices appropriate to their business_type
-- CRITICAL: wholesale_price and retail_price are NEVER exposed to frontend

-- ============================================
-- DROP EXISTING VIEWS (if present)
-- ============================================

DROP VIEW IF EXISTS product_for_user CASCADE;

-- ============================================
-- VIEW: product_for_user
-- Returns products with ONLY the appropriate price for the current user
-- This view is the ONLY way frontend should query products
-- ============================================

CREATE OR REPLACE VIEW product_for_user AS
SELECT
  p.id,
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
  p.is_sale,
  p.created_at,
  p.updated_at,

  -- SINGLE 'price' field based on user's business_type and approval status
  -- Returns NULL if user is not logged in or not approved
  CASE
    WHEN auth.uid() IS NULL THEN NULL
    WHEN m.approval_status != 'APPROVED' THEN NULL
    WHEN m.business_type = 'WHOLESALE' THEN
      CASE WHEN p.is_sale THEN COALESCE(p.sale_price, p.wholesale_price) ELSE p.wholesale_price END
    WHEN m.business_type = 'RETAIL' THEN
      CASE WHEN p.is_sale THEN COALESCE(p.sale_price, p.retail_price) ELSE p.retail_price END
    ELSE NULL
  END AS price,

  -- Collection and category info
  c.brand_name,
  c.slug AS collection_slug,
  c.logo_image_url AS collection_logo,
  cat.category_name,
  cat.slug AS category_slug,

  -- Main image
  (
    SELECT pi.image_url
    FROM product_image pi
    WHERE pi.product_id = p.id AND pi.is_main = true
    ORDER BY pi.display_order
    LIMIT 1
  ) AS main_image_url

FROM product p
LEFT JOIN member m ON m.id::text = auth.uid()::text
LEFT JOIN collection c ON p.collection_id = c.id
LEFT JOIN category cat ON p.category_id = cat.id;

COMMENT ON VIEW product_for_user IS 'Products with single price field based on user business type and approval status. NEVER exposes wholesale_price or retail_price directly.';

-- ============================================
-- GRANT PERMISSIONS
-- ============================================

-- Allow authenticated and anonymous users to query the view
GRANT SELECT ON product_for_user TO authenticated;
GRANT SELECT ON product_for_user TO anon;

-- ============================================
-- SECURITY NOTES
-- ============================================

-- CRITICAL SECURITY RULES:
-- 1. Frontend MUST query product_for_user view, NOT product table
-- 2. The 'price' field is the ONLY price field exposed
-- 3. wholesale_price and retail_price are NEVER in query results
-- 4. Price is NULL for:
--    - Anonymous users (not logged in)
--    - Users with approval_status != 'APPROVED'
-- 5. UI must show "가격은 로그인 후 확인하실 수 있습니다" when price is NULL

-- Database Views for Business Logic
-- Handles price visibility based on business_type

-- ============================================
-- VIEW: product_with_pricing
-- Returns products with appropriate pricing based on user's business_type
-- ============================================

CREATE OR REPLACE VIEW product_with_pricing AS
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

  -- Dynamic pricing based on user's business_type
  CASE
    -- If user is logged in, check their business_type
    WHEN auth.uid() IS NOT NULL THEN
      CASE
        WHEN (SELECT business_type FROM member WHERE id::text = auth.uid()::text) = 'WHOLESALE' THEN
          CASE WHEN p.is_sale THEN COALESCE(p.sale_price, p.wholesale_price) ELSE p.wholesale_price END
        ELSE
          CASE WHEN p.is_sale THEN COALESCE(p.sale_price, p.retail_price) ELSE p.retail_price END
      END
    -- If user is not logged in, show retail price
    ELSE
      CASE WHEN p.is_sale THEN COALESCE(p.sale_price, p.retail_price) ELSE p.retail_price END
  END AS display_price,

  -- Include business_type for reference
  CASE
    WHEN auth.uid() IS NOT NULL THEN
      (SELECT business_type FROM member WHERE id::text = auth.uid()::text)
    ELSE
      'RETAIL'::business_type_enum
  END AS user_business_type

FROM product p;

COMMENT ON VIEW product_with_pricing IS 'Products with dynamic pricing based on user business type';


-- ============================================
-- VIEW: product_full_details
-- Complete product information with related data
-- ============================================

CREATE OR REPLACE VIEW product_full_details AS
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

  -- Collection info
  c.brand_name,
  c.slug AS collection_slug,
  c.logo_image_url AS collection_logo,

  -- Category info
  cat.category_name,
  cat.slug AS category_slug,

  -- Dynamic pricing
  CASE
    WHEN auth.uid() IS NOT NULL THEN
      CASE
        WHEN (SELECT business_type FROM member WHERE id::text = auth.uid()::text) = 'WHOLESALE' THEN
          CASE WHEN p.is_sale THEN COALESCE(p.sale_price, p.wholesale_price) ELSE p.wholesale_price END
        ELSE
          CASE WHEN p.is_sale THEN COALESCE(p.sale_price, p.retail_price) ELSE p.retail_price END
      END
    ELSE
      CASE WHEN p.is_sale THEN COALESCE(p.sale_price, p.retail_price) ELSE p.retail_price END
  END AS display_price,

  -- Main image
  (
    SELECT pi.image_url
    FROM product_image pi
    WHERE pi.product_id = p.id AND pi.is_main = true
    ORDER BY pi.display_order
    LIMIT 1
  ) AS main_image_url

FROM product p
LEFT JOIN collection c ON p.collection_id = c.id
LEFT JOIN category cat ON p.category_id = cat.id;

COMMENT ON VIEW product_full_details IS 'Complete product details with collection, category, and pricing';


-- ============================================
-- VIEW: notice_public
-- Public notices with view count
-- ============================================

CREATE OR REPLACE VIEW notice_public AS
SELECT
  id,
  title,
  content,
  is_pinned,
  view_count,
  created_at,
  updated_at
FROM notice
ORDER BY is_pinned DESC, created_at DESC;

COMMENT ON VIEW notice_public IS 'Public notices ordered by pinned status and date';


-- ============================================
-- GRANT PERMISSIONS ON VIEWS
-- ============================================

-- Allow authenticated users to access views
GRANT SELECT ON product_with_pricing TO authenticated;
GRANT SELECT ON product_with_pricing TO anon;

GRANT SELECT ON product_full_details TO authenticated;
GRANT SELECT ON product_full_details TO anon;

GRANT SELECT ON notice_public TO authenticated;
GRANT SELECT ON notice_public TO anon;

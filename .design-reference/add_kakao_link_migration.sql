-- Migration: Add kakao_link to product table
-- Purpose: Support product-specific KakaoTalk inquiry links

-- 1. Add kakao_link column to product table
ALTER TABLE `product`
ADD COLUMN `kakao_link` varchar(500) NULL COMMENT 'KakaoTalk Open Chat URL (optional, uses default if null)';

-- 2. Update product_for_user view to include kakao_link
-- Note: This requires dropping and recreating the view
-- The exact syntax depends on your database system (MySQL/PostgreSQL)

-- For PostgreSQL (Supabase):
-- DROP VIEW IF EXISTS product_for_user;
-- CREATE OR REPLACE VIEW product_for_user AS
-- SELECT
--   p.product_id as id,
--   p.collection_id,
--   p.category_id,
--   p.product_name,
--   p.product_code,
--   p.base_labor_cost,
--   p.stone_setting_cost,
--   p.weight,
--   p.ring_size,
--   p.size,
--   p.description,
--   p.additional_information,
--   p.is_sale,
--   p.kakao_link,  -- ADD THIS LINE
--   p.created_at,
--   p.updated_at,
--   -- Price logic based on user's business_type
--   CASE
--     WHEN m.approval_status = 'APPROVED' AND m.business_type = 'WHOLESALE' THEN p.wholesale_price
--     WHEN m.approval_status = 'APPROVED' AND m.business_type = 'RETAIL' THEN p.retail_price
--     ELSE NULL
--   END as price,
--   -- Collection info
--   col.brand_name,
--   col.slug as collection_slug,
--   col.logo_image_url as collection_logo,
--   -- Category info
--   cat.category_name,
--   cat.slug as category_slug,
--   -- Main image
--   (SELECT image_url FROM product_image WHERE product_id = p.product_id AND is_main = TRUE LIMIT 1) as main_image_url
-- FROM product p
-- LEFT JOIN collection col ON p.collection_id = col.collection_id
-- LEFT JOIN category cat ON p.category_id = cat.category_id
-- LEFT JOIN member m ON m.member_id = current_user_id(); -- Adjust based on your auth system

-- 3. Example: Set a default KakaoTalk link for all existing products
-- UPDATE `product` SET `kakao_link` = 'https://open.kakao.com/o/your_default_link' WHERE `kakao_link` IS NULL;

-- 4. Add index for performance (optional)
-- CREATE INDEX idx_product_kakao_link ON product(kakao_link);

# Supabase Migration Validation Checklist

## Pre-Deployment Checks

### File Structure
- [x] `migrations/00001_initial_schema.sql` - Core schema
- [x] `migrations/00002_rls_policies.sql` - Security policies
- [x] `migrations/00003_views.sql` - Business logic views
- [x] `migrations/00004_storage.sql` - Storage configuration
- [x] `migrations/README.md` - Documentation
- [x] `SCHEMA_SUMMARY.md` - Complete schema reference

### Schema Validation

#### Tables (8 total)
- [ ] member - 회원 테이블
- [ ] collection - 브랜드/컬렉션
- [ ] category - 카테고리
- [ ] product - 상품
- [ ] product_diamond_info - 다이아몬드 정보
- [ ] product_material_info - 소재 정보
- [ ] product_image - 상품 이미지
- [ ] notice - 공지사항

#### ENUM Types (3 total)
- [ ] business_type_enum (WHOLESALE, RETAIL)
- [ ] approval_status_enum (PENDING, APPROVED, REJECTED)
- [ ] material_type_enum (14K, 18K, 24K, PLATINUM, SILVER, WHITE_GOLD, ROSE_GOLD)

#### Views (3 total)
- [ ] product_with_pricing - Dynamic pricing view
- [ ] product_full_details - Complete product info
- [ ] notice_public - Public notices

#### Storage Buckets (2 total)
- [ ] business-documents (private, 10MB, JPEG/PNG/WebP/PDF)
- [ ] product-images (public, 5MB, JPEG/PNG/WebP/GIF)

### Foreign Key Relationships
- [ ] product.collection_id → collection.id (ON DELETE SET NULL)
- [ ] product.category_id → category.id (ON DELETE SET NULL)
- [ ] product_diamond_info.product_id → product.id (ON DELETE CASCADE)
- [ ] product_material_info.product_id → product.id (ON DELETE CASCADE)
- [ ] product_image.product_id → product.id (ON DELETE CASCADE)

### Indexes (Critical for Performance)
- [ ] idx_member_approval_status
- [ ] idx_member_business_type
- [ ] idx_member_email
- [ ] idx_member_username
- [ ] idx_product_created_at
- [ ] idx_product_is_sale
- [ ] idx_product_collection_id
- [ ] idx_product_category_id
- [ ] idx_product_code
- [ ] idx_product_diamond_product_id
- [ ] idx_product_material_product_id
- [ ] idx_product_image_product_id
- [ ] idx_product_image_is_main
- [ ] idx_notice_is_pinned
- [ ] idx_notice_created_at

### Triggers (Auto-update timestamps)
- [ ] update_member_updated_at
- [ ] update_collection_updated_at
- [ ] update_category_updated_at
- [ ] update_product_updated_at
- [ ] update_product_diamond_info_updated_at
- [ ] update_product_material_info_updated_at
- [ ] update_product_image_updated_at
- [ ] update_notice_updated_at

### RLS Policies
#### member table
- [ ] member_select_own (users can view own profile)
- [ ] member_update_own (users can update own profile)
- [ ] member_select_admin (admins can view all)
- [ ] member_update_admin (admins can update all)
- [ ] member_insert_admin (admins can insert)

#### collection table
- [ ] collection_select_all (public read)
- [ ] collection_insert_admin (admin only)
- [ ] collection_update_admin (admin only)
- [ ] collection_delete_admin (admin only)

#### category table
- [ ] category_select_all (public read)
- [ ] category_insert_admin (admin only)
- [ ] category_update_admin (admin only)
- [ ] category_delete_admin (admin only)

#### product table
- [ ] product_select_authenticated (authenticated read)
- [ ] product_select_anon (anonymous read)
- [ ] product_insert_admin (admin only)
- [ ] product_update_admin (admin only)
- [ ] product_delete_admin (admin only)

#### product_diamond_info table
- [ ] product_diamond_info_select_all (public read)
- [ ] product_diamond_info_insert_admin (admin only)
- [ ] product_diamond_info_update_admin (admin only)
- [ ] product_diamond_info_delete_admin (admin only)

#### product_material_info table
- [ ] product_material_info_select_all (public read)
- [ ] product_material_info_insert_admin (admin only)
- [ ] product_material_info_update_admin (admin only)
- [ ] product_material_info_delete_admin (admin only)

#### product_image table
- [ ] product_image_select_all (public read)
- [ ] product_image_insert_admin (admin only)
- [ ] product_image_update_admin (admin only)
- [ ] product_image_delete_admin (admin only)

#### notice table
- [ ] notice_select_all (public read)
- [ ] notice_insert_admin (admin only)
- [ ] notice_update_admin (admin only)
- [ ] notice_delete_admin (admin only)

### Storage Policies
#### business-documents bucket
- [ ] business_documents_insert_own (users upload own)
- [ ] business_documents_select_own (users view own)
- [ ] business_documents_update_own (users update own)
- [ ] business_documents_delete_own (users delete own)
- [ ] business_documents_select_admin (admin view all)

#### product-images bucket
- [ ] product_images_select_all (public read)
- [ ] product_images_insert_admin (admin only)
- [ ] product_images_update_admin (admin only)
- [ ] product_images_delete_admin (admin only)

---

## Post-Deployment Verification

### SQL Verification Queries

```sql
-- 1. Count tables (should be 8)
SELECT COUNT(*) as table_count
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE';

-- 2. Check RLS enabled (should be true for all 8 tables)
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- 3. Verify ENUM types (should be 3)
SELECT typname
FROM pg_type
WHERE typtype = 'e'
ORDER BY typname;

-- 4. Check views (should be 3)
SELECT table_name
FROM information_schema.views
WHERE table_schema = 'public'
ORDER BY table_name;

-- 5. Verify indexes (should be 15+)
SELECT indexname
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY indexname;

-- 6. Check foreign keys
SELECT
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public'
ORDER BY tc.table_name;

-- 7. Verify storage buckets (should be 2)
SELECT id, name, public, file_size_limit
FROM storage.buckets
ORDER BY name;

-- 8. Check RLS policies count (should be 40+)
SELECT COUNT(*) as policy_count
FROM pg_policies
WHERE schemaname = 'public';

-- 9. Verify triggers (should be 8)
SELECT trigger_name, event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public'
  AND trigger_name LIKE 'update_%_updated_at'
ORDER BY event_object_table;

-- 10. Test updated_at trigger on member table
INSERT INTO member (username, email, password, business_type)
VALUES ('test_user', 'test@example.com', 'hashed_password', 'RETAIL')
RETURNING id, created_at, updated_at;
-- Store the ID

UPDATE member SET company_name = 'Test Company' WHERE id = <stored_id>;
SELECT updated_at FROM member WHERE id = <stored_id>;
-- updated_at should be newer than created_at

DELETE FROM member WHERE id = <stored_id>;
```

### Functional Tests

#### Test 1: Member Registration Flow
```sql
-- Create a RETAIL member
INSERT INTO member (username, email, password, business_type)
VALUES ('retail_customer', 'retail@example.com', 'hashed_pw', 'RETAIL')
RETURNING *;

-- Create a WHOLESALE member (pending approval)
INSERT INTO member (username, email, password, business_type, company_name, biz_reg_num)
VALUES ('wholesale_customer', 'wholesale@example.com', 'hashed_pw', 'WHOLESALE', 'ABC Corp', '123-45-67890')
RETURNING *;
-- Should have approval_status = 'PENDING'
```

#### Test 2: Product Creation with Relationships
```sql
-- Create collection
INSERT INTO collection (brand_name, slug, display_order)
VALUES ('Test Brand', 'test-brand', 1)
RETURNING *;

-- Create category
INSERT INTO category (category_name, slug, display_order)
VALUES ('Rings', 'rings', 1)
RETURNING *;

-- Create product
INSERT INTO product (
  collection_id, category_id, product_name, product_code,
  retail_price, wholesale_price, is_sale
)
VALUES (1, 1, 'Gold Ring', 'GR-001', 1000.00, 700.00, false)
RETURNING *;

-- Add diamond info
INSERT INTO product_diamond_info (product_id, diamond_size, diamond_amount)
VALUES (1, 0.50, 10)
RETURNING *;

-- Add material info
INSERT INTO product_material_info (product_id, material_type, weight, purity)
VALUES (1, '18K', 5.5, '18K 750')
RETURNING *;

-- Add product image
INSERT INTO product_image (product_id, image_url, is_main, display_order)
VALUES (1, 'https://example.com/image1.jpg', true, 1)
RETURNING *;
```

#### Test 3: Price Visibility View
```sql
-- Query as anonymous user (should see retail price)
SELECT id, product_name, display_price, user_business_type
FROM product_with_pricing
WHERE id = 1;
-- Expected: display_price = 1000.00, user_business_type = 'RETAIL'

-- Query as WHOLESALE user (should see wholesale price)
-- (This requires actual authentication context)
SET SESSION AUTHORIZATION 'wholesale_customer';
SELECT id, product_name, display_price, user_business_type
FROM product_with_pricing
WHERE id = 1;
-- Expected: display_price = 700.00, user_business_type = 'WHOLESALE'

-- Test sale pricing
UPDATE product SET is_sale = true, sale_price = 800.00 WHERE id = 1;
SELECT id, product_name, display_price, is_sale
FROM product_with_pricing
WHERE id = 1;
-- Expected: display_price = 800.00 (sale price overrides)
```

#### Test 4: Cascade Delete
```sql
-- Delete product (should cascade to related tables)
DELETE FROM product WHERE id = 1;

-- Verify cascades
SELECT COUNT(*) FROM product_diamond_info WHERE product_id = 1; -- Should be 0
SELECT COUNT(*) FROM product_material_info WHERE product_id = 1; -- Should be 0
SELECT COUNT(*) FROM product_image WHERE product_id = 1; -- Should be 0
```

#### Test 5: Storage Bucket Access
```bash
# Upload business document (requires Supabase CLI or API)
supabase storage upload business-documents/{user_id}/biz_reg.pdf ./test_file.pdf

# Try to upload product image as non-admin (should fail)
supabase storage upload product-images/test.jpg ./test_image.jpg
# Expected: Permission denied (only service_role can upload)
```

---

## Performance Benchmarks

### Expected Query Times (Local Development)
- [ ] SELECT * FROM product_with_pricing LIMIT 100; **< 50ms**
- [ ] SELECT * FROM product_full_details WHERE collection_id = 1; **< 100ms**
- [ ] SELECT * FROM member WHERE approval_status = 'PENDING'; **< 20ms**
- [ ] SELECT * FROM notice_public WHERE is_pinned = true; **< 10ms**

### Index Usage Verification
```sql
-- Check if indexes are being used
EXPLAIN ANALYZE SELECT * FROM product WHERE is_sale = true;
-- Should show "Index Scan using idx_product_is_sale"

EXPLAIN ANALYZE SELECT * FROM member WHERE approval_status = 'PENDING';
-- Should show "Index Scan using idx_member_approval_status"
```

---

## Security Validation

### RLS Enforcement
- [ ] Anonymous users cannot INSERT into any table
- [ ] Authenticated users cannot modify other members' profiles
- [ ] Only service_role can INSERT/UPDATE products
- [ ] Business documents are isolated by user ID
- [ ] Product images are public read, admin write only

### SQL Injection Protection
- [ ] All application queries use parameterized statements
- [ ] No dynamic SQL construction with user input
- [ ] Supabase client library handles escaping automatically

---

## Rollback Plan

If migration fails:

```sql
-- Drop everything in reverse order
DROP VIEW IF EXISTS notice_public;
DROP VIEW IF EXISTS product_full_details;
DROP VIEW IF EXISTS product_with_pricing;

DROP TABLE IF EXISTS notice CASCADE;
DROP TABLE IF EXISTS product_image CASCADE;
DROP TABLE IF EXISTS product_material_info CASCADE;
DROP TABLE IF EXISTS product_diamond_info CASCADE;
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS collection CASCADE;
DROP TABLE IF EXISTS member CASCADE;

DROP TYPE IF EXISTS material_type_enum;
DROP TYPE IF EXISTS approval_status_enum;
DROP TYPE IF EXISTS business_type_enum;

DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS is_admin();

DELETE FROM storage.buckets WHERE id IN ('business-documents', 'product-images');
```

---

## Sign-Off

- [ ] All tables created successfully
- [ ] All indexes created
- [ ] All foreign keys working
- [ ] All RLS policies active
- [ ] All views queryable
- [ ] All triggers firing
- [ ] Storage buckets configured
- [ ] Performance benchmarks met
- [ ] Security policies verified
- [ ] Documentation complete

**Validated by**: _________________
**Date**: _________________
**Supabase Project**: _________________

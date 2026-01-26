# MarvelRing Database Schema Summary

## Overview
PostgreSQL database schema for MarvelRing e-commerce platform with Supabase integration.

**Total Tables**: 8
**Total Views**: 3
**Storage Buckets**: 2

## Database Tables

### 1. member (회원)
**Purpose**: User accounts with business type distinction and approval workflow

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGSERIAL | PRIMARY KEY | Auto-increment ID |
| username | VARCHAR(100) | NOT NULL, UNIQUE | Unique username |
| email | VARCHAR(255) | NOT NULL, UNIQUE | Email address |
| password | VARCHAR(255) | NOT NULL | Hashed password |
| company_name | VARCHAR(200) | | Company name (optional) |
| ceo_name | VARCHAR(100) | | CEO name (optional) |
| biz_reg_num | VARCHAR(50) | UNIQUE | Business registration number |
| biz_reg_image_url | TEXT | | Business registration certificate URL |
| business_type | business_type_enum | NOT NULL, DEFAULT 'RETAIL' | WHOLESALE or RETAIL |
| approval_status | approval_status_enum | NOT NULL, DEFAULT 'PENDING' | PENDING/APPROVED/REJECTED |
| zip_code | VARCHAR(20) | | Postal code |
| address_line1 | VARCHAR(255) | | Primary address |
| address_line2 | VARCHAR(255) | | Secondary address |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Last update timestamp |

**Indexes**:
- `idx_member_approval_status` (approval_status)
- `idx_member_business_type` (business_type)
- `idx_member_email` (email)
- `idx_member_username` (username)

---

### 2. collection (브랜드/컬렉션)
**Purpose**: Product brand/collection management

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGSERIAL | PRIMARY KEY | Auto-increment ID |
| brand_name | VARCHAR(200) | NOT NULL | Brand name |
| slug | VARCHAR(200) | NOT NULL, UNIQUE | URL-friendly identifier |
| logo_image_url | TEXT | | Brand logo URL |
| display_order | INT | NOT NULL, DEFAULT 0 | Display ordering |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Last update timestamp |

---

### 3. category (카테고리)
**Purpose**: Product categorization

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGSERIAL | PRIMARY KEY | Auto-increment ID |
| category_name | VARCHAR(200) | NOT NULL | Category name |
| slug | VARCHAR(200) | NOT NULL, UNIQUE | URL-friendly identifier |
| display_order | INT | NOT NULL, DEFAULT 0 | Display ordering |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Last update timestamp |

---

### 4. product (상품)
**Purpose**: Main product catalog with dual pricing (retail/wholesale)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGSERIAL | PRIMARY KEY | Auto-increment ID |
| collection_id | BIGINT | FK → collection(id) ON DELETE SET NULL | Brand reference |
| category_id | BIGINT | FK → category(id) ON DELETE SET NULL | Category reference |
| product_name | VARCHAR(300) | NOT NULL | Product name |
| product_code | VARCHAR(100) | UNIQUE | SKU/product code |
| base_labor_cost | DECIMAL(12,2) | DEFAULT 0.00 | Base manufacturing cost |
| stone_setting_cost | DECIMAL(12,2) | DEFAULT 0.00 | Stone setting fee |
| weight | DECIMAL(10,2) | | Product weight (grams) |
| ring_size | VARCHAR(50) | | Ring size (if applicable) |
| size | VARCHAR(50) | | General size (if applicable) |
| description | TEXT | | Product description |
| additional_information | TEXT | | Extra details |
| retail_price | DECIMAL(12,2) | NOT NULL, DEFAULT 0.00 | Retail customer price |
| wholesale_price | DECIMAL(12,2) | NOT NULL, DEFAULT 0.00 | Wholesale customer price |
| is_sale | BOOLEAN | NOT NULL, DEFAULT FALSE | Sale status |
| sale_price | DECIMAL(12,2) | | Discounted price (if is_sale=true) |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Last update timestamp |

**Indexes**:
- `idx_product_created_at` (created_at DESC)
- `idx_product_is_sale` (is_sale)
- `idx_product_collection_id` (collection_id)
- `idx_product_category_id` (category_id)
- `idx_product_code` (product_code)

---

### 5. product_diamond_info (다이아몬드 정보)
**Purpose**: Diamond specifications for products (1:N relationship)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGSERIAL | PRIMARY KEY | Auto-increment ID |
| product_id | BIGINT | NOT NULL, FK → product(id) ON DELETE CASCADE | Product reference |
| diamond_size | DECIMAL(8,2) | | Diamond carat size |
| diamond_amount | INT | NOT NULL, DEFAULT 0 | Number of diamonds |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Last update timestamp |

**Indexes**:
- `idx_product_diamond_product_id` (product_id)

---

### 6. product_material_info (소재 정보)
**Purpose**: Material composition details (1:N relationship)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGSERIAL | PRIMARY KEY | Auto-increment ID |
| product_id | BIGINT | NOT NULL, FK → product(id) ON DELETE CASCADE | Product reference |
| material_type | material_type_enum | NOT NULL | Material type (14K, 18K, PLATINUM, etc.) |
| weight | DECIMAL(10,2) | | Material weight (grams) |
| purity | VARCHAR(50) | | Material purity/grade |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Last update timestamp |

**Indexes**:
- `idx_product_material_product_id` (product_id)

---

### 7. product_image (상품 이미지)
**Purpose**: Product photography (1:N relationship)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGSERIAL | PRIMARY KEY | Auto-increment ID |
| product_id | BIGINT | NOT NULL, FK → product(id) ON DELETE CASCADE | Product reference |
| image_url | TEXT | NOT NULL | Image storage URL |
| title | VARCHAR(300) | | Image title/alt text |
| description | TEXT | | Image description |
| display_order | INT | NOT NULL, DEFAULT 0 | Display ordering |
| is_main | BOOLEAN | NOT NULL, DEFAULT FALSE | Main product image flag |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Last update timestamp |

**Indexes**:
- `idx_product_image_product_id` (product_id)
- `idx_product_image_is_main` (is_main)

---

### 8. notice (공지사항)
**Purpose**: Platform announcements and notices

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGSERIAL | PRIMARY KEY | Auto-increment ID |
| title | VARCHAR(500) | NOT NULL | Notice title |
| content | TEXT | NOT NULL | Notice content |
| is_pinned | BOOLEAN | NOT NULL, DEFAULT FALSE | Pin to top flag |
| view_count | INT | NOT NULL, DEFAULT 0 | View counter |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Last update timestamp |

**Indexes**:
- `idx_notice_is_pinned` (is_pinned)
- `idx_notice_created_at` (created_at DESC)

---

## ENUM Types

### business_type_enum
```sql
'WHOLESALE' | 'RETAIL'
```
- WHOLESALE: Wholesale customer (sees wholesale_price)
- RETAIL: Retail customer (sees retail_price)

### approval_status_enum
```sql
'PENDING' | 'APPROVED' | 'REJECTED'
```
- PENDING: Awaiting approval
- APPROVED: Account approved
- REJECTED: Account rejected

### material_type_enum
```sql
'14K' | '18K' | '24K' | 'PLATINUM' | 'SILVER' | 'WHITE_GOLD' | 'ROSE_GOLD'
```

---

## Database Views

### product_with_pricing
**Purpose**: Dynamic pricing based on user's business_type

**Logic**:
- WHOLESALE users → `wholesale_price` (or `sale_price` if on sale)
- RETAIL users → `retail_price` (or `sale_price` if on sale)
- Anonymous users → `retail_price` (or `sale_price` if on sale)

**Columns**: All product columns + `display_price`, `user_business_type`

---

### product_full_details
**Purpose**: Complete product information with related data

**Joins**:
- collection (brand_name, collection_slug, collection_logo)
- category (category_name, category_slug)
- product_image (main_image_url)

**Columns**: Product + collection + category + main image + dynamic pricing

---

### notice_public
**Purpose**: Public notices ordered by priority

**Ordering**: `is_pinned DESC, created_at DESC` (pinned notices first)

---

## Storage Buckets

### business-documents (Private)
- **Purpose**: Business registration certificates
- **Access**: User-scoped (members can only access their own documents)
- **Size Limit**: 10MB
- **Allowed Types**: JPEG, PNG, WebP, PDF

### product-images (Public)
- **Purpose**: Product photography
- **Access**: Public read, admin write
- **Size Limit**: 5MB
- **Allowed Types**: JPEG, PNG, WebP, GIF

---

## Row Level Security (RLS)

### Access Control Summary

| Table | Anonymous | Authenticated | Admin |
|-------|-----------|---------------|-------|
| member | ❌ None | ✅ Own profile only | ✅ Full access |
| collection | ✅ Read only | ✅ Read only | ✅ Full access |
| category | ✅ Read only | ✅ Read only | ✅ Full access |
| product | ✅ Read only | ✅ Read only | ✅ Full access |
| product_* | ✅ Read only | ✅ Read only | ✅ Full access |
| notice | ✅ Read only | ✅ Read only | ✅ Full access |

**Key Policies**:
- **member_select_own**: Users can only view their own profile
- **member_update_own**: Users can only update their own profile
- **product_select_authenticated**: All authenticated users can view products
- **product_select_anon**: Anonymous users can browse products
- **All _admin policies**: Service role has full CRUD access

---

## Automatic Features

### Auto-updating Timestamps
All tables have a trigger that automatically updates `updated_at` on row modification:

```sql
CREATE TRIGGER update_{table}_updated_at BEFORE UPDATE ON {table}
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Foreign Key Cascades
- `product_diamond_info` → `ON DELETE CASCADE` (deleting product removes diamond info)
- `product_material_info` → `ON DELETE CASCADE` (deleting product removes material info)
- `product_image` → `ON DELETE CASCADE` (deleting product removes images)
- `product.collection_id` → `ON DELETE SET NULL` (deleting collection keeps product)
- `product.category_id` → `ON DELETE SET NULL` (deleting category keeps product)

---

## Entity Relationships

```
member (1) ──< (N) [owns account for pricing tier]
                    │
                    └──> business_type determines pricing view

collection (1) ──< (N) product
category (1) ──< (N) product

product (1) ──< (N) product_diamond_info
product (1) ──< (N) product_material_info
product (1) ──< (N) product_image
```

---

## Migration Files

1. **00001_initial_schema.sql** - Core tables, ENUM types, indexes, triggers
2. **00002_rls_policies.sql** - Row Level Security policies for all tables
3. **00003_views.sql** - Business logic views (pricing, full details)
4. **00004_storage.sql** - Storage bucket configuration and policies

---

## Key Design Decisions

### 1. Dual Pricing Strategy
- Products have both `retail_price` and `wholesale_price`
- View layer (`product_with_pricing`) handles price visibility
- `business_type` enum determines which price a user sees
- Sale pricing overrides base pricing when `is_sale = true`

### 2. Approval Workflow
- New members default to `approval_status = 'PENDING'`
- Admin reviews and sets to `APPROVED` or `REJECTED`
- Can be extended with approval timestamps/notes in future

### 3. Flexible Product Specifications
- Diamond info: 1:N (products can have multiple diamond types)
- Material info: 1:N (products can be multi-material)
- Images: 1:N with `is_main` flag and `display_order`

### 4. Soft Deletes Avoided
- Using `ON DELETE CASCADE` for child records
- Using `ON DELETE SET NULL` for optional references
- If soft deletes needed later, add `deleted_at TIMESTAMPTZ` columns

### 5. Slug Fields for SEO
- Collections and categories have `slug` fields
- Enables clean URLs: `/collections/{slug}` instead of `/collections/{id}`
- Must be unique and URL-safe

---

## Performance Considerations

### Indexed Columns
- All foreign keys indexed
- Common filter fields indexed (is_sale, approval_status, is_pinned)
- Sort fields indexed with DESC for recent-first queries

### Query Optimization
- Views use JOINs efficiently
- Main image uses subquery with LIMIT 1 to avoid N+1
- DECIMAL types used for precise currency calculations

---

## Security Notes

1. **RLS Enabled**: All tables have Row Level Security enabled
2. **Price Protection**: Views handle business logic; direct table access restricted
3. **Document Isolation**: Business documents scoped to user ID in storage path
4. **Admin Role**: Service role has full access; implement admin checks in application
5. **Password Storage**: Ensure passwords are hashed before insertion (use bcrypt/argon2)

---

## Future Extensions

Potential additions:
- `cart` and `order` tables for e-commerce flow
- `review` table for product reviews
- `wishlist` table for saved products
- `inventory` table for stock management
- `shipping` table for delivery options
- `payment` table for transaction records
- Soft deletes with `deleted_at` columns
- Audit logging tables

---

## Verification Queries

```sql
-- Count all tables
SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';
-- Expected: 8

-- Check RLS status
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';
-- Expected: All true

-- List all ENUM types
SELECT typname FROM pg_type WHERE typtype = 'e';
-- Expected: business_type_enum, approval_status_enum, material_type_enum

-- Verify views
SELECT table_name FROM information_schema.views WHERE table_schema = 'public';
-- Expected: product_with_pricing, product_full_details, notice_public

-- Check storage buckets
SELECT id, name, public FROM storage.buckets;
-- Expected: business-documents (false), product-images (true)
```

---

## Contact

For schema questions or migration issues, refer to:
- `/supabase/migrations/README.md` - Detailed migration guide
- Supabase documentation: https://supabase.com/docs

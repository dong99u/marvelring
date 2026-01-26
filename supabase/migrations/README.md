# Supabase Database Migrations

This directory contains SQL migration files for the MarvelRing e-commerce platform database schema.

## Migration Files

### 00001_initial_schema.sql
**Core database schema with 8 tables**

Tables created:
- `member` - User/member information with business type and approval workflow
- `collection` - Brand/collection management
- `category` - Product categorization
- `product` - Main product table with pricing (retail/wholesale)
- `product_diamond_info` - Diamond specifications (1:N relationship)
- `product_material_info` - Material details (gold, platinum, etc.)
- `product_image` - Product images with ordering
- `notice` - Announcements and notices

Features:
- PostgreSQL ENUM types for business_type, approval_status, material_type
- Automatic `updated_at` timestamp triggers
- Comprehensive indexes for performance
- Foreign key relationships with CASCADE/SET NULL

### 00002_rls_policies.sql
**Row Level Security (RLS) policies**

Security model:
- **member**: Users can only view/update their own profile; admins can manage all
- **product**: Public read access; admin-only modifications
- **collection/category**: Public read; admin-only write
- **notice**: Public read; admin-only write
- **product_***: Related tables follow product access patterns

Roles:
- `authenticated` - Logged-in users
- `anon` - Anonymous public access
- `service_role` - Admin/system operations

### 00003_views.sql
**Database views for business logic**

Views:
- `product_with_pricing` - Dynamic pricing based on user's business_type (WHOLESALE vs RETAIL)
- `product_full_details` - Complete product info with joins (collection, category, main image)
- `notice_public` - Public notices ordered by pinned status

Price visibility logic:
- WHOLESALE users see `wholesale_price`
- RETAIL users see `retail_price`
- Anonymous users see `retail_price`
- Sale prices apply when `is_sale = true`

### 00004_storage.sql
**Storage bucket configuration**

Buckets:
- `business-documents` (private)
  - Business registration certificates
  - 10MB file size limit
  - JPEG, PNG, WebP, PDF allowed
  - User-scoped access (users can only access their own documents)

- `product-images` (public)
  - Product photography
  - 5MB file size limit
  - JPEG, PNG, WebP, GIF allowed
  - Public read access; admin-only write

## Schema Overview

### ERD Summary
```
member (1) ──< (N) [owns account]
collection (1) ──< (N) product
category (1) ──< (N) product
product (1) ──< (N) product_diamond_info
product (1) ──< (N) product_material_info
product (1) ──< (N) product_image
```

### Key Indexes
- `idx_product_created_at` - Product sorting by date
- `idx_product_is_sale` - Quick sale item queries
- `idx_member_approval_status` - Member approval workflow
- `idx_notice_is_pinned` - Pinned notices priority

### ENUM Types
- `business_type_enum`: WHOLESALE, RETAIL
- `approval_status_enum`: PENDING, APPROVED, REJECTED
- `material_type_enum`: 14K, 18K, 24K, PLATINUM, SILVER, WHITE_GOLD, ROSE_GOLD

## Running Migrations

### Using Supabase CLI
```bash
# Link to your Supabase project
supabase link --project-ref your-project-ref

# Run all migrations
supabase db push

# Or apply individually
supabase db execute --file supabase/migrations/00001_initial_schema.sql
supabase db execute --file supabase/migrations/00002_rls_policies.sql
supabase db execute --file supabase/migrations/00003_views.sql
supabase db execute --file supabase/migrations/00004_storage.sql
```

### Using Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste each migration file content
4. Run in order (00001 → 00002 → 00003 → 00004)

## Verification

After running migrations, verify:

```sql
-- Check tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';

-- Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- Check storage buckets
SELECT * FROM storage.buckets;

-- Check views
SELECT table_name
FROM information_schema.views
WHERE table_schema = 'public';
```

## Notes

- All tables have automatic `updated_at` timestamp triggers
- RLS is enabled on all tables for security
- Views handle business logic for price visibility
- Storage policies enforce user-scoped access for documents
- Indexes are optimized for common query patterns

## Dependencies

- PostgreSQL 15+
- Supabase (includes auth.uid() and storage functions)
- PostGIS extension (if using geospatial features in future)

## Migration Rollback

To rollback migrations, run SQL in reverse order:

```sql
-- Drop views first (dependencies)
DROP VIEW IF EXISTS notice_public;
DROP VIEW IF EXISTS product_full_details;
DROP VIEW IF EXISTS product_with_pricing;

-- Drop tables (CASCADE removes dependencies)
DROP TABLE IF EXISTS notice CASCADE;
DROP TABLE IF EXISTS product_image CASCADE;
DROP TABLE IF EXISTS product_material_info CASCADE;
DROP TABLE IF EXISTS product_diamond_info CASCADE;
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS collection CASCADE;
DROP TABLE IF EXISTS member CASCADE;

-- Drop types
DROP TYPE IF EXISTS material_type_enum;
DROP TYPE IF EXISTS approval_status_enum;
DROP TYPE IF EXISTS business_type_enum;

-- Remove storage buckets
DELETE FROM storage.buckets WHERE id IN ('business-documents', 'product-images');
```

## Future Migrations

When adding new migrations:
- Use sequential numbering: 00005_*, 00006_*, etc.
- Include descriptive names: `00005_add_cart_table.sql`
- Always test on local Supabase instance first
- Document changes in this README

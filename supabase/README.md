# Supabase Configuration & Database Documentation

Complete guide to Supabase setup, database schema, migrations, and backend infrastructure for the MarvelRing B2B platform.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Database Schema](#database-schema)
3. [Migrations](#migrations)
4. [Storage Configuration](#storage-configuration)
5. [Authentication Setup](#authentication-setup)
6. [RLS Policies](#rls-policies)
7. [Edge Functions](#edge-functions)
8. [Performance Optimization](#performance-optimization)
9. [Backup & Recovery](#backup--recovery)
10. [Troubleshooting](#troubleshooting)

---

## Project Overview

### Supabase Basics

**What is Supabase?** PostgreSQL database + Authentication + Real-time APIs + Storage

**MarvelRing Usage:**
- **Database:** PostgreSQL 15+
- **Authentication:** Auth v2 with email/password
- **Storage:** Product images, business registration documents
- **Functions:** Approval notifications, email sending

### Accessing Supabase

**Dashboard:** https://supabase.com/dashboard
**Project Name:** marvelring
**Region:** [Your region, e.g., ap-southeast-1]

---

## Database Schema

### Tables Overview

```
member ──┐
         ├─── product ──── product_image
         │     │
collection┘     └──── product_diamond_info
         │     └──── product_material_info
         │
category ┘

notice ──── member (author)
```

### Core Tables

#### Table: `member` (회원)

Purpose: User accounts and company information

```sql
CREATE TABLE member (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  company_name VARCHAR(200),
  ceo_name VARCHAR(100),
  biz_reg_num VARCHAR(50) UNIQUE,
  biz_reg_image_url TEXT,
  business_type business_type_enum NOT NULL DEFAULT 'RETAIL',
  approval_status approval_status_enum NOT NULL DEFAULT 'PENDING',
  approved_at TIMESTAMPTZ,
  approved_by BIGINT REFERENCES member(id) ON DELETE SET NULL,
  rejected_reason TEXT,
  zip_code VARCHAR(20),
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_member_approval_status ON member(approval_status);
CREATE INDEX idx_member_approved_at ON member(approved_at);
CREATE INDEX idx_member_approved_by ON member(approved_by);
```

**Enums:**
- `business_type_enum`: WHOLESALE, RETAIL
- `approval_status_enum`: PENDING, APPROVED, REJECTED

**Key Fields:**
- `username` - Unique login identifier
- `email` - Unique contact email
- `approval_status` - Controls platform access
- `approved_at`, `approved_by` - Audit trail

#### Table: `collection` (브랜드/컬렉션)

Purpose: Brand/collection groupings

```sql
CREATE TABLE collection (
  id BIGSERIAL PRIMARY KEY,
  brand_name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  logo_image_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Purpose:** Organize products into collections (Chanel, Luxury Line, etc.)

#### Table: `category` (카테고리)

Purpose: Product categories

```sql
CREATE TABLE category (
  id BIGSERIAL PRIMARY KEY,
  category_name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Examples:** Rings, Necklaces, Bracelets, Earrings

#### Table: `product` (상품)

Purpose: Product catalog

```sql
CREATE TABLE product (
  id BIGSERIAL PRIMARY KEY,
  collection_id BIGINT REFERENCES collection(id) ON DELETE SET NULL,
  category_id BIGINT REFERENCES category(id) ON DELETE SET NULL,
  product_name VARCHAR(300) NOT NULL,
  product_code VARCHAR(100) UNIQUE,
  base_labor_cost DECIMAL(12, 2) DEFAULT 0.00,
  stone_setting_cost DECIMAL(12, 2) DEFAULT 0.00,
  weight DECIMAL(10, 2),
  ring_size VARCHAR(50),
  size VARCHAR(50),
  description TEXT,
  additional_information TEXT,
  retail_price DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  wholesale_price DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  is_sale BOOLEAN NOT NULL DEFAULT FALSE,
  sale_price DECIMAL(12, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_product_created_at ON product(created_at DESC);
CREATE INDEX idx_product_is_sale ON product(is_sale);
```

**Key Concepts:**
- `product_code` - SKU, must be unique
- `retail_price` - Full price for end consumers
- `wholesale_price` - Bulk buyer price
- `is_sale` - Defective/sale indicator
- `sale_price` - Discounted price when is_sale=true

#### Table: `product_image` (상품 이미지)

Purpose: Product photos and media

```sql
CREATE TABLE product_image (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES product(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  title VARCHAR(100),
  description TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_main BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_product_image_product_id ON product_image(product_id);
```

**Usage:**
- `is_main` - Hero/feature image (only ONE per product)
- `display_order` - Gallery order (0, 1, 2, ...)

#### Table: `product_diamond_info` (다이아몬드 정보)

Purpose: Diamond specification for products

```sql
CREATE TABLE product_diamond_info (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES product(id) ON DELETE CASCADE,
  diamond_size DECIMAL(10, 2) NOT NULL,
  diamond_amount INT NOT NULL
);

CREATE INDEX idx_diamond_info_product_id ON product_diamond_info(product_id);
```

#### Table: `product_material_info` (재질 정보)

Purpose: Material composition and purity

```sql
CREATE TABLE product_material_info (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES product(id) ON DELETE CASCADE,
  material_type material_type_enum NOT NULL,
  weight DECIMAL(10, 2) NOT NULL,
  purity DECIMAL(5, 2),
  UNIQUE(product_id, material_type)
);

CREATE INDEX idx_material_info_product_id ON product_material_info(product_id);
```

**Material Types:** 14K, 18K, 24K, PLATINUM, SILVER, WHITE_GOLD, ROSE_GOLD

#### Table: `notice` (공지사항)

Purpose: Platform announcements

```sql
CREATE TABLE notice (
  id BIGSERIAL PRIMARY KEY,
  member_id BIGINT REFERENCES member(id) ON DELETE SET NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN NOT NULL DEFAULT FALSE,
  view_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notice_is_pinned ON notice(is_pinned, created_at DESC);
```

---

## Migrations

### Migration Files

Location: `supabase/migrations/`

| File | Purpose |
|------|---------|
| `00001_initial_schema.sql` | Core tables and enums |
| `00002_rls_policies.sql` | Row-level security policies |
| `00003_views.sql` | Database views for performance |
| `00004_storage.sql` | Storage bucket configuration |
| `00005_member_approval_workflow.sql` | User approval system |
| `00006_price_rls.sql` | Price display rules for roles |

### Running Migrations

#### Local Development

```bash
# Using Supabase CLI
supabase db push

# Specific migration
supabase db push --include-migrations-only
```

#### Production

```bash
# Via Supabase Dashboard
# 1. Go to SQL Editor
# 2. Copy migration file content
# 3. Run in SQL Editor
# 4. Verify no errors

# Or use CLI against production
supabase db push --project-ref=your-project-ref
```

### Viewing Migrations

In Supabase Dashboard:
1. SQL Editor
2. View previous queries/migrations
3. Check execution status

### Rolling Back

If a migration fails:

1. **Identify issue** - Check SQL syntax
2. **Fix the migration file**
3. **Run corrected version**
4. **If table corrupted** - Request restore from backup

---

## Storage Configuration

### Buckets

#### Bucket: `product-images`

**Purpose:** Product photography

**Configuration:**
- Public: Yes (readable by anyone)
- Protected: No (writable by authenticated users only)
- Max File Size: 50MB per file

**Path Structure:**
```
product-images/
├── {product_code}_main_1.jpg
├── {product_code}_detail_1.jpg
├── {product_code}_detail_2.jpg
└── {product_code}_{type}_{order}.{ext}
```

**Example URLs:**
```
https://project.supabase.co/storage/v1/object/public/product-images/RING-14K-001_main_1.jpg
```

#### Bucket: `business-registration`

**Purpose:** Business registration documents (optional)

**Configuration:**
- Public: No (private, accessible only to authenticated owner)
- Protected: Yes (requires auth)

**Usage:**
```
business-registration/
├── {member_id}/
│   └── registration.pdf
│   └── certificate.jpg
```

### Uploading Files Programmatically

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(url, key)

// Upload file
const { data, error } = await supabase.storage
  .from('product-images')
  .upload('RING-14K-001_main_1.jpg', file)

// Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('product-images')
  .getPublicUrl('RING-14K-001_main_1.jpg')
```

---

## Authentication Setup

### Auth Configuration

**Location:** Supabase Dashboard > Authentication > Providers

**Enabled Providers:**
- Email/Password (default)
- Optional: Google, GitHub, etc.

### User Roles

#### Admin Role

Set in user metadata:

```json
{
  "role": "admin"
}
```

**To Set:**
1. Supabase Dashboard > Authentication > Users
2. Click user email
3. Scroll to "User Metadata"
4. Add/edit JSON
5. Click "Update User"

#### Regular User Role

Default (no role or role: "user")

### Email Configuration

**Sender Email:** [Your domain]@supabase.co
**SMTP Configuration:** Set in Email Templates

To customize:
1. Authentication > Email Templates
2. Edit Confirm signup, Reset password, etc.
3. Customize sender name and content

---

## RLS Policies

### Row Level Security Overview

RLS enforces access control at database level:

```
User Query
    ↓
Check RLS Policy
    ↓
Policy allows? ──→ Execute query
                    ↓
Policy denies? ──→ Return error/empty
```

### Key Policies

#### Policy: Public Product Read Access

**Table:** product
**Operation:** SELECT
**Allows:** Anyone to view products

```sql
CREATE POLICY "anyone_can_view_products" ON product
  FOR SELECT
  USING (true);
```

#### Policy: Admin Member Management

**Table:** member
**Operation:** SELECT, UPDATE
**Allows:** Admins to view and update any member

```sql
CREATE POLICY "admin_can_view_all_members" ON member
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );
```

#### Policy: User Can View Own Data

**Table:** member
**Operation:** SELECT
**Allows:** Users to see their own profile

```sql
CREATE POLICY "users_can_view_own_profile" ON member
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt()->>'email');
```

### Checking RLS Status

In Supabase Dashboard:
1. Go to Authentication > Policies
2. Verify policies are enabled
3. Review policy logic

---

## Edge Functions

### Purpose

Edge Functions run server-side code triggered by:
- Database events
- Webhooks
- HTTP requests

### Function: `send-approval-email`

**Purpose:** Send approval/rejection emails

**Location:** `supabase/functions/send-approval-email/`

**Trigger:** Database trigger on member.approval_status change

**Implementation:**
```typescript
// Triggered when approval_status changes
// Calls external email service (Resend, SendGrid, etc.)
// Sends appropriate email based on status

if (newStatus === 'APPROVED') {
  sendApprovalEmail(email, member_id)
} else if (newStatus === 'REJECTED') {
  sendRejectionEmail(email, reason)
}
```

### Deploying Functions

```bash
# Deploy specific function
supabase functions deploy send-approval-email

# Deploy all functions
supabase functions deploy

# Test locally
supabase functions serve
```

---

## Performance Optimization

### Indexes

Key indexes for query performance:

```sql
-- Member lookups
CREATE INDEX idx_member_approval_status ON member(approval_status);
CREATE INDEX idx_member_email ON member(email);

-- Product queries
CREATE INDEX idx_product_created_at ON product(created_at DESC);
CREATE INDEX idx_product_is_sale ON product(is_sale);
CREATE INDEX idx_product_category_id ON product(category_id);

-- Approval workflow
CREATE INDEX idx_member_approved_at ON member(approved_at);
```

### Views for Complex Queries

#### View: `pending_members`

```sql
CREATE VIEW pending_members AS
SELECT
  m.id,
  m.username,
  m.email,
  m.company_name,
  m.ceo_name,
  m.biz_reg_num,
  m.business_type,
  m.created_at
FROM member m
WHERE m.approval_status = 'PENDING'
ORDER BY m.created_at ASC;
```

**Usage:**
```typescript
const { data } = await supabase
  .from('pending_members')
  .select('*')
```

### Query Optimization Tips

1. **Use views for complex joins**
2. **Filter early** - Push filters to database
3. **Limit results** - Don't fetch all rows
4. **Use indexes** - Check explain plans
5. **Avoid N+1 queries** - Batch requests

### Monitoring Performance

In Supabase Dashboard:
1. Go to Logs
2. Monitor query execution time
3. Set alerts for slow queries

---

## Backup & Recovery

### Automatic Backups

**Enabled By Default:**
- Daily backups kept for 7 days
- Weekly backups kept for 4 weeks
- Can restore to any point in time

**Accessing Backups:**
1. Supabase Dashboard > Settings > Backups
2. View available restore points
3. Click "Restore" to initiate

### Manual Backup

Create backup before major changes:

```bash
# Export database
supabase db dump

# This creates SQL dump of entire schema and data
```

### Recovery Process

1. **Assess damage** - Determine what went wrong
2. **Select restore point** - Pick time before issue
3. **Request restore** - Click restore in Backups section
4. **Verify data** - Check tables after restore
5. **Communicate** - Notify team about downtime

**RTO (Recovery Time Objective):** 30 minutes
**RPO (Recovery Point Objective):** 1 hour

---

## Troubleshooting

### "RLS violation" when accessing data

**Cause:** RLS policy denying access

**Solution:**
1. Check user has appropriate role
2. Verify policy logic
3. Run as admin to test
4. Check auth.uid() matches policy conditions

### "Unique constraint violation" on product_code

**Cause:** Duplicate product code

**Solution:**
1. Check existing products: `SELECT * FROM product WHERE product_code = 'CODE'`
2. Use different code or update existing product
3. If need to reuse code, delete old product first

### Query timeout

**Cause:** Slow query or large result set

**Solution:**
1. Add LIMIT to query
2. Add WHERE conditions to filter
3. Check indexes are present
4. Use EXPLAIN ANALYZE to debug

### Storage file not found

**Cause:** Wrong file path or permissions

**Solution:**
1. Verify file exists in dashboard
2. Check file path matches storage path
3. Verify bucket is public (for public files)
4. Check file expiration if using signed URLs

### Email not sending

**Cause:** Email service not configured

**Solution:**
1. Check edge function logs
2. Verify email provider credentials
3. Check email service is active
4. Test manually in logs

### Connection pool exhausted

**Cause:** Too many simultaneous connections

**Solution:**
1. Enable connection pooling
2. Use PgBouncer in pooling mode
3. Close connections properly in code
4. Monitor active connections

---

## Security Best Practices

### Secrets Management

Never commit secrets to code:

```bash
# Good - use environment variables
SUPABASE_SERVICE_ROLE_KEY=xxxx

# Bad - hardcoded in code
const key = "xxxx"  // Never do this
```

### RLS Policies

Always enable RLS:
- Default deny all
- Explicitly grant access needed
- Use row-level filtering

### API Keys

**Public Key:** Safe to expose in frontend
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

**Service Role Key:** Keep private (backend only)
```
SUPABASE_SERVICE_ROLE_KEY
```

### Audit Trail

Important fields to maintain:
- `created_at` - Who created record
- `updated_at` - When updated
- `approved_by` - Admin approval audit
- `rejected_reason` - Decision history

---

## Support & Documentation

**Supabase Docs:** https://supabase.com/docs
**Community:** https://supabase.com/discord
**Status Page:** https://status.supabase.com

For MarvelRing-specific issues:
- Check SQL migrations for schema
- Review admin/approval.ts for business logic
- Contact platform team for access issues

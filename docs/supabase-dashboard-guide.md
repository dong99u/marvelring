# Supabase Dashboard - Admin Operations Guide

This guide provides step-by-step instructions for managing MarvelRing B2B platform operations directly through the Supabase Dashboard.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Product Management](#product-management)
3. [Image Management](#image-management)
4. [Category Management](#category-management)
5. [Collection Management](#collection-management)
6. [User Management](#user-management)
7. [Dashboard Access](#dashboard-access)

---

## Getting Started

### Accessing Supabase Dashboard

1. Navigate to [Supabase](https://supabase.com/dashboard)
2. Select the MarvelRing project
3. Use your admin credentials to log in
4. You'll see the main dashboard with table listings on the left sidebar

### Database Schema Overview

The MarvelRing platform uses these main tables:

- **member** - User accounts and company information
- **product** - Product catalog with pricing and specifications
- **product_image** - Product photos and display images
- **collection** - Brand and collection groupings
- **category** - Product categories (jewelry types, etc.)

---

## Product Management

### Creating a New Product

#### Step 1: Access Products Table

1. In the Supabase Dashboard, click **SQL Editor** or **Table Editor**
2. Navigate to the `product` table in the left sidebar
3. Click **New Row** or the **+** button to add a new product

#### Step 2: Fill in Required Fields

**Mandatory Fields:**

| Field | Description | Example |
|-------|-------------|---------|
| `product_name` | Display name for the product | "14K White Gold Ring" |
| `product_code` | Unique identifier (SKU) | "RING-14K-001" |
| `category_id` | Reference to category table | Select from dropdown |
| `retail_price` | Customer-facing price | 1,500,000 (KRW) |
| `wholesale_price` | Wholesale buyer price | 750,000 (KRW) |

**Optional Fields:**

| Field | Description | Example |
|-------|-------------|---------|
| `collection_id` | Brand/collection reference | Leave empty or select |
| `description` | Product description | "Elegant diamond-set ring" |
| `weight` | Product weight in grams | 3.5 |
| `ring_size` | Ring size (for rings) | 11.5 |
| `size` | Diameter or dimensions | 12.5 |
| `base_labor_cost` | Labor cost for base design | 50,000 |
| `stone_setting_cost` | Labor cost for stone setting | 30,000 |
| `additional_information` | Notes and specifications | "Includes certification" |

#### Step 3: Save the Product

1. After filling in fields, click **Save** or press Enter
2. The system will create the product with current timestamp
3. You'll see a confirmation message

#### Step 4: Setting Sale Status

To mark a product as sale/defective:

1. Find the product in the table
2. Click the row to edit
3. Set `is_sale` to **true**
4. Enter the `sale_price` (discounted amount)
5. Click **Save**

#### Example Product Entry

```
product_name: "18K Rose Gold Diamond Ring"
product_code: "ROSE-18K-2024-001"
category_id: 2 (Rings)
collection_id: 5 (Chanel Collection)
retail_price: 2,500,000
wholesale_price: 1,250,000
base_labor_cost: 75,000
stone_setting_cost: 45,000
weight: 4.2
ring_size: 13
is_sale: false
description: "Luxurious rose gold ring with brilliant diamonds"
```

### Editing a Product

1. Click on the product row in the table
2. Modify any fields you need to update
3. Click **Save** to apply changes
4. The `updated_at` timestamp updates automatically

### Deleting a Product

**Important: Use Soft Delete Approach**

To safely delete a product while maintaining referential integrity:

1. Instead of permanently deleting, create a `deleted_at` column
2. Set `deleted_at` to current timestamp for the product
3. Update your product queries to exclude soft-deleted items: `WHERE deleted_at IS NULL`

**Note:** If you must permanently delete:
1. First ensure no images reference this product
2. Delete all `product_image` records for this product
3. Then delete the product itself
4. Supabase CASCADE rules will handle cleanup

---

## Image Management

### Uploading Product Images

#### Via Supabase Storage

1. In Supabase Dashboard, navigate to **Storage**
2. Select the **product-images** bucket (create if doesn't exist)
3. Click **Upload file** or drag-and-drop images
4. Choose image file from your computer
5. Supabase generates public URL automatically

#### Image File Naming Best Practice

```
{product_code}_{image_type}_{order}.jpg
Examples:
- RING-14K-001_main_1.jpg
- RING-14K-001_detail_1.jpg
- RING-14K-001_detail_2.jpg
```

### Recording Image References in Database

After uploading, create records in `product_image` table:

1. Navigate to `product_image` table
2. Click **New Row**
3. Fill in the following:

| Field | Value |
|-------|-------|
| `product_id` | ID of the product |
| `image_url` | Full URL from Storage |
| `display_order` | Sequential number (0, 1, 2, etc.) |
| `is_main` | true for main/hero image, false for others |
| `title` | "Main Product Image" or description |
| `description` | Optional detailed description |

#### Example Image Entry

```
product_id: 42
image_url: "https://supabase-project.supabase.co/storage/v1/object/public/product-images/RING-14K-001_main_1.jpg"
display_order: 0
is_main: true
title: "Main Product View"
description: "Front view of 14K white gold ring"
```

### Managing Image Display Order

1. For each product, edit `product_image` records
2. Set `display_order` values:
   - `0` for first/main image
   - `1` for second
   - `2` for third, etc.
3. The frontend displays images in ascending order of `display_order`

### Setting Primary (Hero) Image

1. Find all `product_image` records for a product
2. Set `is_main = true` for ONE image only
3. Set `is_main = false` for all others
4. The UI will use the `is_main = true` image as the product hero

---

## Category Management

### Viewing Categories

1. Navigate to the `category` table
2. See all product categories available

### Current Categories

These are the default categories in MarvelRing:

| Category Name | Description |
|---------------|-------------|
| Rings | Jewelry rings |
| Necklaces | Chain and pendant necklaces |
| Bracelets | Wrist bracelets |
| Earrings | Ear jewelry |
| Accessories | Other jewelry items |

### Adding a New Category

1. Click **New Row** in the `category` table
2. Fill in:

| Field | Description |
|-------|-------------|
| `category_name` | Display name: "Brooches" |
| `slug` | URL-friendly name: "brooches" (lowercase, no spaces) |
| `display_order` | Order in menu (0, 1, 2, ...) |

3. Click **Save**

#### Category Slug Rules

- Use lowercase letters only
- Replace spaces with hyphens
- No special characters
- Examples: `rings`, `white-gold`, `diamond-only`

### Editing Category Order

1. Open `category` table
2. Click on category row
3. Change `display_order` value
4. Lower numbers appear first in navigation
5. Click **Save**

---

## Collection Management

### Understanding Collections

Collections represent brand lines or jewelry collections:

- **Chanel Collection** - Chanel brand products
- **Luxury Line** - High-end exclusive pieces
- **Seasonal 2024** - Time-based collections

### Creating a Collection

1. Navigate to `collection` table
2. Click **New Row**
3. Fill in fields:

| Field | Required | Description |
|-------|----------|-------------|
| `brand_name` | Yes | "Chanel" or "Luxury Diamonds" |
| `slug` | Yes | "chanel" (unique, URL-safe) |
| `logo_image_url` | No | Link to brand logo image |
| `display_order` | No | Ordering (default: 0) |

#### Example Collection

```
brand_name: "Cartier Fine Jewelry"
slug: "cartier-fine"
logo_image_url: "https://...storage.../cartier-logo.png"
display_order: 1
```

### Linking Products to Collections

1. Open `product` table
2. Find product to categorize
3. Set `collection_id` to desired collection ID
4. Multiple products can share the same collection
5. Leave blank if not part of any collection

### Updating Collection Display Order

1. Open `collection` table
2. Edit `display_order` field for each collection
3. Featured collections should have lower numbers (appear first)
4. Save changes

---

## User Management

### Viewing User Accounts

1. Navigate to `member` table
2. You'll see all registered users

### Member Table Fields

| Field | Description | Values |
|-------|-------------|--------|
| `username` | Login username | Unique |
| `email` | Contact email | Unique |
| `company_name` | Business name | Text |
| `business_type` | Buyer category | WHOLESALE or RETAIL |
| `approval_status` | Account status | PENDING, APPROVED, REJECTED |
| `biz_reg_num` | Business registration # | Text |
| `biz_reg_image_url` | Registration document | Image URL |

### Approval Workflow (Manual Dashboard Method)

#### Approving a User

1. Navigate to `member` table
2. Find user with `approval_status = PENDING`
3. Click the row to edit
4. Change `approval_status` to **APPROVED**
5. Set `approved_at` to current timestamp (usually auto-filled)
6. Click **Save**

#### Rejecting a User

1. Find user with `approval_status = PENDING`
2. Click the row to edit
3. Change `approval_status` to **REJECTED**
4. Fill `rejected_reason` with explanation:
   - "Business registration document unverified"
   - "Company information incomplete"
   - "Business registration number invalid"
5. Click **Save**

**Note:** For easier approval workflow, use the `/admin/users` web interface instead of manual dashboard edits.

### Viewing User Details

Click any member row to see complete profile:

- Registration date and timestamps
- Full address information
- Business registration details
- Approval history

---

## Dashboard Access

### Security Considerations

#### Admin Role Assignment

To make a user an admin (can access `/admin` routes):

1. Go to **Authentication** section
2. Find user in Users list
3. Click user email
4. Scroll to **User Metadata**
5. Add/edit `role` field:

```json
{
  "role": "admin"
}
```

6. Click **Update User**

#### RLS (Row Level Security) Policies

MarvelRing uses RLS policies:

- **Admin users** can view/edit all records
- **Regular users** can only view public products and their own data
- **Public access** to product catalog (read-only)

### Recommended Admin Practices

1. **Regular Backups**
   - Supabase auto-backs up nightly
   - Request manual backup before major changes
   - Backups accessible in **Settings > Backups**

2. **Audit Trail**
   - Keep `approved_at`, `approved_by` fields populated
   - Track who made approvals
   - Timestamps stored automatically

3. **Data Validation**
   - Product codes must be unique
   - Category slugs must be unique
   - Email addresses must be valid

4. **Change Management**
   - Make one change at a time when possible
   - Document unusual approvals/rejections
   - Test product visibility after adding/editing

---

## Common Tasks Reference

### I need to quickly approve 10 pending users

**Best Method:** Use `/admin/users` web interface for batch operations (safer than manual edits)

### I want to create a new product line for spring 2025

**Steps:**
1. Create new collection (brand_name: "Spring 2025 Collection")
2. Create/organize categories if needed
3. Add products with collection_id set to new collection
4. Set display_order in collection table

### A product has a typo in the name

**Fix:**
1. Find product in table
2. Click product row
3. Edit product_name field
4. Save changes

### An image for a product is incorrect

**Fix:**
1. Go to Storage bucket
2. Delete old image file
3. Upload corrected image
4. Copy new image URL
5. Edit product_image record with new URL
6. Save

### I need to disable a product without deleting it

**Steps:**
1. Find product in table
2. Set `is_sale = true`
3. Set `sale_price = 0` (or leave null)
4. Add note in `additional_information`: "Product discontinued"
5. Save

---

## Troubleshooting

### "Cannot create product - missing required field"

**Solution:** Ensure you've filled in ALL required fields:
- product_name
- product_code (unique)
- category_id
- retail_price
- wholesale_price

### "Invalid image URL error"

**Solution:**
1. Verify file is in Storage bucket
2. Copy full public URL from Storage UI
3. Paste complete URL including domain
4. Try with different file format (jpg instead of png)

### "User cannot be approved - FK constraint error"

**Solution:**
1. Verify business registration image exists
2. Check all company information is complete
3. Ensure business_type is set (WHOLESALE or RETAIL)

### Seeing blank product images

**Solution:**
1. Check product_image records exist
2. Verify `image_url` points to actual file in Storage
3. Check `is_main` field is set correctly
4. Confirm file is public (not restricted)

---

## Next Steps

- See [Admin Guide](./admin-guide.md) for user approval workflows
- See [Technical Documentation](../src/app/admin/README.md) for developer info
- Contact support for database queries beyond UI

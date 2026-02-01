# Categories Admin Page

## Overview

The categories admin page provides a complete CRUD interface for managing product categories.

## Files Created

1. **`/src/app/actions/categories.ts`** - Server actions for category operations
2. **`/src/app/admin/categories/page.tsx`** - Main admin page (server component)
3. **`/src/app/admin/categories/CategoryForm.tsx`** - Form component for create/edit
4. **`/src/app/admin/categories/CategoryActions.tsx`** - Actions component for edit/delete

## Features

### 1. Category List (Table View)
- Displays all categories sorted by `display_order`
- Shows: order, name, slug, product count, created date
- Includes edit and delete actions for each category

### 2. Add New Category
- Inline form at the top of the page
- Auto-generates slug from category name
- Fields:
  - **카테고리명** (Category Name) - Required
  - **슬러그** (Slug) - Required, auto-generated, pattern validated
  - **순서** (Display Order) - Auto-incremented

### 3. Edit Category
- Click "수정" button to switch to edit mode
- Inline editing with the same form
- Cancel button to exit edit mode

### 4. Delete Category
- Click "삭제" button to show confirmation dialog
- Prevents deletion if category has products
- Shows warning with product count

## Server Actions

All server actions are defined in `/src/app/actions/categories.ts`:

- `fetchCategoriesAction()` - Get all categories with product counts
- `createCategoryAction(formData)` - Create new category
- `updateCategoryAction(categoryId, formData)` - Update existing category
- `deleteCategoryAction(categoryId)` - Delete category (with validation)
- `updateCategoryOrderAction(updates)` - Bulk update display orders (for future drag-to-reorder)

## Data Flow

1. **Server Component** (`page.tsx`) fetches categories on initial load
2. **Client Components** handle user interactions
3. **Server Actions** perform mutations and revalidate the page
4. **Automatic Refresh** via `revalidatePath('/admin/categories')`

## Future Enhancements

- Drag-to-reorder functionality using `updateCategoryOrderAction()`
- Bulk operations (delete multiple categories)
- Category analytics (most/least used categories)
- Category icons or images

## Database Schema

Categories are stored in the `category` table:

```sql
category (
  category_id SERIAL PRIMARY KEY,
  category_name VARCHAR(50) NOT NULL,
  slug VARCHAR(50) NOT NULL UNIQUE,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)
```

Product relationship:
- `product.category_id` references `category.category_id`
- Deletion prevented if products exist

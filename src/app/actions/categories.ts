'use server'

/**
 * Server Actions for Category Management
 * Handles CRUD operations for product categories
 */

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Category } from '@/types/database'

export interface CategoryWithProductCount extends Category {
  product_count: number
}

export interface CategoryFormData {
  category_name: string
  slug: string
  display_order: number
}

/**
 * Fetch all categories with product counts
 */
export async function fetchCategoriesAction() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('category')
    .select(`
      *,
      products:product(count)
    `)
    .order('display_order', { ascending: true })

  if (error) {
    return { data: null, error: error.message }
  }

  // Transform the data to include product_count
  const categories: CategoryWithProductCount[] = data.map((cat) => ({
    category_id: cat.category_id,
    category_name: cat.category_name,
    slug: cat.slug,
    display_order: cat.display_order,
    created_at: cat.created_at,
    updated_at: cat.updated_at,
    product_count: cat.products?.[0]?.count || 0,
  }))

  return { data: categories, error: null }
}

/**
 * Create a new category
 */
export async function createCategoryAction(formData: CategoryFormData) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('category')
    .insert([
      {
        category_name: formData.category_name,
        slug: formData.slug,
        display_order: formData.display_order,
      },
    ])
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/categories')
  return { success: true, data }
}

/**
 * Update an existing category
 */
export async function updateCategoryAction(
  categoryId: number,
  formData: CategoryFormData
) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('category')
    .update({
      category_name: formData.category_name,
      slug: formData.slug,
      display_order: formData.display_order,
    })
    .eq('category_id', categoryId)
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/categories')
  return { success: true, data }
}

/**
 * Delete a category
 */
export async function deleteCategoryAction(categoryId: number) {
  const supabase = await createClient()

  // Check if category has products
  const { count } = await supabase
    .from('product')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', categoryId)

  if (count && count > 0) {
    return {
      success: false,
      error: `Cannot delete category with ${count} product(s). Please reassign or delete products first.`,
    }
  }

  const { error } = await supabase
    .from('category')
    .delete()
    .eq('category_id', categoryId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/categories')
  return { success: true }
}

/**
 * Update display order for multiple categories
 */
export async function updateCategoryOrderAction(
  updates: { category_id: number; display_order: number }[]
) {
  const supabase = await createClient()

  // Update each category's display order
  const promises = updates.map(({ category_id, display_order }) =>
    supabase
      .from('category')
      .update({ display_order })
      .eq('category_id', category_id)
  )

  const results = await Promise.all(promises)

  // Check if any update failed
  const errors = results.filter((r) => r.error)
  if (errors.length > 0) {
    return {
      success: false,
      error: errors.map((r) => r.error?.message).join(', '),
    }
  }

  revalidatePath('/admin/categories')
  return { success: true }
}

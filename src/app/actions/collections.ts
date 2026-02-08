'use server'

/**
 * Server Actions for Collection Management
 * Handles CRUD operations for product collections (brands)
 */

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export interface CollectionFormData {
  brand_name: string
  slug: string
  logo_url: string
  display_order: number
}

/**
 * Create a new collection
 */
export async function createCollectionAction(formData: CollectionFormData) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('collection')
    .insert([
      {
        brand_name: formData.brand_name,
        slug: formData.slug,
        logo_url: formData.logo_url || null,
        display_order: formData.display_order,
      },
    ])
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/collections')
  return { success: true, data }
}

/**
 * Update an existing collection
 */
export async function updateCollectionAction(
  collectionId: string,
  formData: CollectionFormData
) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('collection')
    .update({
      brand_name: formData.brand_name,
      slug: formData.slug,
      logo_url: formData.logo_url || null,
      display_order: formData.display_order,
    })
    .eq('collection_id', collectionId)
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/collections')
  return { success: true, data }
}

/**
 * Delete a collection
 */
export async function deleteCollectionAction(collectionId: string) {
  const supabase = await createClient()

  // Check if collection has products
  const { count } = await supabase
    .from('product')
    .select('*', { count: 'exact', head: true })
    .eq('collection_id', collectionId)

  if (count && count > 0) {
    return {
      success: false,
      error: `Cannot delete collection with ${count} product(s). Please reassign or delete products first.`,
    }
  }

  const { error } = await supabase
    .from('collection')
    .delete()
    .eq('collection_id', collectionId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/collections')
  return { success: true }
}

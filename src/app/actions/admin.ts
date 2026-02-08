'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Product, Category, Collection } from '@/types/database'

// ============================================================================
// TYPES
// ============================================================================

export interface ActionResult<T = unknown> {
  success: boolean
  error?: string
  data?: T
}

// ============================================================================
// PRODUCTS
// ============================================================================

/**
 * Fetch products for admin with pagination and search
 */
export async function fetchProductsForAdmin(
  page = 1,
  limit = 20,
  search?: string
): Promise<ActionResult<{ products: Product[]; total: number }>> {
  try {
    const supabase = await createClient()
    const offset = (page - 1) * limit

    let query = supabase
      .from('product')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (search) {
      query = query.or(
        `product_name.ilike.%${search}%,product_code.ilike.%${search}%`
      )
    }

    const { data: products, error, count } = await query

    if (error) {
      return { success: false, error: error.message }
    }

    return {
      success: true,
      data: {
        products: products || [],
        total: count || 0,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

/**
 * Create new product
 */
export async function createProduct(
  formData: FormData
): Promise<ActionResult<Product>> {
  try {
    const supabase = await createClient()

    // Extract product data from FormData
    const productData = {
      collection_id: formData.get('collection_id')
        ? Number(formData.get('collection_id'))
        : null,
      category_id: Number(formData.get('category_id')),
      product_name: formData.get('product_name') as string,
      product_code: formData.get('product_code') as string,
      base_labor_cost: formData.get('base_labor_cost')
        ? Number(formData.get('base_labor_cost'))
        : null,
      stone_setting_cost: formData.get('stone_setting_cost')
        ? Number(formData.get('stone_setting_cost'))
        : null,
      weight: formData.get('weight') ? Number(formData.get('weight')) : null,
      ring_size: formData.get('ring_size')
        ? Number(formData.get('ring_size'))
        : null,
      size: formData.get('size') ? Number(formData.get('size')) : null,
      description: (formData.get('description') as string) || null,
      additional_information:
        (formData.get('additional_information') as string) || null,
      retail_price: Number(formData.get('retail_price')),
      wholesale_price: Number(formData.get('wholesale_price')),
      is_sale: formData.get('is_sale') === 'true',
      is_new: formData.get('is_new') === 'true',
      sale_price: formData.get('sale_price')
        ? Number(formData.get('sale_price'))
        : null,
    }

    const { data, error } = await supabase
      .from('product')
      .insert(productData)
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    // Insert material info records
    const materialTypes = ['14K', '18K', '24K'] as const
    const materialRecords: { product_id: number; material_type: string; weight: number | null }[] = []

    for (const type of materialTypes) {
      const isChecked = formData.get(`material_${type}`) === 'true'
      if (isChecked) {
        const weightVal = formData.get(`material_weight_${type}`)
        materialRecords.push({
          product_id: data.product_id,
          material_type: type,
          weight: weightVal ? Number(weightVal) : null,
        })
      }
    }

    if (materialRecords.length > 0) {
      await supabase.from('product_material_info').insert(materialRecords)
    }

    // Insert diamond info records
    const diamondCount = Number(formData.get('diamond_count') || '0')
    const diamondRecords: { product_id: number; diamond_size: number; diamond_amount: number }[] = []

    for (let i = 0; i < diamondCount; i++) {
      const size = formData.get(`diamond_size_${i}`)
      const amount = formData.get(`diamond_amount_${i}`)
      if (size && amount) {
        diamondRecords.push({
          product_id: data.product_id,
          diamond_size: Number(size),
          diamond_amount: Number(amount),
        })
      }
    }

    if (diamondRecords.length > 0) {
      await supabase.from('product_diamond_info').insert(diamondRecords)
    }

    revalidatePath('/admin/products')
    revalidatePath('/products')
    revalidatePath('/pure-gold')

    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

/**
 * Update existing product
 */
export async function updateProduct(
  productId: number,
  formData: FormData
): Promise<ActionResult<Product>> {
  try {
    const supabase = await createClient()

    // Extract product data from FormData
    const productData = {
      collection_id: formData.get('collection_id')
        ? Number(formData.get('collection_id'))
        : null,
      category_id: Number(formData.get('category_id')),
      product_name: formData.get('product_name') as string,
      product_code: formData.get('product_code') as string,
      base_labor_cost: formData.get('base_labor_cost')
        ? Number(formData.get('base_labor_cost'))
        : null,
      stone_setting_cost: formData.get('stone_setting_cost')
        ? Number(formData.get('stone_setting_cost'))
        : null,
      weight: formData.get('weight') ? Number(formData.get('weight')) : null,
      ring_size: formData.get('ring_size')
        ? Number(formData.get('ring_size'))
        : null,
      size: formData.get('size') ? Number(formData.get('size')) : null,
      description: (formData.get('description') as string) || null,
      additional_information:
        (formData.get('additional_information') as string) || null,
      retail_price: Number(formData.get('retail_price')),
      wholesale_price: Number(formData.get('wholesale_price')),
      is_sale: formData.get('is_sale') === 'true',
      is_new: formData.get('is_new') === 'true',
      sale_price: formData.get('sale_price')
        ? Number(formData.get('sale_price'))
        : null,
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('product')
      .update(productData)
      .eq('product_id', productId)
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    // Update material info: delete existing then insert new
    await supabase
      .from('product_material_info')
      .delete()
      .eq('product_id', productId)

    const materialTypes = ['14K', '18K', '24K'] as const
    const materialRecords: { product_id: number; material_type: string; weight: number | null }[] = []

    for (const type of materialTypes) {
      const isChecked = formData.get(`material_${type}`) === 'true'
      if (isChecked) {
        const weightVal = formData.get(`material_weight_${type}`)
        materialRecords.push({
          product_id: productId,
          material_type: type,
          weight: weightVal ? Number(weightVal) : null,
        })
      }
    }

    if (materialRecords.length > 0) {
      await supabase.from('product_material_info').insert(materialRecords)
    }

    // Update diamond info: delete existing then insert new
    await supabase
      .from('product_diamond_info')
      .delete()
      .eq('product_id', productId)

    const diamondCount = Number(formData.get('diamond_count') || '0')
    const diamondRecords: { product_id: number; diamond_size: number; diamond_amount: number }[] = []

    for (let i = 0; i < diamondCount; i++) {
      const size = formData.get(`diamond_size_${i}`)
      const amount = formData.get(`diamond_amount_${i}`)
      if (size && amount) {
        diamondRecords.push({
          product_id: productId,
          diamond_size: Number(size),
          diamond_amount: Number(amount),
        })
      }
    }

    if (diamondRecords.length > 0) {
      await supabase.from('product_diamond_info').insert(diamondRecords)
    }

    revalidatePath('/admin/products')
    revalidatePath('/products')
    revalidatePath('/pure-gold')

    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

/**
 * Delete product (hard delete)
 */
export async function deleteProduct(
  productId: number
): Promise<ActionResult<void>> {
  try {
    const supabase = await createClient()

    const { error } = await supabase
      .from('product')
      .delete()
      .eq('product_id', productId)

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath('/admin/products')
    revalidatePath('/products')

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

// ============================================================================
// CATEGORIES
// ============================================================================

/**
 * Fetch all categories
 */
export async function fetchCategories(): Promise<ActionResult<Category[]>> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('category')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data: data || [] }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

/**
 * Create new category
 */
export async function createCategory(
  formData: FormData
): Promise<ActionResult<Category>> {
  try {
    const supabase = await createClient()

    const categoryData = {
      category_name: formData.get('category_name') as string,
      slug: formData.get('slug') as string,
      display_order: Number(formData.get('display_order') || 0),
    }

    const { data, error } = await supabase
      .from('category')
      .insert(categoryData)
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath('/admin/categories')
    revalidatePath('/products')

    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

/**
 * Update existing category
 */
export async function updateCategory(
  categoryId: number,
  formData: FormData
): Promise<ActionResult<Category>> {
  try {
    const supabase = await createClient()

    const categoryData = {
      category_name: formData.get('category_name') as string,
      slug: formData.get('slug') as string,
      display_order: Number(formData.get('display_order') || 0),
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('category')
      .update(categoryData)
      .eq('category_id', categoryId)
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath('/admin/categories')
    revalidatePath('/products')

    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

/**
 * Delete category
 */
export async function deleteCategory(
  categoryId: number
): Promise<ActionResult<void>> {
  try {
    const supabase = await createClient()

    const { error } = await supabase
      .from('category')
      .delete()
      .eq('category_id', categoryId)

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath('/admin/categories')
    revalidatePath('/products')

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

// ============================================================================
// COLLECTIONS
// ============================================================================

/**
 * Fetch all collections
 */
export async function fetchCollections(): Promise<ActionResult<Collection[]>> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('collection')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data: data || [] }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

/**
 * Create new collection
 */
export async function createCollection(
  formData: FormData
): Promise<ActionResult<Collection>> {
  try {
    const supabase = await createClient()

    const collectionData = {
      brand_name: formData.get('brand_name') as string,
      slug: formData.get('slug') as string,
      logo_image_url: (formData.get('logo_image_url') as string) || null,
      display_order: Number(formData.get('display_order') || 0),
    }

    const { data, error } = await supabase
      .from('collection')
      .insert(collectionData)
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath('/admin/collections')
    revalidatePath('/products')

    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

/**
 * Update existing collection
 */
export async function updateCollection(
  collectionId: number,
  formData: FormData
): Promise<ActionResult<Collection>> {
  try {
    const supabase = await createClient()

    const collectionData = {
      brand_name: formData.get('brand_name') as string,
      slug: formData.get('slug') as string,
      logo_image_url: (formData.get('logo_image_url') as string) || null,
      display_order: Number(formData.get('display_order') || 0),
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('collection')
      .update(collectionData)
      .eq('collection_id', collectionId)
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath('/admin/collections')
    revalidatePath('/products')

    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

/**
 * Delete collection
 */
export async function deleteCollection(
  collectionId: number
): Promise<ActionResult<void>> {
  try {
    const supabase = await createClient()

    const { error } = await supabase
      .from('collection')
      .delete()
      .eq('collection_id', collectionId)

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath('/admin/collections')
    revalidatePath('/products')

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

// ============================================================================
// PRODUCT MATERIAL INFO
// ============================================================================

/**
 * Fetch product material info by product ID
 */
export async function fetchProductMaterialInfo(productId: number) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('product_material_info')
      .select('product_material_info_id, product_id, material_type, weight, purity')
      .eq('product_id', productId)
      .order('material_type')

    if (error) {
      return { success: false as const, error: error.message }
    }

    return { success: true as const, data: data || [] }
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

// ============================================================================
// PRODUCT DIAMOND INFO
// ============================================================================

/**
 * Fetch product diamond info by product ID
 */
export async function fetchProductDiamondInfo(productId: number) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('product_diamond_info')
      .select('product_diamond_info_id, product_id, diamond_size, diamond_amount')
      .eq('product_id', productId)
      .order('diamond_size')

    if (error) {
      return { success: false as const, error: error.message }
    }

    return { success: true as const, data: data || [] }
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

// ============================================================================
// PRODUCT IMAGES
// ============================================================================

/**
 * Fetch product images by product ID
 */
export async function fetchProductImages(productId: number) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('product_image')
      .select('id, product_id, image_url, title, description, display_order, is_main')
      .eq('product_id', productId)
      .order('display_order', { ascending: true })

    if (error) {
      return { success: false as const, error: error.message }
    }

    return { success: true as const, data: data || [] }
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

/**
 * Delete a product image (removes from storage and database)
 */
export async function deleteProductImage(imageId: number): Promise<ActionResult<void>> {
  try {
    const supabase = await createClient()

    // First get the image record to find the storage path
    const { data: image, error: fetchError } = await supabase
      .from('product_image')
      .select('image_url')
      .eq('id', imageId)
      .single()

    if (fetchError || !image) {
      return { success: false, error: 'Image not found' }
    }

    // Extract storage path from URL
    const url = new URL(image.image_url)
    const pathMatch = url.pathname.match(/\/storage\/v1\/object\/public\/product-images\/(.+)/)
    if (pathMatch) {
      // Use admin client for storage deletion (bypasses RLS)
      const { createAdminClient } = await import('@/lib/supabase/admin')
      const adminSupabase = createAdminClient()
      await adminSupabase.storage.from('product-images').remove([pathMatch[1]])
    }

    // Delete database record
    const { error: deleteError } = await supabase
      .from('product_image')
      .delete()
      .eq('id', imageId)

    if (deleteError) {
      return { success: false, error: deleteError.message }
    }

    revalidatePath('/admin/products')
    revalidatePath('/products')

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

/**
 * Server-Side Product Query Helpers
 *
 * CRITICAL SECURITY RULES:
 * 1. ALWAYS query product_full_details view, NEVER product table directly
 * 2. NEVER expose wholesale_price or retail_price fields
 * 3. ONLY use the single 'display_price' field from the view
 * 4. Transform database columns to match frontend types
 *
 * DATABASE COLUMN MAPPING:
 * - product_id (bigint) → id (string)
 * - display_price → price
 * - collection_name → brand_name
 */

import { createClient } from '@/lib/supabase/server';
import type {
  ProductForDisplay,
  MaterialInfoForDisplay,
  ProductQueryOptions,
  ProductListResponse,
} from '@/types/product';

/**
 * Transform database row to ProductForDisplay
 * @param row - Raw database row from product_full_details view
 * @param materialInfo - Optional material info from product_material_info table
 */
function transformProductRow(
  row: any,
  materialInfo?: MaterialInfoForDisplay[]
): ProductForDisplay {
  return {
    id: row.product_id?.toString() || '',
    collection_id: row.collection_id?.toString() || null,
    category_id: row.category_id?.toString() || null,
    product_name: row.product_name,
    product_code: row.product_code,
    base_labor_cost: row.base_labor_cost,
    stone_setting_cost: row.stone_setting_cost,
    weight: row.weight,
    ring_size: row.ring_size,
    size: row.size,
    description: row.description,
    additional_information: row.additional_information,
    is_sale: row.is_sale,
    is_new: row.is_new ?? false,
    created_at: row.created_at,
    updated_at: row.updated_at,
    price: row.display_price,
    kakao_link: row.kakao_link || null,
    brand_name: row.collection_name || null,
    collection_slug: row.collection_slug || null,
    collection_logo: row.collection_logo || null,
    category_name: row.category_name || null,
    category_slug: row.category_slug || null,
    main_image_url: row.main_image_url || null,
    material_info: materialInfo,
  };
}

/**
 * Fetch products with pagination (SERVER-SIDE)
 * Uses product_full_details view to ensure price security
 */
export async function getProductsForUser(
  options: ProductQueryOptions = {}
): Promise<ProductListResponse> {
  const supabase = await createClient();
  const { category, collectionSlug, search, limit = 20, cursor } = options;

  let query = supabase
    .from('product_full_details')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit + 1); // Fetch one extra to determine hasMore

  // Apply filters
  if (category) {
    query = query.eq('category_slug', category);
  }

  if (collectionSlug) {
    query = query.eq('collection_slug', collectionSlug);
  }

  if (search) {
    query = query.or(
      `product_name.ilike.%${search}%,product_code.ilike.%${search}%`
    );
  }

  if (cursor) {
    query = query.lt('created_at', cursor);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  const hasMore = data.length > limit;
  const rawProducts = hasMore ? data.slice(0, limit) : data;
  const products = rawProducts.map((row) => transformProductRow(row));
  const nextCursor =
    hasMore && products.length > 0
      ? products[products.length - 1].created_at
      : null;

  return {
    products,
    nextCursor,
    hasMore,
  };
}

/**
 * Fetch a single product by ID (SERVER-SIDE)
 * Uses product_full_details view to ensure price security
 * Also fetches material_info from product_material_info table
 */
export async function getProductByIdForUser(
  id: string
): Promise<ProductForDisplay | null> {
  const supabase = await createClient();

  const productId = parseInt(id, 10);
  if (isNaN(productId)) {
    return null;
  }

  // Fetch product details and material info in parallel
  const [productResult, materialResult] = await Promise.all([
    supabase
      .from('product_full_details')
      .select('*')
      .eq('product_id', productId)
      .single(),
    supabase
      .from('product_material_info')
      .select('material_type, weight')
      .eq('product_id', productId)
      .order('material_type', { ascending: true }),
  ]);

  if (productResult.error) {
    if (productResult.error.code === 'PGRST116') {
      // Not found
      return null;
    }
    console.error('Error fetching product:', productResult.error);
    throw productResult.error;
  }

  // Transform material info (ignore errors - material_info is optional)
  const materialInfo: MaterialInfoForDisplay[] | undefined =
    materialResult.data && materialResult.data.length > 0
      ? materialResult.data.map((row) => ({
          material_type: row.material_type,
          weight: row.weight,
        }))
      : undefined;

  return transformProductRow(productResult.data, materialInfo);
}

/**
 * Get products by collection (SERVER-SIDE)
 */
export async function getProductsByCollection(
  collectionSlug: string,
  options: Omit<ProductQueryOptions, 'collectionSlug'> = {}
): Promise<ProductListResponse> {
  return getProductsForUser({
    ...options,
    collectionSlug,
  });
}

/**
 * Get products by category (SERVER-SIDE)
 */
export async function getProductsByCategory(
  category: string,
  options: Omit<ProductQueryOptions, 'category'> = {}
): Promise<ProductListResponse> {
  return getProductsForUser({
    ...options,
    category,
  });
}

/**
 * Search products (SERVER-SIDE)
 */
export async function searchProducts(
  searchTerm: string,
  options: Omit<ProductQueryOptions, 'search'> = {}
): Promise<ProductListResponse> {
  return getProductsForUser({
    ...options,
    search: searchTerm,
  });
}

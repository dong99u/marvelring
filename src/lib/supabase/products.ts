/**
 * Product Query Helpers
 *
 * CRITICAL SECURITY RULES:
 * 1. ALWAYS query product_for_user view, NEVER product table directly
 * 2. NEVER expose wholesale_price or retail_price fields
 * 3. ONLY use the single 'price' field
 */

import { createClient } from '@/lib/supabase/client';
import type {
  ProductForDisplay,
  ProductQueryOptions,
  ProductListResponse,
} from '@/types/product';

function mapProductRow(row: Record<string, unknown>): ProductForDisplay {
  return {
    id: String(row.product_id ?? ''),
    collection_id: row.collection_id ? String(row.collection_id) : null,
    category_id: row.category_id ? String(row.category_id) : null,
    product_name: String(row.product_name ?? ''),
    product_code: String(row.product_code ?? ''),
    base_labor_cost:
      row.base_labor_cost === null || row.base_labor_cost === undefined
        ? null
        : Number(row.base_labor_cost),
    stone_setting_cost:
      row.stone_setting_cost === null || row.stone_setting_cost === undefined
        ? null
        : Number(row.stone_setting_cost),
    weight:
      row.weight === null || row.weight === undefined ? null : Number(row.weight),
    ring_size:
      row.ring_size === null || row.ring_size === undefined
        ? null
        : String(row.ring_size),
    size: row.size === null || row.size === undefined ? null : String(row.size),
    description:
      row.description === null || row.description === undefined
        ? null
        : String(row.description),
    additional_information:
      row.additional_information === null || row.additional_information === undefined
        ? null
        : String(row.additional_information),
    is_sale: Boolean(row.is_sale),
    is_new: Boolean(row.is_new),
    created_at: String(row.created_at ?? ''),
    updated_at: String(row.updated_at ?? ''),
    price:
      row.price === null || row.price === undefined ? null : Number(row.price),
    brand_name:
      row.brand_name === null || row.brand_name === undefined
        ? null
        : String(row.brand_name),
    collection_slug:
      row.collection_slug === null || row.collection_slug === undefined
        ? null
        : String(row.collection_slug),
    collection_logo:
      row.collection_logo === null || row.collection_logo === undefined
        ? null
        : String(row.collection_logo),
    category_name:
      row.category_name === null || row.category_name === undefined
        ? null
        : String(row.category_name),
    category_slug:
      row.category_slug === null || row.category_slug === undefined
        ? null
        : String(row.category_slug),
    main_image_url:
      row.main_image_url === null || row.main_image_url === undefined
        ? null
        : String(row.main_image_url),
  };
}

/**
 * Fetch products with pagination
 * Uses product_for_user view to ensure price security
 */
export async function getProductsForUser(
  options: ProductQueryOptions = {}
): Promise<ProductListResponse> {
  const supabase = createClient();
  const { category, collectionSlug, search, limit = 20, cursor } = options;

  let query = supabase
    .from('product_for_user')
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
  const products = hasMore ? data.slice(0, limit) : data;
  const nextCursor =
    hasMore && products.length > 0
      ? products[products.length - 1].created_at
      : null;

  return {
    products: (products as Record<string, unknown>[]).map((row) =>
      mapProductRow(row)
    ),
    nextCursor,
    hasMore,
  };
}

/**
 * Fetch a single product by ID
 * Uses product_for_user view to ensure price security
 */
export async function getProductByIdForUser(
  id: string
): Promise<ProductForDisplay | null> {
  const supabase = createClient();
  const productId = Number(id);

  if (Number.isNaN(productId)) {
    return null;
  }

  const { data, error } = await supabase
    .from('product_for_user')
    .select('*')
    .eq('product_id', productId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null;
    }
    console.error('Error fetching product:', error);
    throw error;
  }

  return mapProductRow(data as Record<string, unknown>);
}

/**
 * Get products by collection
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
 * Get products by category
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
 * Search products
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

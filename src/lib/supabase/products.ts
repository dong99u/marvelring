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
    products: products as ProductForDisplay[],
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

  const { data, error } = await supabase
    .from('product_for_user')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null;
    }
    console.error('Error fetching product:', error);
    throw error;
  }

  return data as ProductForDisplay;
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

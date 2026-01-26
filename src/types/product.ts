/**
 * Product Types for Frontend Display
 *
 * CRITICAL SECURITY RULES:
 * 1. NEVER include wholesale_price or retail_price fields
 * 2. ONLY use the single 'price' field from product_for_user view
 * 3. price can be null for unauthenticated/unapproved users
 */

export interface ProductForDisplay {
  id: string;
  collection_id: string | null;
  category_id: string | null;
  product_name: string;
  product_code: string;
  base_labor_cost: number | null;
  stone_setting_cost: number | null;
  weight: number | null;
  ring_size: string | null;
  size: string | null;
  description: string | null;
  additional_information: string | null;
  is_sale: boolean;
  created_at: string;
  updated_at: string;

  // SINGLE price field - appropriate for user's business_type
  // NULL if user is not logged in or not approved
  price: number | null;

  // KakaoTalk inquiry link (optional, per-product or uses global default)
  kakao_link?: string | null;

  // Collection info
  brand_name?: string | null;
  collection_slug?: string | null;
  collection_logo?: string | null;

  // Category info
  category_name?: string | null;
  category_slug?: string | null;

  // Main image
  main_image_url?: string | null;
}

/**
 * Product Query Options
 */
export interface ProductQueryOptions {
  category?: string;
  collectionSlug?: string;
  search?: string;
  limit?: number;
  cursor?: string;
}

/**
 * Product List Response
 */
export interface ProductListResponse {
  products: ProductForDisplay[];
  nextCursor: string | null;
  hasMore: boolean;
}

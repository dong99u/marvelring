'use server';

import { createClient } from '@/lib/supabase/server';
import { ProductForDisplay } from '@/types/product';

export interface GetProductsParams {
  cursor?: number;
  limit?: number;
  category?: string;
  isNew?: boolean;
  isSale?: boolean;
  sort?: 'latest' | 'name';
}

export interface GetProductsResult {
  products: ProductForDisplay[];
  nextCursor: number | null;
  hasMore: boolean;
}

export async function getProducts({
  cursor = 0,
  limit = 24,
  category,
  isNew,
  isSale,
  sort = 'latest',
}: GetProductsParams): Promise<GetProductsResult> {
  const supabase = await createClient();

  let query = supabase.from('product_full_details').select('*');

  // Apply category filter
  if (category) {
    query = query.eq('category_slug', category);
  }

  // Apply new products filter (last 30 days)
  if (isNew) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    query = query.gte('created_at', thirtyDaysAgo.toISOString());
  }

  // Apply sale filter
  if (isSale) {
    query = query.eq('is_sale', true);
  }

  // Apply sorting
  if (sort === 'name') {
    query = query.order('product_name', { ascending: true });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  // Apply pagination using offset
  query = query.range(cursor, cursor + limit - 1);

  const { data: rawProducts, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }

  // Map database fields to ProductForDisplay interface
  const products: ProductForDisplay[] = (rawProducts || []).map((p) => ({
    id: String(p.product_id),
    collection_id: p.collection_id ? String(p.collection_id) : null,
    category_id: p.category_id ? String(p.category_id) : null,
    product_name: p.product_name,
    product_code: p.product_code,
    base_labor_cost: p.base_labor_cost,
    stone_setting_cost: p.stone_setting_cost,
    weight: p.weight,
    ring_size: p.ring_size ? String(p.ring_size) : null,
    size: p.size ? String(p.size) : null,
    description: p.description,
    additional_information: p.additional_information,
    is_sale: p.is_sale,
    created_at: p.created_at,
    updated_at: p.updated_at,
    price: p.display_price ? Number(p.display_price) : null,
    brand_name: p.collection_name,
    collection_slug: p.collection_slug,
    category_name: p.category_name,
    category_slug: p.category_slug,
    main_image_url: p.main_image_url,
  }));

  const hasMore = products.length === limit;
  const nextCursor = hasMore ? cursor + limit : null;

  return {
    products,
    nextCursor,
    hasMore,
  };
}

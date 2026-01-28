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

  const { data: products, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }

  const hasMore = products?.length === limit;
  const nextCursor = hasMore ? cursor + limit : null;

  return {
    products: products || [],
    nextCursor,
    hasMore,
  };
}

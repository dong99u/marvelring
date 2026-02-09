'use server';

import { createClient } from '@/lib/supabase/server';

export async function toggleWishlist(productId: string): Promise<{ isWishlisted: boolean }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('로그인이 필요합니다.');
  }

  const productIdNum = parseInt(productId, 10);
  if (isNaN(productIdNum)) {
    throw new Error('잘못된 상품 ID입니다.');
  }

  // Check if already wishlisted
  const { data: existing } = await supabase
    .from('member_wishlist')
    .select('id')
    .eq('user_id', user.id)
    .eq('product_id', productIdNum)
    .single();

  if (existing) {
    // Remove from wishlist
    const { error: deleteError } = await supabase
      .from('member_wishlist')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productIdNum);

    if (deleteError) {
      throw new Error('관심 저장 해제에 실패했습니다.');
    }

    return { isWishlisted: false };
  } else {
    // Add to wishlist
    const { error } = await supabase
      .from('member_wishlist')
      .insert({ user_id: user.id, product_id: productIdNum });

    if (error) {
      throw new Error('관심 저장에 실패했습니다.');
    }

    return { isWishlisted: true };
  }
}

export async function checkWishlistStatus(productId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  const productIdNum = parseInt(productId, 10);
  if (isNaN(productIdNum)) {
    return false;
  }

  const { data } = await supabase
    .from('member_wishlist')
    .select('id')
    .eq('user_id', user.id)
    .eq('product_id', productIdNum)
    .single();

  return !!data;
}

export async function getWishlistProducts(): Promise<{
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
  is_new: boolean;
  created_at: string;
  updated_at: string;
  price: number | null;
  brand_name?: string | null;
  collection_slug?: string | null;
  collection_logo?: string | null;
  category_name?: string | null;
  category_slug?: string | null;
  main_image_url?: string | null;
}[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  // Step 1: Get wishlist product IDs
  const { data: wishlistItems, error: wishlistError } = await supabase
    .from('member_wishlist')
    .select('product_id')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (wishlistError || !wishlistItems || wishlistItems.length === 0) {
    return [];
  }

  const productIds = wishlistItems.map((item) => item.product_id);

  // Step 2: Fetch product details from secure view
  const { data: products, error: productError } = await supabase
    .from('product_full_details')
    .select('*')
    .in('product_id', productIds);

  if (productError || !products) {
    return [];
  }

  // Maintain wishlist order (most recently added first)
  const productMap = new Map(products.map((p) => [p.product_id, p]));
  type ProductFullDetailsRow = (typeof products)[number];
  return productIds
    .map((pid) => productMap.get(pid))
    .filter(Boolean)
    .map((row) => {
      const typedRow = row as ProductFullDetailsRow;
      return {
        id: typedRow.product_id?.toString() || '',
        collection_id: typedRow.collection_id?.toString() || null,
        category_id: typedRow.category_id?.toString() || null,
        product_name: typedRow.product_name,
        product_code: typedRow.product_code,
        base_labor_cost: typedRow.base_labor_cost,
        stone_setting_cost: typedRow.stone_setting_cost,
        weight: typedRow.weight,
        ring_size: typedRow.ring_size,
        size: typedRow.size,
        description: typedRow.description,
        additional_information: typedRow.additional_information,
        is_sale: typedRow.is_sale,
        is_new: typedRow.is_new ?? false,
        created_at: typedRow.created_at,
        updated_at: typedRow.updated_at,
        price:
          typedRow.display_price === null || typedRow.display_price === undefined
            ? null
            : Number(typedRow.display_price),
        brand_name: typedRow.collection_name || null,
        collection_slug: typedRow.collection_slug || null,
        collection_logo: typedRow.collection_logo || null,
        category_name: typedRow.category_name || null,
        category_slug: typedRow.category_slug || null,
        main_image_url: typedRow.main_image_url || null,
      };
    });
}

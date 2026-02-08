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

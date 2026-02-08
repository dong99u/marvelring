'use client';

import { useState, useEffect, useTransition } from 'react';
import { toggleWishlist, checkWishlistStatus } from '@/app/actions/wishlist';

interface WishlistButtonProps {
  productId: string;
  isLoggedIn: boolean;
}

export default function WishlistButton({ productId, isLoggedIn }: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!isLoggedIn) return;

    checkWishlistStatus(productId).then(setIsWishlisted);
  }, [productId, isLoggedIn]);

  const handleToggle = () => {
    if (!isLoggedIn) {
      alert('로그인 후 이용하실 수 있습니다.');
      return;
    }

    // Optimistic update
    setIsWishlisted((prev) => !prev);

    startTransition(async () => {
      try {
        const result = await toggleWishlist(productId);
        setIsWishlisted(result.isWishlisted);
      } catch {
        // Revert optimistic update
        setIsWishlisted((prev) => !prev);
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`border py-3 text-[11px] font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 ${
        isWishlisted
          ? 'border-gold-muted bg-gold-muted/5 text-gold-muted'
          : 'border-gray-200 hover:border-gold-muted text-charcoal-light/60'
      } ${isPending ? 'opacity-50' : ''}`}
    >
      <span className={`material-symbols-outlined text-[14px] ${isWishlisted ? 'fill-icon' : ''}`}>
        favorite
      </span>
      {isWishlisted ? '관심저장됨' : '관심저장'}
    </button>
  );
}

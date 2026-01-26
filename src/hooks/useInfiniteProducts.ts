'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getProducts, GetProductsParams } from '@/app/actions/products';

interface UseInfiniteProductsParams {
  category?: string;
  isNew?: boolean;
  isSale?: boolean;
  sort?: 'latest' | 'name';
  pageSize?: number;
}

export function useInfiniteProducts({
  category,
  isNew,
  isSale,
  sort = 'latest',
  pageSize = 24,
}: UseInfiniteProductsParams) {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState(0);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError(null);

    try {
      const params: GetProductsParams = {
        cursor,
        limit: pageSize,
        category,
        isNew,
        isSale,
        sort,
      };

      const result = await getProducts(params);

      setProducts((prev) => [...prev, ...result.products]);
      setHasMore(result.hasMore);
      setCursor(result.nextCursor || 0);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to load products')
      );
    } finally {
      setIsLoading(false);
    }
  }, [cursor, hasMore, isLoading, pageSize, category, isNew, isSale, sort]);

  // Load initial products
  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading, loadMore]);

  return {
    products,
    isLoading,
    hasMore,
    loadMore,
    error,
    observerTarget,
  };
}

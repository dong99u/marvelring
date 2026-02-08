'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getProducts, GetProductsParams } from '@/app/actions/products';
import { ProductForDisplay } from '@/types/product';

interface UseInfiniteProductsParams {
  category?: string;
  categories?: string;
  materials?: string;
  brand?: string;
  isNew?: boolean;
  isSale?: boolean;
  sort?: 'latest' | 'name';
  pageSize?: number;
}

export function useInfiniteProducts({
  category,
  categories,
  materials,
  brand,
  isNew,
  isSale,
  sort = 'latest',
  pageSize = 24,
}: UseInfiniteProductsParams) {
  const [products, setProducts] = useState<ProductForDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const observerTarget = useRef<HTMLDivElement>(null);

  // loadMore function that doesn't depend on cursor/hasMore/isLoading from closure
  const loadMore = useCallback(async () => {
    // Use functional updates to get the latest state values
    setIsLoading((currentIsLoading) => {
      if (currentIsLoading) {
        return true; // Keep current state
      }
      return true; // Start loading
    });

    try {
      // We need to get the current cursor value, but it's in state
      // Let's refactor to use a ref-based approach
      const currentCursor = cursor;
      const currentHasMore = hasMore;

      if (!currentHasMore) {
        setIsLoading(false);
        return;
      }

      setError(null);

      const params: GetProductsParams = {
        cursor: currentCursor,
        limit: pageSize,
        category,
        categories,
        materials,
        brand,
        isNew,
        isSale,
        sort,
      };

      const result = await getProducts(params);

      setProducts((prev) => [...prev, ...result.products]);
      setHasMore(result.hasMore);
      setCursor(result.nextCursor || 0);
      setTotalCount(result.totalCount);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to load products')
      );
    } finally {
      setIsLoading(false);
    }
  }, [cursor, hasMore, pageSize, category, categories, materials, brand, isNew, isSale, sort]);

  // Reset and load products when filters change
  useEffect(() => {
    // Reset all state
    setProducts([]);
    setCursor(0);
    setHasMore(true);
    setError(null);
    setIsLoading(false);

    // Immediately load with the reset cursor (0)
    // We need to call the server action directly here to avoid stale closure
    const loadInitial = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const params: GetProductsParams = {
          cursor: 0, // Always start from 0 on filter change
          limit: pageSize,
          category,
          categories,
          materials,
          brand,
          isNew,
          isSale,
          sort,
        };

        const result = await getProducts(params);

        setProducts(result.products);
        setHasMore(result.hasMore);
        setCursor(result.nextCursor || 0);
        setTotalCount(result.totalCount);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to load products')
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadInitial();
  }, [category, categories, materials, brand, isNew, isSale, sort, pageSize]);

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
    totalCount,
  };
}

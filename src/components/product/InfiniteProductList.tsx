'use client';

import { useInfiniteProducts } from '@/hooks/useInfiniteProducts';
import ProductGrid from './ProductGrid';
import ProductListHeader from './ProductListHeader';
import ProductSkeleton from './ProductSkeleton';
import EmptyState from './EmptyState';

interface InfiniteProductListProps {
  category?: string;
  categories?: string;
  materials?: string;
  brand?: string;
  isNew?: boolean;
  isSale?: boolean;
  sort?: 'latest' | 'name';
}

export default function InfiniteProductList({
  category,
  categories,
  materials,
  brand,
  isNew,
  isSale,
  sort = 'latest',
}: InfiniteProductListProps) {
  const { products, isLoading, hasMore, error, observerTarget, totalCount } =
    useInfiniteProducts({
      category,
      categories,
      materials,
      brand,
      isNew,
      isSale,
      sort,
      pageSize: 24,
    });

  if (error) {
    return (
      <EmptyState
        message="상품을 불러오는 중 오류가 발생했습니다."
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (products.length === 0 && !isLoading) {
    return <EmptyState />;
  }

  return (
    <div>
      <ProductListHeader title="" totalCount={totalCount} />
      <ProductGrid products={products} />

      {/* Loading skeletons */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Intersection observer target */}
      {hasMore && <div ref={observerTarget} className="h-10" />}
    </div>
  );
}

import { Suspense } from 'react';
import {
  InfiniteProductList,
  ProductFilters,
  ProductSortDropdown,
  ProductListHeader,
  FilterSkeleton,
} from '@/components/product';

interface SearchParams {
  category?: string;
  categories?: string;
  materials?: string;
  sort?: string;
}

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const sort = params.sort === 'name' ? 'name' : 'latest';

  return (
    <div className="flex w-full max-w-[1600px] mx-auto px-6 py-12">
      <aside className="w-[280px] flex-shrink-0 pr-8 hidden md:block border-r border-card-border/50">
        <div className="sticky top-32">
          <h2 className="text-2xl font-light tracking-tight mb-8">주요 컬렉션</h2>
          <Suspense fallback={<FilterSkeleton />}>
            <ProductSortDropdown />
            <ProductFilters />
          </Suspense>
        </div>
      </aside>
      <div className="flex-1 pl-0 md:pl-8">
        <ProductListHeader title="" totalCount={0} />
        <InfiniteProductList category={params.category} sort={sort} />
      </div>
    </div>
  );
}

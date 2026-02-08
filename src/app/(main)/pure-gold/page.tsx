import { Suspense } from 'react';
import {
  InfiniteProductList,
  ProductSortDropdown,
  FilterSkeleton,
} from '@/components/product';

interface SearchParams {
  categories?: string;
  sort?: string;
}

export default async function PureGoldPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const sort = params.sort === 'name' ? 'name' : 'latest';
  const filterKey = `pure-gold-${params.categories || ''}-${sort}`;

  return (
    <div className="flex w-full max-w-[1600px] mx-auto px-6 py-12">
      <aside className="w-[280px] flex-shrink-0 pr-8 hidden md:block border-r border-card-border/50">
        <div className="sticky top-32">
          <h2 className="text-2xl font-light tracking-tight mb-8">순금</h2>
          <Suspense fallback={<FilterSkeleton />}>
            <ProductSortDropdown />
          </Suspense>
        </div>
      </aside>
      <div className="flex-1 pl-0 md:pl-8">
        <InfiniteProductList
          key={filterKey}
          pureGoldOnly={true}
          categories={params.categories}
          sort={sort}
        />
      </div>
    </div>
  );
}

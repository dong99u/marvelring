'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function ProductSortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'latest';

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mb-10">
      <h3 className="text-sm font-bold tracking-widest text-charcoal-light mb-4">
        정렬 기준
      </h3>
      <div className="relative">
        <select
          value={currentSort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full border-b border-gray-200 border-t-0 border-x-0 bg-transparent py-2 pl-0 pr-8 text-sm text-charcoal-light focus:border-gold-muted focus:ring-0 cursor-pointer"
        >
          <option value="latest">최신순</option>
          <option value="popular">인기순</option>
          <option value="name">상품명순</option>
        </select>
      </div>
    </div>
  );
}

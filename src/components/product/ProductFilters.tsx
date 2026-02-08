'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface FilterOption {
  value: string;
  label: string;
}

const categoryOptions: FilterOption[] = [
  { value: 'all', label: '전체보기' },
  { value: 'ring', label: '반지' },
  { value: 'necklace', label: '목걸이' },
  { value: 'earring', label: '귀걸이' },
  { value: 'bracelet', label: '팔찌' },
];

const materialOptions: FilterOption[] = [
  { value: '14K', label: '14K 골드' },
  { value: '18K', label: '18K 골드' },
  { value: 'WHITE_GOLD', label: '화이트 골드' },
  { value: 'ROSE_GOLD', label: '로즈 골드' },
];

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategories =
    searchParams.get('categories')?.split(',') || ['all'];
  const selectedMaterials = searchParams.get('materials')?.split(',') || [];

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let categories = [...selectedCategories];

    if (value === 'all') {
      categories = ['all'];
    } else {
      categories = categories.filter((c) => c !== 'all');
      if (categories.includes(value)) {
        categories = categories.filter((c) => c !== value);
      } else {
        categories.push(value);
      }
      if (categories.length === 0) {
        categories = ['all'];
      }
    }

    params.set('categories', categories.join(','));
    router.push(`?${params.toString()}`);
  };

  const handleMaterialChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let materials = [...selectedMaterials];

    if (materials.includes(value)) {
      materials = materials.filter((m) => m !== value);
    } else {
      materials.push(value);
    }

    if (materials.length === 0) {
      params.delete('materials');
    } else {
      params.set('materials', materials.join(','));
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <div className="mb-10">
        <h3 className="text-sm font-bold tracking-widest text-charcoal-light mb-6">
          카테고리
        </h3>
        <div className="space-y-3">
          {categoryOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(option.value)}
                onChange={() => handleCategoryChange(option.value)}
                className="form-checkbox h-4 w-4 text-gold-muted border-gray-300 rounded-none focus:ring-gold-muted/50"
              />
              <span className="text-sm text-charcoal-light/70 group-hover:text-gold-muted transition-colors">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-10">
        <h3 className="text-sm font-bold tracking-widest text-charcoal-light mb-6">
          소재
        </h3>
        <div className="space-y-3">
          {materialOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedMaterials.includes(option.value)}
                onChange={() => handleMaterialChange(option.value)}
                className="form-checkbox h-4 w-4 text-gold-muted border-gray-300 rounded-none focus:ring-gold-muted/50"
              />
              <span className="text-sm text-charcoal-light/70 group-hover:text-gold-muted transition-colors">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
}

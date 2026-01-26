'use client';

import { Grid, List } from 'lucide-react';

interface ProductListHeaderProps {
  title: string;
  totalCount: number;
}

export default function ProductListHeader({
  title,
  totalCount,
}: ProductListHeaderProps) {
  return (
    <div className="flex justify-between items-end mb-8 border-b border-card-border pb-4">
      {title && <h2 className="text-2xl font-light tracking-tight">{title}</h2>}
      <span className="text-sm text-charcoal-light/50">
        총 {totalCount}개의 상품이 있습니다
      </span>
      <div className="flex gap-2 text-charcoal-light/40">
        <button className="hover:text-gold-muted cursor-pointer transition-colors">
          <Grid size={20} />
        </button>
        <button className="hover:text-gold-muted cursor-pointer transition-colors">
          <List size={20} />
        </button>
      </div>
    </div>
  );
}

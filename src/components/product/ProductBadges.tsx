/**
 * Product Badges Component
 * Displays NEW and SALE badges based on product properties
 */

import Badge from '@/components/ui/Badge';
import { isNewProduct } from '@/lib/utils/product';

interface ProductBadgesProps {
  createdAt: string;
  isSale: boolean;
  className?: string;
}

export default function ProductBadges({
  createdAt,
  isSale,
  className = '',
}: ProductBadgesProps) {
  const isNew = isNewProduct(createdAt);

  // Don't render if no badges to show
  if (!isNew && !isSale) {
    return null;
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      {isNew && (
        <Badge variant="new" size="sm">
          NEW
        </Badge>
      )}
      {isSale && (
        <Badge variant="sale" size="sm">
          SALE
        </Badge>
      )}
    </div>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import ProductBadges from '@/components/product/ProductBadges';
import PriceDisplay from '@/components/product/PriceDisplay';
import { useAuth } from '@/hooks/useAuth';
import { isVideoUrl } from '@/lib/utils/media';
import type { ProductForDisplay } from '@/types/product';

export interface ProductCardProps {
  product: ProductForDisplay;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { user, member } = useAuth();

  const isLoggedIn = !!user;
  const isApproved = member?.approval_status === 'APPROVED';

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col bg-white border border-card-border p-3 md:p-4 hover:shadow-lg transition-all duration-300 min-h-[300px]"
    >
      <div className="relative w-full aspect-square bg-marble-grey mb-4 md:mb-6 overflow-hidden">
        {product.main_image_url ? (
          isVideoUrl(product.main_image_url) ? (
            <video
              src={product.main_image_url}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <Image
              src={product.main_image_url}
              alt={product.product_name}
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center text-charcoal-light/20 text-sm">
            No Image
          </div>
        )}
        <div className="absolute top-2 left-2 md:top-4 md:left-4">
          <ProductBadges
            createdAt={product.created_at}
            isSale={product.is_sale}
          />
        </div>
      </div>
      <div className="text-center flex-1 flex flex-col justify-center">
        <h3 className="text-base md:text-lg font-bold text-charcoal-light mb-1 md:mb-2 line-clamp-2">
          {product.product_name}
        </h3>
        <p className="text-xs md:text-sm text-gray-400 font-light tracking-wide mb-2 md:mb-3">
          REF. {product.product_code}
        </p>
        <PriceDisplay
          price={product.price}
          isLoggedIn={isLoggedIn}
          isApproved={isApproved}
          isSale={product.is_sale}
        />
      </div>
    </Link>
  );
}

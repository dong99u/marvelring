/**
 * Related Products Component
 * Shows 4-column grid of recommended products
 */

import Image from 'next/image';
import Link from 'next/link';

interface RelatedProduct {
  id: string;
  product_name: string;
  product_code: string;
  main_image_url: string | null;
  weight: number | null;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-marble-grey py-24 px-6 md:px-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[11px] text-gold-muted font-bold uppercase tracking-[0.2em] block mb-3">
              Recommendation
            </span>
            <h3 className="text-2xl font-light text-charcoal-light">
              함께 보시면 좋은 B2B 전용 상품
            </h3>
          </div>
          <Link
            href="/products"
            className="hidden md:flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-charcoal-light/60 hover:text-charcoal-light group"
          >
            전체보기{' '}
            <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group cursor-pointer block min-h-0"
            >
              <div className="aspect-[3/4] overflow-hidden bg-white mb-5 relative shadow-sm">
                {product.main_image_url ? (
                  <Image
                    src={product.main_image_url}
                    alt={product.product_name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400 text-sm">No Image</span>
                  </div>
                )}
              </div>
              <h4 className="text-[14px] font-medium text-charcoal-light mb-1">
                {product.product_name}
              </h4>
              <p className="text-[13px] text-charcoal-light/50 font-light">
                {product.weight ? `중량 ${product.weight}g` : product.product_code}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

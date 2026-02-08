import { getWishlistProducts } from '@/app/actions/wishlist';
import ProductGrid from '@/components/product/ProductGrid';
import type { ProductForDisplay } from '@/types/product';

export const metadata = {
  title: '관심 저장 | MARVELRING',
  description: '관심 저장한 상품 목록',
};

export default async function WishlistPage() {
  const products = (await getWishlistProducts()) as ProductForDisplay[];

  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 py-12">
      <h1 className="text-2xl font-light tracking-tight mb-8">관심 저장</h1>
      {products.length > 0 ? (
        <>
          <p className="text-sm text-charcoal-light/60 mb-6">
            {products.length}개의 상품
          </p>
          <ProductGrid products={products} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="material-symbols-rounded text-5xl text-charcoal-light/20 mb-4">
            favorite
          </span>
          <p className="text-charcoal-light/60 mb-2">
            관심 저장한 상품이 없습니다
          </p>
          <p className="text-sm text-charcoal-light/40">
            상품 상세 페이지에서 하트를 눌러 관심 상품을 저장해보세요
          </p>
        </div>
      )}
    </div>
  );
}

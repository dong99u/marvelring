/**
 * Product Detail Component
 * Main component orchestrating product detail page layout
 */

import { ProductForDisplay } from '@/types/product';
import Breadcrumb from './Breadcrumb';
import ImageGallery from './ImageGallery';
import ProductInfo from './ProductInfo';
import RelatedProducts from './RelatedProducts';

interface ProductDetailProps {
  product: ProductForDisplay;
  images: string[];
  relatedProducts: ProductForDisplay[];
  isLoggedIn: boolean;
  isApproved: boolean;
}

export default function ProductDetail({
  product,
  images,
  relatedProducts,
  isLoggedIn,
  isApproved,
}: ProductDetailProps) {
  // Build breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    ...(product.category_name
      ? [{ label: product.category_name, href: `/category/${product.category_slug}` }]
      : []),
    ...(product.brand_name
      ? [{ label: product.brand_name }]
      : []),
  ];

  // Format images array
  const displayImages = images.length > 0 ? images : [product.main_image_url || '/placeholder.jpg'];

  return (
    <>
      {/* Breadcrumb */}
      <div className="w-full max-w-7xl px-6 md:px-10 py-8">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Main Product Section */}
      <section className="w-full max-w-7xl px-6 md:px-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <ImageGallery images={displayImages} productName={product.product_name} />
          <ProductInfo
            productId={product.id}
            product={product}
            diamondInfo={{
              diamond_size: undefined, // TODO: Add to schema if needed
              diamond_amount: undefined,
            }}
            isLoggedIn={isLoggedIn}
            isApproved={isApproved}
          />
        </div>
      </section>

      {/* Related Products */}
      <RelatedProducts
        products={relatedProducts.map((p) => ({
          id: p.id,
          product_name: p.product_name,
          product_code: p.product_code,
          main_image_url: p.main_image_url || null,
          weight: p.weight,
        }))}
      />
    </>
  );
}

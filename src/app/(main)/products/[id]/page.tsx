/**
 * Product Detail Page
 * Dynamic route for individual product display
 */

import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getProductByIdForUser, getProductsForUser } from '@/lib/supabase/products';
import ProductDetail from '@/components/product/ProductDetail';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params;

  // Fetch product data
  const product = await getProductByIdForUser(id);

  if (!product) {
    notFound();
  }

  // Fetch product images
  const supabase = await createClient();
  const { data: imageData } = await supabase
    .from('product_images')
    .select('image_url, sort_order')
    .eq('product_id', id)
    .order('sort_order', { ascending: true });

  const images = imageData?.map((img) => img.image_url) || [];

  // Fetch related products (same category, exclude current)
  const { products: relatedProducts } = await getProductsForUser({
    category: product.category_slug || undefined,
    limit: 4,
  });

  const filteredRelated = relatedProducts.filter((p) => p.id !== id).slice(0, 4);

  // Check auth status
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isApproved = false;
  if (user) {
    const { data: memberData } = await supabase
      .from('member')
      .select('approval_status')
      .eq('email', user.email)
      .single();

    isApproved = memberData?.approval_status === 'APPROVED';
  }

  return (
    <main className="flex flex-1 flex-col items-center w-full">
      <ProductDetail
        product={product}
        images={images}
        relatedProducts={filteredRelated}
        isLoggedIn={!!user}
        isApproved={isApproved}
      />
    </main>
  );
}

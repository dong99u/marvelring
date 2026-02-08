/**
 * Product Detail Page
 * Dynamic route for individual product display
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getProductByIdForUser, getProductsForUser } from '@/lib/supabase/products-server';
import { getSiteUrl } from '@/lib/site-url';
import type { ProductForDisplay } from '@/types/product';
import ProductDetail from '@/components/product/ProductDetail';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

function toAbsoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  return new URL(pathOrUrl, getSiteUrl()).toString();
}

function buildDescription(product: ProductForDisplay): string {
  const source =
    product.description ||
    product.additional_information ||
    `${product.product_name} (${product.product_code}) 상세 정보`;

  return source.replace(/\s+/g, ' ').trim().slice(0, 160);
}

function toJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductByIdForUser(id);

  if (!product) {
    return {
      title: '상품을 찾을 수 없습니다 | 마블링 B2B',
      robots: { index: false, follow: false },
    };
  }

  const title = `${product.product_name} | 마블링 B2B`;
  const description = buildDescription(product);
  const canonicalPath = `/products/${product.id}`;
  const ogImage = toAbsoluteUrl(product.main_image_url || '/placeholder.jpg');

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      siteName: '마블링 B2B',
      title,
      description,
      url: canonicalPath,
      images: [
        {
          url: ogImage,
          alt: product.product_name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  // Fetch product data
  const product = await getProductByIdForUser(id);

  if (!product) {
    notFound();
  }

  // Fetch product images
  const supabase = await createClient();
  const { data: imageData } = await supabase
    .from('product_image')
    .select('image_url, display_order')
    .eq('product_id', parseInt(id, 10))
    .order('display_order', { ascending: true });

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

  const productUrl = toAbsoluteUrl(`/products/${product.id}`);
  const productImages =
    images.length > 0 ? images.map((image) => toAbsoluteUrl(image)) : [];
  const fallbackImage = toAbsoluteUrl(product.main_image_url || '/placeholder.jpg');

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.product_name,
    sku: product.product_code,
    description: buildDescription(product),
    image: productImages.length > 0 ? productImages : [fallbackImage],
    brand: product.brand_name
      ? {
          '@type': 'Brand',
          name: product.brand_name,
        }
      : undefined,
    category: product.category_name || undefined,
    offers:
      product.price !== null
        ? {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'KRW',
            url: productUrl,
          }
        : undefined,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '홈',
        item: toAbsoluteUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '컬렉션',
        item: toAbsoluteUrl('/collections'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.product_name,
        item: productUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }}
      />
      <main className="flex flex-1 flex-col items-center w-full">
        <ProductDetail
          product={product}
          images={images}
          relatedProducts={filteredRelated}
          isLoggedIn={!!user}
          isApproved={isApproved}
        />
      </main>
    </>
  );
}

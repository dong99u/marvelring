/**
 * Admin Product Edit Page
 * Server component that fetches product data and renders edit form
 */

import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { fetchProductMaterialInfo, fetchProductDiamondInfo, fetchProductImages } from '@/app/actions/admin'
import ProductEditForm from './ProductEditForm'
import type { Product, Category, Collection } from '@/types/database'

interface ProductWithRelations extends Product {
  category: Category | null
  collection: Collection | null
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProductEditPage({ params }: PageProps) {
  const resolvedParams = await params
  const productId = Number(resolvedParams.id)

  if (isNaN(productId)) {
    notFound()
  }

  const supabase = await createClient()

  // Fetch product with relations
  const { data: product, error: productError } = await supabase
    .from('product')
    .select(
      `
      *,
      category:category_id(
        category_id,
        category_name,
        slug,
        display_order,
        created_at,
        updated_at
      ),
      collection:collection_id(
        collection_id,
        brand_name,
        slug,
        logo_image_url,
        display_order,
        created_at,
        updated_at
      )
    `
    )
    .eq('product_id', productId)
    .single()

  if (productError || !product) {
    notFound()
  }

  // Fetch all categories for dropdown
  const { data: categories, error: categoriesError } = await supabase
    .from('category')
    .select('*')
    .order('display_order', { ascending: true })

  if (categoriesError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">상품 수정</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">
            카테고리 목록을 불러오는데 실패했습니다: {categoriesError.message}
          </p>
        </div>
      </div>
    )
  }

  // Fetch all collections for dropdown
  const { data: collections, error: collectionsError } = await supabase
    .from('collection')
    .select('*')
    .order('display_order', { ascending: true })

  if (collectionsError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">상품 수정</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">
            컬렉션 목록을 불러오는데 실패했습니다: {collectionsError.message}
          </p>
        </div>
      </div>
    )
  }

  // Fetch material info
  const materialResult = await fetchProductMaterialInfo(product.product_id)
  const materialInfo = materialResult.success ? materialResult.data : []

  // Fetch diamond info
  const diamondResult = await fetchProductDiamondInfo(product.product_id)
  const diamondInfo = diamondResult.success ? diamondResult.data : []

  // Fetch product images
  const imageResult = await fetchProductImages(product.product_id)
  const productImages = imageResult.success ? imageResult.data : []

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">상품 수정</h1>
      <ProductEditForm
        product={product as ProductWithRelations}
        categories={categories || []}
        collections={collections || []}
        materialInfo={materialInfo || []}
        diamondInfo={diamondInfo || []}
        productImages={productImages || []}
      />
    </div>
  )
}

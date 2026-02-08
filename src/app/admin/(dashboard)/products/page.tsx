/**
 * Admin Products Page - Product List & Management
 * Server component that displays products in a table with search and pagination
 */

import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import ProductDeleteButton from './ProductDeleteButton'

interface Product {
  product_id: number
  product_code: string
  product_name: string
  retail_price: number
  wholesale_price: number
  status: 'ACTIVE' | 'INACTIVE'
  is_new: boolean
  is_sale: boolean
  category: { category_name: string } | null
  collection: { brand_name: string } | null
  images: { image_url: string; is_main: boolean }[]
}

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>
}) {
  const supabase = await createClient()
  const params = await searchParams
  const page = Number(params.page) || 1
  const search = params.search || ''
  const limit = 20
  const offset = (page - 1) * limit

  // Build query
  let query = supabase
    .from('product')
    .select(
      `
      *,
      category:category_id(category_name),
      collection:collection_id(brand_name),
      images:product_image(image_url, is_main)
    `,
      { count: 'exact' }
    )
    .order('created_at', { ascending: false })

  // Add search filter
  if (search) {
    query = query.or(`product_name.ilike.%${search}%,product_code.ilike.%${search}%`)
  }

  // Add pagination
  query = query.range(offset, offset + limit - 1)

  const { data: products, error, count } = await query

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">상품 관리</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">오류: {error.message}</p>
        </div>
      </div>
    )
  }

  const totalPages = count ? Math.ceil(count / limit) : 0

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">상품 관리</h1>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          상품 추가
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <form method="get" className="flex gap-2">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="상품명 또는 상품코드로 검색..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            검색
          </button>
          {search && (
            <Link
              href="/admin/products"
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              초기화
            </Link>
          )}
        </form>
      </div>

      {/* Results count */}
      {count !== null && (
        <p className="text-gray-600 mb-4">
          총 {count}개의 상품 {search && `(검색 결과)`}
        </p>
      )}

      {/* Table */}
      {products && products.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이미지
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상품명
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상품코드
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    카테고리
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    컬렉션
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    소매가
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    도매가
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product: Product) => {
                  const mainImage = product.images?.find((img) => img.is_main)
                  const imageUrl = mainImage?.image_url || product.images?.[0]?.image_url

                  return (
                    <tr
                      key={product.product_id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* Image */}
                      <td className="px-4 py-4">
                        <div className="w-16 h-16 relative bg-gray-100 rounded-lg overflow-hidden">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={product.product_name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                              NO IMAGE
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Product Name */}
                      <td className="px-4 py-4">
                        <Link
                          href={`/admin/products/${product.product_id}/edit`}
                          className="font-medium text-gray-900 hover:text-gray-600 transition-colors"
                        >
                          {product.product_name}
                        </Link>
                      </td>

                      {/* Product Code */}
                      <td className="px-4 py-4">
                        <span className="text-sm text-gray-600 font-mono">
                          {product.product_code}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-4">
                        <span className="text-sm text-gray-600">
                          {product.category?.category_name || '-'}
                        </span>
                      </td>

                      {/* Collection */}
                      <td className="px-4 py-4">
                        <span className="text-sm text-gray-600">
                          {product.collection?.brand_name || '-'}
                        </span>
                      </td>

                      {/* Retail Price */}
                      <td className="px-4 py-4 text-right">
                        <span className="text-sm font-medium text-gray-900">
                          ₩{product.retail_price.toLocaleString()}
                        </span>
                      </td>

                      {/* Wholesale Price */}
                      <td className="px-4 py-4 text-right">
                        <span className="text-sm font-medium text-gray-900">
                          ₩{product.wholesale_price.toLocaleString()}
                        </span>
                      </td>

                      {/* Status Badges */}
                      <td className="px-4 py-4">
                        <div className="flex gap-1 justify-center">
                          {product.is_new && (
                            <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
                              NEW
                            </span>
                          )}
                          {product.is_sale && (
                            <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded">
                              SALE
                            </span>
                          )}
                          {product.status === 'INACTIVE' && (
                            <span className="px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-800 rounded">
                              비활성
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4">
                        <div className="flex gap-2 justify-center">
                          <Link
                            href={`/admin/products/${product.product_id}/edit`}
                            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                          >
                            수정
                          </Link>
                          <ProductDeleteButton
                            productId={product.product_id}
                            productName={product.product_name}
                          />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600">
            {search ? '검색 결과가 없습니다.' : '등록된 상품이 없습니다.'}
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {/* Previous */}
          {page > 1 && (
            <Link
              href={`?page=${page - 1}${search ? `&search=${search}` : ''}`}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              이전
            </Link>
          )}

          {/* Page numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum
            if (totalPages <= 5) {
              pageNum = i + 1
            } else if (page <= 3) {
              pageNum = i + 1
            } else if (page >= totalPages - 2) {
              pageNum = totalPages - 4 + i
            } else {
              pageNum = page - 2 + i
            }

            return (
              <Link
                key={pageNum}
                href={`?page=${pageNum}${search ? `&search=${search}` : ''}`}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  page === pageNum
                    ? 'bg-black text-white'
                    : 'bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </Link>
            )
          })}

          {/* Next */}
          {page < totalPages && (
            <Link
              href={`?page=${page + 1}${search ? `&search=${search}` : ''}`}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              다음
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

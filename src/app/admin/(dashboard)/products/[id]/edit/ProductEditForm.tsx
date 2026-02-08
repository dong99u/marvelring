'use client'

/**
 * Product Edit Form - Client Component
 * Pre-populated form for editing existing products
 */

import React, { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { updateProduct } from '@/app/actions/admin'
import type { Product, Category, Collection } from '@/types/database'

interface ProductWithRelations extends Product {
  category: Category | null
  collection: Collection | null
}

interface ProductEditFormProps {
  product: ProductWithRelations
  categories: Category[]
  collections: Collection[]
  materialInfo: Array<{ material_type: string; weight: number | null }>
  diamondInfo: Array<{ diamond_size: number; diamond_amount: number }>
}

export default function ProductEditForm({
  product,
  categories,
  collections,
  materialInfo,
  diamondInfo,
}: ProductEditFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const [checkedMaterials, setCheckedMaterials] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = { '14K': false, '18K': false, '24K': false }
    materialInfo.forEach((m) => { initial[m.material_type] = true })
    return initial
  })

  const [materialWeights, setMaterialWeights] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = { '14K': '', '18K': '', '24K': '' }
    materialInfo.forEach((m) => { initial[m.material_type] = m.weight?.toString() || '' })
    return initial
  })

  const [diamondRows, setDiamondRows] = useState<Array<{ size: string; amount: string }>>(() =>
    diamondInfo.map((d) => ({
      size: d.diamond_size.toString(),
      amount: d.diamond_amount.toString(),
    }))
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await updateProduct(product.product_id, formData)

      if (result.success) {
        router.push('/admin/products')
        router.refresh()
      } else {
        setError(result.error || '상품 수정에 실패했습니다.')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b border-gray-200 pb-2">
            기본 정보
          </h2>

          {/* Product Name */}
          <div>
            <label
              htmlFor="product_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              상품명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="product_name"
              name="product_name"
              required
              defaultValue={product.product_name}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Product Code */}
          <div>
            <label
              htmlFor="product_code"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              상품코드 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="product_code"
              name="product_code"
              required
              defaultValue={product.product_code}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-mono"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              카테고리 <span className="text-red-500">*</span>
            </label>
            <select
              id="category_id"
              name="category_id"
              required
              defaultValue={product.category_id}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">카테고리 선택</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* Collection */}
          <div>
            <label
              htmlFor="collection_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              컬렉션 (선택사항)
            </label>
            <select
              id="collection_id"
              name="collection_id"
              defaultValue={product.collection_id || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">컬렉션 없음</option>
              {collections.map((collection) => (
                <option
                  key={collection.collection_id}
                  value={collection.collection_id}
                >
                  {collection.brand_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b border-gray-200 pb-2">
            가격 정보
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {/* Retail Price */}
            <div>
              <label
                htmlFor="retail_price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                소매가 <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="retail_price"
                name="retail_price"
                required
                min="0"
                step="1000"
                defaultValue={product.retail_price}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Wholesale Price */}
            <div>
              <label
                htmlFor="wholesale_price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                도매가 <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="wholesale_price"
                name="wholesale_price"
                required
                min="0"
                step="1000"
                defaultValue={product.wholesale_price}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Sale Price */}
          <div>
            <label
              htmlFor="sale_price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              세일가 (선택사항)
            </label>
            <input
              type="number"
              id="sale_price"
              name="sale_price"
              min="0"
              step="1000"
              defaultValue={product.sale_price || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b border-gray-200 pb-2">
            상품 상세
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {/* Base Labor Cost */}
            <div>
              <label
                htmlFor="base_labor_cost"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                기본 공임비
              </label>
              <input
                type="number"
                id="base_labor_cost"
                name="base_labor_cost"
                min="0"
                step="1000"
                defaultValue={product.base_labor_cost || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Stone Setting Cost */}
            <div>
              <label
                htmlFor="stone_setting_cost"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                스톤 세팅 비용
              </label>
              <input
                type="number"
                id="stone_setting_cost"
                name="stone_setting_cost"
                min="0"
                step="1000"
                defaultValue={product.stone_setting_cost || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Weight */}
            <div>
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                무게 (g)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                min="0"
                step="0.01"
                defaultValue={product.weight || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Ring Size */}
            <div>
              <label
                htmlFor="ring_size"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                반지 사이즈
              </label>
              <input
                type="number"
                id="ring_size"
                name="ring_size"
                min="0"
                step="0.5"
                defaultValue={product.ring_size || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Size */}
            <div>
              <label
                htmlFor="size"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                사이즈
              </label>
              <input
                type="number"
                id="size"
                name="size"
                min="0"
                step="0.1"
                defaultValue={product.size || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* 소재 정보 */}
          <div className="pt-4">
            <h3 className="text-base font-semibold mb-2">소재 정보</h3>
            <p className="text-sm text-gray-500 mb-4">지원하는 K수를 선택하고 각각의 중량을 입력하세요.</p>

            <div className="space-y-4">
              {(['14K', '18K', '24K'] as const).map((karat) => (
                <div key={karat} className="flex items-center gap-4">
                  <label className="flex items-center gap-2 w-24">
                    <input
                      type="checkbox"
                      checked={checkedMaterials[karat]}
                      onChange={(e) => {
                        setCheckedMaterials((prev) => ({ ...prev, [karat]: e.target.checked }))
                        if (!e.target.checked) {
                          setMaterialWeights((prev) => ({ ...prev, [karat]: '' }))
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm font-medium">{karat}</span>
                  </label>
                  {checkedMaterials[karat] && (
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600">중량:</label>
                      <input
                        type="number"
                        value={materialWeights[karat]}
                        onChange={(e) => {
                          setMaterialWeights((prev) => ({ ...prev, [karat]: e.target.value }))
                        }}
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        className="w-32 px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                      <span className="text-sm text-gray-500">g</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hidden inputs for material data */}
          {(['14K', '18K', '24K'] as const).map((karat) => (
            <React.Fragment key={`hidden-${karat}`}>
              <input type="hidden" name={`material_${karat}`} value={String(checkedMaterials[karat])} />
              {checkedMaterials[karat] && materialWeights[karat] && (
                <input type="hidden" name={`material_weight_${karat}`} value={materialWeights[karat]} />
              )}
            </React.Fragment>
          ))}

          {/* 다이아 정보 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">다이아 정보</h2>
            <p className="text-sm text-gray-500 mb-4">다이아몬드가 포함된 제품인 경우 사이즈와 수량을 입력하세요.</p>

            <div className="space-y-3">
              {diamondRows.map((row, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 w-16">사이즈:</label>
                    <input
                      type="number"
                      value={row.size}
                      onChange={(e) => {
                        setDiamondRows((prev) =>
                          prev.map((r, i) => (i === index ? { ...r, size: e.target.value } : r))
                        )
                      }}
                      step="0.001"
                      min="0"
                      placeholder="0.000"
                      className="w-28 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                    <span className="text-sm text-gray-500">ct</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 w-12">수량:</label>
                    <input
                      type="number"
                      value={row.amount}
                      onChange={(e) => {
                        setDiamondRows((prev) =>
                          prev.map((r, i) => (i === index ? { ...r, amount: e.target.value } : r))
                        )
                      }}
                      step="1"
                      min="1"
                      placeholder="0"
                      className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                    <span className="text-sm text-gray-500">개</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDiamondRows((prev) => prev.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setDiamondRows((prev) => [...prev, { size: '', amount: '' }])}
              className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
            >
              + 다이아 추가
            </button>
          </div>

          {/* Hidden inputs for diamond data */}
          <input type="hidden" name="diamond_count" value={String(diamondRows.length)} />
          {diamondRows.map((row, index) => (
            <React.Fragment key={`diamond-hidden-${index}`}>
              {row.size && row.amount && (
                <>
                  <input type="hidden" name={`diamond_size_${index}`} value={row.size} />
                  <input type="hidden" name={`diamond_amount_${index}`} value={row.amount} />
                </>
              )}
            </React.Fragment>
          ))}

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              상품 설명
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={product.description || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
          </div>

          {/* Additional Information */}
          <div>
            <label
              htmlFor="additional_information"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              추가 정보
            </label>
            <textarea
              id="additional_information"
              name="additional_information"
              rows={4}
              defaultValue={product.additional_information || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
          </div>
        </div>

        {/* Status Flags */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b border-gray-200 pb-2">
            상태 설정
          </h2>

          <div className="space-y-3">
            {/* Is New */}
            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_new"
                value="true"
                defaultChecked={product.is_new}
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-2 focus:ring-black"
              />
              <span className="ml-2 text-sm text-gray-700">신상품</span>
            </label>

            {/* Is Sale */}
            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_sale"
                value="true"
                defaultChecked={product.is_sale}
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-2 focus:ring-black"
              />
              <span className="ml-2 text-sm text-gray-700">세일 상품</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isPending ? '저장 중...' : '수정 완료'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isPending}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            취소
          </button>
        </div>
      </div>
    </form>
  )
}

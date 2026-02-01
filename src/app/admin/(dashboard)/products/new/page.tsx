'use client'

/**
 * Product Create Page
 * Client component for creating new products
 */

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  createProduct,
  fetchCategories,
  fetchCollections,
} from '@/app/actions/admin'
import type { Category, Collection } from '@/types/database'

export default function NewProductPage() {
  const router = useRouter()

  // Form state
  const [formData, setFormData] = useState({
    product_name: '',
    product_code: '',
    category_id: '',
    collection_id: '',
    base_labor_cost: '',
    stone_setting_cost: '',
    weight: '',
    ring_size: '',
    size: '',
    description: '',
    additional_information: '',
    retail_price: '',
    wholesale_price: '',
    sale_price: '',
    is_sale: false,
    is_new: false,
  })

  // Options state
  const [categories, setCategories] = useState<Category[]>([])
  const [collections, setCollections] = useState<Collection[]>([])

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch categories and collections on mount
  useEffect(() => {
    async function loadOptions() {
      setIsLoading(true)
      try {
        const [categoriesResult, collectionsResult] = await Promise.all([
          fetchCategories(),
          fetchCollections(),
        ])

        if (categoriesResult.success && categoriesResult.data) {
          setCategories(categoriesResult.data)
        }

        if (collectionsResult.success && collectionsResult.data) {
          setCollections(collectionsResult.data)
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load form options'
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadOptions()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Create FormData for server action
      const formDataObj = new FormData()

      // Add required fields
      formDataObj.append('product_name', formData.product_name)
      formDataObj.append('product_code', formData.product_code)
      formDataObj.append('category_id', formData.category_id)
      formDataObj.append('retail_price', formData.retail_price)
      formDataObj.append('wholesale_price', formData.wholesale_price)

      // Add optional fields only if they have values
      if (formData.collection_id) {
        formDataObj.append('collection_id', formData.collection_id)
      }
      if (formData.base_labor_cost) {
        formDataObj.append('base_labor_cost', formData.base_labor_cost)
      }
      if (formData.stone_setting_cost) {
        formDataObj.append('stone_setting_cost', formData.stone_setting_cost)
      }
      if (formData.weight) {
        formDataObj.append('weight', formData.weight)
      }
      if (formData.ring_size) {
        formDataObj.append('ring_size', formData.ring_size)
      }
      if (formData.size) {
        formDataObj.append('size', formData.size)
      }
      if (formData.description) {
        formDataObj.append('description', formData.description)
      }
      if (formData.additional_information) {
        formDataObj.append(
          'additional_information',
          formData.additional_information
        )
      }
      if (formData.sale_price) {
        formDataObj.append('sale_price', formData.sale_price)
      }

      // Add boolean fields
      formDataObj.append('is_sale', formData.is_sale.toString())
      formDataObj.append('is_new', formData.is_new.toString())

      const result = await createProduct(formDataObj)

      if (!result.success) {
        setError(result.error || 'Failed to create product')
        setIsSubmitting(false)
        return
      }

      // Success - redirect to products list
      router.push('/admin/products')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">새 상품 등록</h1>
        <p className="text-gray-600 mt-2">상품 정보를 입력하여 등록하세요.</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            기본 정보
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="product_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                상품명 *
              </label>
              <input
                type="text"
                id="product_name"
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                placeholder="예: 다이아몬드 반지"
              />
            </div>

            <div>
              <label
                htmlFor="product_code"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                상품코드 *
              </label>
              <input
                type="text"
                id="product_code"
                name="product_code"
                value={formData.product_code}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 font-mono text-sm"
                placeholder="예: RNG-001"
              />
            </div>

            <div>
              <label
                htmlFor="category_id"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                카테고리 *
              </label>
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              >
                <option value="">카테고리 선택</option>
                {categories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="collection_id"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                컬렉션
              </label>
              <select
                id="collection_id"
                name="collection_id"
                value={formData.collection_id}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              >
                <option value="">컬렉션 선택 (선택사항)</option>
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
        </div>

        {/* Specifications Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            상품 사양
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="base_labor_cost"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                기본공임 (원)
              </label>
              <input
                type="number"
                id="base_labor_cost"
                name="base_labor_cost"
                value={formData.base_labor_cost}
                onChange={handleChange}
                min="0"
                step="1000"
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                placeholder="0"
              />
            </div>

            <div>
              <label
                htmlFor="stone_setting_cost"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                알공임 (원)
              </label>
              <input
                type="number"
                id="stone_setting_cost"
                name="stone_setting_cost"
                value={formData.stone_setting_cost}
                onChange={handleChange}
                min="0"
                step="1000"
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                placeholder="0"
              />
            </div>

            <div>
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                중량 (g)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                min="0"
                step="0.01"
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                placeholder="0.00"
              />
            </div>

            <div>
              <label
                htmlFor="ring_size"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                반지 호수
              </label>
              <input
                type="number"
                id="ring_size"
                name="ring_size"
                value={formData.ring_size}
                onChange={handleChange}
                min="0"
                step="0.5"
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                placeholder="예: 13"
              />
            </div>

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
                value={formData.size}
                onChange={handleChange}
                min="0"
                step="0.1"
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                placeholder="예: 55"
              />
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            상품 설명
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                설명
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                placeholder="상품에 대한 상세 설명을 입력하세요."
              />
            </div>

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
                value={formData.additional_information}
                onChange={handleChange}
                rows={3}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                placeholder="관리 방법, 주의사항 등 추가 정보를 입력하세요."
              />
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">가격 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="retail_price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                소매가 (원) *
              </label>
              <input
                type="number"
                id="retail_price"
                name="retail_price"
                value={formData.retail_price}
                onChange={handleChange}
                required
                min="0"
                step="1000"
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                placeholder="0"
              />
            </div>

            <div>
              <label
                htmlFor="wholesale_price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                도매가 (원) *
              </label>
              <input
                type="number"
                id="wholesale_price"
                name="wholesale_price"
                value={formData.wholesale_price}
                onChange={handleChange}
                required
                min="0"
                step="1000"
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                placeholder="0"
              />
            </div>

            <div>
              <label
                htmlFor="sale_price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                세일가 (원)
              </label>
              <input
                type="number"
                id="sale_price"
                name="sale_price"
                value={formData.sale_price}
                onChange={handleChange}
                min="0"
                step="1000"
                disabled={isSubmitting || !formData.is_sale}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                placeholder="0"
              />
              <p className="mt-1 text-xs text-gray-500">
                세일 활성화 시 입력 가능
              </p>
            </div>
          </div>

          <div className="flex gap-6 mt-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_sale"
                name="is_sale"
                checked={formData.is_sale}
                onChange={handleChange}
                disabled={isSubmitting}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
              />
              <label
                htmlFor="is_sale"
                className="ml-2 block text-sm text-gray-700"
              >
                세일 상품
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_new"
                name="is_new"
                checked={formData.is_new}
                onChange={handleChange}
                disabled={isSubmitting}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
              />
              <label
                htmlFor="is_new"
                className="ml-2 block text-sm text-gray-700"
              >
                신상품
              </label>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isSubmitting ? '등록 중...' : '상품 등록'}
          </button>
        </div>
      </form>
    </div>
  )
}

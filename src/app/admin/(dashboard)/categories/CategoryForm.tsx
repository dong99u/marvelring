'use client'

/**
 * Category Form Component
 * Client component for creating and editing categories
 */

import { useState, useEffect } from 'react'
import {
  createCategoryAction,
  updateCategoryAction,
  type CategoryFormData,
  type CategoryWithProductCount,
} from '@/app/actions/categories'

interface CategoryFormProps {
  category?: CategoryWithProductCount
  onSuccess?: () => void
  onCancel?: () => void
  nextDisplayOrder?: number
}

export function CategoryForm({
  category,
  onSuccess,
  onCancel,
  nextDisplayOrder = 1,
}: CategoryFormProps) {
  const isEditMode = !!category

  const [formData, setFormData] = useState<CategoryFormData>({
    category_name: category?.category_name || '',
    slug: category?.slug || '',
    display_order: category?.display_order || nextDisplayOrder,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Auto-generate slug from category name
  useEffect(() => {
    if (!isEditMode && formData.category_name) {
      const autoSlug = formData.category_name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single

      setFormData((prev) => ({ ...prev, slug: autoSlug }))
    }
  }, [formData.category_name, isEditMode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const result = isEditMode
        ? await updateCategoryAction(category.category_id, formData)
        : await createCategoryAction(formData)

      if (!result.success) {
        setError(result.error || 'Failed to save category')
        setIsSubmitting(false)
        return
      }

      // Reset form if creating
      if (!isEditMode) {
        setFormData({
          category_name: '',
          slug: '',
          display_order: nextDisplayOrder + 1,
        })
      }

      onSuccess?.()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      setError(message)
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="category_name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            카테고리명 *
          </label>
          <input
            type="text"
            id="category_name"
            value={formData.category_name}
            onChange={(e) =>
              setFormData({ ...formData, category_name: e.target.value })
            }
            placeholder="예: 반지"
            required
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            슬러그 *
          </label>
          <input
            type="text"
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="예: ring"
            required
            pattern="[a-z0-9-]+"
            title="소문자, 숫자, 하이픈만 사용 가능합니다"
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 font-mono text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="display_order"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            순서
          </label>
          <input
            type="number"
            id="display_order"
            value={formData.display_order}
            onChange={(e) =>
              setFormData({
                ...formData,
                display_order: parseInt(e.target.value) || 1,
              })
            }
            min="1"
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isSubmitting
            ? isEditMode
              ? '수정 중...'
              : '추가 중...'
            : isEditMode
              ? '수정'
              : '추가'}
        </button>

        {isEditMode && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            취소
          </button>
        )}
      </div>
    </form>
  )
}

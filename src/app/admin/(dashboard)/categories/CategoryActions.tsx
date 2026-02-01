'use client'

/**
 * Category Actions Component
 * Client component for handling category edit/delete actions
 */

import { useState } from 'react'
import { deleteCategoryAction, type CategoryWithProductCount } from '@/app/actions/categories'
import { CategoryForm } from './CategoryForm'

interface CategoryActionsProps {
  category: CategoryWithProductCount
}

export function CategoryActions({ category }: CategoryActionsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    setIsDeleting(true)
    setError(null)

    try {
      const result = await deleteCategoryAction(category.category_id)

      if (!result.success) {
        setError(result.error || 'Failed to delete category')
        setIsDeleting(false)
        setShowDeleteConfirm(false)
        return
      }

      // Success - page will be revalidated automatically
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      setError(message)
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  if (isEditing) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">카테고리 수정</h3>
        <CategoryForm
          category={category}
          onSuccess={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    )
  }

  if (showDeleteConfirm) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-red-900 mb-2">
            카테고리 삭제 확인
          </h3>
          <p className="text-sm text-red-800">
            <strong>{category.category_name}</strong> 카테고리를 삭제하시겠습니까?
          </p>
          {category.product_count > 0 && (
            <p className="text-sm text-red-900 font-semibold mt-2">
              ⚠️ 이 카테고리에 {category.product_count}개의 상품이 있습니다.
            </p>
          )}
        </div>

        {error && (
          <div className="text-sm text-red-900 bg-red-100 border border-red-300 rounded p-2">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isDeleting ? '삭제 중...' : '확인'}
          </button>
          <button
            onClick={() => {
              setShowDeleteConfirm(false)
              setError(null)
            }}
            disabled={isDeleting}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setIsEditing(true)}
        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
      >
        수정
      </button>
      <button
        onClick={() => setShowDeleteConfirm(true)}
        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
      >
        삭제
      </button>
    </div>
  )
}

'use client'

/**
 * Notice Form Component
 * Client component for creating and editing notices
 */

import { useState } from 'react'
import {
  createNoticeAction,
  updateNoticeAction,
  type NoticeFormData,
} from '@/app/actions/notices'
import type { Notice } from '@/types/database'

interface NoticeFormProps {
  notice?: Notice
  onSuccess?: () => void
  onCancel?: () => void
}

export function NoticeForm({ notice, onSuccess, onCancel }: NoticeFormProps) {
  const isEditMode = !!notice

  const [formData, setFormData] = useState<NoticeFormData>({
    title: notice?.title || '',
    content: notice?.content || '',
    is_pinned: notice?.is_pinned || false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const result = isEditMode
        ? await updateNoticeAction(notice.notice_id, formData)
        : await createNoticeAction(formData)

      if (!result.success) {
        setError(result.error || 'Failed to save notice')
        setIsSubmitting(false)
        return
      }

      // Reset form if creating
      if (!isEditMode) {
        setFormData({
          title: '',
          content: '',
          is_pinned: false,
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

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          제목 *
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="공지사항 제목을 입력하세요"
          required
          disabled={isSubmitting}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          내용 *
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          placeholder="공지사항 내용을 입력하세요"
          required
          rows={4}
          disabled={isSubmitting}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
        />
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.is_pinned}
            onChange={(e) =>
              setFormData({ ...formData, is_pinned: e.target.checked })
            }
            disabled={isSubmitting}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <span className="text-sm font-medium text-gray-700">
            공지사항 상단 고정
          </span>
        </label>
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

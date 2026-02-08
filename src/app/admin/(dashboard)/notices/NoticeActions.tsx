'use client'

/**
 * Notice Actions Component
 * Client component for handling notice edit/delete actions
 */

import { useState } from 'react'
import { deleteNoticeAction } from '@/app/actions/notices'
import { NoticeForm } from './NoticeForm'
import type { Notice } from '@/types/database'

interface NoticeActionsProps {
  notice: Notice
}

export function NoticeActions({ notice }: NoticeActionsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    setIsDeleting(true)
    setError(null)

    try {
      const result = await deleteNoticeAction(notice.notice_id)

      if (!result.success) {
        setError(result.error || 'Failed to delete notice')
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
        <h3 className="text-lg font-semibold mb-4">공지사항 수정</h3>
        <NoticeForm
          notice={notice}
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
            공지사항 삭제 확인
          </h3>
          <p className="text-sm text-red-800">
            <strong>{notice.title}</strong> 공지사항을 삭제하시겠습니까?
          </p>
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

'use client'

/**
 * Approval Actions Component
 * Client component for handling approve/reject actions
 */

import { useState } from 'react'
import { approveMemberAction, rejectMemberAction } from '@/app/actions/approval'

interface ApprovalActionsProps {
  memberId: number
  inline?: boolean
}

export function ApprovalActions({ memberId, inline = false }: ApprovalActionsProps) {
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')

  const handleApprove = async () => {
    setIsApproving(true)

    try {
      const result = await approveMemberAction(memberId)

      if (!result.success) {
        alert(result.error || 'Failed to approve member')
        setIsApproving(false)
        return
      }

      // Success - the page will be revalidated automatically
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      alert(message)
      setIsApproving(false)
    }
  }

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert('거절 사유를 입력해주세요.')
      return
    }

    setIsRejecting(true)

    try {
      const result = await rejectMemberAction(memberId, rejectionReason)

      if (!result.success) {
        alert(result.error || 'Failed to reject member')
        setIsRejecting(false)
        return
      }

      // Success - the page will be revalidated automatically
      setShowRejectDialog(false)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      alert(message)
      setIsRejecting(false)
    }
  }

  // Inline compact version for table rows
  if (inline) {
    return (
      <>
        <button
          onClick={handleApprove}
          disabled={isApproving}
          className="px-3 py-1 text-sm bg-green-50 text-green-600 rounded hover:bg-green-100 disabled:opacity-50 transition-colors"
        >
          {isApproving ? '처리중...' : '승인'}
        </button>
        <button
          onClick={() => setShowRejectDialog(true)}
          disabled={isApproving}
          className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 disabled:opacity-50 transition-colors"
        >
          거절
        </button>

        {/* Reject Dialog */}
        {showRejectDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">승인 거절</h3>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="거절 사유를 입력해주세요..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent mb-4"
                rows={3}
                disabled={isRejecting}
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => {
                    setShowRejectDialog(false)
                    setRejectionReason('')
                  }}
                  disabled={isRejecting}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleReject}
                  disabled={isRejecting}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  {isRejecting ? '처리중...' : '거절'}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  // Original full version for detail pages
  if (showRejectDialog) {
    return (
      <div className="space-y-4">
        <div>
          <label
            htmlFor={`reject-reason-${memberId}`}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            거절 사유
          </label>
          <textarea
            id={`reject-reason-${memberId}`}
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="거절 사유를 입력해주세요..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            rows={3}
            disabled={isRejecting}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleReject}
            disabled={isRejecting}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isRejecting ? '처리중...' : '거절 확인'}
          </button>
          <button
            onClick={() => {
              setShowRejectDialog(false)
              setRejectionReason('')
            }}
            disabled={isRejecting}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={handleApprove}
        disabled={isApproving}
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
      >
        {isApproving ? '처리중...' : '승인'}
      </button>
      <button
        onClick={() => setShowRejectDialog(true)}
        disabled={isApproving}
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
      >
        거절
      </button>
    </div>
  )
}

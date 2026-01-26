'use client'

/**
 * Approval Actions Component
 * Client component for handling approve/reject actions
 */

import { useState } from 'react'
import { approveMemberAction, rejectMemberAction } from '@/app/actions/approval'

interface ApprovalActionsProps {
  memberId: number
}

export function ApprovalActions({ memberId }: ApprovalActionsProps) {
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [showRejectForm, setShowRejectForm] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleApprove = async () => {
    setIsApproving(true)
    setError(null)

    try {
      const result = await approveMemberAction(memberId)

      if (!result.success) {
        setError(result.error || 'Failed to approve member')
        setIsApproving(false)
        return
      }

      // Success - the page will be revalidated automatically
    } catch (err: any) {
      setError(err.message || 'An error occurred')
      setIsApproving(false)
    }
  }

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      setError('Please provide a rejection reason')
      return
    }

    setIsRejecting(true)
    setError(null)

    try {
      const result = await rejectMemberAction(memberId, rejectionReason)

      if (!result.success) {
        setError(result.error || 'Failed to reject member')
        setIsRejecting(false)
        return
      }

      // Success - the page will be revalidated automatically
    } catch (err: any) {
      setError(err.message || 'An error occurred')
      setIsRejecting(false)
    }
  }

  if (showRejectForm) {
    return (
      <div className="space-y-4">
        <div>
          <label
            htmlFor={`reject-reason-${memberId}`}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Rejection Reason
          </label>
          <textarea
            id={`reject-reason-${memberId}`}
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Please explain why this application is being rejected..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            rows={3}
            disabled={isRejecting}
          />
        </div>

        {error && (
          <div className="text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleReject}
            disabled={isRejecting}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isRejecting ? 'Rejecting...' : 'Confirm Rejection'}
          </button>
          <button
            onClick={() => {
              setShowRejectForm(false)
              setRejectionReason('')
              setError(null)
            }}
            disabled={isRejecting}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleApprove}
          disabled={isApproving}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isApproving ? 'Approving...' : 'Approve'}
        </button>
        <button
          onClick={() => setShowRejectForm(true)}
          disabled={isApproving}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Reject
        </button>
      </div>
    </div>
  )
}

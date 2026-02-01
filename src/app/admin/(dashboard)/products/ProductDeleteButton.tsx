'use client'

import { useState, useTransition } from 'react'
import { deleteProduct } from '@/app/actions/admin'

interface ProductDeleteButtonProps {
  productId: number
  productName: string
}

export default function ProductDeleteButton({
  productId,
  productName,
}: ProductDeleteButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteProduct(productId)
      if (!result.success) {
        alert(result.error || '삭제에 실패했습니다')
      }
      setShowConfirm(false)
    })
  }

  if (showConfirm) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          {isPending ? '삭제중...' : '확인'}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          disabled={isPending}
          className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          취소
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
    >
      삭제
    </button>
  )
}

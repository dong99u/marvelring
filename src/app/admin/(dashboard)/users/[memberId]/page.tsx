/**
 * Admin Member Detail Page
 * View member details and manage approval status
 */

import { fetchMemberDetailsAction } from '@/app/actions/approval'
import { ApprovalActions } from '../ApprovalActions'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function MemberDetailPage({
  params,
}: {
  params: Promise<{ memberId: string }>
}) {
  const { memberId } = await params
  const id = Number(memberId)

  if (isNaN(id)) {
    notFound()
  }

  const { data: member, error } = await fetchMemberDetailsAction(id)

  if (error || !member) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/admin/users"
          className="text-blue-600 hover:text-blue-800 text-sm mb-4 inline-block"
        >
          ← 회원 목록으로
        </Link>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error || '회원 정보를 찾을 수 없습니다.'}</p>
        </div>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="px-3 py-1 text-sm font-semibold bg-yellow-100 text-yellow-800 rounded">
            승인대기
          </span>
        )
      case 'APPROVED':
        return (
          <span className="px-3 py-1 text-sm font-semibold bg-green-100 text-green-800 rounded">
            승인완료
          </span>
        )
      case 'REJECTED':
        return (
          <span className="px-3 py-1 text-sm font-semibold bg-red-100 text-red-800 rounded">
            승인거절
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back link */}
      <Link
        href="/admin/users"
        className="text-blue-600 hover:text-blue-800 text-sm mb-6 inline-block"
      >
        ← 회원 목록으로
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">{member.username}</h1>
          <p className="text-gray-600 mt-1">{member.email}</p>
        </div>
        {getStatusBadge(member.approval_status)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Member Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Business Info */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">사업자 정보</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-gray-500">회사명</dt>
                <dd className="text-sm font-medium mt-1">{member.company_name || '-'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">대표자명</dt>
                <dd className="text-sm font-medium mt-1">{member.ceo_name || '-'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">사업자등록번호</dt>
                <dd className="text-sm font-medium mt-1">{member.biz_reg_num || '-'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">사업자 유형</dt>
                <dd className="text-sm font-medium mt-1">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${
                      member.business_type === 'WHOLESALE'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {member.business_type === 'WHOLESALE' ? '도매' : '소매'}
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          {/* Address Info */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">주소 정보</h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm text-gray-500">우편번호</dt>
                <dd className="text-sm font-medium mt-1">{member.zip_code || '-'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">주소</dt>
                <dd className="text-sm font-medium mt-1">
                  {member.main_address || '-'}
                  {member.detail_address && ` ${member.detail_address}`}
                </dd>
              </div>
            </dl>
          </div>

          {/* Business Registration Image */}
          {member.biz_reg_image_url && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">사업자등록증</h2>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img
                  src={member.biz_reg_image_url}
                  alt="사업자등록증"
                  className="w-full max-h-[600px] object-contain bg-gray-50"
                />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Actions */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">승인 관리</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">현재 상태</p>
                <div className="mt-1">{getStatusBadge(member.approval_status)}</div>
              </div>

              {member.approval_status === 'APPROVED' && member.approved_at && (
                <div>
                  <p className="text-sm text-gray-500">승인일시</p>
                  <p className="text-sm font-medium mt-1">
                    {new Date(member.approved_at).toLocaleString('ko-KR')}
                  </p>
                </div>
              )}

              {member.approval_status === 'REJECTED' && member.rejected_reason && (
                <div>
                  <p className="text-sm text-gray-500">거절 사유</p>
                  <p className="text-sm font-medium mt-1 text-red-700">
                    {member.rejected_reason}
                  </p>
                </div>
              )}

              {member.approval_status === 'PENDING' && (
                <div className="pt-2">
                  <ApprovalActions memberId={member.member_id} />
                </div>
              )}
            </div>
          </div>

          {/* Registration Info */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">등록 정보</h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm text-gray-500">회원 ID</dt>
                <dd className="text-sm font-medium mt-1">{member.member_id}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">가입일</dt>
                <dd className="text-sm font-medium mt-1">
                  {new Date(member.created_at).toLocaleString('ko-KR')}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">최종 수정일</dt>
                <dd className="text-sm font-medium mt-1">
                  {new Date(member.updated_at).toLocaleString('ko-KR')}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Admin Users Page - Member Management
 * View, filter, search, and manage member approvals
 */

import { fetchAllMembersAction } from '@/app/actions/approval'
import { ApprovalActions } from './ApprovalActions'
import Link from 'next/link'

interface Member {
  member_id: number
  username: string
  email: string
  company_name: string | null
  ceo_name: string | null
  biz_reg_num: string | null
  business_type: 'WHOLESALE' | 'RETAIL'
  approval_status: 'PENDING' | 'APPROVED' | 'REJECTED'
  created_at: string
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'
    search?: string
    page?: string
  }>
}) {
  const params = await searchParams
  const status = params.status || 'ALL'
  const search = params.search || ''
  const page = Number(params.page) || 1
  const limit = 20

  const { data: members, count, error } = await fetchAllMembersAction({
    status,
    search,
    page,
    limit,
  })

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">회원 관리</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    )
  }

  const totalPages = Math.ceil(count / limit)

  // Status badge helper
  const getStatusBadge = (approvalStatus: string) => {
    switch (approvalStatus) {
      case 'PENDING':
        return (
          <span className="px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded">
            승인대기
          </span>
        )
      case 'APPROVED':
        return (
          <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">
            승인완료
          </span>
        )
      case 'REJECTED':
        return (
          <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded">
            승인거절
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">회원 관리</h1>
        <p className="text-gray-600">회원 승인 및 관리</p>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        {/* Status Filter */}
        <div className="flex gap-2">
          {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const).map((s) => (
            <Link
              key={s}
              href={`?status=${s}${search ? `&search=${search}` : ''}`}
              className={`px-4 py-2 rounded-lg transition-colors ${
                status === s
                  ? 'bg-black text-white'
                  : 'bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {s === 'ALL'
                ? '전체'
                : s === 'PENDING'
                  ? '승인대기'
                  : s === 'APPROVED'
                    ? '승인완료'
                    : '승인거절'}
            </Link>
          ))}
        </div>

        {/* Search */}
        <form method="get" className="flex gap-2">
          <input type="hidden" name="status" value={status} />
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="사용자명 또는 이메일로 검색..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            검색
          </button>
          {search && (
            <Link
              href={`?status=${status}`}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              초기화
            </Link>
          )}
        </form>
      </div>

      {/* Results count */}
      <p className="text-gray-600 mb-4">
        총 {count}명의 회원 {search && `(검색 결과)`}
      </p>

      {/* Table */}
      {members && members.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    사용자명
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이메일
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    회사명
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    사업자 유형
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    등록일
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {members.map((member: Member) => (
                  <tr key={member.member_id} className="hover:bg-gray-50 transition-colors">
                    {/* Username */}
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {member.username}
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-600">{member.email}</div>
                    </td>

                    {/* Company Name */}
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-600">
                        {member.company_name || '-'}
                      </div>
                    </td>

                    {/* Business Type */}
                    <td className="px-4 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded ${
                          member.business_type === 'WHOLESALE'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {member.business_type === 'WHOLESALE' ? '도매' : '소매'}
                      </span>
                    </td>

                    {/* Created At */}
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-500">
                        {new Date(member.created_at).toLocaleDateString('ko-KR')}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 text-center">
                      {getStatusBadge(member.approval_status)}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex gap-2 justify-center">
                        {member.approval_status === 'PENDING' ? (
                          <ApprovalActions memberId={member.member_id} inline />
                        ) : (
                          <Link
                            href={`/admin/users/${member.member_id}`}
                            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                          >
                            상세보기
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600">
            {search ? '검색 결과가 없습니다.' : '등록된 회원이 없습니다.'}
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {/* Previous */}
          {page > 1 && (
            <Link
              href={`?status=${status}&page=${page - 1}${search ? `&search=${search}` : ''}`}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              이전
            </Link>
          )}

          {/* Page numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum
            if (totalPages <= 5) {
              pageNum = i + 1
            } else if (page <= 3) {
              pageNum = i + 1
            } else if (page >= totalPages - 2) {
              pageNum = totalPages - 4 + i
            } else {
              pageNum = page - 2 + i
            }

            return (
              <Link
                key={pageNum}
                href={`?status=${status}&page=${pageNum}${search ? `&search=${search}` : ''}`}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  page === pageNum
                    ? 'bg-black text-white'
                    : 'bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </Link>
            )
          })}

          {/* Next */}
          {page < totalPages && (
            <Link
              href={`?status=${status}&page=${page + 1}${search ? `&search=${search}` : ''}`}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              다음
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

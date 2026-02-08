/**
 * Admin Notices Page
 * Manage notices (create, edit, delete)
 */

import { fetchNoticesAction } from '@/app/actions/notices'
import { NoticeForm } from './NoticeForm'
import { NoticeActions } from './NoticeActions'

export default async function AdminNoticesPage() {
  const { data: notices, error } = await fetchNoticesAction()

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">공지사항 관리</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">공지사항 관리</h1>
        <p className="text-gray-600">
          공지사항을 추가, 수정, 삭제할 수 있습니다.
        </p>
      </div>

      {/* Add New Notice Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-4">새 공지사항 추가</h2>
        <NoticeForm />
      </div>

      {/* Notices List */}
      {!notices || notices.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600">등록된 공지사항이 없습니다.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    고정
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    제목
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    내용 미리보기
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    조회수
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    등록일
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {notices.map((notice) => (
                  <tr
                    key={notice.notice_id}
                    className={`hover:bg-gray-50 ${notice.is_pinned ? 'bg-yellow-50/50' : ''}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {notice.is_pinned && '📌'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {notice.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {notice.content.length > 50
                          ? `${notice.content.substring(0, 50)}...`
                          : notice.content}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {notice.view_count}회
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(notice.created_at).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <NoticeActions notice={notice} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              총 <strong>{notices.length}</strong>개의 공지사항
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

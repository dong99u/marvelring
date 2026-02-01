/**
 * Admin Dashboard Main Page
 * Displays summary statistics and recent activity
 */

import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

interface StatCardProps {
  title: string
  value: number
  href?: string
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red'
}

function StatCard({ title, value, href, color = 'blue' }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-900',
    green: 'bg-green-50 border-green-200 text-green-900',
    purple: 'bg-purple-50 border-purple-200 text-purple-900',
    orange: 'bg-orange-50 border-orange-200 text-orange-900',
    red: 'bg-red-50 border-red-200 text-red-900',
  }

  const content = (
    <div className={`border rounded-lg p-6 ${colorClasses[color]}`}>
      <h3 className="text-sm font-medium opacity-75 mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value.toLocaleString()}</p>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="hover:opacity-80 transition-opacity">
        {content}
      </Link>
    )
  }

  return content
}

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Fetch all counts in parallel
  const [
    pendingMembersResult,
    totalMembersResult,
    totalProductsResult,
    totalCategoriesResult,
    totalCollectionsResult,
    recentPendingResult,
  ] = await Promise.all([
    supabase
      .from('member')
      .select('*', { count: 'exact', head: true })
      .eq('approval_status', 'PENDING'),
    supabase
      .from('member')
      .select('*', { count: 'exact', head: true })
      .eq('approval_status', 'APPROVED'),
    supabase.from('product').select('*', { count: 'exact', head: true }),
    supabase.from('category').select('*', { count: 'exact', head: true }),
    supabase.from('collection').select('*', { count: 'exact', head: true }),
    supabase
      .from('member')
      .select('id, username, email, business_type, created_at')
      .eq('approval_status', 'PENDING')
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  const pendingMembersCount = pendingMembersResult.count ?? 0
  const totalMembersCount = totalMembersResult.count ?? 0
  const totalProductsCount = totalProductsResult.count ?? 0
  const totalCategoriesCount = totalCategoriesResult.count ?? 0
  const totalCollectionsCount = totalCollectionsResult.count ?? 0
  const recentPending = recentPendingResult.data ?? []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">관리자 대시보드</h1>
        <p className="text-gray-600">시스템 현황 및 최근 활동을 확인하세요</p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard
          title="대기중인 승인 요청"
          value={pendingMembersCount}
          href="/admin/users"
          color="red"
        />
        <StatCard
          title="총 회원 수"
          value={totalMembersCount}
          color="green"
        />
        <StatCard
          title="총 상품 수"
          value={totalProductsCount}
          color="blue"
        />
        <StatCard
          title="총 카테고리 수"
          value={totalCategoriesCount}
          color="purple"
        />
        <StatCard
          title="총 컬렉션 수"
          value={totalCollectionsCount}
          color="orange"
        />
      </div>

      {/* Recent Pending Approvals */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">최근 승인 대기 회원</h2>
          {pendingMembersCount > 0 && (
            <Link
              href="/admin/users"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              전체 보기 →
            </Link>
          )}
        </div>

        {recentPending.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            승인 대기중인 회원이 없습니다.
          </div>
        ) : (
          <div className="space-y-3">
            {recentPending.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <p className="font-medium">{member.username}</p>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        member.business_type === 'WHOLESALE'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {member.business_type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{member.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">
                    {new Date(member.created_at).toLocaleDateString('ko-KR')}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(member.created_at).toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">빠른 작업</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/users"
            className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <div>
              <p className="font-medium group-hover:text-blue-700">회원 승인</p>
              <p className="text-sm text-gray-600">대기중인 회원 관리</p>
            </div>
            <span className="text-2xl group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>

          <Link
            href="/admin/products"
            className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group"
          >
            <div>
              <p className="font-medium group-hover:text-green-700">상품 관리</p>
              <p className="text-sm text-gray-600">상품 추가 및 수정</p>
            </div>
            <span className="text-2xl group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>

          <Link
            href="/admin/categories"
            className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all group"
          >
            <div>
              <p className="font-medium group-hover:text-purple-700">
                카테고리 관리
              </p>
              <p className="text-sm text-gray-600">분류 체계 구성</p>
            </div>
            <span className="text-2xl group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

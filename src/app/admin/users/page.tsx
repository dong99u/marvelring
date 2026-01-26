/**
 * Admin Users Page - Pending Member Approval
 * Allows admin to view and approve/reject pending member registrations
 */

import { fetchPendingMembersAction } from '@/app/actions/approval'
import { ApprovalActions } from './ApprovalActions'

export default async function AdminUsersPage() {
  const { data: pendingMembers, error } = await fetchPendingMembersAction()

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Pending Member Approvals</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    )
  }

  if (!pendingMembers || pendingMembers.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Pending Member Approvals</h1>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600">No pending member approvals at this time.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Pending Member Approvals</h1>
      <p className="text-gray-600 mb-6">
        {pendingMembers.length} member{pendingMembers.length !== 1 ? 's' : ''} awaiting approval
      </p>

      <div className="grid gap-6">
        {pendingMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">{member.username}</h2>
                <p className="text-gray-600">{member.email}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  member.business_type === 'WHOLESALE'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {member.business_type}
              </span>
            </div>

            {member.company_name && (
              <div className="mb-2">
                <span className="text-sm text-gray-500">Company: </span>
                <span className="text-sm font-medium">{member.company_name}</span>
              </div>
            )}

            {member.ceo_name && (
              <div className="mb-2">
                <span className="text-sm text-gray-500">CEO: </span>
                <span className="text-sm font-medium">{member.ceo_name}</span>
              </div>
            )}

            {member.biz_reg_num && (
              <div className="mb-4">
                <span className="text-sm text-gray-500">Business Registration: </span>
                <span className="text-sm font-mono">{member.biz_reg_num}</span>
              </div>
            )}

            <div className="text-xs text-gray-400 mb-4">
              Registered: {new Date(member.created_at).toLocaleString()}
            </div>

            <ApprovalActions memberId={member.id} />
          </div>
        ))}
      </div>
    </div>
  )
}

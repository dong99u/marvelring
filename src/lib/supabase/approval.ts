/**
 * Member Approval Workflow Helpers
 * Provides functions for admin approval/rejection of members
 */

import { createClient } from './server'

export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

export interface PendingMember {
  id: number
  username: string
  email: string
  company_name: string | null
  ceo_name: string | null
  biz_reg_num: string | null
  business_type: 'WHOLESALE' | 'RETAIL'
  approval_status: ApprovalStatus
  created_at: string
}

export interface ApprovalResult {
  success: boolean
  error?: string
}

/**
 * Fetches all pending members awaiting approval
 * @returns Array of pending members or error
 */
export async function getPendingMembers(): Promise<{
  data: PendingMember[] | null
  error: string | null
}> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('pending_members')
      .select('*')

    if (error) {
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: error.message || 'Failed to fetch pending members' }
  }
}

/**
 * Approves a member
 * @param memberId - ID of the member to approve
 * @param adminId - ID of the admin performing the approval
 * @returns Success status and optional error message
 */
export async function approveMember(
  memberId: number,
  adminId: number
): Promise<ApprovalResult> {
  try {
    const supabase = await createClient()

    const { error } = await supabase.rpc('approve_member', {
      member_id_param: memberId,
      admin_id_param: adminId,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to approve member',
    }
  }
}

/**
 * Rejects a member with a reason
 * @param memberId - ID of the member to reject
 * @param adminId - ID of the admin performing the rejection
 * @param reason - Reason for rejection
 * @returns Success status and optional error message
 */
export async function rejectMember(
  memberId: number,
  adminId: number,
  reason: string
): Promise<ApprovalResult> {
  try {
    const supabase = await createClient()

    const { error } = await supabase.rpc('reject_member', {
      member_id_param: memberId,
      admin_id_param: adminId,
      reason_param: reason,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to reject member',
    }
  }
}

/**
 * Checks if the current user is an admin
 * @returns Boolean indicating admin status
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return false
    }

    // Check if user has admin role in metadata
    const role = user.app_metadata?.role
    return role === 'admin'
  } catch {
    return false
  }
}

/**
 * Gets member details by ID
 * @param memberId - ID of the member
 * @returns Member data or error
 */
export async function getMemberById(memberId: number): Promise<{
  data: any | null
  error: string | null
}> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('member')
      .select('*')
      .eq('id', memberId)
      .single()

    if (error) {
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: error.message || 'Failed to fetch member' }
  }
}

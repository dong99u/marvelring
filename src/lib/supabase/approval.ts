/**
 * Member Approval Workflow Helpers
 * Provides functions for admin approval/rejection of members
 */

import { createClient } from './server'
import { createAdminClient } from './admin'

export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

export interface PendingMember {
  member_id: number
  username: string
  email: string
  company_name: string | null
  ceo_name: string | null
  biz_reg_num: string | null
  business_type: 'WHOLESALE' | 'RETAIL'
  approval_status: ApprovalStatus
  created_at: string
}

export interface MemberData {
  member_id: number
  username: string
  email: string
  company_name: string | null
  ceo_name: string | null
  biz_reg_num: string | null
  biz_reg_image_url: string | null
  business_type: 'WHOLESALE' | 'RETAIL'
  approval_status: ApprovalStatus
  approved_at: string | null
  rejected_reason: string | null
  zip_code: string | null
  main_address: string | null
  detail_address: string | null
  created_at: string
  updated_at: string
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
      .from('member')
      .select('member_id, username, email, company_name, ceo_name, biz_reg_num, business_type, approval_status, created_at')
      .eq('approval_status', 'PENDING')
      .order('created_at', { ascending: true })

    if (error) {
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch pending members'
    return { data: null, error: message }
  }
}

/**
 * Approves a member
 * @param memberId - ID of the member to approve
 * @param adminId - ID of the admin performing the approval
 * @returns Success status and optional error message
 */
export async function approveMember(
  memberId: number
): Promise<ApprovalResult> {
  try {
    const supabase = createAdminClient()

    const { error } = await supabase
      .from('member')
      .update({
        approval_status: 'APPROVED',
        approved_at: new Date().toISOString(),
      })
      .eq('member_id', memberId)

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to approve member'
    return {
      success: false,
      error: message,
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
  reason: string
): Promise<ApprovalResult> {
  try {
    const supabase = createAdminClient()

    const { error } = await supabase
      .from('member')
      .update({
        approval_status: 'REJECTED',
        rejected_reason: reason,
      })
      .eq('member_id', memberId)

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to reject member'
    return {
      success: false,
      error: message,
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
  data: MemberData | null
  error: string | null
}> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('member')
      .select('*')
      .eq('member_id', memberId)
      .single()

    if (error) {
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch member'
    return { data: null, error: message }
  }
}

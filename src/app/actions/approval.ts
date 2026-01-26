'use server'

/**
 * Server Actions for Member Approval Workflow
 * Handles admin approval/rejection of pending members
 */

import {
  getPendingMembers,
  approveMember,
  rejectMember,
  isAdmin,
  getMemberById,
} from '@/lib/supabase/approval'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Server action to fetch pending members
 * Requires admin authentication
 */
export async function fetchPendingMembersAction() {
  // Check admin authorization
  const adminCheck = await isAdmin()
  if (!adminCheck) {
    return {
      data: null,
      error: 'Unauthorized: Admin access required',
    }
  }

  const result = await getPendingMembers()
  return result
}

/**
 * Server action to approve a member
 * Requires admin authentication
 */
export async function approveMemberAction(memberId: number) {
  // Check admin authorization
  const adminCheck = await isAdmin()
  if (!adminCheck) {
    return {
      success: false,
      error: 'Unauthorized: Admin access required',
    }
  }

  // Get current admin user ID
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return {
      success: false,
      error: 'Authentication required',
    }
  }

  // Get admin member ID from auth user
  const { data: adminMember } = await supabase
    .from('member')
    .select('id')
    .eq('email', user.email)
    .single()

  if (!adminMember) {
    return {
      success: false,
      error: 'Admin member not found',
    }
  }

  const result = await approveMember(memberId, adminMember.id)

  if (result.success) {
    // Revalidate the admin users page
    revalidatePath('/admin/users')
  }

  return result
}

/**
 * Server action to reject a member
 * Requires admin authentication
 */
export async function rejectMemberAction(memberId: number, reason: string) {
  // Check admin authorization
  const adminCheck = await isAdmin()
  if (!adminCheck) {
    return {
      success: false,
      error: 'Unauthorized: Admin access required',
    }
  }

  // Validate reason
  if (!reason || reason.trim().length === 0) {
    return {
      success: false,
      error: 'Rejection reason is required',
    }
  }

  // Get current admin user ID
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return {
      success: false,
      error: 'Authentication required',
    }
  }

  // Get admin member ID from auth user
  const { data: adminMember } = await supabase
    .from('member')
    .select('id')
    .eq('email', user.email)
    .single()

  if (!adminMember) {
    return {
      success: false,
      error: 'Admin member not found',
    }
  }

  const result = await rejectMember(memberId, adminMember.id, reason)

  if (result.success) {
    // Revalidate the admin users page
    revalidatePath('/admin/users')
  }

  return result
}

/**
 * Server action to fetch member details
 * Requires admin authentication
 */
export async function fetchMemberDetailsAction(memberId: number) {
  // Check admin authorization
  const adminCheck = await isAdmin()
  if (!adminCheck) {
    return {
      data: null,
      error: 'Unauthorized: Admin access required',
    }
  }

  const result = await getMemberById(memberId)
  return result
}

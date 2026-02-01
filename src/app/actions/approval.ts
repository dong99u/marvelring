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

  const result = await approveMember(memberId)

  if (result.success) {
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

  const result = await rejectMember(memberId, reason)

  if (result.success) {
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

/**
 * Server action to fetch all members with filtering and pagination
 * Requires admin authentication
 */
export async function fetchAllMembersAction({
  status,
  search,
  page = 1,
  limit = 20,
}: {
  status?: 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'
  search?: string
  page?: number
  limit?: number
}) {
  // Check admin authorization
  const adminCheck = await isAdmin()
  if (!adminCheck) {
    return {
      data: null,
      count: 0,
      error: 'Unauthorized: Admin access required',
    }
  }

  const supabase = await createClient()
  const offset = (page - 1) * limit

  // Build query
  let query = supabase
    .from('member')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  // Filter by status
  if (status && status !== 'ALL') {
    query = query.eq('approval_status', status)
  }

  // Search by username or email
  if (search && search.trim()) {
    query = query.or(`username.ilike.%${search}%,email.ilike.%${search}%`)
  }

  // Apply pagination
  query = query.range(offset, offset + limit - 1)

  const { data, error, count } = await query

  if (error) {
    return {
      data: null,
      count: 0,
      error: error.message,
    }
  }

  return {
    data,
    count: count || 0,
    error: null,
  }
}

'use server'

/**
 * Server Actions for Notice Management
 * Handles CRUD operations for announcements and notices
 */

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Notice } from '@/types/database'

export interface NoticeFormData {
  title: string
  content: string
  is_pinned: boolean
}

/**
 * Fetch all notices ordered by pinned status and created date
 */
export async function fetchNoticesAction() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('notice')
    .select('*')
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) {
    return { data: null, error: error.message }
  }

  return { data: data as Notice[], error: null }
}

/**
 * Create a new notice
 */
export async function createNoticeAction(formData: NoticeFormData) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('notice')
    .insert([
      {
        title: formData.title,
        content: formData.content,
        is_pinned: formData.is_pinned,
      },
    ])
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/notices')
  return { success: true, data }
}

/**
 * Update an existing notice
 */
export async function updateNoticeAction(
  noticeId: number,
  formData: NoticeFormData
) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('notice')
    .update({
      title: formData.title,
      content: formData.content,
      is_pinned: formData.is_pinned,
    })
    .eq('notice_id', noticeId)
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/notices')
  return { success: true, data }
}

/**
 * Delete a notice
 */
export async function deleteNoticeAction(noticeId: number) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('notice')
    .delete()
    .eq('notice_id', noticeId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/notices')
  return { success: true }
}

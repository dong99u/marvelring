/**
 * Email Sender Module
 * Handles sending emails via Supabase Edge Function
 */

import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/supabase/database.types'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export interface SendEmailParams {
  memberId: number
  email: string
  username: string
  companyName?: string
  approvalStatus: 'APPROVED' | 'REJECTED'
  rejectedReason?: string
}

export interface SendEmailResult {
  success: boolean
  message?: string
  error?: string
}

/**
 * Send approval/rejection email via Supabase Edge Function
 */
export async function sendApprovalEmail(
  params: SendEmailParams
): Promise<SendEmailResult> {
  try {
    const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)

    // Call Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('send-approval-email', {
      body: {
        member_id: params.memberId,
        email: params.email,
        username: params.username,
        company_name: params.companyName,
        new_status: params.approvalStatus,
        rejected_reason: params.rejectedReason,
      },
    })

    if (error) {
      console.error('Edge function error:', error)
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
      message: data?.message || 'Email sent successfully',
    }
  } catch (error) {
    console.error('Failed to send email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Send approval/rejection email with retry logic
 */
export async function sendApprovalEmailWithRetry(
  params: SendEmailParams,
  maxRetries: number = 3,
  retryDelay: number = 1000
): Promise<SendEmailResult> {
  let lastError: string | undefined

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await sendApprovalEmail(params)

      if (result.success) {
        return result
      }

      lastError = result.error
      console.warn(`Email send attempt ${attempt} failed: ${result.error}`)

      // Wait before retrying (except on last attempt)
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay * attempt))
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : 'Unknown error'
      console.error(`Email send attempt ${attempt} failed:`, error)

      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay * attempt))
      }
    }
  }

  return {
    success: false,
    error: lastError || `Failed after ${maxRetries} attempts`,
  }
}

/**
 * Batch send emails (for multiple members)
 */
export async function sendBatchEmails(
  emailParams: SendEmailParams[]
): Promise<SendEmailResult[]> {
  const results = await Promise.allSettled(
    emailParams.map((params) => sendApprovalEmail(params))
  )

  return results.map((result) => {
    if (result.status === 'fulfilled') {
      return result.value
    } else {
      return {
        success: false,
        error: result.reason instanceof Error ? result.reason.message : 'Unknown error',
      }
    }
  })
}

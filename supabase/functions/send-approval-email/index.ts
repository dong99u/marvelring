/**
 * Supabase Edge Function: Send Approval Email
 * Triggered when member approval_status changes
 * Sends approval or rejection email to the member
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { getEmailTemplateByStatus } from './templates.ts'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

interface EmailPayload {
  member_id: number
  email: string
  username?: string
  company_name?: string
  old_status?: string
  new_status: 'APPROVED' | 'REJECTED'
  approved_by?: number
  rejected_reason?: string
}

serve(async (req) => {
  try {
    const payload: EmailPayload = await req.json()

    // Validate required fields
    if (!payload.member_id || !payload.email || !payload.new_status) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: member_id, email, new_status' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // Initialize Supabase client with service role
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // Fetch member details if not provided
    let username = payload.username
    let companyName = payload.company_name

    if (!username || !companyName) {
      const { data: member, error: memberError } = await supabase
        .from('member')
        .select('username, company_name')
        .eq('id', payload.member_id)
        .single()

      if (memberError) {
        throw new Error(`Failed to fetch member: ${memberError.message}`)
      }

      username = username || member.username
      companyName = companyName || member.company_name
    }

    // Generate email template
    const { subject, text, html } = getEmailTemplateByStatus(payload.new_status, {
      username: username || 'User',
      email: payload.email,
      companyName,
      rejectedReason: payload.rejected_reason,
      loginUrl: `${SUPABASE_URL}/login`,
    })

    // Log the email (for debugging)
    console.log(`
===== EMAIL NOTIFICATION =====
To: ${payload.email}
Subject: ${subject}
Status: ${payload.new_status}
==============================
    `)

    // Log email attempt in database
    try {
      await supabase.rpc('log_email_attempt', {
        member_id_param: payload.member_id,
        email_type_param: payload.new_status,
        recipient_email_param: payload.email,
        subject_param: subject,
        status_param: 'PENDING',
      })
    } catch (logError) {
      console.warn('Failed to log email attempt:', logError)
    }

    // TODO: Integrate with actual email service (SendGrid, Resend, etc.)
    // Example with Resend:
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

    if (RESEND_API_KEY) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Marvelring <noreply@marvelring.com>',
            to: payload.email,
            subject: subject,
            text: text,
            html: html,
          }),
        })

        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(`Resend API error: ${JSON.stringify(errorData)}`)
        }

        const emailResult = await res.json()

        // Update email log with success
        await supabase.rpc('log_email_attempt', {
          member_id_param: payload.member_id,
          email_type_param: payload.new_status,
          recipient_email_param: payload.email,
          subject_param: subject,
          status_param: 'SENT',
        })

        return new Response(
          JSON.stringify({
            success: true,
            message: 'Email sent successfully',
            recipient: payload.email,
            email_id: emailResult.id,
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }
        )
      } catch (emailError) {
        console.error('Failed to send email via Resend:', emailError)

        // Log failure
        await supabase.rpc('log_email_attempt', {
          member_id_param: payload.member_id,
          email_type_param: payload.new_status,
          recipient_email_param: payload.email,
          subject_param: subject,
          status_param: 'FAILED',
          error_message_param: emailError instanceof Error ? emailError.message : 'Unknown error',
        })

        throw emailError
      }
    } else {
      // No email service configured - just log
      console.warn('RESEND_API_KEY not configured - email not sent')

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Email logged (no email service configured)',
          recipient: payload.email,
          warning: 'RESEND_API_KEY not set',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }
  } catch (error) {
    console.error('Error sending approval email:', error)

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
})

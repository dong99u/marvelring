import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: Request) {
  try {
    const {
      email,
      password,
      username,
      fullName,
      companyName,
      ceoName,
      bizRegNum,
      businessType,
      zipCode,
      addressMain,
      addressDetail,
      bizRegImageUrl,
    } = await request.json()

    // Use admin client with service role to bypass RLS
    const supabase = createAdminClient()

    // 1. Create auth user using admin API
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email for B2B workflow
      user_metadata: {
        username,
        full_name: fullName,
      },
    })

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      )
    }

    // 2. Create member record (service role bypasses RLS)
    const { error: memberError } = await supabase
      .from('member')
      .insert({
        auth_id: authData.user.id, // Link to auth.users
        username,
        email,
        password: 'SUPABASE_AUTH', // Placeholder - actual password in auth
        business_type: businessType,
        company_name: companyName,
        ceo_name: ceoName,
        biz_reg_num: bizRegNum,
        biz_reg_image_url: bizRegImageUrl || '', // Required field, empty string if not provided
        zip_code: zipCode,
        main_address: addressMain,
        detail_address: addressDetail,
        approval_status: 'PENDING',
      })

    if (memberError) {
      // Rollback auth user if member creation fails
      await supabase.auth.admin.deleteUser(authData.user.id)

      return NextResponse.json(
        { error: memberError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: {
        user: authData.user,
        session: null, // No session created by admin API
      }
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}

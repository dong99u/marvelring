import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

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
    } = await request.json()

    const supabase = await createClient()

    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          full_name: fullName,
        }
      }
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

    // 2. Create member record
    const { error: memberError } = await supabase
      .from('member')
      .insert({
        username,
        email,
        password: 'SUPABASE_AUTH', // Placeholder - actual password in auth
        business_type: businessType,
        company_name: companyName,
        ceo_name: ceoName,
        biz_reg_num: bizRegNum,
        zip_code: zipCode,
        address_line1: addressMain,
        address_line2: addressDetail,
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

    return NextResponse.json({ data: authData })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

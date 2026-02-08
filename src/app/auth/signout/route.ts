import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  await supabase.auth.signOut()

  // Determine redirect target from form data
  const formData = await request.formData()
  const redirectTo = (formData.get('redirect') as string) || '/admin/login'

  const response = NextResponse.redirect(new URL(redirectTo, request.url))

  // Explicitly delete all Supabase auth cookies on the redirect response
  request.cookies.getAll().forEach((cookie) => {
    if (cookie.name.startsWith('sb-')) {
      response.cookies.delete(cookie.name)
    }
  })

  return response
}

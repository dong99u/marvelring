import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  await supabase.auth.signOut()

  // Redirect to admin login after logout
  const url = new URL('/admin/login', request.url)
  return NextResponse.redirect(url)
}

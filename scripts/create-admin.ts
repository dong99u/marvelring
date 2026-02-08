/**
 * Create Admin User Script
 *
 * Usage:
 *   ADMIN_USERNAME=myuser ADMIN_PASSWORD=mypass npx tsx scripts/create-admin.ts
 *
 * Required env vars (in .env.local):
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 *
 * Required env vars (passed at runtime):
 *   - ADMIN_USERNAME
 *   - ADMIN_PASSWORD
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load .env.local
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const adminUsername = process.env.ADMIN_USERNAME
const adminPassword = process.env.ADMIN_PASSWORD

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables:')
  console.error('- NEXT_PUBLIC_SUPABASE_URL')
  console.error('- SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

if (!adminUsername || !adminPassword) {
  console.error('Missing admin credentials. Pass them as environment variables:')
  console.error('  ADMIN_USERNAME=myuser ADMIN_PASSWORD=mypass npx tsx scripts/create-admin.ts')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function createAdminUser() {
  const email = 'admin@marvelring.com'

  console.log('Creating admin user...')

  // 1. Create auth user using Admin API
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password: adminPassword,
    email_confirm: true,
    app_metadata: {
      role: 'admin',
    },
    user_metadata: {
      username: adminUsername,
    },
  })

  if (authError) {
    console.error('Failed to create auth user:', authError.message)
    process.exit(1)
  }

  console.log('Auth user created:', authData.user.id)

  // 2. Create member record
  const { data: memberData, error: memberError } = await supabase
    .from('member')
    .insert({
      username: adminUsername,
      email,
      password: 'SUPABASE_AUTH',
      role: 'ROLE_ADMIN',
      company_name: 'MARVELRING',
      ceo_name: '관리자',
      biz_reg_num: '000-00-00000',
      biz_reg_image_url: 'https://placeholder.com/admin.png',
      business_type: 'WHOLESALE',
      approval_status: 'APPROVED',
      approved_at: new Date().toISOString(),
      zip_code: '00000',
      main_address: '관리자',
    })
    .select()
    .single()

  if (memberError) {
    console.error('Failed to create member:', memberError.message)
    // Rollback auth user
    await supabase.auth.admin.deleteUser(authData.user.id)
    process.exit(1)
  }

  console.log('Member created:', memberData.member_id)
  console.log('')
  console.log('=== Admin Account Created ===')
  console.log('Username:', adminUsername)
  console.log('Email:', email)
  console.log('============================')
}

createAdminUser()

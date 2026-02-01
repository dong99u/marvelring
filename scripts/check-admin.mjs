import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

// Load .env.local manually
const envContent = readFileSync('.env.local', 'utf-8')
const envVars = {}
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/)
  if (match) {
    envVars[match[1]] = match[2]
  }
})

const supabase = createClient(
  envVars.NEXT_PUBLIC_SUPABASE_URL,
  envVars.SUPABASE_SERVICE_ROLE_KEY
)

async function main() {
  // Get all auth users
  const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()
  if (authError) {
    console.error('Error fetching auth users:', authError)
    return
  }
  
  console.log('\n=== Auth Users ===')
  authUsers.users.forEach(u => {
    console.log(`- ${u.email} (${u.id})`)
  })
  
  // Get all members with * to see actual columns
  const { data: members, error: memberError } = await supabase
    .from('member')
    .select('*')
  
  if (memberError) {
    console.error('Error fetching members:', memberError)
    return
  }
  
  console.log('\n=== Member Table Columns ===')
  if (members.length > 0) {
    console.log('Columns:', Object.keys(members[0]))
  }
  
  console.log('\n=== Member Table Data ===')
  members.forEach(m => {
    console.log(`- ${m.email} | ${m.username} | status: ${m.approval_status}`)
  })
  
  // Check which auth users are missing from member table
  console.log('\n=== Missing from Member Table ===')
  authUsers.users.forEach(u => {
    const found = members.find(m => m.email === u.email)
    if (!found) {
      console.log(`- MISSING: ${u.email}`)
    }
  })
}

main()

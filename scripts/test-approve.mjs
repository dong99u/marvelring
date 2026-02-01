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
  // Find pending member
  const { data: members, error: fetchError } = await supabase
    .from('member')
    .select('member_id, username, email, approval_status')
    .eq('approval_status', 'PENDING')
  
  if (fetchError) {
    console.error('Fetch error:', fetchError)
    return
  }
  
  console.log('Pending members:', members)
  
  if (members.length === 0) {
    console.log('No pending members to approve')
    return
  }
  
  const memberId = members[0].member_id
  console.log(`\nTrying to approve member_id: ${memberId}`)
  
  // Try to update
  const { data, error } = await supabase
    .from('member')
    .update({
      approval_status: 'APPROVED',
      approved_at: new Date().toISOString(),
    })
    .eq('member_id', memberId)
    .select()
  
  if (error) {
    console.error('Update error:', error)
  } else {
    console.log('Update success:', data)
  }
}

main()

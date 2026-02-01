import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

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
  const { data, error } = await supabase
    .from('member')
    .update({ approval_status: 'PENDING', approved_at: null })
    .eq('member_id', 10)
    .select('member_id, username, approval_status')
  
  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Reset to PENDING:', data)
  }
}

main()

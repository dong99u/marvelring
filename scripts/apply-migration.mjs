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
  console.log('Applying migration: fix member_id column references...\n')

  // 1. Update approve_member function
  console.log('1. Updating approve_member function...')
  const { error: err1 } = await supabase.rpc('execute_sql', {
    sql: `
      CREATE OR REPLACE FUNCTION approve_member(
        member_id_param BIGINT,
        admin_id_param BIGINT
      )
      RETURNS BOOLEAN AS $$
      BEGIN
        UPDATE member
        SET
          approval_status = 'APPROVED',
          approved_at = NOW(),
          approved_by = admin_id_param,
          rejected_reason = NULL
        WHERE member_id = member_id_param;
        RETURN FOUND;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
    `
  })
  
  if (err1) {
    // Try direct SQL execution if RPC doesn't work
    console.log('RPC not available, trying raw query...')
  }

  // Since supabase-js doesn't support raw SQL, we'll need to output the SQL for manual execution
  console.log('\n=== SQL to execute in Supabase Dashboard ===\n')
  
  const sql = readFileSync('supabase/migrations/00011_fix_member_id_column_references.sql', 'utf-8')
  console.log(sql)
  
  console.log('\n=== Instructions ===')
  console.log('1. Go to Supabase Dashboard > SQL Editor')
  console.log('2. Copy and paste the SQL above')
  console.log('3. Run the query')
}

main()

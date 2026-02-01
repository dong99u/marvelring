#!/bin/bash

# Script to apply the RLS fix for member table INSERT policy
# This uses curl to execute SQL via Supabase REST API

# Load environment variables from .env.local
if [ -f ".env.local" ]; then
  export $(grep -E '^(NEXT_PUBLIC_SUPABASE_URL|SUPABASE_SERVICE_ROLE_KEY)=' .env.local | xargs)
fi

if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
  echo "Error: Missing Supabase credentials"
  echo "Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local"
  exit 1
fi

echo "Applying RLS policy fix for member table..."

# The SQL to execute
SQL_QUERY="
-- Check if policy already exists and drop it first to avoid conflict
DROP POLICY IF EXISTS member_insert_self ON member;

-- Create the INSERT policy for authenticated users
CREATE POLICY member_insert_self
  ON member
  FOR INSERT
  TO authenticated
  WITH CHECK (
    email = (SELECT auth.jwt() ->> 'email')
  );

COMMENT ON POLICY member_insert_self ON member IS 'Authenticated users can insert their own member record during signup if email matches';
"

echo ""
echo "SQL to execute:"
echo "==============="
echo "$SQL_QUERY"
echo "==============="
echo ""
echo "To apply this change, please run the above SQL in the Supabase Dashboard SQL Editor:"
echo "1. Go to https://app.supabase.com/project/cjlhmghrnmlputqgfeth/sql/new"
echo "2. Paste the SQL above"
echo "3. Click 'Run'"
echo ""
echo "Alternatively, if you have Supabase CLI linked:"
echo "  npx supabase db push"
echo ""

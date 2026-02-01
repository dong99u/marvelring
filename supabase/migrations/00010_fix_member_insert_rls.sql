-- Fix member table RLS for signup flow
-- Issue: Authenticated users cannot INSERT their own member record during signup
-- Root cause: INSERT policy only exists for service_role, not authenticated users

-- ============================================
-- ADD INSERT POLICY FOR AUTHENTICATED USERS
-- ============================================

-- Policy: Authenticated users can insert their own member record during signup
-- The email must match the authenticated user's email
CREATE POLICY member_insert_self
  ON member
  FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Ensure the email being inserted matches the authenticated user's email
    email = (SELECT auth.jwt() ->> 'email')
  );

COMMENT ON POLICY member_insert_self ON member IS 'Authenticated users can insert their own member record during signup if email matches';

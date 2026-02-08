-- Migration: Add admin SELECT policy for member table
--
-- Problem: Admin users could only see their own member record due to missing
-- admin SELECT RLS policy. The only SELECT policy was member_select_own which
-- uses (auth_id = auth.uid()), meaning admins couldn't view pending member
-- signup requests in the admin panel.
--
-- Fix: Add member_select_admin policy that allows admin users to query all
-- member records, enabling the admin approval workflow to function correctly.

-- Add admin SELECT policy (idempotent - drop if exists first)
DROP POLICY IF EXISTS member_select_admin ON member;
CREATE POLICY member_select_admin ON member
  FOR SELECT
  TO authenticated
  USING (is_admin());

-- Fix member RLS policies
-- Original policy compared auth.uid() (UUID) with id (BIGSERIAL) - always failed
-- Fix: use auth_id (UUID) column for direct comparison with auth.uid()

-- ============================================
-- FIX SELECT POLICY
-- ============================================
DROP POLICY IF EXISTS member_select_own ON member;
CREATE POLICY member_select_own
  ON member
  FOR SELECT
  TO authenticated
  USING (auth_id = auth.uid());

-- ============================================
-- FIX UPDATE POLICY
-- ============================================
DROP POLICY IF EXISTS member_update_own ON member;
CREATE POLICY member_update_own
  ON member
  FOR UPDATE
  TO authenticated
  USING (auth_id = auth.uid())
  WITH CHECK (auth_id = auth.uid());

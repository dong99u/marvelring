-- Fix collection/category RLS to allow ALL authenticated users to view
-- Previously only approved members could see collections/categories,
-- which caused pending users to see empty navigation dropdowns.
-- Collections and categories are navigation data, not sensitive business data.

-- ============================================
-- FIX COLLECTION SELECT POLICY
-- ============================================
DROP POLICY IF EXISTS collection_select_all ON collection;
DROP POLICY IF EXISTS collection_select_approved ON collection;

CREATE POLICY collection_select_authenticated
  ON collection
  FOR SELECT
  TO authenticated
  USING (true);

-- Keep anon policy for non-logged-in users
-- (anon_can_view_collections should already exist, create if not)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'collection' AND policyname = 'anon_can_view_collections'
  ) THEN
    CREATE POLICY anon_can_view_collections
      ON collection
      FOR SELECT
      TO anon
      USING (true);
  END IF;
END $$;

-- ============================================
-- FIX CATEGORY SELECT POLICY
-- ============================================
DROP POLICY IF EXISTS category_select_all ON category;
DROP POLICY IF EXISTS category_select_approved ON category;

CREATE POLICY category_select_authenticated
  ON category
  FOR SELECT
  TO authenticated
  USING (true);

-- Keep anon policy for non-logged-in users
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'category' AND policyname = 'anon_can_view_categories'
  ) THEN
    CREATE POLICY anon_can_view_categories
      ON category
      FOR SELECT
      TO anon
      USING (true);
  END IF;
END $$;

-- Row Level Security (RLS) Policies
-- Enables fine-grained access control for MarvelRing platform

-- ============================================
-- ENABLE RLS ON ALL TABLES
-- ============================================

ALTER TABLE member ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection ENABLE ROW LEVEL SECURITY;
ALTER TABLE category ENABLE ROW LEVEL SECURITY;
ALTER TABLE product ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_diamond_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_material_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_image ENABLE ROW LEVEL SECURITY;
ALTER TABLE notice ENABLE ROW LEVEL SECURITY;


-- ============================================
-- MEMBER TABLE POLICIES
-- ============================================

-- Policy: Members can view their own profile
CREATE POLICY member_select_own
  ON member
  FOR SELECT
  USING (auth.uid()::text = id::text);

-- Policy: Members can update their own profile
CREATE POLICY member_update_own
  ON member
  FOR UPDATE
  USING (auth.uid()::text = id::text)
  WITH CHECK (auth.uid()::text = id::text);

-- Policy: Service role (admin) can view all members
CREATE POLICY member_select_admin
  ON member
  FOR SELECT
  TO service_role
  USING (true);

-- Policy: Service role (admin) can update all members
CREATE POLICY member_update_admin
  ON member
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy: Service role (admin) can insert members
CREATE POLICY member_insert_admin
  ON member
  FOR INSERT
  TO service_role
  WITH CHECK (true);


-- ============================================
-- COLLECTION TABLE POLICIES (Public Read)
-- ============================================

-- Policy: Anyone can view collections
CREATE POLICY collection_select_all
  ON collection
  FOR SELECT
  USING (true);

-- Policy: Only service role can modify collections
CREATE POLICY collection_insert_admin
  ON collection
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY collection_update_admin
  ON collection
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY collection_delete_admin
  ON collection
  FOR DELETE
  TO service_role
  USING (true);


-- ============================================
-- CATEGORY TABLE POLICIES (Public Read)
-- ============================================

-- Policy: Anyone can view categories
CREATE POLICY category_select_all
  ON category
  FOR SELECT
  USING (true);

-- Policy: Only service role can modify categories
CREATE POLICY category_insert_admin
  ON category
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY category_update_admin
  ON category
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY category_delete_admin
  ON category
  FOR DELETE
  TO service_role
  USING (true);


-- ============================================
-- PRODUCT TABLE POLICIES
-- ============================================

-- Policy: Authenticated users can view products
-- Price visibility is handled by views (see 00003_views.sql)
CREATE POLICY product_select_authenticated
  ON product
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Anonymous users can view products (for public browsing)
CREATE POLICY product_select_anon
  ON product
  FOR SELECT
  TO anon
  USING (true);

-- Policy: Only service role can modify products
CREATE POLICY product_insert_admin
  ON product
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY product_update_admin
  ON product
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY product_delete_admin
  ON product
  FOR DELETE
  TO service_role
  USING (true);


-- ============================================
-- PRODUCT_DIAMOND_INFO TABLE POLICIES
-- ============================================

-- Policy: Anyone can view diamond info
CREATE POLICY product_diamond_info_select_all
  ON product_diamond_info
  FOR SELECT
  USING (true);

-- Policy: Only service role can modify diamond info
CREATE POLICY product_diamond_info_insert_admin
  ON product_diamond_info
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY product_diamond_info_update_admin
  ON product_diamond_info
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY product_diamond_info_delete_admin
  ON product_diamond_info
  FOR DELETE
  TO service_role
  USING (true);


-- ============================================
-- PRODUCT_MATERIAL_INFO TABLE POLICIES
-- ============================================

-- Policy: Anyone can view material info
CREATE POLICY product_material_info_select_all
  ON product_material_info
  FOR SELECT
  USING (true);

-- Policy: Only service role can modify material info
CREATE POLICY product_material_info_insert_admin
  ON product_material_info
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY product_material_info_update_admin
  ON product_material_info
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY product_material_info_delete_admin
  ON product_material_info
  FOR DELETE
  TO service_role
  USING (true);


-- ============================================
-- PRODUCT_IMAGE TABLE POLICIES
-- ============================================

-- Policy: Anyone can view product images
CREATE POLICY product_image_select_all
  ON product_image
  FOR SELECT
  USING (true);

-- Policy: Only service role can modify product images
CREATE POLICY product_image_insert_admin
  ON product_image
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY product_image_update_admin
  ON product_image
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY product_image_delete_admin
  ON product_image
  FOR DELETE
  TO service_role
  USING (true);


-- ============================================
-- NOTICE TABLE POLICIES (Public Read)
-- ============================================

-- Policy: Anyone can view notices
CREATE POLICY notice_select_all
  ON notice
  FOR SELECT
  USING (true);

-- Policy: Only service role can modify notices
CREATE POLICY notice_insert_admin
  ON notice
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY notice_update_admin
  ON notice
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY notice_delete_admin
  ON notice
  FOR DELETE
  TO service_role
  USING (true);


-- ============================================
-- HELPER FUNCTION: Check if user is admin
-- ============================================

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if the current user has admin role
  -- This can be customized based on your auth setup
  RETURN (
    SELECT EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON POLICY member_select_own ON member IS 'Members can view their own profile';
COMMENT ON POLICY member_update_own ON member IS 'Members can update their own profile';
COMMENT ON POLICY product_select_authenticated ON product IS 'Authenticated users can view all products';
COMMENT ON POLICY product_select_anon ON product IS 'Anonymous users can view all products';

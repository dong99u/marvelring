-- Wishlist (관심저장) table for product favorites
-- Allows authenticated users to save products they're interested in

-- ============================================
-- TABLE: member_wishlist (관심 저장)
-- ============================================
CREATE TABLE member_wishlist (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES product(product_id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

COMMENT ON TABLE member_wishlist IS '회원 관심 저장 (위시리스트)';
COMMENT ON COLUMN member_wishlist.user_id IS 'Supabase Auth 사용자 UUID';
COMMENT ON COLUMN member_wishlist.product_id IS '관심 상품 ID';

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_wishlist_user_id ON member_wishlist(user_id);
CREATE INDEX idx_wishlist_product_id ON member_wishlist(product_id);
CREATE INDEX idx_wishlist_created_at ON member_wishlist(created_at DESC);

-- ============================================
-- RLS POLICIES
-- ============================================
ALTER TABLE member_wishlist ENABLE ROW LEVEL SECURITY;

-- Authenticated users can view their own wishlist
CREATE POLICY wishlist_select_own
  ON member_wishlist
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Authenticated users can add to their own wishlist
CREATE POLICY wishlist_insert_own
  ON member_wishlist
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Authenticated users can remove from their own wishlist
CREATE POLICY wishlist_delete_own
  ON member_wishlist
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Service role can manage all wishlist entries
CREATE POLICY wishlist_all_admin
  ON member_wishlist
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Initial schema migration for MarvelRing e-commerce platform
-- PostgreSQL 15+ compatible with Supabase

-- ============================================
-- ENUM TYPES
-- ============================================

-- Business type enum
CREATE TYPE business_type_enum AS ENUM ('WHOLESALE', 'RETAIL');

-- Approval status enum
CREATE TYPE approval_status_enum AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- Material type enum
CREATE TYPE material_type_enum AS ENUM (
  '14K',
  '18K',
  '24K',
  'PLATINUM',
  'SILVER',
  'WHITE_GOLD',
  'ROSE_GOLD'
);


-- ============================================
-- TABLE: member (회원)
-- ============================================
CREATE TABLE member (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  company_name VARCHAR(200),
  ceo_name VARCHAR(100),
  biz_reg_num VARCHAR(50) UNIQUE,
  biz_reg_image_url TEXT,
  business_type business_type_enum NOT NULL DEFAULT 'RETAIL',
  approval_status approval_status_enum NOT NULL DEFAULT 'PENDING',
  zip_code VARCHAR(20),
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE member IS '회원 정보 테이블';
COMMENT ON COLUMN member.business_type IS '도매(WHOLESALE) 또는 소매(RETAIL)';
COMMENT ON COLUMN member.approval_status IS '승인 상태: PENDING(대기), APPROVED(승인), REJECTED(거부)';


-- ============================================
-- TABLE: collection (브랜드/컬렉션)
-- ============================================
CREATE TABLE collection (
  id BIGSERIAL PRIMARY KEY,
  brand_name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  logo_image_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE collection IS '브랜드/컬렉션 테이블';
COMMENT ON COLUMN collection.slug IS 'URL 친화적인 식별자';


-- ============================================
-- TABLE: category (카테고리)
-- ============================================
CREATE TABLE category (
  id BIGSERIAL PRIMARY KEY,
  category_name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE category IS '상품 카테고리 테이블';


-- ============================================
-- TABLE: product (상품)
-- ============================================
CREATE TABLE product (
  id BIGSERIAL PRIMARY KEY,
  collection_id BIGINT REFERENCES collection(id) ON DELETE SET NULL,
  category_id BIGINT REFERENCES category(id) ON DELETE SET NULL,
  product_name VARCHAR(300) NOT NULL,
  product_code VARCHAR(100) UNIQUE,
  base_labor_cost DECIMAL(12, 2) DEFAULT 0.00,
  stone_setting_cost DECIMAL(12, 2) DEFAULT 0.00,
  weight DECIMAL(10, 2),
  ring_size VARCHAR(50),
  size VARCHAR(50),
  description TEXT,
  additional_information TEXT,
  retail_price DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  wholesale_price DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  is_sale BOOLEAN NOT NULL DEFAULT FALSE,
  sale_price DECIMAL(12, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE product IS '상품 메인 테이블';
COMMENT ON COLUMN product.base_labor_cost IS '기본 공임비';
COMMENT ON COLUMN product.stone_setting_cost IS '돌 세팅 비용';
COMMENT ON COLUMN product.retail_price IS '소매가';
COMMENT ON COLUMN product.wholesale_price IS '도매가';
COMMENT ON COLUMN product.is_sale IS '할인 적용 여부';


-- ============================================
-- TABLE: product_diamond_info (다이아몬드 정보)
-- ============================================
CREATE TABLE product_diamond_info (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES product(id) ON DELETE CASCADE,
  diamond_size DECIMAL(8, 2),
  diamond_amount INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE product_diamond_info IS '상품별 다이아몬드 정보 (1:N)';


-- ============================================
-- TABLE: product_material_info (소재 정보)
-- ============================================
CREATE TABLE product_material_info (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES product(id) ON DELETE CASCADE,
  material_type material_type_enum NOT NULL,
  weight DECIMAL(10, 2),
  purity VARCHAR(50),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE product_material_info IS '상품별 소재 정보 (1:N)';


-- ============================================
-- TABLE: product_image (상품 이미지)
-- ============================================
CREATE TABLE product_image (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES product(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  title VARCHAR(300),
  description TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_main BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE product_image IS '상품 이미지 테이블 (1:N)';
COMMENT ON COLUMN product_image.is_main IS '대표 이미지 여부';


-- ============================================
-- TABLE: notice (공지사항)
-- ============================================
CREATE TABLE notice (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN NOT NULL DEFAULT FALSE,
  view_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE notice IS '공지사항 테이블';
COMMENT ON COLUMN notice.is_pinned IS '상단 고정 여부';


-- ============================================
-- INDEXES
-- ============================================

-- member table indexes
CREATE INDEX idx_member_approval_status ON member(approval_status);
CREATE INDEX idx_member_business_type ON member(business_type);
CREATE INDEX idx_member_email ON member(email);
CREATE INDEX idx_member_username ON member(username);

-- product table indexes
CREATE INDEX idx_product_created_at ON product(created_at DESC);
CREATE INDEX idx_product_is_sale ON product(is_sale);
CREATE INDEX idx_product_collection_id ON product(collection_id);
CREATE INDEX idx_product_category_id ON product(category_id);
CREATE INDEX idx_product_code ON product(product_code);

-- product_diamond_info indexes
CREATE INDEX idx_product_diamond_product_id ON product_diamond_info(product_id);

-- product_material_info indexes
CREATE INDEX idx_product_material_product_id ON product_material_info(product_id);

-- product_image indexes
CREATE INDEX idx_product_image_product_id ON product_image(product_id);
CREATE INDEX idx_product_image_is_main ON product_image(is_main);

-- notice table indexes
CREATE INDEX idx_notice_is_pinned ON notice(is_pinned);
CREATE INDEX idx_notice_created_at ON notice(created_at DESC);


-- ============================================
-- FUNCTIONS: updated_at auto-update trigger
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_member_updated_at BEFORE UPDATE ON member
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collection_updated_at BEFORE UPDATE ON collection
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_category_updated_at BEFORE UPDATE ON category
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_updated_at BEFORE UPDATE ON product
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_diamond_info_updated_at BEFORE UPDATE ON product_diamond_info
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_material_info_updated_at BEFORE UPDATE ON product_material_info
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_image_updated_at BEFORE UPDATE ON product_image
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notice_updated_at BEFORE UPDATE ON notice
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

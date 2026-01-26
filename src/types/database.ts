/**
 * Database Type Definitions
 * Based on Marvelring ERD (2026-01-26)
 */

// Enums
export type Role = 'ROLE_ADMIN' | 'ROLE_USER'
export type BusinessType = 'WHOLESALE' | 'RETAIL'
export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED'
export type MaterialType =
  | '14K'
  | '18K'
  | '24K'
  | 'PLATINUM'
  | 'SILVER'
  | 'WHITE_GOLD'
  | 'ROSE_GOLD'

/**
 * Member (회원)
 * Represents a B2B user account
 */
export interface Member {
  member_id: number
  username: string
  role: Role
  email: string
  password: string
  company_name: string
  ceo_name: string
  biz_reg_num: string
  biz_reg_image_url: string
  business_type: BusinessType
  approval_status: ApprovalStatus
  approved_at: string | null
  zip_code: string
  main_address: string
  detail_address: string | null
  created_at: string
  updated_at: string
}

/**
 * Collection (브랜드/컬렉션)
 * Represents luxury brand collections
 */
export interface Collection {
  collection_id: number
  brand_name: string
  slug: string
  logo_image_url: string | null
  display_order: number
  created_at: string
  updated_at: string
}

/**
 * Category (카테고리)
 * Product categories (ring, necklace, etc.)
 */
export interface Category {
  category_id: number
  category_name: string
  slug: string
  display_order: number
  created_at: string
  updated_at: string
}

/**
 * Product (상품)
 * Main product entity
 */
export interface Product {
  product_id: number
  collection_id: number | null
  category_id: number
  product_name: string
  product_code: string
  base_labor_cost: number | null
  stone_setting_cost: number | null
  weight: number | null
  ring_size: number | null
  size: number | null
  description: string | null
  additional_information: string | null
  retail_price: number
  wholesale_price: number
  is_sale: boolean
  sale_price: number | null
  created_at: string
  updated_at: string
}

/**
 * ProductDiamondInfo (상품 다이아몬드 정보)
 * Diamond specifications for a product
 */
export interface ProductDiamondInfo {
  product_diamond_info_id: number
  product_id: number
  diamond_size: number
  diamond_amount: number
}

/**
 * ProductMaterialInfo (상품 재질 정보)
 * Material specifications for a product
 */
export interface ProductMaterialInfo {
  product_material_info_id: number
  product_id: number
  material_type: MaterialType
  weight: number
  purity: number | null
}

/**
 * ProductImage (상품 이미지)
 * Product images with metadata
 */
export interface ProductImage {
  product_image_id: number
  product_id: number
  image_url: string
  title: string | null
  description: string | null
  display_order: number
  is_main: boolean
  created_at: string
}

/**
 * Notice (공지사항)
 * Announcements and notices
 */
export interface Notice {
  notice_id: number
  member_id: number | null
  title: string
  content: string
  is_pinned: boolean
  view_count: number
  created_at: string
  updated_at: string
}

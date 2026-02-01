-- Migration: Add is_new field to product table
-- Task #2: 데이터베이스 스키마 완성

-- Add is_new column to product table for NEW badge display
ALTER TABLE product
ADD COLUMN is_new BOOLEAN DEFAULT false NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN product.is_new IS 'Flag to mark product as new for NEW badge display';

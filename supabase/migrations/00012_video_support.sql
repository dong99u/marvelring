-- Migration: Add video support to product images
-- Description: Extends product-images bucket and product_image table to support video files

-- Update product-images bucket to support video files
UPDATE storage.buckets
SET
  file_size_limit = 52428800, -- 50MB
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm']
WHERE id = 'product-images';

-- Add media_type column to product_image table
ALTER TABLE product_image
ADD COLUMN media_type VARCHAR(10) NOT NULL DEFAULT 'image';

-- Add comment on media_type column
COMMENT ON COLUMN product_image.media_type IS 'Type of media: "image" or "video"';

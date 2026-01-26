-- Storage Buckets Configuration
-- For business documents and product images

-- ============================================
-- STORAGE BUCKETS
-- ============================================

-- Bucket for business registration documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'business-documents',
  'business-documents',
  false, -- Private bucket
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
) ON CONFLICT (id) DO NOTHING;

-- Bucket for product images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true, -- Public bucket
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;


-- ============================================
-- STORAGE POLICIES: business-documents
-- ============================================

-- Policy: Members can upload their own business documents
CREATE POLICY business_documents_insert_own
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'business-documents' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Policy: Members can view their own business documents
CREATE POLICY business_documents_select_own
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'business-documents' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Policy: Members can update their own business documents
CREATE POLICY business_documents_update_own
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'business-documents' AND
    (storage.foldername(name))[1] = auth.uid()::text
  )
  WITH CHECK (
    bucket_id = 'business-documents' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Policy: Members can delete their own business documents
CREATE POLICY business_documents_delete_own
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'business-documents' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Policy: Admins can view all business documents
CREATE POLICY business_documents_select_admin
  ON storage.objects
  FOR SELECT
  TO service_role
  USING (bucket_id = 'business-documents');


-- ============================================
-- STORAGE POLICIES: product-images
-- ============================================

-- Policy: Anyone can view product images (public bucket)
CREATE POLICY product_images_select_all
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'product-images');

-- Policy: Only service role can upload product images
CREATE POLICY product_images_insert_admin
  ON storage.objects
  FOR INSERT
  TO service_role
  WITH CHECK (bucket_id = 'product-images');

-- Policy: Only service role can update product images
CREATE POLICY product_images_update_admin
  ON storage.objects
  FOR UPDATE
  TO service_role
  USING (bucket_id = 'product-images')
  WITH CHECK (bucket_id = 'product-images');

-- Policy: Only service role can delete product images
CREATE POLICY product_images_delete_admin
  ON storage.objects
  FOR DELETE
  TO service_role
  USING (bucket_id = 'product-images');


-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON POLICY business_documents_insert_own ON storage.objects IS 'Members can upload their own business documents';
COMMENT ON POLICY business_documents_select_own ON storage.objects IS 'Members can view their own business documents';
COMMENT ON POLICY product_images_select_all ON storage.objects IS 'Public access to product images';

-- Fix Storage Policies for Business Documents
-- Issue: Users cannot upload during signup due to RLS policy restrictions

-- ============================================
-- ENSURE BUCKET EXISTS
-- ============================================

-- Create bucket if not exists (idempotent)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'business-documents',
  'business-documents',
  false, -- Private bucket
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
) ON CONFLICT (id) DO UPDATE SET
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;


-- ============================================
-- DROP EXISTING POLICIES (if they exist)
-- ============================================

DROP POLICY IF EXISTS business_documents_insert_own ON storage.objects;
DROP POLICY IF EXISTS business_documents_select_own ON storage.objects;
DROP POLICY IF EXISTS business_documents_update_own ON storage.objects;
DROP POLICY IF EXISTS business_documents_delete_own ON storage.objects;
DROP POLICY IF EXISTS business_documents_select_admin ON storage.objects;


-- ============================================
-- CREATE NEW POLICIES
-- ============================================

-- Policy: Authenticated users can upload to their own folder
-- Path format: {user_id}/{filename}
CREATE POLICY business_documents_insert_own
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'business-documents' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Policy: Authenticated users can view their own documents
CREATE POLICY business_documents_select_own
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'business-documents' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Policy: Authenticated users can update their own documents
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

-- Policy: Authenticated users can delete their own documents
CREATE POLICY business_documents_delete_own
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'business-documents' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Policy: Service role (admin) can view all business documents
CREATE POLICY business_documents_select_admin
  ON storage.objects
  FOR SELECT
  TO service_role
  USING (bucket_id = 'business-documents');

-- Policy: Service role (admin) can manage all business documents
CREATE POLICY business_documents_all_admin
  ON storage.objects
  FOR ALL
  TO service_role
  USING (bucket_id = 'business-documents')
  WITH CHECK (bucket_id = 'business-documents');


-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON POLICY business_documents_insert_own ON storage.objects IS 'Authenticated users can upload to their own folder ({user_id}/*)';
COMMENT ON POLICY business_documents_select_own ON storage.objects IS 'Authenticated users can view their own documents';
COMMENT ON POLICY business_documents_update_own ON storage.objects IS 'Authenticated users can update their own documents';
COMMENT ON POLICY business_documents_delete_own ON storage.objects IS 'Authenticated users can delete their own documents';
COMMENT ON POLICY business_documents_select_admin ON storage.objects IS 'Admins can view all business documents';
COMMENT ON POLICY business_documents_all_admin ON storage.objects IS 'Admins can manage all business documents';

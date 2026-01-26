-- Member Approval Workflow Enhancement
-- Adds approval tracking fields and admin policies

-- ============================================
-- ADD APPROVAL WORKFLOW COLUMNS
-- ============================================

-- Add approved_at timestamp
ALTER TABLE member
ADD COLUMN approved_at TIMESTAMPTZ;

-- Add approved_by FK to track which admin approved
ALTER TABLE member
ADD COLUMN approved_by BIGINT REFERENCES member(id) ON DELETE SET NULL;

-- Add rejected_reason text field
ALTER TABLE member
ADD COLUMN rejected_reason TEXT;

COMMENT ON COLUMN member.approved_at IS 'Timestamp when user was approved';
COMMENT ON COLUMN member.approved_by IS 'Admin member ID who approved this user';
COMMENT ON COLUMN member.rejected_reason IS 'Reason provided when user was rejected';


-- ============================================
-- CREATE INDEXES FOR APPROVAL WORKFLOW
-- ============================================

CREATE INDEX idx_member_approved_at ON member(approved_at);
CREATE INDEX idx_member_approved_by ON member(approved_by);


-- ============================================
-- RLS POLICIES FOR ADMIN APPROVAL WORKFLOW
-- ============================================

-- Policy: Admin users can view all members (for approval workflow)
-- Admin is identified by raw_app_meta_data->>'role' = 'admin'
CREATE POLICY member_select_admin_users
  ON member
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );

-- Policy: Admin users can update member approval status
CREATE POLICY member_update_approval_admin
  ON member
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );


-- ============================================
-- HELPER FUNCTIONS FOR APPROVAL WORKFLOW
-- ============================================

-- Function to approve a member
CREATE OR REPLACE FUNCTION approve_member(
  member_id_param BIGINT,
  admin_id_param BIGINT
)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE member
  SET
    approval_status = 'APPROVED',
    approved_at = NOW(),
    approved_by = admin_id_param,
    rejected_reason = NULL
  WHERE id = member_id_param;

  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION approve_member IS 'Approves a member and records admin who approved';


-- Function to reject a member
CREATE OR REPLACE FUNCTION reject_member(
  member_id_param BIGINT,
  admin_id_param BIGINT,
  reason_param TEXT
)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE member
  SET
    approval_status = 'REJECTED',
    approved_at = NULL,
    approved_by = admin_id_param,
    rejected_reason = reason_param
  WHERE id = member_id_param;

  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION reject_member IS 'Rejects a member with a reason and records admin who rejected';


-- ============================================
-- TRIGGER: Notify on approval status change
-- ============================================

CREATE OR REPLACE FUNCTION notify_approval_status_change()
RETURNS TRIGGER AS $$
BEGIN
  -- This trigger will be used to notify external systems (e.g., email service)
  -- when approval_status changes
  IF OLD.approval_status IS DISTINCT FROM NEW.approval_status THEN
    -- Payload for external notification system
    PERFORM pg_notify(
      'member_approval_changed',
      json_build_object(
        'member_id', NEW.id,
        'email', NEW.email,
        'old_status', OLD.approval_status,
        'new_status', NEW.approval_status,
        'approved_by', NEW.approved_by,
        'rejected_reason', NEW.rejected_reason
      )::text
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER member_approval_status_changed
  AFTER UPDATE OF approval_status ON member
  FOR EACH ROW
  EXECUTE FUNCTION notify_approval_status_change();

COMMENT ON TRIGGER member_approval_status_changed ON member IS 'Triggers notification when approval status changes';


-- ============================================
-- VIEWS FOR ADMIN DASHBOARD
-- ============================================

-- View: Pending members awaiting approval
CREATE OR REPLACE VIEW pending_members AS
SELECT
  m.id,
  m.username,
  m.email,
  m.company_name,
  m.ceo_name,
  m.biz_reg_num,
  m.business_type,
  m.approval_status,
  m.created_at
FROM member m
WHERE m.approval_status = 'PENDING'
ORDER BY m.created_at ASC;

COMMENT ON VIEW pending_members IS 'List of members pending approval, ordered by registration date';


-- Grant access to authenticated users (admin check in RLS)
GRANT SELECT ON pending_members TO authenticated;

-- Email Notification Triggers
-- Enhanced notification system for member approval workflow

-- ============================================
-- ENHANCED APPROVAL STATUS NOTIFICATION
-- ============================================

-- Drop existing trigger and function to replace with enhanced version
DROP TRIGGER IF EXISTS member_approval_status_changed ON member;
DROP FUNCTION IF EXISTS notify_approval_status_change();

-- Enhanced notification function with complete member data
CREATE OR REPLACE FUNCTION notify_approval_status_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Only notify when approval_status actually changes
  IF OLD.approval_status IS DISTINCT FROM NEW.approval_status THEN
    -- Send notification with complete member information
    PERFORM pg_notify(
      'approval_status_changed',
      json_build_object(
        'member_id', NEW.id,
        'email', NEW.email,
        'username', NEW.username,
        'company_name', NEW.company_name,
        'old_status', OLD.approval_status,
        'new_status', NEW.approval_status,
        'approved_by', NEW.approved_by,
        'approved_at', NEW.approved_at,
        'rejected_reason', NEW.rejected_reason,
        'timestamp', NOW()
      )::text
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION notify_approval_status_change IS 'Notifies external systems when member approval status changes';

-- Create trigger on approval_status changes
CREATE TRIGGER member_approval_status_changed
  AFTER UPDATE OF approval_status ON member
  FOR EACH ROW
  EXECUTE FUNCTION notify_approval_status_change();

COMMENT ON TRIGGER member_approval_status_changed ON member IS 'Triggers email notification when approval status changes';


-- ============================================
-- HELPER FUNCTION: Invoke Email Edge Function
-- ============================================

-- Function to invoke Supabase Edge Function for email sending
-- This will be called by application code or webhooks
CREATE OR REPLACE FUNCTION send_approval_email(
  member_id_param BIGINT
)
RETURNS JSON AS $$
DECLARE
  member_data RECORD;
  result JSON;
BEGIN
  -- Fetch member details
  SELECT
    id,
    email,
    username,
    company_name,
    approval_status,
    rejected_reason
  INTO member_data
  FROM member
  WHERE id = member_id_param;

  -- Check if member exists
  IF NOT FOUND THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Member not found'
    );
  END IF;

  -- Return member data for email function to process
  -- Actual email sending happens in Edge Function
  RETURN json_build_object(
    'success', true,
    'member_id', member_data.id,
    'email', member_data.email,
    'username', member_data.username,
    'company_name', member_data.company_name,
    'approval_status', member_data.approval_status,
    'rejected_reason', member_data.rejected_reason
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION send_approval_email IS 'Prepares member data for email Edge Function';


-- ============================================
-- EMAIL LOG TABLE (Optional - for tracking)
-- ============================================

-- Create table to log sent emails
CREATE TABLE IF NOT EXISTS email_log (
  id BIGSERIAL PRIMARY KEY,
  member_id BIGINT REFERENCES member(id) ON DELETE CASCADE,
  email_type VARCHAR(50) NOT NULL, -- 'APPROVAL', 'REJECTION', 'NOTIFICATION'
  recipient_email VARCHAR(255) NOT NULL,
  subject TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'PENDING', -- 'PENDING', 'SENT', 'FAILED'
  error_message TEXT,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT email_log_email_type_check CHECK (email_type IN ('APPROVAL', 'REJECTION', 'NOTIFICATION')),
  CONSTRAINT email_log_status_check CHECK (status IN ('PENDING', 'SENT', 'FAILED', 'RETRY'))
);

CREATE INDEX idx_email_log_member_id ON email_log(member_id);
CREATE INDEX idx_email_log_status ON email_log(status);
CREATE INDEX idx_email_log_created_at ON email_log(created_at);

COMMENT ON TABLE email_log IS 'Tracks all emails sent by the system';
COMMENT ON COLUMN email_log.email_type IS 'Type of email: APPROVAL, REJECTION, NOTIFICATION';
COMMENT ON COLUMN email_log.status IS 'Email sending status: PENDING, SENT, FAILED, RETRY';


-- ============================================
-- FUNCTION: Log email sending attempt
-- ============================================

CREATE OR REPLACE FUNCTION log_email_attempt(
  member_id_param BIGINT,
  email_type_param VARCHAR(50),
  recipient_email_param VARCHAR(255),
  subject_param TEXT,
  status_param VARCHAR(50) DEFAULT 'PENDING',
  error_message_param TEXT DEFAULT NULL
)
RETURNS BIGINT AS $$
DECLARE
  log_id BIGINT;
BEGIN
  INSERT INTO email_log (
    member_id,
    email_type,
    recipient_email,
    subject,
    status,
    error_message,
    sent_at
  ) VALUES (
    member_id_param,
    email_type_param,
    recipient_email_param,
    subject_param,
    status_param,
    error_message_param,
    CASE WHEN status_param = 'SENT' THEN NOW() ELSE NULL END
  )
  RETURNING id INTO log_id;

  RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION log_email_attempt IS 'Records an email sending attempt in the log';


-- ============================================
-- GRANT PERMISSIONS
-- ============================================

-- Grant SELECT on email_log to authenticated users (for their own emails)
GRANT SELECT ON email_log TO authenticated;

-- RLS for email_log - users can only see their own email logs
ALTER TABLE email_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY email_log_select_own
  ON email_log
  FOR SELECT
  TO authenticated
  USING (
    member_id IN (
      SELECT id FROM member WHERE auth_user_id = auth.uid()
    )
  );

-- Admin can see all email logs
CREATE POLICY email_log_select_admin
  ON email_log
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );

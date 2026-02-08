# Admin User Approval Workflow

This directory contains the admin interface for managing pending member approvals in the Marvelring B2B platform.

## Overview

The user approval workflow allows administrators to:
- View all pending member registrations
- Approve members to grant them access
- Reject members with a reason
- Track approval history and audit trail

## Architecture

### Database Layer
- **Migration**: `supabase/migrations/00005_member_approval_workflow.sql`
  - Adds `approved_at`, `approved_by`, `rejected_reason` columns to member table
  - Creates RLS policies for admin access
  - Adds database functions: `approve_member()`, `reject_member()`
  - Creates trigger for email notifications
  - Adds `pending_members` view

### Server Layer
- **Helpers**: `src/lib/supabase/approval.ts`
  - `getPendingMembers()` - Fetch pending users
  - `approveMember()` - Approve a user
  - `rejectMember()` - Reject a user with reason
  - `isAdmin()` - Check admin authorization

- **Server Actions**: `src/app/actions/approval.ts`
  - `fetchPendingMembersAction()` - Server action to fetch pending members
  - `approveMemberAction()` - Server action to approve member
  - `rejectMemberAction()` - Server action to reject member
  - `fetchMemberDetailsAction()` - Server action to get member details

### UI Layer
- **Page**: `src/app/admin/users/page.tsx`
  - Server component that renders the pending members list
  - Fetches data using server actions
  - Displays member information cards

- **Actions Component**: `src/app/admin/users/ApprovalActions.tsx`
  - Client component for interactive approve/reject buttons
  - Form for rejection reason input
  - Optimistic UI updates with automatic revalidation

### Notification Layer
- **Edge Function**: `supabase/functions/send-approval-email/index.ts`
  - Triggered by database when approval_status changes
  - Sends approval or rejection email to member
  - Integrates with email service (Resend, SendGrid, etc.)

## Usage

### For Administrators

1. Navigate to `/admin/users` in the admin dashboard
2. View the list of pending member registrations
3. Review member details:
   - Username and email
   - Company information
   - Business type (Wholesale/Retail)
   - Business registration number
4. Take action:
   - Click "Approve" to grant access
   - Click "Reject" to deny access with a reason

### For Developers

#### Checking Admin Status
```typescript
import { isAdmin } from '@/lib/supabase/approval'

const adminStatus = await isAdmin()
if (!adminStatus) {
  // Redirect or show error
}
```

#### Approving a Member
```typescript
import { approveMemberAction } from '@/app/actions/approval'

const result = await approveMemberAction(memberId)
if (result.success) {
  // Handle success
} else {
  // Handle error: result.error
}
```

#### Rejecting a Member
```typescript
import { rejectMemberAction } from '@/app/actions/approval'

const result = await rejectMemberAction(memberId, 'Reason for rejection')
if (result.success) {
  // Handle success
} else {
  // Handle error: result.error
}
```

## Security

### RLS Policies
- Only users with `auth.users.raw_app_meta_data->>'role' = 'admin'` can:
  - View all members
  - Update member approval status

### Server-Side Validation
- All actions check admin status before execution
- Rejection requires a non-empty reason
- Member ID validation prevents unauthorized modifications

### Audit Trail
- `approved_by` tracks which admin approved/rejected
- `approved_at` tracks when action was taken
- `rejected_reason` records justification for rejections

## Email Notifications

When a member's status changes:
1. Database trigger fires: `member_approval_status_changed`
2. PostgreSQL `pg_notify` sends event
3. Edge function receives notification
4. Email sent to member:
   - **Approved**: Welcome email with login link
   - **Rejected**: Notification with reason and support contact

### Email Service Integration
See `supabase/functions/send-approval-email/README.md` for configuration.

## Database Schema

### member table additions
```sql
-- Approval workflow fields
approved_at TIMESTAMPTZ          -- When user was approved
approved_by BIGINT               -- Admin who approved (FK to member)
rejected_reason TEXT             -- Reason if rejected
```

### Database Functions
```sql
approve_member(member_id, admin_id) -> BOOLEAN
reject_member(member_id, admin_id, reason) -> BOOLEAN
```

### Views
```sql
pending_members  -- All members with approval_status = 'PENDING'
```

## Testing

### Manual Testing
1. Create a test user with PENDING status
2. Assign admin role to your account in Supabase Dashboard:
   ```sql
   UPDATE auth.users
   SET raw_app_meta_data = jsonb_set(
     COALESCE(raw_app_meta_data, '{}'::jsonb),
     '{role}',
     '"admin"'
   )
   WHERE email = 'your-admin@email.com';
   ```
3. Navigate to `/admin/users`
4. Test approve/reject actions

### Email Testing
```bash
# Test edge function locally
supabase functions serve send-approval-email

# Send test payload
curl -X POST http://localhost:54321/functions/v1/send-approval-email \
  -H "Content-Type: application/json" \
  -d '{
    "member_id": 1,
    "email": "test@example.com",
    "old_status": "PENDING",
    "new_status": "APPROVED"
  }'
```

## Future Enhancements

- Bulk approval/rejection
- Member search and filtering
- Approval history view
- Document upload verification (business registration images)
- Automated verification checks
- Admin activity logs
- Email templates with branding
- Multi-step approval workflow

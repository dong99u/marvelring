# Admin Module - Technical Documentation

Complete technical reference for the MarvelRing B2B platform admin interface, including architecture, APIs, and implementation details.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Components](#components)
3. [Database Layer](#database-layer)
4. [Server Actions](#server-actions)
5. [Authentication & Authorization](#authentication--authorization)
6. [RLS Policies](#row-level-security-policies)
7. [API Reference](#api-reference)
8. [Testing](#testing)
9. [Deployment](#deployment)

---

## Architecture Overview

The admin module follows a modern Next.js architecture with three layers:

```
┌─────────────────────────────────────────┐
│   UI Layer (React Components)           │
│   - /admin/users/page.tsx               │
│   - ApprovalActions.tsx                 │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│   Server Action Layer                   │
│   - fetchPendingMembersAction()          │
│   - approveMemberAction()                │
│   - rejectMemberAction()                 │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│   Library Layer (Helpers)                │
│   - getPendingMembers()                  │
│   - approveMember()                      │
│   - rejectMember()                       │
│   - isAdmin()                            │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│   Database Layer (Supabase)              │
│   - RLS Policies                         │
│   - Tables: member, pending_members      │
│   - Functions: approve_member,           │
│     reject_member                        │
└─────────────────────────────────────────┘
```

### Data Flow

1. **Request**: User action on admin page
2. **Client Validation**: ApprovalActions component validates input
3. **Server Action**: Calls server action with member ID/reason
4. **Authorization**: Checks admin role via `isAdmin()`
5. **Database Transaction**: Calls RPC function or direct query
6. **Cache Revalidation**: Updates UI via `revalidatePath()`
7. **Response**: User sees updated list

---

## Components

### Directory Structure

```
src/app/admin/
├── README.md                          # This file
├── layout.tsx                         # Admin layout wrapper
├── page.tsx                          # Admin dashboard index
└── users/
    ├── page.tsx                      # Pending members list
    ├── ApprovalActions.tsx           # Client component for approve/reject
    └── README.md                     # User approval workflow docs
```

### Page: `/admin/users/page.tsx`

**Type:** Server Component
**Purpose:** Display list of pending members awaiting approval

**Key Features:**
- Server-side data fetching
- Authorization check at page level
- Admin-only access
- Real-time pending members list

**Implementation:**

```typescript
import { fetchPendingMembersAction } from '@/app/actions/approval'
import { ApprovalActions } from './ApprovalActions'

export default async function AdminUsersPage() {
  // Fetch pending members (includes auth check)
  const { data: pendingMembers, error } = await fetchPendingMembersAction()

  // Render pending members with action buttons
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Pending Member Approvals</h1>
      {/* Display members and use ApprovalActions component */}
    </div>
  )
}
```

**Data Structure:**

Each member card displays:
```typescript
interface PendingMember {
  id: number
  username: string
  email: string
  company_name: string | null
  ceo_name: string | null
  biz_reg_num: string | null
  business_type: 'WHOLESALE' | 'RETAIL'
  approval_status: 'PENDING' | 'APPROVED' | 'REJECTED'
  created_at: string
}
```

### Component: `ApprovalActions.tsx`

**Type:** Client Component
**Purpose:** Interactive approve/reject buttons with forms

**Key Features:**
- Two-state UI (action buttons vs. rejection form)
- Form validation for rejection reason
- Loading states and error handling
- Optimistic UI updates

**Props:**
```typescript
interface ApprovalActionsProps {
  memberId: number  // ID of member to approve/reject
}
```

**State:**
```typescript
- isApproving: boolean       // Approve button loading state
- isRejecting: boolean       // Reject button loading state
- showRejectForm: boolean    // Toggle rejection form visibility
- rejectionReason: string    // Textarea content
- error: string | null       // Error message display
```

**Handlers:**

**`handleApprove()`**
- Calls `approveMemberAction(memberId)`
- Handles async response
- Shows error if failed
- Clears error on success (page revalidates)

**`handleReject()`**
- Validates rejection reason is not empty
- Calls `rejectMemberAction(memberId, reason)`
- Handles async response
- Shows error if failed
- Clears form on success

**UI States:**

1. **Initial State** - Approve/Reject buttons visible
2. **Rejecting State** - Rejection form with textarea
3. **Loading** - Disabled buttons with loading text
4. **Error** - Error message displayed above buttons

---

## Database Layer

### Member Table Schema

```sql
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
  approved_at TIMESTAMPTZ,           -- When approved
  approved_by BIGINT,                 -- Admin who approved (FK)
  rejected_reason TEXT,               -- Why rejected
  zip_code VARCHAR(20),
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_member_approval_status ON member(approval_status);
CREATE INDEX idx_member_approved_at ON member(approved_at);
CREATE INDEX idx_member_approved_by ON member(approved_by);
```

### Approval Status Enum

```sql
CREATE TYPE approval_status_enum AS ENUM (
  'PENDING',    -- Awaiting admin review
  'APPROVED',   -- User has access
  'REJECTED'    -- User denied access
);
```

### Pending Members View

```sql
CREATE VIEW pending_members AS
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
```

**Purpose:** Performance optimization for admin pending users list

### Database Functions

#### `approve_member(member_id_param, admin_id_param)`

**Purpose:** Atomically approve a member and record admin action

```sql
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
```

**Parameters:**
- `member_id_param` - Member to approve
- `admin_id_param` - Admin performing action

**Returns:** `true` if update succeeded, `false` if member not found

**Side Effects:**
- Sets `approval_status` to 'APPROVED'
- Records timestamp in `approved_at`
- Records admin ID in `approved_by`
- Clears `rejected_reason`
- Triggers notification function

#### `reject_member(member_id_param, admin_id_param, reason_param)`

**Purpose:** Atomically reject a member with reason

```sql
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
```

**Parameters:**
- `member_id_param` - Member to reject
- `admin_id_param` - Admin performing action
- `reason_param` - Rejection reason text

**Returns:** `true` if update succeeded, `false` if member not found

### Triggers

#### `notify_approval_status_change()`

**Purpose:** Notify external systems when approval status changes

```sql
CREATE TRIGGER member_approval_status_changed
  AFTER UPDATE OF approval_status ON member
  FOR EACH ROW
  EXECUTE FUNCTION notify_approval_status_change();
```

**Payload Sent:**
```json
{
  "member_id": 123,
  "email": "user@company.com",
  "old_status": "PENDING",
  "new_status": "APPROVED",
  "approved_by": 1,
  "rejected_reason": null
}
```

**Consumers:** Email notification service, audit logs

---

## Server Actions

### Location: `src/app/actions/approval.ts`

**Purpose:** Server-only functions for approval operations

**Usage:**
```typescript
'use server'

import { approveMemberAction } from '@/app/actions/approval'

// In client component:
const result = await approveMemberAction(memberId)
```

### `fetchPendingMembersAction()`

**Signature:**
```typescript
export async function fetchPendingMembersAction(): Promise<{
  data: PendingMember[] | null
  error: string | null
}>
```

**Purpose:** Fetch all pending members awaiting approval

**Process:**
1. Check user is admin
2. Query `pending_members` view
3. Return data or error

**Returns:**
```typescript
// Success
{
  data: [
    { id: 1, username: 'john', email: 'john@company.com', ... },
    { id: 2, username: 'jane', email: 'jane@company.com', ... }
  ],
  error: null
}

// Error
{
  data: null,
  error: 'Unauthorized: Admin access required'
}
```

**Errors:**
- `'Unauthorized: Admin access required'` - User not admin
- `'Error fetching pending members'` - Database error

### `approveMemberAction(memberId)`

**Signature:**
```typescript
export async function approveMemberAction(
  memberId: number
): Promise<{
  success: boolean
  error?: string
}>
```

**Purpose:** Approve a pending member

**Process:**
1. Verify user is admin
2. Get current user's member record
3. Call `approve_member()` database function
4. Revalidate `/admin/users` cache
5. Return success/error

**Parameters:**
- `memberId` - Database ID of member to approve

**Returns:**
```typescript
// Success
{ success: true }

// Error
{ success: false, error: 'Unauthorized: Admin access required' }
```

**Errors:**
- `'Unauthorized: Admin access required'`
- `'Authentication required'`
- `'Admin member not found'`
- `'Failed to approve member'`

### `rejectMemberAction(memberId, reason)`

**Signature:**
```typescript
export async function rejectMemberAction(
  memberId: number,
  reason: string
): Promise<{
  success: boolean
  error?: string
}>
```

**Purpose:** Reject a pending member with reason

**Process:**
1. Verify user is admin
2. Validate reason is not empty
3. Get current user's member record
4. Call `reject_member()` database function
5. Revalidate `/admin/users` cache
6. Return success/error

**Parameters:**
- `memberId` - Database ID of member to reject
- `reason` - Explanation for rejection

**Returns:**
```typescript
// Success
{ success: true }

// Error
{ success: false, error: 'Rejection reason is required' }
```

**Errors:**
- `'Unauthorized: Admin access required'`
- `'Rejection reason is required'` - Reason is empty
- `'Authentication required'`
- `'Admin member not found'`
- `'Failed to reject member'`

### `fetchMemberDetailsAction(memberId)`

**Signature:**
```typescript
export async function fetchMemberDetailsAction(
  memberId: number
): Promise<{
  data: any | null
  error: string | null
}>
```

**Purpose:** Get full details for a specific member

**Returns:** Complete member record including all fields

---

## Authentication & Authorization

### Admin Role Detection

Users are identified as admins via Supabase authentication metadata:

```typescript
// In approval.ts
const role = user.app_metadata?.role
return role === 'admin'
```

### Setting Admin Role

In Supabase Dashboard:

1. Go to Authentication > Users
2. Click user email
3. Scroll to "User Metadata"
4. Add JSON:
```json
{
  "role": "admin"
}
```
5. Click "Update User"

### Role Checking

```typescript
import { isAdmin } from '@/lib/supabase/approval'

const adminStatus = await isAdmin()
if (!adminStatus) {
  // Redirect or show error
  return { error: 'Admin access required' }
}
```

---

## Row-Level Security Policies

### RLS Configuration

All approval operations use RLS policies enforced at database level.

### Policy: `member_select_admin_users`

**Type:** SELECT
**Target:** Users with `role = 'admin'`

```sql
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
```

**Allows:** Admins to view all member records

### Policy: `member_update_approval_admin`

**Type:** UPDATE
**Target:** Users with `role = 'admin'`

```sql
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
```

**Allows:** Admins to update member approval status

### Security Implications

- Only authenticated users can perform actions
- Admin role checked at database level
- No sensitive data exposed to non-admins
- Audit trail via `approved_by` and `approved_at`

---

## API Reference

### Client Usage

#### Approve Member

```typescript
import { approveMemberAction } from '@/app/actions/approval'

// In client component
const result = await approveMemberAction(42)

if (result.success) {
  // User approved successfully
  console.log('Member approved')
} else {
  // Show error to user
  console.error(result.error)
}
```

#### Reject Member

```typescript
import { rejectMemberAction } from '@/app/actions/approval'

const result = await rejectMemberAction(
  42,
  'Business registration could not be verified'
)

if (result.success) {
  console.log('Member rejected')
} else {
  console.error(result.error)
}
```

#### Fetch Pending Members

```typescript
import { fetchPendingMembersAction } from '@/app/actions/approval'

const { data, error } = await fetchPendingMembersAction()

if (error) {
  console.error('Failed to fetch:', error)
} else {
  console.log(`Found ${data?.length || 0} pending members`)
}
```

### Direct Library Usage (Server Only)

```typescript
import {
  getPendingMembers,
  approveMember,
  rejectMember,
  isAdmin
} from '@/lib/supabase/approval'

// Check admin status
const admin = await isAdmin()

// Get pending members
const { data, error } = await getPendingMembers()

// Approve via function
await approveMember(memberId, adminId)

// Reject via function
await rejectMember(memberId, adminId, 'reason')
```

---

## Testing

### Unit Tests

#### Test Admin Authorization

```typescript
describe('isAdmin()', () => {
  it('should return true for admin users', async () => {
    // Mock Supabase auth with admin role
    const result = await isAdmin()
    expect(result).toBe(true)
  })

  it('should return false for non-admin users', async () => {
    // Mock Supabase auth without admin role
    const result = await isAdmin()
    expect(result).toBe(false)
  })
})
```

#### Test Member Approval

```typescript
describe('approveMemberAction', () => {
  it('should approve a pending member', async () => {
    // Mock admin user
    // Mock pending member in database
    const result = await approveMemberAction(42)
    expect(result.success).toBe(true)
  })

  it('should reject if user is not admin', async () => {
    // Mock non-admin user
    const result = await approveMemberAction(42)
    expect(result.success).toBe(false)
    expect(result.error).toContain('Unauthorized')
  })
})
```

### Integration Tests

#### Test Complete Approval Flow

```typescript
describe('Admin approval workflow', () => {
  it('should approve member and send email', async () => {
    // 1. Create test member with PENDING status
    // 2. Create admin user
    // 3. Call approveMemberAction
    // 4. Verify database updated
    // 5. Verify email sent
  })
})
```

### Manual Testing

#### Test Approval

1. Create test user with PENDING status
2. Set admin role on your account:
```sql
UPDATE auth.users
SET raw_app_meta_data = jsonb_set(
  COALESCE(raw_app_meta_data, '{}'::jsonb),
  '{role}',
  '"admin"'
)
WHERE email = 'admin@test.com';
```
3. Navigate to `/admin/users`
4. Click Approve on test member
5. Verify member disappears from list
6. Check database: `approval_status` should be APPROVED

#### Test Rejection

1. Create test user with PENDING status
2. Navigate to `/admin/users`
3. Click Reject on test member
4. Enter rejection reason: "Test rejection"
5. Click Confirm Rejection
6. Verify member disappears from list
7. Check database: `approval_status` should be REJECTED, `rejected_reason` should be "Test rejection"

---

## Deployment

### Environment Variables

Ensure these are set in production:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[key]
SUPABASE_SERVICE_ROLE_KEY=[key]

# Database URL (for migrations)
DATABASE_URL=postgresql://[user]:[password]@[host]:5432/[db]
```

### Database Migrations

Migration file: `supabase/migrations/00005_member_approval_workflow.sql`

To apply:

```bash
# Using Supabase CLI
supabase db push

# Or manually in Supabase Dashboard SQL Editor
# Copy entire SQL file and execute
```

### Deployment Checklist

- [ ] Database migrations applied
- [ ] RLS policies enabled
- [ ] Admin roles assigned to admin users
- [ ] Email service configured
- [ ] `/admin` routes are private (require auth)
- [ ] Error logging configured
- [ ] Backups enabled

### Monitoring

#### Key Metrics to Monitor

1. **Approval Rate** - Members approved per day
2. **Rejection Rate** - Members rejected per day
3. **Pending Count** - Backlog of applications
4. **Response Time** - Time from registration to approval
5. **Approval Completion Time** - Admin response latency

#### Logs to Check

```bash
# Supabase Dashboard > Logs
# Filter for:
- member_approval_status_changed trigger calls
- approve_member RPC calls
- reject_member RPC calls
```

---

## Troubleshooting

### "RLS violation" Error

**Cause:** User doesn't have admin role

**Solution:**
1. Add admin role to user metadata
2. User must log out and back in
3. Verify role shows in Supabase Dashboard

### "Member not found" Error

**Cause:** Admin record not linked to auth user

**Solution:**
1. Verify admin has member record in database
2. Check email matches auth user email
3. Create member record if missing

### Approval Status Not Updating

**Cause:** Database trigger or function error

**Solution:**
1. Check RLS policies are enabled
2. Verify functions exist: `approve_member`, `reject_member`
3. Check database logs for errors
4. Manually update via Supabase Dashboard to test

---

## Future Enhancements

- [ ] Bulk approval/rejection
- [ ] Member search and filtering
- [ ] Approval history/audit view
- [ ] Document verification (image upload)
- [ ] Automated verification checks
- [ ] Admin activity dashboard
- [ ] Email template customization
- [ ] Multi-level approval workflow

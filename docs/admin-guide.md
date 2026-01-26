# MarvelRing Admin Operations Guide

Complete guide for MarvelRing B2B platform administrators managing user approvals, platform operations, and daily administrative tasks.

## Table of Contents

1. [Admin Dashboard Overview](#admin-dashboard-overview)
2. [User Approval Workflow](#user-approval-workflow)
3. [Daily Admin Checklist](#daily-admin-checklist)
4. [User Management](#user-management)
5. [Product Operations](#product-operations)
6. [Troubleshooting](#troubleshooting)
7. [Emergency Procedures](#emergency-procedures)

---

## Admin Dashboard Overview

### Accessing the Admin Panel

**URL:** `https://marvelring.com/admin`

**Authentication Required:**
- Admin user account with role: `admin`
- User role is set in Supabase Authentication user metadata

### Admin Dashboard Sections

| Section | Purpose | URL |
|---------|---------|-----|
| Users | Approve/reject pending members | `/admin/users` |
| Products | Manage product catalog | `/admin/products` |
| Dashboard | Overview and metrics | `/admin` |

### Role-Based Access Control

Only users with `role: "admin"` in their Supabase user metadata can access:
- `/admin` routes
- User approval interface
- Admin functions

---

## User Approval Workflow

### Overview

The user approval workflow controls access to the MarvelRing B2B platform:

1. **User Registration** - New users submit application
2. **Pending Review** - Application waits for admin approval
3. **Admin Approval/Rejection** - Admin reviews and decides
4. **Notification** - User receives email with decision
5. **Access Granted** - Approved users can log in

### Step 1: Access Pending Users

1. Navigate to `/admin/users`
2. You'll see a list of members awaiting approval
3. Each pending user shows:
   - Username
   - Email address
   - Company name
   - CEO/Contact name
   - Business registration number
   - Business type (Wholesale or Retail)
   - Registration date/time

### Step 2: Review User Information

Before approving or rejecting, verify:

#### Required Information
- [ ] Username is present and professional
- [ ] Email address is valid
- [ ] Company name is entered
- [ ] Business registration number exists
- [ ] Business type is selected (WHOLESALE or RETAIL)

#### Optional Information to Review
- CEO/Contact name
- Address information
- Business registration image

### Step 3: Approve a User

#### Via Web Interface (Recommended)

1. Find the user in the pending list
2. Click the **"Approve"** button on their card
3. Confirmation dialog appears
4. Click **"Confirm"** to finalize approval
5. You'll see success message
6. User is removed from pending list
7. User receives approval email

#### Via Supabase Dashboard (Alternative)

1. Go to Supabase Dashboard
2. Navigate to `member` table
3. Find the user record
4. Click to edit the row
5. Change `approval_status` from `PENDING` to `APPROVED`
6. Set `approved_at` to current timestamp
7. Set `approved_by` to your member ID
8. Click **Save**

#### After Approval

The system automatically:
- Sends approval email to user
- Updates `approved_at` timestamp
- Records which admin approved (in `approved_by`)
- User can now log in and access catalog

### Step 4: Reject a User

#### Via Web Interface (Recommended)

1. Find the user in pending list
2. Click the **"Reject"** button on their card
3. A form appears with:
   - Text field for rejection reason
   - "Confirm Rejection" button
   - "Cancel" button
4. Enter rejection reason in the textarea:
   - "Business registration could not be verified"
   - "Business information incomplete"
   - "Company appears to be inactive"
   - Any other relevant reason
5. Click **"Confirm Rejection"**
6. Success message appears
7. User is removed from pending list
8. User receives rejection email with reason

#### Via Supabase Dashboard (Alternative)

1. Go to Supabase Dashboard
2. Navigate to `member` table
3. Find the user record
4. Click to edit the row
5. Change `approval_status` from `PENDING` to `REJECTED`
6. Fill `rejected_reason` field with explanation
7. Set `approved_by` to your member ID
8. Do NOT set `approved_at` (leave NULL)
9. Click **Save**

#### After Rejection

The system automatically:
- Sends rejection email with reason
- Records rejection timestamp
- Stores rejection reason for audit trail
- User cannot access platform until re-approved

### Approval Email Templates

#### Approval Email (Auto-sent)

```
Subject: Your MarvelRing Account Approved

Dear [Username],

Your MarvelRing B2B platform account has been approved!

Company: [Company Name]
Business Type: [Wholesale/Retail]

You can now log in at: https://marvelring.com/login

If you have any questions, contact our support team.

Best regards,
MarvelRing Admin Team
```

#### Rejection Email (Auto-sent)

```
Subject: Your MarvelRing Account Application - Decision Required

Dear [Username],

Thank you for applying to the MarvelRing B2B platform.

Unfortunately, your application has been rejected for the following reason:

[Rejection Reason Provided]

If you believe this is an error or have updated information,
please contact our support team to reapply.

Best regards,
MarvelRing Admin Team
```

---

## Daily Admin Checklist

### Morning Routine (9:00 AM)

- [ ] Check for new pending users to review
- [ ] Process any urgent approvals/rejections
- [ ] Verify no overnight errors in system
- [ ] Check admin email for escalations

### Throughout the Day

- [ ] Review and approve/reject pending users as they arrive
- [ ] Respond to user support inquiries
- [ ] Monitor product inventory status
- [ ] Check for any system errors or warnings

### Weekly Tasks (Friday)

- [ ] Generate approval report:
  - Total approved this week
  - Total rejected this week
  - Pending count
- [ ] Review rejected user feedback
- [ ] Archive or document complex approval decisions
- [ ] Backup admin notes/logs

### Monthly Tasks (End of Month)

- [ ] Database backup verification
- [ ] User approval statistics
- [ ] Product catalog audit
- [ ] Review and update approval criteria if needed
- [ ] Export monthly admin activity log

---

## User Management

### Member Information Fields

When reviewing a user for approval, these fields are available:

| Field | Description | Required |
|-------|-------------|----------|
| username | Login name | Yes |
| email | Contact email | Yes |
| company_name | Business name | Yes |
| ceo_name | CEO or contact name | No |
| biz_reg_num | Business registration # | Yes |
| business_type | WHOLESALE or RETAIL | Yes |
| approval_status | PENDING / APPROVED / REJECTED | Auto |
| approved_at | Timestamp of approval | Auto |
| approved_by | Admin who approved (FK) | Auto |
| rejected_reason | Why rejected | Manual |
| created_at | Registration timestamp | Auto |

### User Search

To find a specific user:

1. Go to `/admin/users`
2. Look through pending list (typically small)
3. Or use Supabase Dashboard:
   - Go to `member` table
   - Use Filter feature to find users
   - Filter by email, username, or approval_status

### User Account Management

#### Disabling a Approved User

If you need to revoke access for an approved user:

1. Go to Supabase Dashboard
2. Navigate to `member` table
3. Find the user record
4. Change `approval_status` from `APPROVED` to `REJECTED`
5. Add reason in `rejected_reason`: "Account suspended due to policy violation"
6. Click **Save**
7. User loses access immediately

#### Re-approving a Rejected User

If a rejected user provides updated information:

1. Verify they have corrected the issue
2. Go to Supabase Dashboard
3. Find their member record
4. Change `approval_status` from `REJECTED` to `APPROVED`
5. Clear `rejected_reason` field
6. Set `approved_by` to your member ID
7. Set `approved_at` to current timestamp
8. Click **Save**

### Viewing User History

To see approval history for a user:

1. Go to Supabase Dashboard
2. Find user in `member` table
3. View these fields:
   - `approval_status` - Current status
   - `approved_at` - When approved
   - `approved_by` - Which admin approved
   - `rejected_reason` - Why rejected (if applicable)
   - `created_at` - Registration date

---

## Product Operations

### Quick Product Management

For detailed product operations, see [Supabase Dashboard Guide](./supabase-dashboard-guide.md)

### Common Admin Tasks

#### Marking a Product as Sale/Defective

1. Go to Supabase Dashboard
2. Navigate to `product` table
3. Find the product
4. Set `is_sale` to `true`
5. Enter discounted `sale_price`
6. Click **Save**

#### Adding Product Images

1. Go to Supabase Storage
2. Upload image to `product-images` bucket
3. Copy public URL
4. Add record to `product_image` table:
   - `product_id` - Which product
   - `image_url` - Copied URL
   - `display_order` - Sequential position
   - `is_main` - Set true for hero image
5. Click **Save**

#### Creating Product Collections

1. Go to Supabase Dashboard
2. Navigate to `collection` table
3. Add new collection:
   - `brand_name` - Collection name
   - `slug` - URL-safe identifier
   - `display_order` - Menu position
4. Click **Save**
5. Products can now reference this collection

---

## Troubleshooting

### User Approval Issues

#### "Unauthorized: Admin access required" Error

**Cause:** Your account doesn't have admin role

**Solution:**
1. Have another admin add admin role to your account in Supabase Authentication
2. Or contact support to grant admin access
3. Log out and log back in

#### User Approval Page Shows No Users

**Possible Causes:**
1. No pending users - System is working correctly
2. Permission issue - Check you have admin role
3. Database issue - Pending members view may be unavailable

**Solution:**
1. Check Supabase Dashboard `member` table for PENDING records
2. Verify RLS policies are enabled
3. Contact support if no pending users exist but page shows error

#### Approval Email Not Sent

**Cause:** Email notification service may be down

**Solution:**
1. Approval status changes regardless
2. User can still log in if approved
3. Resend notification:
   - Manually contact user via backup channel
   - Or wait for retry (system retries every 1 hour)

### User Account Issues

#### User Cannot Log In After Approval

**Possible Causes:**
1. Password reset needed
2. Email not verified
3. Approval status not saved

**Solution:**
1. Verify in Supabase: `approval_status = APPROVED`
2. Check user's email is verified in Auth section
3. Have user use "Forgot Password" reset flow
4. Contact user to confirm they received email

#### Duplicate User Accounts

**Cause:** User registered multiple times

**Solution:**
1. Reject the duplicate account
2. Approve only one account
3. Contact user to use existing account

### Dashboard Errors

#### "Connection Timeout" Error

**Cause:** Network issue or service outage

**Solution:**
1. Refresh the page
2. Clear browser cache
3. Try in incognito/private mode
4. Check Supabase Status: https://status.supabase.com

#### Data Not Saving

**Cause:** Network issue or permission problem

**Solution:**
1. Check admin role is set correctly
2. Verify RLS policies allow your edits
3. Try again in few moments
4. Contact support if persists

---

## Emergency Procedures

### System Down / Cannot Access Admin Panel

**Steps:**
1. Try accessing `/admin` directly
2. Check Supabase Status page for outages
3. Clear browser cache and try again
4. Access Supabase Dashboard directly for emergency edits
5. Contact support if unavailable

### Need to Quickly Approve/Reject User Manually

**If Web Interface Down:**
1. Go to Supabase Dashboard directly
2. Navigate to `member` table
3. Click user row to edit
4. Update `approval_status` field
5. Fill in `rejected_reason` if rejecting
6. Set `approved_by` and `approved_at` timestamps
7. Click **Save**

### Data Integrity Issue

**If Users/Products Appear Corrupted:**
1. DO NOT make bulk deletions
2. Take screenshot of issue
3. Contact support with evidence
4. Restore from backup if available
5. Supabase maintains automatic backups

### Security Incident

**If You Suspect Unauthorized Access:**
1. Change your admin password immediately
2. Review recent admin activity in Supabase Logs
3. Contact support to revoke other admin sessions
4. Request security audit

---

## Admin Best Practices

### Approval Decision Guidelines

#### Approve if:
- All required information is complete
- Business registration information seems legitimate
- Company name and registration number match
- Email address looks professional
- No red flags in registration (e.g., unusual characters)

#### Reject if:
- Business registration cannot be verified
- Required information is missing
- Email address appears invalid or temporary
- Company information seems false
- Registration contains offensive or inappropriate content

#### When in Doubt:
- Contact user for clarification
- Mark as pending for review later
- Consult with team lead

### Record Keeping

- Keep notes on complex rejections
- Document any contacted users
- Maintain approval statistics
- Archive decision logs monthly

### Security

- Don't share admin credentials
- Log out when leaving workstation
- Report suspicious login attempts
- Update password every 90 days
- Use strong, unique password

### Communication

- Always provide clear rejection reasons
- Be professional in all communications
- Respond to user inquiries promptly
- Escalate complex issues to leadership

---

## Contact & Support

**Admin Email:** admin@marvelring.com
**Support Email:** support@marvelring.com
**Emergency Hotline:** [Contact info in internal docs]

For detailed technical information, see:
- [Supabase Dashboard Guide](./supabase-dashboard-guide.md)
- [Technical Admin Documentation](../src/app/admin/README.md)
- [Database Schema](../.design-reference/ERD.sql)

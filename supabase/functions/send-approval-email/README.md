# Send Approval Email Edge Function

This Supabase Edge Function sends email notifications when a member's approval status changes.

## Trigger

This function is triggered by the `member_approval_status_changed` trigger on the `member` table, which uses PostgreSQL's `pg_notify` to send events.

## Configuration

### Environment Variables

Required in your Supabase project:
- `SUPABASE_URL` - Auto-provided by Supabase
- `SUPABASE_SERVICE_ROLE_KEY` - Auto-provided by Supabase

Optional (for email service integration):
- `RESEND_API_KEY` - API key for Resend email service
- Or configure your preferred email service (SendGrid, AWS SES, etc.)

## Deployment

Deploy this function to your Supabase project:

```bash
supabase functions deploy send-approval-email
```

## Email Service Integration

Currently, the function logs emails to the console. To integrate with a real email service:

### Option 1: Resend (Recommended)

1. Sign up at https://resend.com
2. Get your API key
3. Add to Supabase secrets:
   ```bash
   supabase secrets set RESEND_API_KEY=re_...
   ```
4. Uncomment the Resend integration code in index.ts

### Option 2: SendGrid

```typescript
const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Deno.env.get('SENDGRID_API_KEY')}`,
  },
  body: JSON.stringify({
    personalizations: [{ to: [{ email: payload.email }] }],
    from: { email: 'noreply@marvelring.com' },
    subject: emailSubject,
    content: [{ type: 'text/plain', value: emailBody }],
  }),
})
```

### Option 3: AWS SES

Use AWS SDK for Deno to send emails via SES.

## Testing

Test the function locally:

```bash
supabase functions serve send-approval-email
```

Send a test request:

```bash
curl -X POST http://localhost:54321/functions/v1/send-approval-email \
  -H "Content-Type: application/json" \
  -d '{
    "member_id": 1,
    "email": "test@example.com",
    "old_status": "PENDING",
    "new_status": "APPROVED"
  }'
```

## Email Templates

### Approval Email
- Subject: "Your MarvelRing Account Has Been Approved"
- Includes login link and welcome message

### Rejection Email
- Subject: "Your MarvelRing Account Application"
- Includes rejection reason and support contact

## Monitoring

Check function logs in Supabase Dashboard:
1. Go to Functions section
2. Select `send-approval-email`
3. View Logs tab

## Database Trigger

The function is invoked by this database trigger:

```sql
CREATE TRIGGER member_approval_status_changed
  AFTER UPDATE OF approval_status ON member
  FOR EACH ROW
  EXECUTE FUNCTION notify_approval_status_change();
```

See `00005_member_approval_workflow.sql` for the trigger definition.

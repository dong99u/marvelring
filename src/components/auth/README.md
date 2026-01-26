# Authentication Components

This directory contains the authentication UI components for the Marvelring B2B platform.

## Components

### SignupProgress
Displays a 3-step progress indicator for the signup flow.

**Props:**
- `currentStep: 1 | 2 | 3` - Current step in the signup process

**Usage:**
```tsx
<SignupProgress currentStep={1} />
```

### BusinessTypeSelector
Radio button selector for business type (WHOLESALE or RETAIL).

**Props:**
- `value: 'WHOLESALE' | 'RETAIL' | null` - Currently selected business type
- `onChange: (value: 'WHOLESALE' | 'RETAIL') => void` - Callback when selection changes

**Usage:**
```tsx
<BusinessTypeSelector
  value={businessType}
  onChange={(value) => setBusinessType(value)}
/>
```

## Authentication Flow

### Signup Flow (3 Steps)

1. **Step 1: Account Information** (`/signup`)
   - Username, Full Name, Email, Password, Password Confirmation
   - Data stored in sessionStorage

2. **Step 2: Business Information** (`/signup/business`)
   - Company Name, CEO Name, Business Registration Number
   - Business Type (WHOLESALE/RETAIL)
   - Address (Main, Zip Code, Detail)
   - Data stored in sessionStorage

3. **Step 3: Completion** (`/signup/complete`)
   - Creates Supabase auth user
   - Creates member record in database
   - Sets approval_status to 'PENDING'
   - Clears sessionStorage
   - Shows success message with approval information

### Login Flow

1. User enters email and password
2. Supabase Auth validates credentials
3. On success, redirects to home page
4. Middleware handles session management

## Design Specifications

All auth pages follow the design references in `.design-reference/html/`:
- `login_page.html` - Login page design
- `signup_page_1.html` - Signup step 1 design
- `signup_page_2.html` - Signup step 2 design
- `signup_page_3.html` - Signup step 3 design

### Key Design Elements

**Login Page:**
- Split layout with brand section (hidden on mobile)
- 60px input height with underline-only border
- 64px button height
- Playfair Display for headings, Inter for body text

**Signup Pages:**
- 3-step progress indicator
- Clean, minimalist input styling
- Step 1: 50px input height with underline border
- Step 2: 56px input height with full border
- Material Symbols icons throughout

## Hooks

### useAuth

Central hook for authentication operations.

**Returns:**
- `user: User | null` - Current Supabase auth user
- `member: Member | null` - Current member record from database
- `loading: boolean` - Loading state
- `signIn: (email, password) => Promise` - Login function
- `signUp: (params) => Promise` - Signup function
- `signOut: () => Promise` - Logout function

**Usage:**
```tsx
const { user, member, loading, signIn, signOut } = useAuth()

// Login
await signIn('user@example.com', 'password')

// Signup
await signUp({
  email: 'user@example.com',
  password: 'password123',
  username: 'johndoe',
  fullName: 'John Doe',
  companyName: 'Marvel Jewelry',
  ceoName: 'John Doe',
  bizRegNum: '123-45-67890',
  businessType: 'RETAIL',
  zipCode: '12345',
  addressMain: 'Seoul, Korea',
  addressDetail: 'Floor 3',
})

// Logout
await signOut()
```

## Database Integration

The auth system integrates with the `member` table:

```sql
CREATE TABLE member (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,  -- Always 'SUPABASE_AUTH' (placeholder)
  company_name VARCHAR(200),
  ceo_name VARCHAR(100),
  biz_reg_num VARCHAR(50) UNIQUE,
  business_type business_type_enum NOT NULL DEFAULT 'RETAIL',
  approval_status approval_status_enum NOT NULL DEFAULT 'PENDING',
  zip_code VARCHAR(20),
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## Middleware Protection

The middleware (`src/middleware.ts`) automatically:
- Refreshes Supabase auth sessions
- Redirects logged-in users away from `/login` and `/signup` pages
- Handles cookie management for SSR

## API Routes

### POST /api/auth/login
Login with email and password.

### POST /api/auth/signup
Create new user account with business information.

### POST /api/auth/logout
Sign out the current user.

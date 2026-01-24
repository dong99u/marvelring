# System Design Document: Marvelring B2B Platform

**Version:** 1.1
**Last Updated:** 2026-01-21
**Status:** Ready for Implementation
**Author:** Engineering Team

---

## Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-01-21 | Initial SDD with 8-section Atlassian structure, complete database schema, RLS policies, Server Actions | Engineering Team |
| 1.1 | 2026-01-21 | **Added comprehensive dependency specifications and state management architecture:** <br>• Expanded Section 3.3 Dependencies with 12 subsections covering all libraries<br>• Added dependency installation commands<br>• Added Section 5.3 State Management Architecture with Zustand stores<br>• Documented three Zustand stores (Auth, UI, Product Filter) with complete TypeScript implementations<br>• Added state management patterns for Server Components, forms, and URL state<br>• Listed notable library exclusions (Redux, React Query, SWR, etc.) | Engineering Team |

---

## 1. Introduction

### 1.1 Purpose

This System Design Document (SDD) provides the technical architecture and implementation details for the Marvelring B2B Gold Jewelry Wholesale Platform. It translates the Product Requirements Document (PRD v1.2) into actionable technical specifications for the engineering team.

**Intended Audience:**
- Software Engineers (implementation)
- DevOps Engineers (deployment and infrastructure)
- QA Engineers (test planning)
- Technical Leads (architecture review)

### 1.2 Scope

**In Scope:**
- Next.js 15 application architecture with App Router
- Supabase backend integration (Auth, Database, Storage, RLS)
- PostgreSQL database schema with 30+ product specification fields
- Business user registration with manual approval workflow
- Differentiated pricing system (wholesale/retail)
- Product catalog with comprehensive jewelry specifications
- Admin product management via Supabase Dashboard
- Notice board with rich text editing
- Image storage and optimization strategy

**Out of Scope:**
- Phone verification (Phase 2)
- Product search functionality (Phase 2)
- Custom admin UI (Phase 2)
- Online payment processing (not in product scope)
- Shopping cart functionality (not in product scope)

### 1.3 Definitions and Acronyms

| Term | Definition |
|------|------------|
| **RLS** | Row Level Security - Supabase/PostgreSQL feature for row-based access control |
| **4C** | Diamond grading criteria: Cut, Color, Clarity, Carat |
| **GIA** | Gemological Institute of America - leading diamond certification lab |
| **MOQ** | Minimum Order Quantity - smallest order size accepted |
| **KC** | Korea Certification - product safety standard in South Korea |
| **SSR** | Server-Side Rendering - Next.js rendering strategy |
| **ISR** | Incremental Static Regeneration - Next.js caching strategy |
| **Server Actions** | Next.js API pattern for server-side mutations |

### 1.4 References

- **PRD**: `/Users/parkdongkyu/my_project/marvelring/.shipspec/planning/marvelring-b2b-platform/PRD.md` (v1.2)
- **Codebase Context**: `/Users/parkdongkyu/my_project/marvelring/.shipspec/planning/marvelring-b2b-platform/context.md`
- **Next.js 15 Documentation**: https://nextjs.org/docs
- **Supabase Documentation**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com

---

## 2. System Overview

### 2.1 System Context

Marvelring is a standalone B2B SaaS platform serving Korean jewelry dealers. The system integrates with:

- **Supabase Cloud**: Backend-as-a-Service providing authentication, database, and storage
- **Vercel**: Hosting and continuous deployment
- **KakaoTalk**: External messaging platform for B2B inquiries
- **Email Service**: Supabase Auth email notifications for user approval/rejection

**User Types:**
1. **Guest Users**: Browse products without prices
2. **Pending Users**: Registered but awaiting admin approval
3. **Approved Wholesale Users**: See wholesale pricing
4. **Approved Retail Users**: See retail pricing
5. **Admin Users**: Full platform management access

### 2.2 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Vercel Edge Network                       │
│                     (CDN + Next.js Runtime)                      │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Next.js 15 Application                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  App Router  │  │Server Actions│  │ Middleware   │         │
│  │   (Pages)    │  │ (Mutations)  │  │   (Auth)     │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Components  │  │ Supabase SDK │  │  Validation  │         │
│  │ (React/shadcn)│  │   Client     │  │    (Zod)     │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Supabase Cloud                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Auth       │  │  PostgreSQL  │  │   Storage    │         │
│  │  (Email/PW)  │  │  (Database)  │  │  (Images)    │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                  │
│  ┌──────────────────────────────────────────────────┐          │
│  │            Row Level Security (RLS)              │          │
│  │  • Price visibility policies                    │          │
│  │  • Document access restrictions                 │          │
│  └──────────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 Key Components

**Frontend Layer (Next.js 15):**
- **App Router**: File-system based routing for pages (auth, products, notices, support)
- **Server Components**: Default rendering mode for data fetching
- **Client Components**: Interactive UI elements (forms, carousels, modals)
- **Middleware**: Route protection and user session validation

**Backend Layer (Supabase):**
- **Supabase Auth**: User authentication and session management
- **PostgreSQL Database**: Product catalog, user profiles, categories, notices
- **Supabase Storage**: Product images and business license documents
- **Row Level Security**: Database-level authorization policies

**Admin Layer:**
- **Supabase Dashboard**: Primary admin interface for MVP
- **SQL Migrations**: Database schema versioning
- **Manual Workflows**: User approval, product management

---

## 3. Design Considerations

### 3.1 Assumptions

1. **User Demographics**: Target users (40-60 years old) have basic digital literacy and access to desktop/mobile browsers
2. **Network Conditions**: Users have stable broadband (desktop) or 4G LTE (mobile) connections
3. **Language**: Korean is the only language required; no internationalization needed for MVP
4. **Product Catalog Size**: Initial catalog of 50-200 products, scaling to 1000+ in Phase 2
5. **Concurrent Users**: Peak traffic of 50-100 concurrent users during business hours (9 AM - 6 PM KST)
6. **Admin Capacity**: 1-2 administrators managing daily approvals and product updates
7. **Business License Verification**: Manual review is feasible with expected registration rate of 5-10 per day
8. **Browser Support**: Modern browsers (Chrome 90+, Safari 14+, Edge 90+, Firefox 88+)

### 3.2 Constraints

**Technical Constraints:**
- **No Phone Verification**: Deferred to Phase 2; registration uses email/password only
- **Supabase Dashboard Admin**: No custom admin UI in MVP; all admin operations via Supabase web interface
- **Image Processing**: Limited to Supabase built-in transformations (resize, format conversion)
- **Production Environment Only**: Single environment for MVP; no separate staging

**Business Constraints:**
- **Manual Approval Required**: No automated business verification; admin must review each application
- **B2B Only**: Platform restricted to verified business users; no consumer access
- **Inquiry-Based Purchasing**: No online checkout or payment processing
- **Korean Market**: UI, content, and business logic specific to Korean B2B conventions

**Performance Constraints:**
- **Page Load**: Must achieve <3s on desktop, <5s on mobile (per REQ-040)
- **Database Queries**: Complex product schema with 30+ fields may impact query performance at scale
- **Image Storage**: Supabase Storage bandwidth limits may be reached with high-resolution jewelry images

### 3.3 Dependencies

#### 3.3.1 External Services

| Service | Version | Purpose | Criticality |
|---------|---------|---------|-------------|
| Supabase Cloud | Latest | Backend infrastructure (Auth, Database, Storage) | **Critical** |
| Vercel | Latest | Hosting and continuous deployment | **Critical** |
| PostgreSQL | 15+ (via Supabase) | Relational database | **Critical** |

#### 3.3.2 Core Framework Dependencies

| Package | Version | Purpose | Criticality |
|---------|---------|---------|-------------|
| `next` | 15.x | React framework with App Router, SSR, ISR | **Critical** |
| `react` | 19.x | UI library | **Critical** |
| `react-dom` | 19.x | React DOM renderer | **Critical** |
| `typescript` | 5.x | Type safety and developer experience | **Critical** |
| `@supabase/supabase-js` | Latest | Supabase JavaScript client | **Critical** |
| `@supabase/ssr` | Latest | Supabase SSR helpers for Next.js | **Critical** |

#### 3.3.3 UI and Styling Dependencies

| Package | Version | Purpose | Criticality |
|---------|---------|---------|-------------|
| `tailwindcss` | 3.x | Utility-first CSS framework | **Critical** |
| `shadcn/ui` | Latest | Pre-built accessible UI components (Radix-based) | High |
| `lucide-react` | Latest | Icon library with 1000+ icons | High |
| `clsx` | Latest | Conditional className utility | High |
| `tailwind-merge` | Latest | Tailwind className deduplication | High |
| `class-variance-authority` (cva) | Latest | Type-safe component variants (via shadcn/ui) | Medium |

#### 3.3.4 State Management

| Package | Version | Purpose | Criticality |
|---------|---------|---------|-------------|
| `zustand` | Latest | Lightweight global state management | High |
| `@supabase/supabase-js` | Latest | Server state management via Supabase client | High |

**State Management Strategy:**
- **Server State**: Direct Supabase client queries in Server Components (no React Query/SWR)
- **Global Client State**: Zustand stores for:
  - User session/profile data
  - UI state (modals, sidebars, filters)
  - Shopping cart state (Phase 2)
- **Form State**: React Hook Form (isolated component state)
- **URL State**: Next.js searchParams for filters and pagination

#### 3.3.5 Form Handling and Validation

| Package | Version | Purpose | Criticality |
|---------|---------|---------|-------------|
| `react-hook-form` | 7.x | Performant form state management | **Critical** |
| `zod` | 3.x | TypeScript-first schema validation | **Critical** |
| `@hookform/resolvers` | Latest | Zod integration for React Hook Form | **Critical** |

#### 3.3.6 Rich Text Editing

| Package | Version | Purpose | Criticality |
|---------|---------|---------|-------------|
| `@tiptap/react` | 2.x | Headless rich text editor framework | High |
| `@tiptap/starter-kit` | 2.x | Essential Tiptap extensions | High |
| `@tiptap/extension-*` | 2.x | Additional extensions (link, image, etc.) | Medium |

#### 3.3.7 Utility Libraries

| Package | Version | Purpose | Criticality |
|---------|---------|---------|-------------|
| `date-fns` | Latest | Date formatting and manipulation | High |
| `sonner` | Latest | Toast notifications | High |

#### 3.3.8 Testing Dependencies (Dev)

| Package | Version | Purpose | Criticality |
|---------|---------|---------|-------------|
| `vitest` | Latest | Fast unit test framework | High |
| `@testing-library/react` | Latest | React component testing utilities | High |
| `@testing-library/jest-dom` | Latest | Custom Jest matchers for DOM | High |
| `@testing-library/user-event` | Latest | User interaction simulation | High |
| `@vitejs/plugin-react` | Latest | Vite React plugin for Vitest | High |

#### 3.3.9 Code Quality Tools (Dev)

| Package | Version | Purpose | Criticality |
|---------|---------|---------|-------------|
| `eslint` | 9.x | JavaScript/TypeScript linting | **Critical** |
| `eslint-config-next` | Latest | Next.js ESLint configuration | **Critical** |
| `prettier` | Latest | Code formatting | High |
| `prettier-plugin-tailwindcss` | Latest | Tailwind class sorting | Medium |
| `@typescript-eslint/parser` | Latest | TypeScript parser for ESLint | High |
| `@typescript-eslint/eslint-plugin` | Latest | TypeScript-specific linting rules | High |

#### 3.3.10 Build and Development Tools

| Package | Version | Purpose | Criticality |
|---------|---------|---------|-------------|
| `supabase` (CLI) | Latest | Database migrations and type generation | **Critical** |
| `postcss` | Latest | CSS processing (required by Tailwind) | High |
| `autoprefixer` | Latest | CSS vendor prefixing | High |

#### 3.3.11 Notable Exclusions

**Libraries NOT being used:**
- ❌ **React Query / TanStack Query**: Using direct Supabase client instead
- ❌ **SWR**: Server Components handle most data fetching
- ❌ **Formik**: Using React Hook Form
- ❌ **Yup**: Using Zod for validation
- ❌ **Framer Motion**: Using Tailwind CSS transitions only
- ❌ **react-i18next**: Korean-only, no i18n library
- ❌ **Axios**: Using native fetch and Supabase client
- ❌ **Lodash**: Using native ES6+ methods
- ❌ **Moment.js**: Using date-fns
- ❌ **Redux / Redux Toolkit**: Using Zustand
- ❌ **Jotai / Recoil**: Using Zustand

#### 3.3.12 Dependency Installation

```bash
# Core dependencies
npm install next@15 react@19 react-dom@19 typescript@5
npm install @supabase/supabase-js @supabase/ssr
npm install tailwindcss postcss autoprefixer
npm install zustand
npm install react-hook-form zod @hookform/resolvers
npm install @tiptap/react @tiptap/starter-kit
npm install date-fns sonner lucide-react
npm install clsx tailwind-merge class-variance-authority

# Development dependencies
npm install -D @types/node @types/react @types/react-dom
npm install -D eslint eslint-config-next prettier prettier-plugin-tailwindcss
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event @vitejs/plugin-react
npm install -D supabase

# shadcn/ui components (installed individually as needed)
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input form label card dialog
```

### 3.4 Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| **Supabase Storage Limits Exceeded** | High - Images fail to load | Medium | Monitor storage usage; upgrade to Pro plan; implement image compression |
| **Manual Approval Bottleneck** | Medium - User frustration | High | Document clear approval SLA (24-48 hours); plan automation in Phase 2 |
| **Complex Product Schema Performance** | High - Slow queries | Medium | Use database indexes on key fields; denormalize for performance |
| **RLS Policy Performance** | High - Slow page loads | Medium | Use security definer functions with caching; monitor query plans |
| **No Search in MVP** | Medium - User difficulty finding products | High | Ensure intuitive category structure; add search in Phase 2 |
| **Diamond Certification Data Entry Errors** | Medium - Incorrect specs | Medium | Add admin validation warnings; Phase 2: certificate upload |
| **Business License Fraud** | High - Unauthorized users | Low | Manual review process; Phase 2: integrate with government APIs |

---

## 4. Architectural Strategies

### 4.1 Strategy Selection: Server-First Architecture with Supabase BaaS

**Selected Approach**: **Server Components + Supabase Backend-as-a-Service**

This architecture leverages Next.js 15's Server Components for data fetching and Supabase for backend infrastructure, minimizing custom backend code.

**Why This Architecture:**
1. **Rapid MVP Development**: Supabase provides auth, database, and storage out-of-the-box
2. **Cost-Effective**: No dedicated backend servers; pay-as-you-grow pricing
3. **Type Safety**: Direct TypeScript integration from database to frontend
4. **Row-Level Security**: Database-level authorization eliminates API security layers
5. **Scalability**: Supabase Cloud handles scaling automatically
6. **Admin Efficiency**: Supabase Dashboard provides instant admin UI for MVP

### 4.2 Alternatives Considered

| Architecture Option | Pros | Cons | Decision |
|---------------------|------|------|----------|
| **Server Components + Supabase (Selected)** | Fast development, built-in auth/storage, RLS security, no backend code | Vendor lock-in, Supabase-specific patterns | **SELECTED** |
| **Next.js API Routes + Custom Backend** | Full control, portable, no vendor lock-in | Longer development time, need auth/storage setup, more maintenance | Rejected - MVP speed priority |
| **tRPC + Prisma + PostgreSQL** | Type-safe E2E, portable, modern DX | Complex setup, no built-in auth/storage, longer timeline | Rejected - Over-engineered for MVP |
| **Traditional REST API + Separate Backend** | Standard patterns, team familiarity | Slowest development, most maintenance, duplicate type definitions | Rejected - Not modern, slow |

### 4.3 Key Architectural Decisions

#### Decision 1: Denormalized Product Schema

**Decision**: Store all product specifications (30+ fields) in a single `products` table with nullable columns for optional fields.

**Rationale**:
- **Performance**: Single-table queries faster than JOINs for product detail pages (REQ-007)
- **Simplicity**: RLS policies simpler with single table
- **Query Patterns**: Product details fetched as complete unit; no need to fetch diamond specs separately
- **PostgreSQL Efficiency**: Handles nullable columns well; minimal storage overhead

**Trade-offs**:
- More nullable columns (acceptable)
- Some data sparseness (e.g., diamond fields only populated for diamond products)

**Alternatives Rejected**:
- Separate `product_diamonds` table with 1-to-1 relationship (adds JOIN complexity)

---

#### Decision 2: Pre-Generate Image Transformations During Upload

**Decision**: When admin uploads product images, immediately generate thumbnail (400px) and medium (800px) versions using Supabase Image Transformations.

**Rationale**:
- **First-Load Performance**: Pre-generated images ensure fast initial page load (REQ-040: <3s desktop)
- **User Experience**: No waiting for on-demand generation
- **Predictable Costs**: Storage costs known upfront
- **Admin Workflow**: Admin sees final image sizes during upload

**Implementation**:
- Upload original to `product-images/{product_id}/original/{uuid}.jpg`
- Use Supabase SDK to generate:
  - Thumbnail: `product-images/{product_id}/thumbs/{uuid}_400.jpg`
  - Medium: `product-images/{product_id}/medium/{uuid}_800.jpg`
- Store all three URLs in `products.images` JSONB array

**Trade-offs**:
- **Storage**: 3x storage usage (original + thumb + medium)
- **Upload Time**: Slightly longer admin upload process (~5-10s for 10 images)
- **Cost**: Acceptable for Supabase Pro plan storage limits

**Alternatives Rejected**:
- On-demand generation via URL parameters (slower first load)

---

#### Decision 3: Row Level Security with Security Definer Function

**Decision**: Use PostgreSQL security definer function for RLS policies to check user approval status and business type.

**RLS Policy Implementation**:
```sql
-- Helper function (cached)
CREATE OR REPLACE FUNCTION get_user_approval_status()
RETURNS text AS $$
  SELECT approval_status
  FROM users
  WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Price visibility policy
CREATE POLICY "price_visibility"
ON products FOR SELECT
USING (
  -- Admins see everything
  (SELECT role FROM users WHERE id = auth.uid()) = 'admin'
  OR
  -- Approved users see prices based on business_type
  get_user_approval_status() = 'approved'
);
```

**Rationale**:
- **Performance**: `STABLE` function result cached within transaction
- **Security**: `SECURITY DEFINER` runs with elevated privileges
- **Maintainability**: Single function reused across multiple RLS policies
- **Type Safety**: TypeScript types generated from schema

**Trade-offs**:
- Slightly more complex than inline policy
- Requires migration to add function

---

#### Decision 4: Price Validation Warning (Not Error)

**Decision**: When admin sets `retail_price < wholesale_price`, show warning in Supabase Dashboard via PostgreSQL `NOTICE` but allow save.

**Implementation**:
```sql
CREATE OR REPLACE FUNCTION check_price_relationship()
RETURNS trigger AS $$
BEGIN
  IF NEW.retail_price < NEW.wholesale_price THEN
    RAISE NOTICE 'Warning: retail_price (%) is less than wholesale_price (%)',
      NEW.retail_price, NEW.wholesale_price;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER price_check_trigger
  BEFORE INSERT OR UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION check_price_relationship();
```

**Rationale**:
- **Flexibility**: Allows special promotions or clearance sales where retail price intentionally lowered
- **Admin Control**: Admin makes final decision
- **Data Integrity**: Warning alerts admin to potential error without blocking workflow

**Alternatives Rejected**:
- Hard block (error): Too restrictive for business needs
- No validation: Risk of data entry errors

---

#### Decision 5: Tiptap Rich Text Editor for Notices

**Decision**: Use Tiptap v2 with minimal extensions for notice board rich text editing.

**Extensions Enabled**:
- StarterKit (basic formatting)
- Bold, Italic
- BulletList, OrderedList
- Link
- Heading (H2, H3 only)

**Rationale**:
- **Bundle Size**: ~50KB (smallest option)
- **TypeScript**: Native TS support
- **Headless**: Works with shadcn/ui design system
- **Korean Support**: Handles Korean text correctly
- **Extensibility**: Easy to add features in Phase 2

**Content Storage**:
- Save as **sanitized HTML** in `notices.content` (TEXT column)
- Use `DOMPurify` on render to prevent XSS
- Render with `dangerouslySetInnerHTML` after sanitization

**Alternatives Rejected**:
- Quill: Larger bundle, less React-friendly
- Lexical: More complex API, overkill for simple notices

---

#### Decision 6: Conditional Zod Validation for Diamond Fields

**Decision**: Diamond specification fields (color, clarity, cut) are optional even when `diamond_size > 0`, with refinement showing warning (not error).

**Zod Schema**:
```typescript
const productSchema = z.object({
  // Required fields
  product_name: z.string().min(1),
  product_number: z.string().min(1),
  gold_type: z.enum(['18K', '14K', 'Platinum', 'Other']),
  gold_weight: z.number().positive(),
  wholesale_price: z.number().positive(),
  retail_price: z.number().positive(),
  labor_cost: z.number().positive(),
  main_image_url: z.string().url(),

  // Optional diamond fields
  diamond_size: z.number().nullable().optional(),
  diamond_shape: z.enum(['Round', 'Princess', 'Emerald', 'Oval', 'Cushion', 'Marquise', 'Pear', 'Asscher', 'Radiant', 'Heart']).nullable().optional(),
  diamond_color: z.enum(['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']).nullable().optional(),
  diamond_clarity: z.enum(['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2']).nullable().optional(),
  diamond_cut: z.enum(['Excellent', 'Very Good', 'Good', 'Fair', 'Poor']).nullable().optional(),
  diamond_certification: z.enum(['GIA', 'IGI', 'HRD', 'None']).nullable().optional(),
  diamond_certificate_number: z.string().nullable().optional(),

  // ... other fields
}).refine(
  (data) => {
    if (data.diamond_size && data.diamond_size > 0) {
      const hasSpecs = data.diamond_color || data.diamond_clarity || data.diamond_cut;
      if (!hasSpecs) {
        console.warn('Diamond specifications recommended when diamond_size > 0');
      }
    }
    return true; // Allow save
  }
);
```

**Rationale**:
- **Flexibility**: Admin may not have certification details at time of product creation
- **Phase 2 Enhancement**: Can require specs or add certificate upload later
- **User Experience**: Doesn't block product creation flow

---

#### Decision 7: Manual Email Notifications for MVP

**Decision**: Admin manually sends approval/rejection emails in MVP. Automate in Phase 2 with custom admin UI.

**MVP Workflow**:
1. Admin approves user in Supabase Dashboard (update `approval_status`)
2. Admin manually composes email via Supabase Auth email templates
3. User receives email notification

**Phase 2 Automation**:
- Custom admin panel with "Approve" button
- Button triggers Next.js Server Action
- Server Action updates database + sends email programmatically

**Rationale**:
- **MVP Speed**: Avoid building email automation infrastructure
- **Low Volume**: 5-10 approvals per day manageable manually
- **Supabase Dashboard Limitation**: No trigger hooks for UI actions

**Trade-offs**:
- Manual process prone to admin forgetting
- Slower approval notification
- Acceptable for MVP validation

---

#### Decision 8: First Admin via Manual SQL Insert

**Decision**: Bootstrap first admin user via SQL query in Supabase Dashboard.

**Implementation**:
```sql
-- After user signs up via regular registration
UPDATE users
SET
  approval_status = 'approved',
  role = 'admin',
  approved_at = NOW()
WHERE email = 'admin@marvelring.com';
```

**Rationale**:
- **Simplicity**: No environment variable management
- **Security**: No credentials in codebase
- **One-Time**: Only needed once at deployment
- **Supabase Pattern**: Aligns with Supabase Dashboard workflows

**Alternatives Rejected**:
- Environment variable (risk of credential exposure)
- Seed script (complexity for one-time action)

---

## 5. System Architecture

### 5.1 Component Diagram

```
┌─────────────── FRONTEND (Next.js 15) ───────────────────┐
│                                                          │
│  ┌─────────── App Router Pages ───────────┐            │
│  │                                         │            │
│  │  /                      (landing)       │            │
│  │  /(auth)/login          (login form)    │            │
│  │  /(auth)/register       (registration)  │            │
│  │  /(shop)/categories/[slug]  (products)  │            │
│  │  /(shop)/products/[id]  (detail)        │            │
│  │  /(shop)/new            (NEW products)  │            │
│  │  /(shop)/sale           (SALE products) │            │
│  │  /notices               (notice list)   │            │
│  │  /notices/[id]          (notice detail) │            │
│  │  /support               (customer svc)  │            │
│  │                                         │            │
│  └─────────────────────────────────────────┘            │
│                                                          │
│  ┌───────── Server Components ──────────┐               │
│  │  • ProductList  (fetch from DB)      │               │
│  │  • ProductDetail (fetch product)     │               │
│  │  • NoticeList   (fetch notices)      │               │
│  │  • CategoryNav  (fetch categories)   │               │
│  └──────────────────────────────────────┘               │
│                                                          │
│  ┌───────── Client Components ──────────┐               │
│  │  • RegistrationForm (React Hook Form)│               │
│  │  • LoginForm       (form handling)   │               │
│  │  • ImageGallery    (zoom/swipe)      │               │
│  │  • ProductCard     (hover effects)   │               │
│  │  • CategoryDropdown (interactions)   │               │
│  └──────────────────────────────────────┘               │
│                                                          │
│  ┌───────── Server Actions ──────────┐                  │
│  │  • registerUser()                  │                  │
│  │  • uploadBusinessLicense()         │                  │
│  │  • uploadProductImage()            │                  │
│  └────────────────────────────────────┘                  │
│                                                          │
│  ┌─────────── Middleware ──────────┐                    │
│  │  • Authentication check          │                    │
│  │  • Route protection              │                    │
│  │  • Redirect logic                │                    │
│  └──────────────────────────────────┘                    │
│                                                          │
└──────────────────────────────────────────────────────────┘
                          │
                          ▼ Supabase Client SDK
┌────────────── BACKEND (Supabase) ──────────────────────┐
│                                                          │
│  ┌────── PostgreSQL Database ──────┐                    │
│  │  Tables:                         │                    │
│  │  • users                         │                    │
│  │  • categories                    │                    │
│  │  • products                      │                    │
│  │  • product_categories (join)    │                    │
│  │  • brands                        │                    │
│  │  • notices                       │                    │
│  │                                  │                    │
│  │  Functions:                      │                    │
│  │  • get_user_approval_status()    │                    │
│  │  • check_price_relationship()    │                    │
│  └──────────────────────────────────┘                    │
│                                                          │
│  ┌────── Supabase Auth ──────┐                          │
│  │  • Email/Password auth     │                          │
│  │  • Session management      │                          │
│  │  • Email templates         │                          │
│  └────────────────────────────┘                          │
│                                                          │
│  ┌────── Supabase Storage ──────┐                       │
│  │  Buckets:                      │                       │
│  │  • product-images (public)    │                       │
│  │  • business-documents (private)│                       │
│  │                                │                       │
│  │  Policies:                     │                       │
│  │  • Owner-only access (docs)    │                       │
│  │  • Public read (images)        │                       │
│  └────────────────────────────────┘                       │
│                                                          │
│  ┌────── Row Level Security ──────┐                     │
│  │  • Price visibility policies    │                     │
│  │  • Document access control      │                     │
│  │  • Admin-only write access      │                     │
│  └─────────────────────────────────┘                     │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### 5.2 Data Flow

#### Flow 1: User Registration (REQ-001, REQ-002, REQ-003)

```
User -> Registration Form (Client Component)
  ├─> Validates input (Zod schema)
  └─> Calls registerUser() Server Action
        ├─> Uploads business license to Supabase Storage
        │     └─> Returns business_license_url
        ├─> Creates auth user via supabase.auth.signUp()
        ├─> Inserts user profile into users table
        │     • approval_status = 'pending'
        │     • business_license_url
        │     • business_type
        └─> Redirects to "/login?message=pending"

Admin (Supabase Dashboard)
  ├─> Queries users WHERE approval_status = 'pending'
  ├─> Views business_license_url
  ├─> Updates approval_status to 'approved' or 'rejected'
  └─> [Manual] Sends email notification (MVP)
```

#### Flow 2: Product Listing (REQ-006)

```
User -> Navigates to /categories/cartier

Next.js Server Component (ProductListPage)
  ├─> Fetches products via Supabase query:
  │     SELECT * FROM products
  │     JOIN product_categories ON product_categories.product_id = products.id
  │     WHERE product_categories.category_id = (SELECT id FROM categories WHERE slug = 'cartier')
  │     ORDER BY created_at DESC
  │     LIMIT 24 OFFSET 0
  │
  ├─> RLS Policy Evaluation:
  │     • If guest: prices excluded from response
  │     • If approved: prices included based on business_type
  │
  └─> Renders ProductCard components
        └─> Shows: image, name, product_number, badges (NEW/SALE)
            (NO prices shown on listing page per REQ-006)
```

#### Flow 3: Product Detail Page (REQ-007, REQ-008)

```
User -> Clicks product card -> /products/[id]

Next.js Server Component (ProductDetailPage)
  ├─> Fetches single product:
  │     SELECT * FROM products WHERE id = $1
  │
  ├─> RLS Policy Application:
  │     • Guest/Pending: wholesale_price and retail_price = NULL
  │     • Approved Wholesale: wholesale_price visible, retail_price NULL
  │     • Approved Retail: retail_price visible, wholesale_price NULL
  │     • Admin: both prices visible
  │
  ├─> Renders product specifications:
  │     • Basic: name, product_number, gold_type, gold_weight
  │     • Diamond (if diamond_size > 0): shape, color, clarity, cut, certification
  │     • Craftsmanship: stone_setting, finish_type, clasp_type
  │     • Pricing: based on user authorization
  │     • Images: gallery with zoom
  │     • Safety: lead-free, nickel-free badges
  │
  └─> Shows "카카오톡 문의하기" button
        └─> Links to product.kakao_link
```

#### Flow 4: Admin Product Upload (REQ-060, REQ-061)

```
Admin (Supabase Dashboard) -> Products Table -> Insert Row

1. Fill required fields:
   • product_name: "Cartier Love Ring"
   • product_number: "CR-001"
   • gold_type: "18K"
   • gold_weight: 5.5
   • wholesale_price: 500000
   • retail_price: 600000
   • labor_cost: 50000

2. Upload main_image via Storage UI:
   • Original uploaded to: product-images/{uuid}/original/main.jpg
   • Admin triggers transformation (or automated via client-side script):
     - Thumb: product-images/{uuid}/thumbs/main_400.jpg
     - Medium: product-images/{uuid}/medium/main_800.jpg
   • Set main_image_url to thumb URL

3. Add optional diamond fields (if applicable):
   • diamond_size: 0.5
   • diamond_shape: "Round"
   • diamond_color: "F"
   • diamond_clarity: "VVS1"
   • diamond_cut: "Excellent"
   • diamond_certification: "GIA"
   • diamond_certificate_number: "123456789"

4. Save:
   • Database triggers execute:
     - check_price_relationship() (warning if retail < wholesale)
     - Constraints validated (unique product_number, positive prices)
   • Row inserted
   • Product immediately visible on frontend
```

---

### 5.3 State Management Architecture

#### 5.3.1 State Management Strategy Overview

The application uses a **layered state management approach** optimized for Next.js 15 Server Components:

| State Type | Technology | Use Cases |
|------------|------------|-----------|
| **Server State** | Supabase Client + Server Components | Product data, user profiles, notices |
| **Global Client State** | Zustand | User session, UI state, filters |
| **Form State** | React Hook Form | Registration, login forms |
| **URL State** | Next.js searchParams | Pagination, category filters |

#### 5.3.2 Zustand Store Architecture

**File Structure**:
```
lib/stores/
├── useAuthStore.ts          # User authentication and profile
├── useUIStore.ts            # UI state (modals, sidebars)
├── useProductFilterStore.ts # Product filtering state
└── index.ts                 # Store exports
```

##### Store 1: Auth Store (`useAuthStore.ts`)

**Purpose**: Manage client-side user session and profile data.

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@supabase/supabase-js'

interface UserProfile {
  id: string
  username: string
  email: string
  real_name: string
  business_type: 'wholesale' | 'retail'
  approval_status: 'pending' | 'approved' | 'rejected'
}

interface AuthState {
  // State
  user: User | null
  profile: UserProfile | null
  isLoading: boolean

  // Actions
  setUser: (user: User | null) => void
  setProfile: (profile: UserProfile | null) => void
  setLoading: (loading: boolean) => void
  clearAuth: () => void

  // Computed
  isApproved: () => boolean
  canSeePrices: () => boolean
  isWholesaleUser: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      profile: null,
      isLoading: true,

      // Actions
      setUser: (user) => set({ user }),
      setProfile: (profile) => set({ profile }),
      setLoading: (loading) => set({ isLoading: loading }),
      clearAuth: () => set({ user: null, profile: null }),

      // Computed selectors
      isApproved: () => get().profile?.approval_status === 'approved',
      canSeePrices: () => {
        const profile = get().profile
        return profile?.approval_status === 'approved'
      },
      isWholesaleUser: () => get().profile?.business_type === 'wholesale',
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        profile: state.profile // Only persist profile, not user session
      }),
    }
  )
)
```

**Usage Pattern**:
```typescript
// In Server Component - hydrate store
import { useAuthStore } from '@/lib/stores'
import { createClient } from '@/lib/supabase/server'

export default async function Layout() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Pass to Client Component to hydrate store
  return <AuthProvider user={user} />
}

// In Client Component
'use client'
import { useAuthStore } from '@/lib/stores'
import { useEffect } from 'react'

export function AuthProvider({ user }: { user: User | null }) {
  const setUser = useAuthStore((state) => state.setUser)

  useEffect(() => {
    setUser(user)
  }, [user, setUser])

  return null
}

// Consuming component
function ProductCard({ product }) {
  const canSeePrices = useAuthStore((state) => state.canSeePrices())

  return (
    <div>
      {canSeePrices && <p>Price: {product.wholesale_price}</p>}
    </div>
  )
}
```

##### Store 2: UI Store (`useUIStore.ts`)

**Purpose**: Manage modal visibility, sidebar state, and global UI interactions.

```typescript
import { create } from 'zustand'

interface UIState {
  // Modals
  isLoginModalOpen: boolean
  isImageGalleryOpen: boolean
  currentImageIndex: number

  // Navigation
  isMobileMenuOpen: boolean

  // Actions
  openLoginModal: () => void
  closeLoginModal: () => void
  openImageGallery: (index: number) => void
  closeImageGallery: () => void
  toggleMobileMenu: () => void
}

export const useUIStore = create<UIState>((set) => ({
  // Initial state
  isLoginModalOpen: false,
  isImageGalleryOpen: false,
  currentImageIndex: 0,
  isMobileMenuOpen: false,

  // Actions
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
  openImageGallery: (index) => set({ isImageGalleryOpen: true, currentImageIndex: index }),
  closeImageGallery: () => set({ isImageGalleryOpen: false, currentImageIndex: 0 }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
}))
```

##### Store 3: Product Filter Store (`useProductFilterStore.ts`)

**Purpose**: Manage client-side filter state for product listings (Phase 2: search, advanced filters).

```typescript
import { create } from 'zustand'

interface FilterState {
  // Filters
  goldType: string | null
  priceRange: [number, number] | null
  isDiamondOnly: boolean
  sortBy: 'created_at' | 'price_asc' | 'price_desc'

  // Actions
  setGoldType: (type: string | null) => void
  setPriceRange: (range: [number, number] | null) => void
  toggleDiamondOnly: () => void
  setSortBy: (sort: FilterState['sortBy']) => void
  clearFilters: () => void
}

export const useProductFilterStore = create<FilterState>((set) => ({
  // Initial state
  goldType: null,
  priceRange: null,
  isDiamondOnly: false,
  sortBy: 'created_at',

  // Actions
  setGoldType: (type) => set({ goldType: type }),
  setPriceRange: (range) => set({ priceRange: range }),
  toggleDiamondOnly: () => set((state) => ({ isDiamondOnly: !state.isDiamondOnly })),
  setSortBy: (sort) => set({ sortBy: sort }),
  clearFilters: () => set({
    goldType: null,
    priceRange: null,
    isDiamondOnly: false,
    sortBy: 'created_at'
  }),
}))
```

#### 5.3.3 Server Component Data Fetching

**Pattern**: Fetch data directly in Server Components, no client-side caching.

```typescript
// app/(shop)/products/[id]/page.tsx
import { createClient } from '@/lib/supabase/server'

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  // Direct database query in Server Component
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      product_categories (
        category:categories (
          id,
          name,
          slug
        )
      )
    `)
    .eq('id', params.id)
    .single()

  if (error) notFound()

  // RLS automatically filters prices based on user session
  return <ProductDetail product={product} />
}
```

#### 5.3.4 Form State Management with React Hook Form

**Pattern**: Isolated form state with Zod validation.

```typescript
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/lib/validations/auth'
import { registerUser } from '@/app/actions/auth'

export function RegistrationForm() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      real_name: '',
      phone_number: '',
      business_type: 'wholesale',
    }
  })

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })

    await registerUser(formData)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  )
}
```

#### 5.3.5 URL State for Filters and Pagination

**Pattern**: Use Next.js searchParams for shareable state.

```typescript
// app/(shop)/categories/[slug]/page.tsx
export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { page?: string; sort?: string }
}) {
  const page = parseInt(searchParams.page || '1')
  const sort = searchParams.sort || 'created_at'

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order(sort, { ascending: false })
    .range((page - 1) * 24, page * 24 - 1)

  return <ProductList products={products} />
}

// Client Component for pagination
'use client'
import { useRouter, useSearchParams } from 'next/navigation'

export function Pagination() {
  const router = useRouter()
  const searchParams = useSearchParams()

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`?${params.toString()}`)
  }

  return <button onClick={() => goToPage(2)}>Next Page</button>
}
```

#### 5.3.6 State Management Best Practices

1. **Prefer Server Components**: Fetch data on server when possible, avoiding client state
2. **Zustand for Global UI**: Use Zustand for cross-component UI state (modals, auth)
3. **React Hook Form for Forms**: Isolated form state, not global
4. **URL for Filters**: Shareable, SEO-friendly, back-button compatible
5. **No Redux**: Zustand is lighter and sufficient for B2B use case
6. **No React Query**: Direct Supabase client with Server Components
7. **Persist Carefully**: Only persist profile data, not sensitive auth tokens

---

### 5.4 API Design

#### 5.4.1 Server Actions

Next.js Server Actions handle mutations (no REST API needed for MVP).

##### Action: `registerUser`

**File**: `app/actions/auth.ts`

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { registerSchema } from '@/lib/validations/auth'
import { redirect } from 'next/navigation'

export async function registerUser(formData: FormData) {
  const supabase = createClient()

  // 1. Validate input
  const validatedFields = registerSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    real_name: formData.get('real_name'),
    phone_number: formData.get('phone_number'),
    business_type: formData.get('business_type'),
  })

  if (!validatedFields.success) {
    return { error: 'Invalid input' }
  }

  const { username, email, password, real_name, phone_number, business_type } = validatedFields.data

  // 2. Upload business license
  const file = formData.get('business_license') as File
  const fileExt = file.name.split('.').pop()
  const fileName = `${crypto.randomUUID()}.${fileExt}`
  const filePath = `${username}/${fileName}`

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('business-documents')
    .upload(filePath, file)

  if (uploadError) {
    return { error: 'File upload failed' }
  }

  const { data: { publicUrl } } = supabase.storage
    .from('business-documents')
    .getPublicUrl(filePath)

  // 3. Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        real_name,
      }
    }
  })

  if (authError) {
    return { error: authError.message }
  }

  // 4. Create user profile
  const { error: profileError } = await supabase
    .from('users')
    .insert({
      id: authData.user!.id,
      username,
      email,
      real_name,
      phone_number,
      business_type,
      business_license_url: publicUrl,
      approval_status: 'pending',
    })

  if (profileError) {
    return { error: 'Profile creation failed' }
  }

  redirect('/login?message=pending')
}
```

---

##### Action: `uploadProductImage`

**File**: `app/actions/products.ts`

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'

export async function uploadProductImage(productId: string, file: File) {
  const supabase = createClient()

  // Check admin role
  const { data: { user } } = await supabase.auth.getUser()
  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', user!.id)
    .single()

  if (userData?.role !== 'admin') {
    return { error: 'Unauthorized' }
  }

  // Upload original
  const fileExt = file.name.split('.').pop()
  const fileName = `${crypto.randomUUID()}.${fileExt}`
  const originalPath = `${productId}/original/${fileName}`

  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(originalPath, file)

  if (error) {
    return { error: 'Upload failed' }
  }

  // Generate transformations
  const baseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images`
  const thumbPath = `${productId}/thumbs/${fileName.replace(`.${fileExt}`, `_400.${fileExt}`)}`
  const mediumPath = `${productId}/medium/${fileName.replace(`.${fileExt}`, `_800.${fileExt}`)}`

  // Use Supabase transform API to generate
  await fetch(`${baseUrl}/${originalPath}?width=400&height=400&resize=cover`, {
    method: 'GET'
  }).then(res => res.blob()).then(blob => {
    supabase.storage.from('product-images').upload(thumbPath, blob)
  })

  await fetch(`${baseUrl}/${originalPath}?width=800&height=800&resize=cover`, {
    method: 'GET'
  }).then(res => res.blob()).then(blob => {
    supabase.storage.from('product-images').upload(mediumPath, blob)
  })

  return {
    original: `${baseUrl}/${originalPath}`,
    thumb: `${baseUrl}/${thumbPath}`,
    medium: `${baseUrl}/${mediumPath}`,
  }
}
```

---

#### 5.4.2 Supabase Client Queries

##### Query: Fetch Products for Category

```typescript
// app/(shop)/categories/[slug]/page.tsx
import { createClient } from '@/lib/supabase/server'

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()

  // Fetch category
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', params.slug)
    .single()

  // Fetch products with pagination
  const { data: products } = await supabase
    .from('products')
    .select(`
      *,
      product_categories!inner(category_id)
    `)
    .eq('product_categories.category_id', category.id)
    .order('created_at', { ascending: false })
    .range(0, 23)

  // RLS automatically filters prices based on user auth status

  return (
    <div>
      <h1>{category.name}</h1>
      <ProductGrid products={products} />
    </div>
  )
}
```

---

##### Query: Fetch Product Detail

```typescript
// app/(shop)/products/[id]/page.tsx
import { createClient } from '@/lib/supabase/server'

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!product) {
    notFound()
  }

  // Get user to determine pricing display
  const { data: { user } } = await supabase.auth.getUser()
  let userData = null

  if (user) {
    const { data } = await supabase
      .from('users')
      .select('approval_status, business_type')
      .eq('id', user.id)
      .single()
    userData = data
  }

  return (
    <div>
      <ProductImages images={product.images} />
      <ProductSpecs product={product} />
      <PricingDisplay
        product={product}
        userStatus={userData?.approval_status}
        businessType={userData?.business_type}
      />
      <KakaoTalkButton link={product.kakao_link} />
    </div>
  )
}
```

---

### 5.5 Data Models

#### 5.5.1 Database Schema

##### Table: `users`

Extends Supabase `auth.users` with profile information.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Basic Info
  username TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  real_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,

  -- Business Info
  business_type TEXT NOT NULL CHECK (business_type IN ('wholesale', 'retail')),
  business_license_url TEXT NOT NULL,

  -- Approval Workflow
  approval_status TEXT NOT NULL DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected')),
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES users(id),
  rejection_reason TEXT,

  -- Admin Role
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_users_approval_status ON users(approval_status);
CREATE INDEX idx_users_email ON users(email);

-- RLS Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON users FOR SELECT
  USING ((SELECT role FROM users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admins can update all profiles"
  ON users FOR UPDATE
  USING ((SELECT role FROM users WHERE id = auth.uid()) = 'admin');
```

---

##### Table: `categories`

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Category Info
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('collection', 'fashion', 'other')),

  -- Hierarchy
  parent_id UUID REFERENCES categories(id) ON DELETE CASCADE,

  -- Display
  display_order INTEGER DEFAULT 0,
  description TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_type ON categories(type);
CREATE INDEX idx_categories_parent_id ON categories(parent_id);

-- RLS: Public read access
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  USING (true);
```

---

##### Table: `products`

**This is the most complex table with 40+ fields.**

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Basic Info
  product_name TEXT NOT NULL,
  product_number TEXT UNIQUE NOT NULL,
  description TEXT,

  -- Material Specifications
  gold_type TEXT NOT NULL CHECK (gold_type IN ('18K', '14K', 'Platinum', 'Other')),
  gold_weight NUMERIC(10, 2) NOT NULL CHECK (gold_weight > 0), -- grams
  total_weight NUMERIC(10, 2) CHECK (total_weight > 0), -- grams (optional)

  -- Diamond Specifications (all optional)
  diamond_size NUMERIC(10, 2) CHECK (diamond_size > 0), -- carats
  diamond_shape TEXT CHECK (diamond_shape IN ('Round', 'Princess', 'Emerald', 'Oval', 'Cushion', 'Marquise', 'Pear', 'Asscher', 'Radiant', 'Heart')),
  diamond_color TEXT CHECK (diamond_color IN ('D', 'E', 'F', 'G', 'H', 'I', 'J', 'K')),
  diamond_clarity TEXT CHECK (diamond_clarity IN ('FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2')),
  diamond_cut TEXT CHECK (diamond_cut IN ('Excellent', 'Very Good', 'Good', 'Fair', 'Poor')),
  diamond_certification TEXT CHECK (diamond_certification IN ('GIA', 'IGI', 'HRD', 'None')),
  diamond_certificate_number TEXT,

  -- Craftsmanship Details
  stone_setting TEXT CHECK (stone_setting IN ('Prong', 'Bezel', 'Pave', 'Channel', 'Tension', 'None')),
  finish_type TEXT CHECK (finish_type IN ('Polished', 'Matte', 'Brushed', 'Satin', 'Hammered', 'Mixed')),
  clasp_type TEXT, -- Free text for variety
  chain_style TEXT,
  chain_length TEXT,

  -- Size & Availability
  standard_size TEXT, -- e.g., "13호", "55cm"
  stock_quantity INTEGER CHECK (stock_quantity >= 0),

  -- Business Info
  wholesale_price INTEGER NOT NULL CHECK (wholesale_price > 0),
  retail_price INTEGER NOT NULL CHECK (retail_price > 0),
  labor_cost INTEGER NOT NULL CHECK (labor_cost > 0),
  moq INTEGER DEFAULT 1 CHECK (moq > 0), -- Minimum Order Quantity
  lead_time_days INTEGER CHECK (lead_time_days > 0),
  origin_country TEXT DEFAULT 'Korea',

  -- Safety & Certification
  is_lead_free BOOLEAN DEFAULT true,
  is_nickel_free BOOLEAN DEFAULT true,
  is_hypoallergenic BOOLEAN DEFAULT false,
  kc_certified BOOLEAN DEFAULT false,
  kc_certificate_number TEXT,

  -- Media
  main_image_url TEXT NOT NULL,
  images JSONB DEFAULT '[]'::jsonb, -- Array of image URLs

  -- Status
  is_sale BOOLEAN DEFAULT false,

  -- Communication
  kakao_link TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT max_10_images CHECK (jsonb_array_length(images) <= 10)
);

-- Indexes
CREATE INDEX idx_products_product_number ON products(product_number);
CREATE INDEX idx_products_created_at ON products(created_at DESC);
CREATE INDEX idx_products_is_sale ON products(is_sale) WHERE is_sale = true;
CREATE INDEX idx_products_gold_type ON products(gold_type);

-- Price relationship trigger
CREATE OR REPLACE FUNCTION check_price_relationship()
RETURNS trigger AS $$
BEGIN
  IF NEW.retail_price < NEW.wholesale_price THEN
    RAISE NOTICE 'Warning: retail_price (%) is less than wholesale_price (%)',
      NEW.retail_price, NEW.wholesale_price;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER price_check_trigger
  BEFORE INSERT OR UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION check_price_relationship();

-- RLS Policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Anyone can view product details (but not prices)
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  USING (true);

-- Price visibility handled via security definer function
CREATE OR REPLACE FUNCTION get_user_approval_status()
RETURNS text AS $$
  SELECT approval_status
  FROM users
  WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Admins can insert/update/delete
CREATE POLICY "Admins can manage products"
  ON products FOR ALL
  USING ((SELECT role FROM users WHERE id = auth.uid()) = 'admin');
```

**Note on Price Visibility**: RLS policies return all columns, but the application layer filters `wholesale_price` and `retail_price` based on user status. Alternative approach: Use PostgreSQL views with conditional columns.

---

##### Table: `product_categories` (Join Table)

```sql
CREATE TABLE product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Prevent duplicate assignments
  UNIQUE(product_id, category_id)
);

-- Indexes
CREATE INDEX idx_product_categories_product_id ON product_categories(product_id);
CREATE INDEX idx_product_categories_category_id ON product_categories(category_id);

-- RLS: Public read access
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view product categories"
  ON product_categories FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage product categories"
  ON product_categories FOR ALL
  USING ((SELECT role FROM users WHERE id = auth.uid()) = 'admin');
```

---

##### Table: `brands` (Optional)

```sql
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Brand Info
  name TEXT UNIQUE NOT NULL, -- e.g., "Cartier", "Chanel"
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  description TEXT,

  -- Display
  display_order INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Public read access
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view brands"
  ON brands FOR SELECT
  USING (true);
```

---

##### Table: `notices`

```sql
CREATE TABLE notices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Content
  title TEXT NOT NULL,
  content TEXT NOT NULL, -- Sanitized HTML from Tiptap

  -- Author
  author_id UUID NOT NULL REFERENCES users(id),

  -- Display
  is_pinned BOOLEAN DEFAULT false,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_notices_is_pinned ON notices(is_pinned) WHERE is_pinned = true;
CREATE INDEX idx_notices_created_at ON notices(created_at DESC);

-- RLS Policies
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view notices"
  ON notices FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage notices"
  ON notices FOR ALL
  USING ((SELECT role FROM users WHERE id = auth.uid()) = 'admin');
```

---

#### 5.5.2 TypeScript Interfaces

Generated from Supabase schema using `supabase gen types typescript`.

```typescript
// types/database.ts

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          email: string
          real_name: string
          phone_number: string
          business_type: 'wholesale' | 'retail'
          business_license_url: string
          approval_status: 'pending' | 'approved' | 'rejected'
          approved_at: string | null
          approved_by: string | null
          rejection_reason: string | null
          role: 'user' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          email: string
          real_name: string
          phone_number: string
          business_type: 'wholesale' | 'retail'
          business_license_url: string
          approval_status?: 'pending'
          role?: 'user'
        }
        Update: Partial<Users['Insert']>
      }
      products: {
        Row: {
          id: string
          product_name: string
          product_number: string
          description: string | null
          gold_type: '18K' | '14K' | 'Platinum' | 'Other'
          gold_weight: number
          total_weight: number | null
          diamond_size: number | null
          diamond_shape: string | null
          diamond_color: string | null
          diamond_clarity: string | null
          diamond_cut: string | null
          diamond_certification: string | null
          diamond_certificate_number: string | null
          stone_setting: string | null
          finish_type: string | null
          clasp_type: string | null
          chain_style: string | null
          chain_length: string | null
          standard_size: string | null
          stock_quantity: number | null
          wholesale_price: number
          retail_price: number
          labor_cost: number
          moq: number
          lead_time_days: number | null
          origin_country: string
          is_lead_free: boolean
          is_nickel_free: boolean
          is_hypoallergenic: boolean
          kc_certified: boolean
          kc_certificate_number: string | null
          main_image_url: string
          images: string[] // JSONB array
          is_sale: boolean
          kakao_link: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          product_name: string
          product_number: string
          gold_type: '18K' | '14K' | 'Platinum' | 'Other'
          gold_weight: number
          wholesale_price: number
          retail_price: number
          labor_cost: number
          main_image_url: string
          // ... optional fields
        }
        Update: Partial<Products['Insert']>
      }
      // ... other tables
    }
  }
}
```

---

### 5.6 Storage Architecture

#### 5.6.1 Supabase Storage Buckets

##### Bucket: `product-images` (Public)

**Purpose**: Store product photos with multiple sizes.

**Structure**:
```
product-images/
├── {product_id}/
│   ├── original/
│   │   ├── {uuid}_1.jpg
│   │   ├── {uuid}_2.jpg
│   │   └── ...
│   ├── thumbs/
│   │   ├── {uuid}_1_400.jpg
│   │   ├── {uuid}_2_400.jpg
│   │   └── ...
│   └── medium/
│       ├── {uuid}_1_800.jpg
│       ├── {uuid}_2_800.jpg
│       └── ...
```

**Access Policy**:
- **Read**: Public (no authentication required)
- **Write**: Admin only

**Configuration**:
```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true);

CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Admin upload access"
ON storage.objects FOR INSERT
USING (
  bucket_id = 'product-images' AND
  (SELECT role FROM users WHERE id = auth.uid()) = 'admin'
);
```

---

##### Bucket: `business-documents` (Private)

**Purpose**: Store business license documents securely.

**Structure**:
```
business-documents/
├── {username}/
│   └── business_license_{uuid}.pdf
```

**Access Policy**:
- **Read**: Owner only (user who uploaded) + Admin
- **Write**: Authenticated users (during registration)

**Configuration**:
```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('business-documents', 'business-documents', false);

CREATE POLICY "Owner and admin can view documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'business-documents' AND
  (
    auth.uid()::text = (storage.foldername(name))[1] OR
    (SELECT role FROM users WHERE id = auth.uid()) = 'admin'
  )
);

CREATE POLICY "Users can upload own documents"
ON storage.objects FOR INSERT
USING (
  bucket_id = 'business-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

---

## 6. Policies and Tactics

### 6.1 Security

#### 6.1.1 Authentication

**Strategy**: Supabase Auth with email/password.

- **Session Management**: JWT tokens stored in HTTP-only cookies
- **Session Duration**: 7 days (configurable in Supabase Dashboard)
- **Password Requirements**:
  - Minimum 8 characters
  - Enforced by Zod validation (client-side) and Supabase Auth (server-side)
- **Email Verification**: Optional (can enable in Phase 2)

**Middleware Protection**:
```typescript
// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const supabase = createServerClient(/* config */)

  const { data: { user } } = await supabase.auth.getUser()

  // Protected routes
  if (request.nextUrl.pathname.startsWith('/products') && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
```

---

#### 6.1.2 Authorization

**Row Level Security (RLS)** enforces all authorization at database level.

**Key Policies**:

1. **Price Visibility** (REQ-008):
   ```sql
   -- Implemented via application logic filtering
   -- RLS returns all columns; app filters prices based on:
   -- - approval_status
   -- - business_type
   ```

2. **Business License Access** (REQ-002):
   ```sql
   -- Only owner and admin can view documents
   -- Enforced by Storage RLS policy
   ```

3. **Admin-Only Operations** (REQ-060 to REQ-069):
   ```sql
   -- All product/notice mutations require role = 'admin'
   ```

---

#### 6.1.3 Data Encryption

- **At Rest**: Supabase encrypts all database data using AES-256
- **In Transit**: HTTPS enforced by Vercel (automatic)
- **Sensitive Fields**: `phone_number` stored as plain text (acceptable for B2B context; no PII regulations in scope)

---

#### 6.1.4 Input Validation

**Client-Side (Zod)**:
```typescript
// lib/validations/products.ts
export const productSchema = z.object({
  product_name: z.string().min(1, "Product name required").max(200),
  product_number: z.string().regex(/^[A-Z0-9-]+$/, "Invalid format"),
  gold_weight: z.number().positive("Must be positive"),
  wholesale_price: z.number().int().positive("Must be positive integer"),
  retail_price: z.number().int().positive("Must be positive integer"),
  // ... all other fields with validation rules
})
```

**Server-Side (Database Constraints)**:
- All constraints defined in SQL schema (CHECK, UNIQUE, NOT NULL)
- Double validation prevents bypassing client-side checks

---

### 6.2 Error Handling

#### 6.2.1 Strategy

**Graceful Degradation**: Errors should not crash the application.

**Error Boundaries**: React Error Boundaries catch rendering errors.

```typescript
// app/error.tsx
'use client'

export default function Error({ error, reset }: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

#### 6.2.2 Error Types and Handling

| Error Type | Example | Handling |
|------------|---------|----------|
| **Validation Error** | Invalid email format | Display field-specific error message |
| **Auth Error** | Incorrect password | Display "Invalid credentials" |
| **Network Error** | Supabase timeout | Retry with exponential backoff |
| **Database Error** | Unique constraint violation | Display "Product number already exists" |
| **Upload Error** | File too large | Display "File must be < 5MB" |
| **404 Not Found** | Product doesn't exist | Show 404 page with navigation |

#### 6.2.3 Supabase Error Codes

```typescript
function handleSupabaseError(error: PostgrestError) {
  if (error.code === '23505') {
    return 'Product number already exists'
  }
  if (error.code === '23503') {
    return 'Referenced category not found'
  }
  return 'An error occurred. Please try again.'
}
```

---

### 6.3 Logging and Monitoring

#### 6.3.1 Logging Strategy

**MVP (Built-in)**:
- **Vercel Logs**: Automatic request/response logging
- **Console Logs**: Development debugging
- **Supabase Logs**: Database query logs in Supabase Dashboard

**Phase 2 (Enhanced)**:
- **Structured Logging**: Use `pino` or `winston`
- **Log Levels**: DEBUG, INFO, WARN, ERROR
- **Log Aggregation**: Integrate with Vercel Analytics or external service

#### 6.3.2 Monitoring

**Metrics to Track**:
- **Performance**: Page load times, database query duration
- **Errors**: 4xx/5xx response rates
- **Usage**: Daily active users, products viewed, registrations
- **Business**: Approval rate, average approval time

**Tools**:
- **Vercel Analytics**: Built-in performance monitoring
- **Supabase Dashboard**: Database metrics, storage usage
- **Phase 2**: Integrate Sentry for error tracking

---

### 6.4 Performance

#### 6.4.1 Caching Strategy

**1. Browser Caching**:
- Static assets (CSS, JS, images): `Cache-Control: public, max-age=31536000, immutable`
- HTML pages: `Cache-Control: no-cache` (validate with server)

**2. Next.js Caching**:
```typescript
// Product listing page with ISR
export const revalidate = 3600 // Revalidate every hour

export default async function ProductsPage() {
  const products = await fetchProducts()
  return <ProductGrid products={products} />
}
```

**3. Database Query Caching**:
- PostgreSQL query plan caching (automatic)
- Supabase Realtime caching (if enabled in Phase 2)

**4. Image Caching**:
- Supabase Storage CDN: Cached globally
- Next.js Image Optimization: Cached at edge

#### 6.4.2 Database Indexes

**Critical Indexes** (already defined in schema):
- `idx_products_product_number` (unique lookups)
- `idx_products_created_at` (NEW tab sorting)
- `idx_products_is_sale` (SALE tab filtering)
- `idx_users_approval_status` (admin approval queue)

#### 6.4.3 Image Optimization

**Next.js Image Component**:
```typescript
import Image from 'next/image'

<Image
  src={product.main_image_url}
  alt={product.product_name}
  width={400}
  height={400}
  loading="lazy"
  quality={85}
/>
```

**Benefits**:
- Automatic WebP conversion
- Responsive sizes
- Lazy loading below the fold

---

### 6.5 Deployment

#### 6.5.1 Environment Variables

**Required for Production**:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx... # Admin operations

# App
NEXT_PUBLIC_APP_URL=https://marvelring.com
```

**Security**:
- Never commit `.env.local` to git
- Use Vercel Environment Variables UI for production
- Rotate keys if exposed

#### 6.5.2 Deployment Pipeline

**Vercel Automatic Deployment**:
1. Push to `main` branch
2. Vercel detects changes
3. Runs `npm run build`
4. Deploys to production
5. Preview deployments for PRs

**Supabase Migrations**:
```bash
# Local development
supabase db reset

# Production
supabase db push
```

---

## 7. Detailed Design

### 7.1 Registration Flow (REQ-001, REQ-002)

#### 7.1.1 Component: `RegistrationForm`

**File**: `app/(auth)/register/page.tsx` + `components/auth/RegistrationForm.tsx`

**Responsibilities**:
- Collect user registration data
- Validate business license file
- Submit to `registerUser` Server Action
- Handle errors and success states

**Interface**:
```typescript
// components/auth/RegistrationForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/lib/validations/auth'

export default function RegistrationForm() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
  })

  async function onSubmit(data) {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })

    const result = await registerUser(formData)

    if (result.error) {
      form.setError('root', { message: result.error })
    }
    // Success: redirected by server action
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  )
}
```

---

### 7.2 Product Listing (REQ-006)

#### 7.2.1 Component: `ProductGrid`

**File**: `app/(shop)/categories/[slug]/page.tsx`

**Responsibilities**:
- Server Component fetches products
- Renders responsive grid
- Infinite scroll via Client Component

**Implementation**:
```typescript
// app/(shop)/categories/[slug]/page.tsx
import { Suspense } from 'react'
import ProductGrid from '@/components/products/ProductGrid'
import ProductCardSkeleton from '@/components/products/ProductCardSkeleton'

export default async function CategoryPage({ params, searchParams }) {
  const page = parseInt(searchParams.page || '1')
  const products = await fetchProducts(params.slug, page)

  return (
    <div>
      <h1>{category.name}</h1>
      <Suspense fallback={<ProductCardSkeleton count={12} />}>
        <ProductGrid products={products} />
      </Suspense>
      <InfiniteScrollTrigger page={page} />
    </div>
  )
}
```

---

### 7.3 Product Detail (REQ-007)

#### 7.3.1 Component: `ProductDetailPage`

**File**: `app/(shop)/products/[id]/page.tsx`

**Responsibilities**:
- Fetch single product
- Determine user pricing visibility
- Render comprehensive specifications
- Handle missing optional fields gracefully

**Implementation**:
```typescript
export default async function ProductDetailPage({ params }) {
  const product = await fetchProduct(params.id)
  const { user, userData } = await getUserData()

  // Determine price display
  const showPrices = user && userData?.approval_status === 'approved'
  const priceToShow = showPrices
    ? (userData.business_type === 'wholesale' ? product.wholesale_price : product.retail_price)
    : null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: Image Gallery */}
      <ImageGallery images={product.images} />

      {/* Right: Product Info */}
      <div>
        <Breadcrumb category={product.category} product={product.product_name} />
        <h1 className="text-3xl font-bold">{product.product_name}</h1>
        <p className="text-gray-600">{product.product_number}</p>

        {/* Material Specs */}
        <SpecSection title="Material">
          <SpecRow label="Gold Type" value={product.gold_type} />
          <SpecRow label="Gold Weight" value={`${product.gold_weight}g`} />
          {product.total_weight && (
            <SpecRow label="Total Weight" value={`${product.total_weight}g`} />
          )}
        </SpecSection>

        {/* Diamond Specs (if applicable) */}
        {product.diamond_size && (
          <SpecSection title="Diamond">
            <SpecRow label="Size" value={`${product.diamond_size} ct`} />
            {product.diamond_shape && <SpecRow label="Shape" value={product.diamond_shape} />}
            {product.diamond_color && <SpecRow label="Color" value={product.diamond_color} />}
            {product.diamond_clarity && <SpecRow label="Clarity" value={product.diamond_clarity} />}
            {product.diamond_cut && <SpecRow label="Cut" value={product.diamond_cut} />}
            {product.diamond_certification && product.diamond_certification !== 'None' && (
              <>
                <SpecRow label="Certification" value={product.diamond_certification} />
                {product.diamond_certificate_number && (
                  <SpecRow label="Certificate #" value={product.diamond_certificate_number} />
                )}
              </>
            )}
          </SpecSection>
        )}

        {/* Craftsmanship */}
        <SpecSection title="Craftsmanship">
          {product.stone_setting && <SpecRow label="Setting" value={product.stone_setting} />}
          {product.finish_type && <SpecRow label="Finish" value={product.finish_type} />}
          {product.clasp_type && <SpecRow label="Clasp" value={product.clasp_type} />}
        </SpecSection>

        {/* Pricing */}
        <SpecSection title="Pricing">
          {showPrices ? (
            <>
              <SpecRow
                label={userData.business_type === 'wholesale' ? "Wholesale Price" : "Retail Price"}
                value={`₩${priceToShow.toLocaleString()}`}
                highlight
              />
              <SpecRow label="Labor Cost" value={`₩${product.labor_cost.toLocaleString()}`} />
            </>
          ) : (
            <p className="text-gray-500">가격은 로그인 후 확인하실 수 있습니다</p>
          )}
        </SpecSection>

        {/* Safety Badges */}
        <div className="flex gap-2 mt-4">
          {product.is_lead_free && <Badge>Lead-Free</Badge>}
          {product.is_nickel_free && <Badge>Nickel-Free</Badge>}
          {product.is_hypoallergenic && <Badge>Hypoallergenic</Badge>}
          {product.kc_certified && <Badge>KC Certified</Badge>}
        </div>

        {/* KakaoTalk Button */}
        <Button asChild size="lg" className="w-full mt-6">
          <a href={product.kakao_link} target="_blank">
            카카오톡 문의하기
          </a>
        </Button>
      </div>
    </div>
  )
}
```

---

### 7.4 Notice Board (REQ-068, REQ-069)

#### 7.4.1 Component: `NoticeEditor` (Admin Only)

**File**: `components/admin/NoticeEditor.tsx`

**Note**: This component won't be used in MVP (Supabase Dashboard used for admin). Included for Phase 2 reference.

**Implementation**:
```typescript
'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'

export default function NoticeEditor({ initialContent, onSave }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Link,
    ],
    content: initialContent,
  })

  function handleSave() {
    const html = editor.getHTML()
    onSave(html)
  }

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="prose" />
      <Button onClick={handleSave}>Save Notice</Button>
    </div>
  )
}
```

#### 7.4.2 Component: `NoticeContent` (Display)

**File**: `app/notices/[id]/page.tsx`

**Implementation**:
```typescript
import DOMPurify from 'isomorphic-dompurify'

export default async function NoticeDetailPage({ params }) {
  const notice = await fetchNotice(params.id)

  // Sanitize HTML before rendering
  const sanitizedContent = DOMPurify.sanitize(notice.content)

  return (
    <article>
      {notice.is_pinned && <Badge>Pinned</Badge>}
      <h1>{notice.title}</h1>
      <p className="text-gray-600">
        {new Date(notice.created_at).toLocaleDateString('ko-KR')}
      </p>
      <div
        className="prose max-w-none mt-6"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </article>
  )
}
```

---

## 8. Appendix

### 8.1 Database Migration Script

**File**: `supabase/migrations/001_initial_schema.sql`

```sql
-- See section 5.4.1 for complete schema
-- This migration creates all tables, indexes, functions, and RLS policies

-- 1. Create users table
CREATE TABLE users (...);

-- 2. Create categories table
CREATE TABLE categories (...);

-- 3. Create products table (40+ columns)
CREATE TABLE products (...);

-- 4. Create product_categories join table
CREATE TABLE product_categories (...);

-- 5. Create brands table
CREATE TABLE brands (...);

-- 6. Create notices table
CREATE TABLE notices (...);

-- 7. Create indexes
CREATE INDEX idx_products_product_number ON products(product_number);
-- ... (all other indexes)

-- 8. Create functions
CREATE OR REPLACE FUNCTION get_user_approval_status() ...;
CREATE OR REPLACE FUNCTION check_price_relationship() ...;

-- 9. Create triggers
CREATE TRIGGER price_check_trigger ...;

-- 10. Enable RLS and create policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own profile" ON users ...;
-- ... (all other policies)

-- 11. Create storage buckets
INSERT INTO storage.buckets ...;
CREATE POLICY "Public read access" ON storage.objects ...;
-- ... (all storage policies)
```

---

### 8.2 Seed Data Script

**File**: `supabase/seed.sql`

```sql
-- Seed categories
INSERT INTO categories (name, slug, type, display_order) VALUES
  ('Collection', 'collection', 'collection', 1),
  ('Fashion', 'fashion', 'fashion', 2);

-- Seed Collection sub-categories (luxury brands)
INSERT INTO categories (name, slug, type, parent_id, display_order)
SELECT name, slug, 'collection', (SELECT id FROM categories WHERE slug = 'collection'), display_order
FROM (VALUES
  ('Cartier', 'cartier', 1),
  ('Chanel', 'chanel', 2),
  ('Hermès', 'hermes', 3),
  ('Bulgari', 'bulgari', 4),
  ('Tiffany', 'tiffany', 5)
) AS brands(name, slug, display_order);

-- Seed Fashion sub-categories (jewelry types)
INSERT INTO categories (name, slug, type, parent_id, display_order)
SELECT name, slug, 'fashion', (SELECT id FROM categories WHERE slug = 'fashion'), display_order
FROM (VALUES
  ('Rings', 'rings', 1),
  ('Necklaces', 'necklaces', 2),
  ('Earrings', 'earrings', 3),
  ('Bracelets', 'bracelets', 4),
  ('Other', 'other', 5)
) AS types(name, slug, display_order);

-- Seed sample product (for testing)
INSERT INTO products (
  product_name, product_number, gold_type, gold_weight,
  wholesale_price, retail_price, labor_cost,
  main_image_url, images,
  diamond_size, diamond_shape, diamond_color, diamond_clarity, diamond_cut,
  diamond_certification, diamond_certificate_number,
  stone_setting, finish_type,
  is_lead_free, is_nickel_free, kc_certified
) VALUES (
  'Cartier Love Ring Sample',
  'CR-001',
  '18K',
  5.5,
  500000,
  600000,
  50000,
  'https://placeholder.com/400',
  '["https://placeholder.com/400", "https://placeholder.com/800"]'::jsonb,
  0.5,
  'Round',
  'F',
  'VVS1',
  'Excellent',
  'GIA',
  '123456789',
  'Prong',
  'Polished',
  true,
  true,
  true
);
```

---

### 8.3 Requirement Traceability Matrix

| Requirement ID | Design Component | Implementation | Verification |
|----------------|------------------|----------------|--------------|
| REQ-001 | RegistrationForm component + registerUser Server Action | `app/(auth)/register/` | Manual test: Submit registration form |
| REQ-002 | Supabase Storage upload + RLS policy | `uploadBusinessLicense()` action | Upload file, verify URL stored |
| REQ-003 | Supabase Dashboard user table + approval_status field | Manual admin workflow | Admin approves user in Dashboard |
| REQ-004 | [Manual in MVP] Email notification | Phase 2: Server Action + Supabase Auth email | Phase 2 implementation |
| REQ-005 | CategoryNav component + categories query | `components/layout/CategoryNav.tsx` | Navigate dropdown menus |
| REQ-006 | ProductGrid component + infinite scroll | `app/(shop)/categories/[slug]/page.tsx` | Scroll product list |
| REQ-007 | ProductDetailPage with all spec sections | `app/(shop)/products/[id]/page.tsx` | View product detail |
| REQ-008 | RLS policy + application-level price filtering | `get_user_approval_status()` function | Login as wholesale vs retail user |
| REQ-009 | NEW tab route + created_at filter | `app/(shop)/new/page.tsx` | View NEW tab |
| ... | ... | ... | ... |
| REQ-060 | Supabase Dashboard products table | Admin manual insert | Insert product in Dashboard |
| REQ-061 | uploadProductImage Server Action | `app/actions/products.ts` | Upload image, verify thumbnails |
| REQ-062 | Supabase Dashboard products table | Admin manual update | Edit product in Dashboard |
| REQ-068 | Tiptap editor (Phase 2) | `components/admin/NoticeEditor.tsx` | Phase 2 implementation |

**Complete matrix available in separate testing document.**

---

### 8.4 Glossary

See PRD Section 7.2 for comprehensive glossary of jewelry terms, technical terms, and business terms.

---

### 8.5 Design Diagrams

#### 8.5.1 User Registration Sequence Diagram

```
User          Frontend          Server Action       Supabase Auth      Database
 |                |                    |                   |                |
 |-- Fill Form -->|                    |                   |                |
 |                |-- Submit Form ---->|                   |                |
 |                |                    |-- signUp() ------>|                |
 |                |                    |                   |-- Create User->|
 |                |                    |<-- User Created --|                |
 |                |                    |-- Insert Profile --------------->|
 |                |                    |                   |                |
 |                |<-- Redirect -------|                   |                |
 |<-- Navigate ---|                    |                   |                |
 |                |                    |                   |                |

Admin         Supabase Dashboard     Database
 |                |                    |
 |-- Login ------>|                    |
 |                |-- Query Pending -->|
 |                |<-- Users List -----|
 |-- View Doc --->|                    |
 |-- Approve ---->|-- Update Status -->|
 |                |                    |
```

---

### 8.6 Deployment Checklist

**Pre-Launch**:
- [ ] Create Supabase project
- [ ] Run database migrations (`supabase db push`)
- [ ] Create storage buckets (product-images, business-documents)
- [ ] Configure RLS policies
- [ ] Seed categories table
- [ ] Create first admin user (manual SQL)
- [ ] Configure Supabase Auth email templates
- [ ] Set up Vercel project
- [ ] Configure environment variables in Vercel
- [ ] Connect GitHub repository
- [ ] Deploy to production (`git push main`)
- [ ] Verify deployment works
- [ ] Test user registration flow
- [ ] Test admin approval workflow
- [ ] Test product listing and detail pages
- [ ] Verify pricing visibility based on user role
- [ ] Test image uploads
- [ ] Test notice board
- [ ] Run performance audit (Lighthouse)

**Post-Launch**:
- [ ] Monitor Vercel logs for errors
- [ ] Monitor Supabase Dashboard for database performance
- [ ] Check storage usage
- [ ] Document admin procedures
- [ ] Train admin users on Supabase Dashboard

---

### 8.7 Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-21 | Engineering Team | Initial SDD based on PRD v1.2 and technical decisions |

---

**Document Status**: ✅ Ready for Implementation

**Next Steps**:
1. Review and approval of this SDD by technical leads
2. Generate implementation tasks (TASKS.json) with story point estimates
3. Begin Phase 1 development sprints
4. Set up development environment (Supabase project, Vercel project)
5. Create database migrations
6. Initialize Next.js project with dependencies

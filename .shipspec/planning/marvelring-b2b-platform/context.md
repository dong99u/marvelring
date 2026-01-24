# Codebase Context for Marvelring B2B Platform

## Current State

**Project Status**: Fresh initialization
- Repository initialized with git
- No existing codebase structure
- Starting from scratch

## Planned Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (recommended for professional B2B aesthetic)
- **State Management**: React Context API + Server Components
- **Form Handling**: React Hook Form + Zod validation
- **Image Optimization**: Next.js Image component

### Backend
- **BaaS Platform**: Supabase
- **Authentication**: Supabase Auth (Email/Password)
- **Database**: PostgreSQL (via Supabase)
- **Storage**: Supabase Storage (for business licenses and product images)
- **API**: Supabase Client SDK + Server Actions
- **Security**: Row Level Security (RLS) policies

### Deployment
- **Hosting**: Vercel
- **Environment**: Production + Preview environments
- **CI/CD**: Vercel automatic deployments

## Project Structure (To Be Created)

```
marvelring/
├── .shipspec/              # Planning and task management
│   └── planning/
│       └── marvelring-b2b-platform/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth-related pages (grouped route)
│   │   ├── login/
│   │   └── register/
│   ├── (shop)/            # Main shop pages (grouped route)
│   │   ├── categories/
│   │   ├── products/
│   │   ├── new/
│   │   └── sale/
│   ├── notices/           # Notice board
│   ├── support/           # Customer service
│   ├── api/               # API routes (if needed)
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Shared React components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── auth/             # Auth-specific components
│   ├── products/         # Product-related components
│   └── layout/           # Layout components (header, footer)
├── lib/                   # Utilities and configurations
│   ├── supabase/         # Supabase client and types
│   ├── utils/            # Helper functions
│   └── validations/      # Zod schemas
├── types/                 # TypeScript type definitions
├── public/               # Static assets
│   └── images/
├── supabase/             # Supabase configuration
│   ├── migrations/       # Database migrations
│   └── seed.sql          # Seed data
├── .env.local            # Environment variables
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies
```

## Design System Guidelines

### Colors (Tailwind Theme)
```javascript
// tailwind.config.ts
colors: {
  ivory: {
    50: '#fefdfb',
    100: '#fdf9f3',
    200: '#faf3e6',
    300: '#f5ecd9',
    400: '#f0e5cc',
    500: '#ebdebf', // base
  },
  champagne: {
    400: '#d4af37',
    500: '#c19a2e',
    600: '#aa8529',
  },
  gray: {
    // Standard Tailwind grays for hierarchy
  }
}
```

### Typography
- Base font size: 18px (1.125rem)
- Font family: Inter or similar professional sans-serif
- Line height: 1.6 for readability
- Large touch targets: 48px minimum

### Component Patterns
- Server Components by default (better performance)
- Client Components only when needed (interactivity, hooks)
- Use `"use client"` directive sparingly
- Prefer Server Actions for mutations
- Use Suspense boundaries for loading states

## Database Schema Overview

### Core Tables
1. **users** (extends auth.users)
   - Profile data, business info, approval status

2. **categories**
   - Hierarchical structure (parent_id)
   - Types: collection, fashion, other

3. **products**
   - **Basic**: name, product_number, description
   - **Material**: gold_type, gold_weight, total_weight
   - **Diamond (optional)**: size, shape, color, clarity, cut, certification, cert_number
   - **Craftsmanship**: stone_setting, finish_type, clasp_type, chain_style, chain_length
   - **Business**: wholesale_price, retail_price, labor_cost, stock_quantity, moq, lead_time_days, origin_country
   - **Safety**: is_lead_free, is_nickel_free, is_hypoallergenic, kc_certified, kc_certificate_number
   - **Media**: main_image_url, images (JSONB array), is_sale, kakao_link

4. **product_categories** (join table)
   - Many-to-many relationship

5. **brands** (optional)
   - Luxury brand information

6. **notices**
   - Admin announcements with rich text

### Row Level Security
- Price visibility based on user approval status and business type
- Business license documents restricted to owner and admin
- Admin-only access for product management and user approval

## Authentication Flow

### Registration
1. User fills form (username, email, password, real name, phone)
2. Uploads business license (Supabase Storage)
3. Status set to 'pending'
4. Admin approves via Supabase Dashboard
5. User can login and see prices

### Authorization Levels
- Guest: Browse products, no prices
- Pending: Logged in, no prices
- Approved Wholesale: See wholesale prices
- Approved Retail: See retail prices
- Admin: Full access

## API Patterns

### Data Fetching
- Server Components: Direct Supabase queries
- Client Components: React Query or SWR (if needed)
- Real-time: Supabase Realtime (optional for Phase 2)

### Mutations
- Prefer Next.js Server Actions
- Form handling with progressive enhancement
- Optimistic updates where appropriate

## Performance Considerations

- Image optimization: Next.js Image component with Supabase Storage URLs
- Lazy loading: Product grids with intersection observer
- Static generation: Category pages (ISR with revalidation)
- Dynamic routes: Product detail pages with dynamic params
- Database indexes: product_number, created_at, category relationships

## Security Requirements

- Environment variables for Supabase keys (never commit)
- RLS policies for all tables
- Input validation with Zod
- File upload validation (type, size)
- Rate limiting for registration and SMS verification
- HTTPS only (enforced by Vercel)

## Development Workflow

1. Local development with Supabase local setup (optional)
2. Environment variables in .env.local
3. Database migrations via Supabase CLI
4. TypeScript strict mode
5. ESLint + Prettier for code quality
6. Testing strategy TBD (consider Vitest + Testing Library)

## Conventions

### File Naming
- Components: PascalCase (ProductCard.tsx)
- Utilities: camelCase (formatPrice.ts)
- Server Actions: camelCase with 'Action' suffix (approveUserAction.ts)
- Types: PascalCase with 'Type' suffix or interface prefix

### Code Style
- Functional components with TypeScript
- Explicit return types for functions
- Props interfaces defined inline or separate
- Use const assertions for constants
- Avoid default exports except for pages

### Commit Messages
- Conventional commits format
- Example: "feat(auth): add business registration form"

## Dependencies (Confirmed)

### Core Framework
- next@15.x - React framework with App Router
- react@19.x - UI library
- typescript@5.x - Type safety
- @supabase/supabase-js - Supabase client
- @supabase/ssr - Next.js SSR integration

### UI and Styling
- tailwindcss@3.x - Utility-first CSS
- shadcn/ui - Accessible component library (Radix-based)
- lucide-react - Icon library
- clsx + tailwind-merge - className utilities
- class-variance-authority - Component variants (via shadcn/ui)

### State Management
- **zustand** - Global client state (user session, UI state, filters)
- React Context API - Minimal additional state
- react-hook-form - Form state
- Next.js searchParams - URL state for filters/pagination

### Form Handling and Validation
- react-hook-form@7.x - Performant forms
- zod@3.x - TypeScript-first validation
- @hookform/resolvers - Zod integration

### Rich Text and Utilities
- @tiptap/react@2.x + @tiptap/starter-kit - Rich text editor
- date-fns - Date formatting
- sonner - Toast notifications

### Testing (Dev)
- vitest - Fast unit tests
- @testing-library/react - Component testing
- @testing-library/jest-dom - DOM matchers
- @testing-library/user-event - User interactions

### Code Quality (Dev)
- eslint@9.x + eslint-config-next - Linting
- prettier + prettier-plugin-tailwindcss - Formatting
- @typescript-eslint/parser + @typescript-eslint/eslint-plugin
- TypeScript strict mode enabled

### Notable Exclusions
- ❌ Redux/Redux Toolkit - Using Zustand instead
- ❌ React Query/TanStack Query - Direct Supabase client with Server Components
- ❌ SWR - Server Components handle data fetching
- ❌ Framer Motion - Using Tailwind transitions only
- ❌ react-i18next - Korean-only, no i18n needed
- ❌ Axios - Native fetch + Supabase client

## State Management Architecture

### Strategy
- **Server State**: Supabase queries in Server Components (no client-side caching library)
- **Global Client State**: Zustand stores for user session, UI state, filters
- **Form State**: React Hook Form (isolated component state)
- **URL State**: Next.js searchParams for shareable filters and pagination

### Zustand Stores
1. **useAuthStore** - User authentication and profile (persisted)
2. **useUIStore** - Modal visibility, sidebar state, mobile menu
3. **useProductFilterStore** - Client-side product filtering (Phase 2)

## Open Questions (Resolved)

1. ~~SMS verification provider?~~ → **Skipped for MVP**
2. ~~KakaoTalk integration?~~ → **Open Chat link only**
3. ~~Admin notification method?~~ → **Manual email via Supabase Dashboard (MVP)**
4. ~~Image optimization strategy?~~ → **Both Supabase transforms + Next.js Image**
5. ~~Internationalization?~~ → **Korean-only, no i18n library**
6. ~~State management library?~~ → **Zustand**
7. ~~Testing strategy?~~ → **Vitest + Testing Library**

## References

- Next.js 15 Documentation: https://nextjs.org/docs
- Supabase Documentation: https://supabase.com/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Design References: dorocy.co.kr, geummaru.com

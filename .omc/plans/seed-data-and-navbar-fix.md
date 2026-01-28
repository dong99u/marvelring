# Work Plan: Seed Data Insertion and Navbar Fix

## Plan Metadata
- **Created**: 2026-01-28
- **Updated**: 2026-01-28 (Revision 2 - Addressing Critic Feedback)
- **Project**: MarvelRing B2B Jewelry Platform
- **Supabase Project ID**: cjlhmghrnmlputqgfeth
- **Status**: Ready for Implementation

---

## 1. Requirements Summary

### 1.1 Original Request
초기 데이터 삽입 및 메뉴바 수정:
1. 모든 테이블(category, collection, product, product_image, product_diamond_info, product_material_info, notice)에 테스트용 초기 데이터 삽입
2. 데이터가 프론트엔드에서 잘 표시되는지 테스트
3. 메뉴바 작동 오류 수정

### 1.2 Scope

**In Scope:**
- Create SQL seed data for 7 tables (category, collection, product, product_image, product_diamond_info, product_material_info, notice)
- Realistic Korean B2B jewelry data with luxury brand references
- Navigation/menu bar fixes (Desktop Navigation + MobileNav)
- **NEW: collections page must read category query param**
- **NEW: fashion page must read category query param**
- Frontend data display verification

**Out of Scope:**
- Member table seeding (requires auth setup)
- Authentication/authorization changes
- New features or UI redesign
- Production data
- **Brand/collection filtering (DEFERRED)** - products.ts has no brand filter, adding would expand scope significantly

### 1.3 Scope Decision: Brand Filtering

**Decision: DEFER brand filtering to a separate task.**

**Rationale:**
- `src/app/actions/products.ts` has NO brand/collection filter parameter (verified lines 6-13)
- Adding brand filtering requires: schema change to GetProductsParams, query modification, frontend wiring
- This exceeds the "navbar fix" scope
- Category filtering already exists and works (`category_slug` filter, line 34-36)

**Impact:** Mobile nav will NOT include brand-specific links (e.g., `/collections?brand=cartier`). Instead, users navigate to `/collections` and use existing filters.

---

## 2. Context Analysis

### 2.1 Database Schema (from migrations)

**Tables requiring seed data:**

| Table | Key Fields | Notes |
|-------|-----------|-------|
| `category` | id, category_name, slug, display_order | 4 categories: 반지, 목걸이, 귀걸이, 팔찌 |
| `collection` | id, brand_name, slug, logo_image_url, display_order | Luxury brands: Cartier, Chanel, etc. |
| `product` | id, collection_id, category_id, product_name, product_code, retail_price, wholesale_price, is_sale | Main product table |
| `product_image` | id, product_id, image_url, is_main, display_order | Product images |
| `product_diamond_info` | id, product_id, diamond_size, diamond_amount | Diamond specs |
| `product_material_info` | id, product_id, material_type, weight, purity | Material specs |
| `notice` | id, title, content, is_pinned, view_count | Announcements |

**Enums:**
- `material_type_enum`: '14K', '18K', '24K', 'PLATINUM', 'SILVER', 'WHITE_GOLD', 'ROSE_GOLD'

### 2.2 Navigation Structure Analysis (VERIFIED)

**Current Files:**
- `/src/components/layout/Navigation.tsx` - Desktop navigation (70 lines)
- `/src/components/layout/MobileNav.tsx` - Mobile hamburger menu (176 lines)
- `/src/components/layout/Header.tsx` - Top header with logo

**Identified Issues (with verified line numbers):**

1. **Sub-navigation links are broken** (`Navigation.tsx` lines 15-20):
   ```typescript
   const subNavItems = [
     { href: '?category=ring', label: '반지' },
     { href: '?category=necklace', label: '목걸이' },
     { href: '?category=earring', label: '귀걸이' },
     { href: '?category=bracelet', label: '팔찌' },
   ];
   ```
   - These are query-only links (`?category=xxx`) without base path
   - Should navigate to `/collections?category=xxx`

2. **Mobile navigation has non-existent routes** (`MobileNav.tsx` lines 17-38):
   ```typescript
   const navigationData: NavSection[] = [
     {
       title: 'Collection',
       items: [
         { label: '전체보기', href: '/collections' },
         { label: '프리미엄 라인', href: '/collections/premium' },  // BROKEN
         { label: '시그니처 컬렉션', href: '/collections/signature' },  // BROKEN
         { label: '웨딩 주얼리', href: '/collections/wedding' },  // BROKEN
         { label: '데일리 에센셜', href: '/collections/daily' },  // BROKEN
       ],
     },
     {
       title: 'Fashion',
       items: [
         { label: '전체보기', href: '/fashion' },
         { label: '반지', href: '/fashion/rings' },  // BROKEN
         { label: '목걸이', href: '/fashion/necklaces' },  // BROKEN
         { label: '귀걸이', href: '/fashion/earrings' },  // BROKEN
         { label: '팔찌', href: '/fashion/bracelets' },  // BROKEN
       ],
     },
   ];
   ```

3. **Collections page does NOT read category param** (`collections/page.tsx` lines 10-14):
   ```typescript
   interface SearchParams {
     categories?: string;  // Note: plural "categories", not "category"
     materials?: string;
     sort?: string;
     // MISSING: category?: string;
   }
   ```
   And line 36 does NOT pass category to InfiniteProductList:
   ```typescript
   <InfiniteProductList sort={sort} />  // No category prop!
   ```

4. **Fashion page also does NOT read category param** (`fashion/page.tsx` lines 10-14):
   Same issue as collections page - SearchParams missing `category`, InfiniteProductList not receiving it.

### 2.3 Data Flow (Product Display)

```
useInfiniteProducts hook
  -> getProducts server action (src/app/actions/products.ts)
    -> Supabase query to product_full_details view
      -> Returns products with display_price, main_image_url
        -> ProductGrid -> ProductCard components
```

**Key View:** `product_full_details` joins product, collection, category, and main image

**Filter Support in products.ts (lines 6-13):**
```typescript
export interface GetProductsParams {
  cursor?: number;
  limit?: number;
  category?: string;  // SUPPORTED
  isNew?: boolean;    // SUPPORTED
  isSale?: boolean;   // SUPPORTED
  sort?: 'latest' | 'name';  // SUPPORTED
  // NOTE: NO brand/collection filter
}
```

---

## 3. Acceptance Criteria

### 3.1 Seed Data Criteria

| Criterion | Measurement |
|-----------|-------------|
| Categories exist | 4 categories with Korean names and slugs |
| Collections exist | At least 6 luxury brand collections |
| Products exist | At least 24 products (6 per category minimum) |
| Products have images | Every product has at least 1 image (is_main=true) |
| Some products have diamonds | At least 10 products with diamond info |
| All products have materials | Every product has material info |
| Notices exist | At least 5 notices (2 pinned) |
| Sale products exist | At least 4 products with is_sale=true |
| Data displays correctly | Products visible on /collections, /new, /sale pages |

### 3.2 Navigation Fix Criteria

| Criterion | Measurement |
|-----------|-------------|
| Desktop sub-nav links work | Clicking category navigates to `/collections?category=xxx` |
| Mobile nav links work | All menu links navigate to valid pages |
| Active state shown | Current page/category visually highlighted |
| No broken links | All navigation links resolve to existing routes |
| Category filter works | `/collections?category=ring` shows only rings |
| Fashion category filter works | `/fashion?category=ring` shows only rings |
| Collections page reads category param | SearchParams includes `category`, passed to InfiniteProductList |
| Fashion page reads category param | SearchParams includes `category`, passed to InfiniteProductList |

---

## 4. Implementation Steps

### Phase 1: Seed Data Creation

#### Task 1.1: Create Seed SQL File
**File:** `supabase/seed/seed_data.sql`

```sql
-- Categories (반지, 목걸이, 귀걸이, 팔찌)
INSERT INTO category (category_name, slug, display_order) VALUES
('반지', 'ring', 1),
('목걸이', 'necklace', 2),
('귀걸이', 'earring', 3),
('팔찌', 'bracelet', 4);

-- Collections (Luxury Brands)
INSERT INTO collection (brand_name, slug, logo_image_url, display_order) VALUES
('Cartier', 'cartier', NULL, 1),
('Chanel', 'chanel', NULL, 2),
('Hermès', 'hermes', NULL, 3),
('Van Cleef & Arpels', 'van-cleef', NULL, 4),
('Tiffany & Co.', 'tiffany', NULL, 5),
('Bvlgari', 'bvlgari', NULL, 6);
```

**Product data should include:**
- Mix of categories (반지, 목걸이, 귀걸이, 팔찌)
- Mix of collections (Cartier, Chanel, etc.)
- Realistic Korean product names (e.g., "클래식 골드 링", "로즈 다이아몬드 목걸이")
- Unique product codes (e.g., "MR-R001", "MR-N001")
- Realistic prices (retail: 500,000 ~ 5,000,000 KRW, wholesale: 70-80% of retail)
- Some sale items with sale_price

**Image URLs:** Use placeholder service or realistic jewelry image URLs

**Deliverable:** Complete SQL file with all seed data

#### Task 1.2: Execute Seed Data
**Method:** Supabase Dashboard SQL Editor or CLI

```bash
# Option 1: Via Supabase CLI
supabase db push --db-url postgresql://...

# Option 2: Via Dashboard
# Paste SQL into SQL Editor and execute
```

**Verification:**
```sql
SELECT COUNT(*) FROM category;  -- Should be 4
SELECT COUNT(*) FROM collection;  -- Should be 6+
SELECT COUNT(*) FROM product;  -- Should be 24+
SELECT COUNT(*) FROM product_image;  -- Should match product count
SELECT COUNT(*) FROM notice;  -- Should be 5+
```

### Phase 2: Navigation Fixes

#### Task 2.1: Fix Desktop Sub-Navigation
**File:** `src/components/layout/Navigation.tsx`

**Changes (lines 15-20):**

**Before:**
```typescript
const subNavItems = [
  { href: '?category=ring', label: '반지' },
  { href: '?category=necklace', label: '목걸이' },
  { href: '?category=earring', label: '귀걸이' },
  { href: '?category=bracelet', label: '팔찌' },
];
```

**After:**
```typescript
const subNavItems = [
  { href: '/collections?category=ring', label: '반지' },
  { href: '/collections?category=necklace', label: '목걸이' },
  { href: '/collections?category=earring', label: '귀걸이' },
  { href: '/collections?category=bracelet', label: '팔찌' },
];
```

**Additional Changes:**
- Add `useSearchParams` hook to detect current category
- Update sub-nav item styling to show active state based on `searchParams.get('category')`

#### Task 2.2: Fix Mobile Navigation
**File:** `src/components/layout/MobileNav.tsx`

**Changes (lines 17-38):**

**Before:**
```typescript
const navigationData: NavSection[] = [
  {
    title: 'Collection',
    items: [
      { label: '전체보기', href: '/collections' },
      { label: '프리미엄 라인', href: '/collections/premium' },
      { label: '시그니처 컬렉션', href: '/collections/signature' },
      { label: '웨딩 주얼리', href: '/collections/wedding' },
      { label: '데일리 에센셜', href: '/collections/daily' },
    ],
  },
  {
    title: 'Fashion',
    items: [
      { label: '전체보기', href: '/fashion' },
      { label: '반지', href: '/fashion/rings' },
      { label: '목걸이', href: '/fashion/necklaces' },
      { label: '귀걸이', href: '/fashion/earrings' },
      { label: '팔찌', href: '/fashion/bracelets' },
    ],
  },
];
```

**After:**
```typescript
const navigationData: NavSection[] = [
  {
    title: '컬렉션',
    items: [
      { label: '전체보기', href: '/collections' },
    ],
  },
  {
    title: '카테고리',
    items: [
      { label: '반지', href: '/collections?category=ring' },
      { label: '목걸이', href: '/collections?category=necklace' },
      { label: '귀걸이', href: '/collections?category=earring' },
      { label: '팔찌', href: '/collections?category=bracelet' },
    ],
  },
];
```

**Note:** Brand filtering removed from nav (deferred scope). Users can use existing ProductFilters component on /collections page.

#### Task 2.3: Add Category Param Support to Collections Page (CRITICAL)
**File:** `src/app/(main)/collections/page.tsx`

**Changes:**

**Before (lines 10-14):**
```typescript
interface SearchParams {
  categories?: string;
  materials?: string;
  sort?: string;
}
```

**After:**
```typescript
interface SearchParams {
  category?: string;  // ADD: for URL param ?category=ring
  categories?: string;
  materials?: string;
  sort?: string;
}
```

**Before (line 36):**
```typescript
<InfiniteProductList sort={sort} />
```

**After:**
```typescript
<InfiniteProductList sort={sort} category={searchParams.category} />
```

#### Task 2.4: Add Category Param Support to Fashion Page (CRITICAL)
**File:** `src/app/(main)/fashion/page.tsx`

**Changes:**

**Before (lines 10-14):**
```typescript
interface SearchParams {
  categories?: string;
  materials?: string;
  sort?: string;
}
```

**After:**
```typescript
interface SearchParams {
  category?: string;  // ADD: for URL param ?category=ring
  categories?: string;
  materials?: string;
  sort?: string;
}
```

**Before (line 36):**
```typescript
<InfiniteProductList sort={sort} />
```

**After:**
```typescript
<InfiniteProductList sort={sort} category={searchParams.category} />
```

### Phase 3: Frontend Integration

#### Task 3.1: Verify Data Display on Pages
**Pages to test:**
- `/collections` - All products with filters
- `/collections?category=ring` - Only rings
- `/collections?category=necklace` - Only necklaces
- `/new` - Products from last 30 days
- `/sale` - Products with is_sale=true
- `/products/[id]` - Individual product detail

**Test checklist:**
- [ ] Products load on initial page load
- [ ] Product images display correctly
- [ ] Product names and codes show
- [ ] Prices show correctly (or "로그인 필요" for guests)
- [ ] Category filters work via URL param
- [ ] Infinite scroll loads more products
- [ ] Empty state shows when no products match

#### Task 3.2: Verify Notice Display
**Page:** `/announcements`

Currently uses hardcoded data. Consider:
- Keep hardcoded for now (announcements page has mock data)
- OR update to fetch from Supabase

**Recommendation:** Keep hardcoded for Phase 1, create separate task for dynamic notices

### Phase 4: Verification & Testing

#### Task 4.1: Manual Testing Checklist

**Navigation Tests:**
- [ ] Desktop: Click each main nav item - navigates correctly
- [ ] Desktop: Click each sub-nav category - navigates to `/collections?category=xxx`
- [ ] Desktop: Sub-nav shows active state for current category
- [ ] Mobile: Open hamburger menu - menu slides in
- [ ] Mobile: Click each menu section - expands/collapses
- [ ] Mobile: Click each link - navigates and closes menu
- [ ] Mobile: Click overlay - closes menu

**Data Display Tests:**
- [ ] `/collections` shows products from all categories
- [ ] `/collections?category=ring` shows ONLY rings
- [ ] `/collections?category=necklace` shows ONLY necklaces
- [ ] `/collections?category=earring` shows ONLY earrings
- [ ] `/collections?category=bracelet` shows ONLY bracelets
- [ ] `/new` shows recent products (if any within 30 days)
- [ ] `/sale` shows sale products
- [ ] Product cards show: image, name, code, price placeholder
- [ ] Infinite scroll works (if 24+ products)

#### Task 4.2: Browser Compatibility
- [ ] Chrome
- [ ] Safari
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## 5. Risk Identification and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| RLS blocks seed data | Medium | High | Temporarily disable RLS or use service role key |
| Foreign key violations | Medium | Medium | Insert data in correct order (category -> collection -> product -> images/materials) |
| Image URLs broken | Low | Medium | Use reliable placeholder service (e.g., picsum.photos) |
| Navigation breaks on edge cases | Low | Medium | Thorough testing on all viewports |
| Price view returns null | Medium | Medium | Verify product_full_details view works for anon users |

---

## 6. File Change Summary

| File | Action | Description |
|------|--------|-------------|
| `supabase/seed/seed_data.sql` | CREATE | New seed data SQL file |
| `src/components/layout/Navigation.tsx` | MODIFY | Fix sub-nav links (lines 15-20), add active states |
| `src/components/layout/MobileNav.tsx` | MODIFY | Update navigationData (lines 17-38) to valid routes |
| `src/app/(main)/collections/page.tsx` | MODIFY | Add `category` to SearchParams (line 10-14), pass to InfiniteProductList (line 36) |
| `src/app/(main)/fashion/page.tsx` | MODIFY | Add `category` to SearchParams (line 10-14), pass to InfiniteProductList (line 36) |

---

## 7. Commit Strategy

### Commit 1: Seed Data
```
feat(db): add seed data for categories, collections, products

- Add 4 categories (ring, necklace, earring, bracelet)
- Add 6 luxury brand collections
- Add 24+ products with images, materials, diamonds
- Add 5 notices (2 pinned)
```

### Commit 2: Page Category Param Support
```
fix(pages): add category query param support to collections and fashion pages

- Add category to SearchParams interface in collections/page.tsx
- Pass category prop to InfiniteProductList in collections/page.tsx
- Add category to SearchParams interface in fashion/page.tsx
- Pass category prop to InfiniteProductList in fashion/page.tsx
```

### Commit 3: Navigation Fixes
```
fix(nav): fix broken navigation links and add active states

- Update desktop sub-nav to use /collections?category=xxx paths
- Fix mobile nav to use existing routes only
- Remove non-existent brand/collection sub-routes
- Add active state styling for current category
```

### Commit 4: Integration Verification
```
test(frontend): verify product display with seed data

- Confirm products load on collections page
- Confirm category filtering works via URL param
- Confirm sale page shows sale items
```

---

## 8. Success Criteria Summary

| Area | Success Indicator |
|------|-------------------|
| Seed Data | All 7 tables populated with test data |
| Categories | 4 categories visible in filters |
| Products | 24+ products visible on /collections |
| Navigation | All links navigate to valid pages |
| Category URL Param | `/collections?category=ring` shows only rings |
| Fashion URL Param | `/fashion?category=ring` shows only rings |
| Sale | /sale page shows products with is_sale=true |
| Images | Product cards display images |

---

## 9. Estimated Effort

| Phase | Estimated Time |
|-------|----------------|
| Phase 1: Seed Data | 1-2 hours |
| Phase 2: Navigation Fixes | 1-1.5 hours |
| Phase 3: Frontend Integration | 30 minutes |
| Phase 4: Testing | 30 minutes |
| **Total** | **3-4.5 hours** |

---

## 10. Dependencies

- Supabase project must be accessible
- Database migrations (00001-00007) must be applied
- Product images need valid URLs (placeholder or real)
- No blocking PRs or ongoing deployments

---

## 11. Architect Questions Answered

1. **Should /fashion support category sub-routes or query params?**
   - **Answer:** Query params (`/fashion?category=ring`). Sub-routes would require creating new page files and adds complexity. Query params work with existing InfiniteProductList component.

2. **Is brand filtering required for this phase?**
   - **Answer:** NO. Deferred to separate task. Rationale: products.ts has no brand filter, adding would expand scope. Users can still see all products on /collections.

---

## Next Steps

1. Review and approve this plan
2. Execute Phase 1 (Seed Data)
3. Execute Phase 2 (Navigation Fixes - including page param support)
4. Verify with manual testing
5. Create PR with changes

---

PLAN_READY: .omc/plans/seed-data-and-navbar-fix.md

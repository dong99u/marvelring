# KakaoTalk Inquiry Button Implementation

## Overview
Implementation of Task #10: KakaoTalk inquiry button with authentication-based access control.

## Features Implemented

### 1. KakaoTalkButton Component
**Location**: `src/components/product/KakaoTalkButton.tsx`

**Props**:
- `kakaoLink` (optional): Product-specific KakaoTalk Open Chat URL
- `isLoggedIn`: User authentication status
- `isApproved`: User approval status (APPROVED members only)

**Behavior**:
- **Guest/Pending users**: Redirects to `/login` page
- **Approved users**: Opens KakaoTalk link in new tab
- **Fallback**: Uses `NEXT_PUBLIC_DEFAULT_KAKAO_LINK` if product.kakao_link is not set

**Design**:
- Primary button style (champagne background)
- Height: 56px (py-5)
- Material Symbols icon: `chat_bubble`
- Hover effect: Icon scales to 110%

### 2. Type Definitions
**Updated**: `src/types/product.ts`

Added `kakao_link` field to `ProductForDisplay` interface:
```typescript
kakao_link?: string | null;
```

### 3. ProductInfo Component
**Updated**: `src/components/product/ProductInfo.tsx`

- Imported `KakaoTalkButton` component
- Added `kakao_link` to product props
- Replaced hardcoded button with `<KakaoTalkButton />` component

### 4. Environment Configuration
**Updated**: `.env.local`

Added default KakaoTalk link:
```env
NEXT_PUBLIC_DEFAULT_KAKAO_LINK=https://open.kakao.com/o/your_openchat_id
```

**Note**: Update this URL with your actual KakaoTalk Open Chat link.

### 5. Database Migration
**Created**: `.design-reference/add_kakao_link_migration.sql`

**Required changes**:
1. Add `kakao_link` column to `product` table
2. Update `product_for_user` view to include `kakao_link`

**SQL**:
```sql
ALTER TABLE `product`
ADD COLUMN `kakao_link` varchar(500) NULL
COMMENT 'KakaoTalk Open Chat URL (optional, uses default if null)';
```

## Integration Points

### Product Detail Page Flow
```
ProductPage (server component)
  ├─ Fetches product data via getProductByIdForUser()
  ├─ Checks user auth status (isLoggedIn, isApproved)
  └─ Passes to ProductDetail
      └─ Passes to ProductInfo
          └─ Passes to KakaoTalkButton
```

### Authentication Logic
```typescript
// In KakaoTalkButton
if (!isLoggedIn || !isApproved) {
  router.push('/login');  // Redirect
  return;
}

// Approved users
const link = kakaoLink || process.env.NEXT_PUBLIC_DEFAULT_KAKAO_LINK;
window.open(link, '_blank', 'noopener,noreferrer');
```

## Testing Checklist

### Manual Testing Required
Since no test framework is set up, perform these manual tests:

#### 1. Guest User Test
- [ ] Visit product detail page without logging in
- [ ] Click "카카오톡 문의하기" button
- [ ] Should redirect to `/login` page

#### 2. Pending User Test
- [ ] Login with a PENDING approval_status account
- [ ] Visit product detail page
- [ ] Click "카카오톡 문의하기" button
- [ ] Should redirect to `/login` page

#### 3. Approved User Test (with product kakao_link)
- [ ] Login with an APPROVED account
- [ ] Visit a product with `kakao_link` set
- [ ] Click "카카오톡 문의하기" button
- [ ] Should open product-specific KakaoTalk link in new tab

#### 4. Approved User Test (without product kakao_link)
- [ ] Login with an APPROVED account
- [ ] Visit a product with `kakao_link` = NULL
- [ ] Click "카카오톡 문의하기" button
- [ ] Should open default KakaoTalk link from env variable

#### 5. Visual/UX Test
- [ ] Button has champagne background
- [ ] Button height is 56px
- [ ] Icon displays correctly (chat_bubble)
- [ ] Hover effect scales icon smoothly
- [ ] Button is full width (w-full)
- [ ] Shadow effect is visible

## Next Steps

### Required Before Production
1. **Run Database Migration**: Apply `add_kakao_link_migration.sql`
2. **Update Environment**: Set actual KakaoTalk link in `.env.local`
3. **Update Product View**: Ensure `product_for_user` view includes `kakao_link`
4. **Test All Scenarios**: Complete manual testing checklist above

### Future Enhancements (Optional)
- Add loading state while opening link
- Add analytics tracking for button clicks
- Add tooltip explaining login requirement for guests
- Support multiple KakaoTalk links per product (e.g., different channels)

## Files Changed

### Created
- `src/components/product/KakaoTalkButton.tsx`
- `.design-reference/add_kakao_link_migration.sql`
- `KAKAO_IMPLEMENTATION.md` (this file)

### Modified
- `src/components/product/ProductInfo.tsx`
- `src/types/product.ts`
- `.env.local`

## Dependencies
- `next/navigation` (useRouter) - for client-side routing
- Material Symbols Outlined - for chat_bubble icon

## Security Considerations
- Links open with `noopener,noreferrer` to prevent tab-nabbing
- Authentication check happens client-side (for UX) and should be enforced server-side
- KakaoTalk links are public URLs (no sensitive data exposure)

## Design Reference
Follows design specifications from `.design-reference/SCREENS.md`:
- Primary Button style (champagne #D4C2A1)
- Height: 56px
- Material Symbols icon
- Hover effects with transitions

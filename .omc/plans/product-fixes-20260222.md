# Product Fixes Plan
**Created**: 2026-02-22
**Status**: APPROVED (Architect REVISE → Critic OKAY)
**Project**: marvelring

## 요약

4가지 제품 관련 버그 수정 계획:
1. 모바일 제품 상세 페이지 이미지 안 보임
2. 어드민 다이아 정보에서 ct → mm 단위 변경
3. 고객 사이트 제품 상세 페이지에서 다이아 정보 안 보임
4. 어드민 공임비 입력 시 백원 단위 등록 안됨

---

## 수락 기준 (Acceptance Criteria)

- [ ] 모바일에서 제품 상세 페이지 진입 시 Swiper 이미지가 정상 표시됨
- [ ] 어드민 다이아 크기 입력 필드 단위가 "mm"로 표시됨 (new, edit 모두)
- [ ] 다이아 정보가 있는 제품은 고객 사이트 상세 페이지에서 다이아 정보 카드가 표시됨
- [ ] 어드민에서 공임비를 100원 단위로 입력 및 저장 가능 (예: 12,300원)

---

## 구현 단계

### Fix 1: 모바일 이미지 표시 버그

**파일**: `src/components/product/ImageGallery.tsx`

**근본 원인**: Swiper 슬라이드는 기본적으로 `height: auto` CSS를 가짐. 이로 인해
SwiperSlide 내부 `<div className="relative w-full h-full">` 의 `h-full`이 0px로 계산됨.
→ `<Image fill>`이 0px 높이의 부모를 갖게 되어 이미지가 렌더링되지 않음.

**핵심 수정** (이것이 실제 fix):
```tsx
// ImageGallery.tsx line 94 - Swiper 컨테이너에 [&_.swiper-slide]:h-full 추가
// Before:
<Swiper
  modules={swiperModules}
  className="w-full aspect-[4/5]"
  ...
>

// After:
<Swiper
  modules={swiperModules}
  className="w-full aspect-[4/5] [&_.swiper-slide]:h-full"
  ...
>
```

**부가 수정** (선택적, overflow 보호):
```tsx
// ImageGallery.tsx line 98 - 내부 div에 overflow-hidden 추가
// Before:
<div className="relative w-full h-full">

// After:
<div className="relative w-full h-full overflow-hidden">
```

> **주의**: `overflow-hidden` 단독으로는 이미지 문제가 해결되지 않음.
> `[&_.swiper-slide]:h-full`이 반드시 포함되어야 함.

---

### Fix 2: 어드민 다이아 ct → mm 변경

**파일 1**: `src/app/admin/(dashboard)/products/new/page.tsx` (line 530)
**파일 2**: `src/app/admin/(dashboard)/products/[id]/edit/ProductEditForm.tsx` (line 841)

**수정 내용**: 두 파일 모두 `ct` → `mm` 텍스트 변경

```tsx
// Before (양쪽 파일 동일):
<span className="text-sm text-gray-500">ct</span>

// After:
<span className="text-sm text-gray-500">mm</span>
```

> **참고**: 저장된 숫자 데이터는 변경되지 않음. 라벨만 변경.

---

### Fix 3: 고객 사이트 다이아 정보 표시

**근본 원인**: `ProductDetail.tsx`가 `diamond_size: undefined, diamond_amount: undefined`를
하드코딩. `products/[id]/page.tsx`에서 `product_diamond_info` 테이블 조회를 하지 않음.

**3-1. page.tsx에 DB 조회 추가**

파일: `src/app/(main)/products/[id]/page.tsx` (line ~106 이후, imageData 조회 블록 뒤)

```tsx
// image 조회 코드 직후에 추가:
const { data: diamondData } = await supabase
  .from('product_diamond_info')
  .select('diamond_size, diamond_amount')
  .eq('product_id', parseInt(id, 10))
  .order('diamond_size', { ascending: true })

const diamondRows = diamondData || []
```

`<ProductDetail>` 호출에 prop 추가:
```tsx
<ProductDetail
  product={product}
  images={images}
  relatedProducts={filteredRelated}
  isLoggedIn={!!user}
  isApproved={isApproved}
  diamondRows={diamondRows}  {/* 추가 */}
/>
```

**3-2. ProductDetail.tsx props 업데이트**

파일: `src/components/product/ProductDetail.tsx`

`ProductDetailProps` 인터페이스에 추가:
```tsx
interface ProductDetailProps {
  product: ProductForDisplay;
  images: string[];
  relatedProducts: ProductForDisplay[];
  isLoggedIn: boolean;
  isApproved: boolean;
  diamondRows?: Array<{ diamond_size: number; diamond_amount: number }>  // 추가
}
```

하드코딩된 `diamondInfo` 객체를 실제 데이터로 교체:
```tsx
// Before (lines 52-61):
<ProductInfo
  productId={product.id}
  product={product}
  diamondInfo={{
    diamond_size: undefined,   // 하드코딩 제거
    diamond_amount: undefined,
  }}
  isLoggedIn={isLoggedIn}
  isApproved={isApproved}
/>

// After:
<ProductInfo
  productId={product.id}
  product={product}
  diamondRows={diamondRows || []}   // 실제 데이터 전달
  isLoggedIn={isLoggedIn}
  isApproved={isApproved}
/>
```

**3-3. ProductInfo.tsx 타입 및 렌더링 전체 교체**

파일: `src/components/product/ProductInfo.tsx`

**[중요] 기존 `diamondInfo` prop 완전 제거 후 `diamondRows`로 교체:**

삭제할 코드 (lines 33-36):
```tsx
// 이 블록 전체 삭제:
  diamondInfo?: {
    diamond_size?: string | null;
    diamond_amount?: number | null;
  };
```

교체할 prop 정의 추가:
```tsx
  diamondRows?: Array<{ diamond_size: number; diamond_amount: number }>;
```

함수 파라미터 업데이트 (line 44):
```tsx
// Before:
export default function ProductInfo({
  productId,
  product,
  diamondInfo,   // 제거
  isLoggedIn,
  isApproved,
}: ProductInfoProps)

// After:
export default function ProductInfo({
  productId,
  product,
  diamondRows,   // 교체
  isLoggedIn,
  isApproved,
}: ProductInfoProps)
```

Size & Diamonds 카드 렌더 교체 (lines 151-193):
```tsx
// Before:
{(displaySize || diamondInfo) && (
  ...
  {diamondInfo &&
    (diamondInfo.diamond_size || diamondInfo.diamond_amount) && (
    <div>
      {diamondInfo.diamond_amount}ea / {diamondInfo.diamond_size}
    </div>
  )}
)}

// After:
{(displaySize || (diamondRows && diamondRows.length > 0)) && (
  <div className="product-info-card">
    <div className="flex items-center gap-2 mb-4">
      <span className="material-symbols-outlined text-gold-muted text-[20px]">
        {displaySize ? 'ring_volume' : 'diamond'}
      </span>
      <h3 className="product-info-card-title">
        {displaySize && diamondRows && diamondRows.length > 0
          ? 'Size & Diamonds'
          : displaySize ? 'Ring Size' : 'Diamond Details'}
      </h3>
    </div>
    <div className="flex flex-col gap-4">
      {displaySize && (
        <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-soft-ivory flex items-center justify-center">
              <span className="material-symbols-outlined text-gold-muted text-[16px]">ring_volume</span>
            </div>
            <span className="product-info-detail-label">Ring Size (호수)</span>
          </div>
          <span className="product-info-detail-value">{displaySize}</span>
        </div>
      )}
      {diamondRows && diamondRows.map((diamond, idx) => (
        <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-soft-ivory flex items-center justify-center">
              <span className="material-symbols-outlined text-gold-muted text-[16px]">diamond</span>
            </div>
            <span className="product-info-detail-label">Diamond Info</span>
          </div>
          <span className="product-info-detail-value">
            {diamond.diamond_amount}ea / {diamond.diamond_size}mm
          </span>
        </div>
      ))}
    </div>
  </div>
)}
```

---

### Fix 4: 공임비 백원 단위 입력

**파일 1**: `src/app/admin/(dashboard)/products/new/page.tsx`
**파일 2**: `src/app/admin/(dashboard)/products/[id]/edit/ProductEditForm.tsx`

**정확한 변경 대상** (가격 필드는 제외, 공임비 필드만 변경):

| 필드 | new/page.tsx 라인 | ProductEditForm.tsx 라인 |
|------|-----------------|------------------------|
| retail_base_labor_cost | 725 | 598 |
| retail_stone_setting_cost | 745 | 615 |
| wholesale_base_labor_cost | 790 | 654 |
| wholesale_stone_setting_cost | 810 | 671 |

**제외 대상** (변경 금지):
- `retail_price` (new: line 705, edit: line 581) - 유지
- `wholesale_price` (new: line 770, edit: line 637) - 유지
- `sale_price` (new: line 833, edit: line 692) - 유지

**수정 내용**: 위 8개 필드에서 `step="1000"` → `step="100"` 변경

---

## 변경 파일 목록 (6개)

1. `src/components/product/ImageGallery.tsx` — Swiper height fix
2. `src/app/admin/(dashboard)/products/new/page.tsx` — ct→mm, step 변경
3. `src/app/admin/(dashboard)/products/[id]/edit/ProductEditForm.tsx` — ct→mm, step 변경
4. `src/app/(main)/products/[id]/page.tsx` — diamond 조회 추가
5. `src/components/product/ProductDetail.tsx` — diamondRows prop 추가
6. `src/components/product/ProductInfo.tsx` — diamondInfo 제거, diamondRows 추가

## 리스크 및 완화

| 리스크 | 완화 |
|-------|------|
| 기존 ct 단위 저장 데이터가 mm로 표시 | 사용자 요청 사항이므로 의도적 변경 |
| ProductInfo diamondInfo→diamondRows 타입 변경 | ProductDetail만 ProductInfo를 사용하므로 영향 최소 |
| 공임비 step 변경 시 price 필드 실수 변경 | 위 테이블의 정확한 라인 번호 참조 |

## 검증 방법

1. **모바일 이미지**: DevTools 모바일 뷰에서 `/products/[id]` 방문 → Swiper 이미지 표시 확인
2. **ct→mm**: `/admin/products/new`, `/admin/products/7/edit` 다이아 섹션에서 "mm" 표시 확인
3. **다이아 정보**: `/products/7` (다이아 있는 제품) 방문 → Diamond Details 카드 표시 확인
4. **공임비 백원**: 어드민에서 공임비 "12300" 입력 후 저장 성공 확인

## 검토 변경 이력

- Architect 피드백 반영: Fix 1에서 `[&_.swiper-slide]:h-full`이 핵심 수정임을 명시
- Architect/Critic 피드백 반영: Fix 3에서 `diamondInfo` 완전 제거 지침 추가 (라인 33-36, 44, 151, 175-193)
- Critic 피드백 반영: Fix 4에서 변경/제외 대상 필드의 정확한 라인 번호 명시

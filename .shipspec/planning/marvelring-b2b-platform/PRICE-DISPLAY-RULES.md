# 가격 표시 비즈니스 규칙 (Price Display Business Rules)

## 핵심 원칙

**각 사용자는 자신에게 해당하는 가격만 보며, 다른 가격 체계가 존재한다는 사실을 절대 알 수 없어야 합니다.**

이는 B2B 플랫폼의 핵심 비즈니스 요구사항으로, 도매업자와 소매업자 간의 가격 차이를 상호 인지하지 못하도록 하여 비즈니스 관계를 보호합니다.

---

## 상세 표시 규칙

### 1. 도매업자 (business_type = 'wholesale') 로그인 시

**표시 예시:**
```
가격: ₩500,000
공임비: ₩50,000
```

**규칙:**
- DB의 `wholesale_price` 필드 값을 표시
- 라벨은 "도매가"가 아닌 **"가격"**으로만 표시
- 소매가 존재 여부를 알 수 없음
- API 응답에 `retail_price` 필드가 포함되어서는 안 됨

---

### 2. 소매업자 (business_type = 'retail') 로그인 시

**표시 예시:**
```
가격: ₩600,000
공임비: ₩50,000
```

**규칙:**
- DB의 `retail_price` 필드 값을 표시
- 라벨은 "소매가"가 아닌 **"가격"**으로만 표시
- 도매가 존재 여부를 알 수 없음
- API 응답에 `wholesale_price` 필드가 포함되어서는 안 됨

---

### 3. 게스트 또는 승인 대기 중인 사용자 (approval_status = 'pending' 또는 미로그인)

**표시 예시:**
```
가격은 로그인 후 확인하실 수 있습니다
```

**규칙:**
- 가격 정보를 전혀 표시하지 않음
- 로그인 유도 메시지만 표시

---

## 절대 금지 사항 (Critical Don'ts)

### ❌ UI에서 절대 표시하면 안 되는 것:

1. **가격 유형 라벨:**
   - ❌ "도매가: ₩500,000"
   - ❌ "소매가: ₩600,000"
   - ❌ "Wholesale Price: ₩500,000"
   - ❌ "Retail Price: ₩600,000"

2. **가격 체계 존재 암시:**
   - ❌ "회원 구분에 따라 가격이 다릅니다"
   - ❌ "도매/소매 차등 가격"
   - ❌ "귀하의 회원 등급 가격"
   - ❌ 두 가격이 존재함을 암시하는 어떤 힌트도

3. **비교 요소:**
   - ❌ 가격 범위 표시 (예: "₩500,000 ~ ₩600,000")
   - ❌ "다른 회원 유형 가격 보기" 버튼
   - ❌ 가격 비교 기능

### ✅ 올바른 표시:

- **"가격: ₩XXX,XXX"** (단일 가격, 라벨은 항상 "가격")
- 사용자 `business_type`에 따라 백엔드에서 해당 가격만 반환
- 프론트엔드는 단순히 받은 가격을 "가격"이라는 라벨로 표시

---

## 백엔드 구현 지침

### 1. Supabase RLS 정책

```sql
-- 도매업자용 RLS 정책 예시
CREATE POLICY "Wholesale users see wholesale prices"
ON products
FOR SELECT
TO authenticated
USING (
  auth.jwt() ->> 'business_type' = 'wholesale'
  AND approval_status = 'approved'
);

-- 소매업자용 RLS 정책 예시
CREATE POLICY "Retail users see retail prices"
ON products
FOR SELECT
TO authenticated
USING (
  auth.jwt() ->> 'business_type' = 'retail'
  AND approval_status = 'approved'
);
```

### 2. API 응답 구조

**도매업자 요청 시:**
```typescript
// 백엔드에서 반환
{
  id: "123",
  name: "제품명",
  price: 500000,  // wholesale_price를 price로 매핑
  labor_cost: 50000,
  // retail_price 필드는 절대 포함하지 않음
}
```

**소매업자 요청 시:**
```typescript
// 백엔드에서 반환
{
  id: "123",
  name: "제품명",
  price: 600000,  // retail_price를 price로 매핑
  labor_cost: 50000,
  // wholesale_price 필드는 절대 포함하지 않음
}
```

### 3. 데이터베이스 쿼리 예시

```typescript
// 도매업자용
const { data } = await supabase
  .from('products')
  .select('id, name, wholesale_price as price, labor_cost, ...')
  .eq('id', productId);

// 소매업자용
const { data } = await supabase
  .from('products')
  .select('id, name, retail_price as price, labor_cost, ...')
  .eq('id', productId);
```

---

## 프론트엔드 구현 지침

### 1. 가격 표시 컴포넌트

```tsx
// ✅ 올바른 구현
<div className="price-section">
  <span className="price-label">가격</span>
  <span className="price-value">₩{price.toLocaleString()}</span>
</div>

// ❌ 잘못된 구현
<div className="price-section">
  <span className="price-label">
    {businessType === 'wholesale' ? '도매가' : '소매가'}
  </span>
  <span className="price-value">₩{price.toLocaleString()}</span>
</div>
```

### 2. 타입 정의

```typescript
// Product 타입에는 단일 price 필드만 존재
interface Product {
  id: string;
  name: string;
  price: number;  // wholesale_price 또는 retail_price (백엔드에서 결정)
  labor_cost: number;
  // wholesale_price와 retail_price는 프론트엔드 타입에 존재하지 않음
}
```

---

## 보안 고려사항

### 1. Row Level Security (RLS)
- 각 사용자는 자신의 `business_type`에 해당하는 가격만 조회 가능
- RLS 정책으로 데이터베이스 레벨에서 차단

### 2. API 응답 검증
- API 응답에 의도하지 않은 가격 필드가 노출되지 않도록 철저히 검증
- 개발자 도구에서도 다른 가격을 확인할 수 없어야 함

### 3. 클라이언트 사이드 보안
- Redux/Zustand 등 상태 관리에도 단일 `price`만 저장
- 브라우저 콘솔, Redux DevTools에서도 다른 가격 정보 노출 방지

---

## 비즈니스 목적

### 왜 이렇게 해야 하는가?

1. **소매업자 불만 방지:**
   - 도매업자가 더 저렴한 가격을 받는다는 사실을 알면 불공정하다고 느낄 수 있음
   - 소매업자는 자신의 가격만 알고 만족스럽게 거래

2. **도매업자 정보 보호:**
   - 도매업자도 소매가를 알 필요가 없음
   - 불필요한 정보 노출 방지

3. **비즈니스 관계 보호:**
   - 각 고객은 자신의 가격만 알고 투명하게 거래
   - 가격 체계에 대한 의구심이나 불만 방지

4. **플랫폼 신뢰도:**
   - 각 고객 유형에 맞는 공정한 가격 제공
   - 차별 없는 경험 제공

---

## 테스트 체크리스트

구현 후 반드시 확인해야 할 사항:

### 도매업자 계정 테스트
- [ ] 제품 상세 페이지에서 "가격: ₩XXX,XXX" 형태로 표시되는가?
- [ ] "도매가"라는 라벨이 표시되지 않는가?
- [ ] 브라우저 개발자 도구 Network 탭에서 API 응답에 `retail_price`가 없는가?
- [ ] Redux DevTools나 상태 관리 도구에서 `retail_price`가 보이지 않는가?

### 소매업자 계정 테스트
- [ ] 제품 상세 페이지에서 "가격: ₩XXX,XXX" 형태로 표시되는가?
- [ ] "소매가"라는 라벨이 표시되지 않는가?
- [ ] 브라우저 개발자 도구 Network 탭에서 API 응답에 `wholesale_price`가 없는가?
- [ ] Redux DevTools나 상태 관리 도구에서 `wholesale_price`가 보이지 않는가?

### 게스트/승인 대기 사용자 테스트
- [ ] "가격은 로그인 후 확인하실 수 있습니다" 메시지가 표시되는가?
- [ ] API 응답에 어떤 가격 정보도 포함되지 않는가?

### 보안 테스트
- [ ] Supabase RLS 정책이 올바르게 설정되었는가?
- [ ] 직접 데이터베이스 쿼리로 다른 가격을 조회할 수 없는가?
- [ ] API 엔드포인트를 직접 호출해도 다른 가격을 받을 수 없는가?

---

## 참고 문서

- PRD.md REQ-008: Differentiated Pricing System
- PRD.md REQ-007: Product Detail Page (Pricing section)
- PRD.md REQ-050: Row Level Security Policies

---

**작성일:** 2026-01-22
**중요도:** 🔴 Critical - 비즈니스 핵심 요구사항
**변경 이력:**
- 2026-01-22: 초안 작성 (가격 라벨 표시 규칙 명확화)

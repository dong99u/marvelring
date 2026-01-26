# Design Reference - Marvelring B2B Platform

## ✅ 디자인 방향 결정

**HTML 디자인 기준으로 구현** (사용자 확정)

| 항목 | 적용 값 |
|------|---------|
| **Primary BG** | #FAF9F6 (Soft Ivory) |
| **Accent** | #A68D60, #D4C2A1 (Gold) |
| **Text** | #4A4A48 (Charcoal Light) |
| **폰트** | Manrope + Noto Sans KR |

**ERD**: `.design-reference/ERD.sql` 참조

---

## 컬러 팔레트 (HTML 디자인 기준)

```css
/* Main Theme */
--primary: #D4C2A1;         /* Soft Gold */
--soft-ivory: #FAF9F6;      /* Background */
--marble-grey: #F2F2F2;     /* Section BG */
--gold-muted: #A68D60;      /* Accent */
--charcoal-light: #4A4A48;  /* Text */

/* Auth Pages */
--pure-white: #FFFFFF;
--charcoal-deep: #1A1A1A;
--boutique-silver: #E5E7EB;
```

## 폰트

```css
/* Main Pages */
font-family: "Manrope", "Noto Sans KR", sans-serif;

/* Auth Pages */
font-family: "Playfair Display", "Noto Serif KR", serif; /* Titles */
font-family: "Inter", "Noto Sans KR", sans-serif;        /* Body */
```

---

## 화면별 레퍼런스

### 1. 메인 페이지 (`main_page.html`)
- **경로**: `/`
- **구성요소**:
  - Header: 로고 + 파트너십 문의 + 로그인 + 검색
  - Navigation: 신상품, 브랜드(active), 패션, 시즌오프, 공지사항, 고객센터
  - Sub-navigation: 전체보기, 프리미엄 라인, 시그니처 컬렉션, 웨딩 주얼리, 데일리 에센셜
  - Hero Section: Marble background + 메인 카피
  - Dashboard Cards: 4개 서비스 카드 (맞춤 제작, 대량 구매, 재고 연동, 마케팅 자료)
  - Season Collection: 이미지 + 설명 2컬럼
  - KakaoTalk CTA: 노란색 버튼
  - Footer: 기업 정보, 고객 지원

### 2. 상품 목록 - 컬렉션 (`collection_product_list_page.html`)
- **경로**: `/collection/[brand]`
- **구성요소**:
  - Breadcrumb: Home > Collection > Brand
  - 필터 (NEW, 가격순 등)
  - 4컬럼 상품 그리드
  - 상품 카드: 이미지 + 이름 + 간략 스펙

### 3. 상품 목록 - 패션 (`fashion_product_list_page.html`)
- **경로**: `/fashion/[category]`
- **구성요소**: 컬렉션과 동일한 레이아웃

### 4. NEW 페이지 (`new_page.html`)
- **경로**: `/new`
- **구성요소**: 신상품 필터링된 목록

### 5. SALE 페이지 (`sale_product_list_page.html`)
- **경로**: `/sale`
- **구성요소**: 시즌오프 상품 목록, 빨간색 강조

### 6. 상품 상세 (`product_detail_page.html`)
- **경로**: `/product/[id]`
- **구성요소**:
  - Breadcrumb
  - 2컬럼 레이아웃: 이미지(7) + 정보(5)
  - 이미지: Zoom 버튼, B2B Exclusive 배지
  - 상품 정보:
    - 제품명 + 제품번호 (#PROD-7M001)
    - Description 텍스트
    - **Step 01**: Material & Weight (14K/18K 중량)
    - **Step 02**: Size & Diamonds (호수, 다이아 정보)
    - **Step 03**: Detailed Costs (기본공임, 알공임)
    - **Step 04**: Special Notes (태그 + 참고사항)
  - Price Summary Card: 다크 배경, 총 가격
  - CTA: 카카오톡 문의 버튼
  - Related Products: 4컬럼 추천 상품

### 7. 로그인 (`login_page.html`)
- **경로**: `/login`
- **구성요소**:
  - 2컬럼: 브랜드 소개(좌) + 폼(우)
  - 로고 + Marvelring 텍스트
  - 이메일/비밀번호 입력
  - 로그인 상태 유지 체크박스
  - 비밀번호 찾기 링크
  - 로그인 버튼 (Dark)
  - 회원가입 버튼 (Outline)
  - B2B 전용 안내 배지

### 8. 회원가입 1단계 (`signup_page_1.html`)
- **경로**: `/signup/step1`
- **구성요소**:
  - 진행 표시: 1/3
  - 기본 정보 입력: 이메일, 비밀번호, 비밀번호 확인, 이름, 연락처

### 9. 회원가입 2단계 (`signup_page_2.html`)
- **경로**: `/signup/step2`
- **구성요소**:
  - 진행 표시: 2/3
  - 사업자 정보: 사업자 유형 (도매/소매), 상호명, 사업자등록번호

### 10. 회원가입 3단계 (`signup_page_3.html`)
- **경로**: `/signup/step3`
- **구성요소**:
  - 진행 표시: 3/3
  - 사업자등록증 업로드 (드래그 앤 드롭)
  - 파일 포맷: JPG, PNG, PDF (Max 5MB)
  - 가입 완료 버튼

### 11. 공지사항 목록 (`notice_page.html`)
- **경로**: `/notice`
- **구성요소**:
  - 공지사항 목록 테이블/카드
  - 날짜, 제목, 카테고리

### 12. 공지사항 상세 (`notice_detail_page.html`)
- **경로**: `/notice/[id]`
- **구성요소**:
  - 제목, 날짜, 카테고리
  - 본문 내용
  - 이전/다음 글 네비게이션

### 13. 문의 페이지 (`inquiry_page.html`)
- **경로**: `/inquiry` 또는 `/customer-service`
- **구성요소**:
  - 문의 폼 또는 카카오톡 연결
  - FAQ 섹션

---

## 공통 컴포넌트

### Header
```
[Diamond Icon] MARVELRING     [파트너십 문의] [로그인] [Search Icon]
```

### Navigation
```
[ 신상품 | 브랜드 | 패션 | 시즌오프 | 공지사항 | 고객센터 ]
[ 전체보기 | 프리미엄 라인 | 시그니처 컬렉션 | 웨딩 주얼리 | 데일리 에센셜 ]
```

### Product Card
```
┌──────────────────┐
│     [Image]      │
│   aspect-[3/4]   │
│    hover:zoom    │
├──────────────────┤
│ 제품명           │
│ 스펙 정보        │
└──────────────────┘
```

### Footer
```
[Logo] Marvelring          기업 정보        고객 지원
설명 텍스트                이용약관         도매 이용 가이드
                          개인정보처리방침  자주 묻는 질문
                          사업자 정보확인   1:1 문의하기

© 2024 MARVELRING B2B PLATFORM. ALL RIGHTS RESERVED.
```

---

## 구현 시 참고사항

1. **Tailwind 커스텀 설정 필요**: colors, fontFamily 확장
2. **Material Symbols Outlined 아이콘 사용**
3. **반응형**: md: (768px) 기준 2컬럼/모바일 전환
4. **hover 효과**: scale-105 + transition-transform duration-700
5. **그림자**: shadow-2xl, shadow-lg 사용
6. **간격**: gap-6, gap-8, py-32, px-10 등 여유로운 간격

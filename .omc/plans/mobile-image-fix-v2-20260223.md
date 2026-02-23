# Mobile Image Fix v2 Plan (Updated)
**Created**: 2026-02-23
**Status**: APPROVED (Architect APPROVED → Critic OKAY) → ROOT CAUSE UPDATED
**Project**: marvelring

## 요약

모바일 Swiper 갤러리에서 제품 이미지가 보이지 않는 버그의 근본적 재수정.

---

## 근본 원인 분석 (최종)

### 이전 Fix들이 모두 실패한 이유

v1 Fix: `[&_.swiper-slide]:h-full` → 높이 문제가 아니었음
v2 Fix: `aspect-[4/5]` → 높이 문제가 아니었음

**실제 원인**: `SwiperSlide`를 `next/dynamic()`으로 별도 동적 임포트한 것.

### Playwright DOM 분석 결과

```
.swiper 컨테이너 자식 구조:
├── .swiper-wrapper (childCount: 0)  ← 비어있음!!
├── .swiper-pagination
├── .swiper-slide  ← wrapper 밖! swiper 직접 자식
├── .swiper-slide
├── .swiper-slide
├── .swiper-slide
└── .swiper-slide
```

**위치 증거**:
- swiper-wrapper: y=194, h=406
- slide[0]: y=600.25 (wrapper 아래)
- slide[1]: y=1006.5
- 모든 슬라이드가 세로 스택 → overflow: hidden에 의해 잘림

### 왜 이런 일이 발생하는가

Swiper React는 `React.Children.map`으로 자식 중 `SwiperSlide` 타입을 식별하여
`.swiper-wrapper` 안에 렌더링합니다.

`next/dynamic()`으로 `SwiperSlide`를 감싸면:
1. `dynamic()` wrapper가 원본 SwiperSlide를 감싸는 HOC를 생성
2. Swiper가 `React.Children.map`으로 자식 타입을 검사할 때, `dynamic()` wrapper ≠ SwiperSlide
3. Swiper가 슬라이드를 인식하지 못함
4. 결과: 슬라이드가 `.swiper-wrapper` 밖, `.swiper` 직접 자식으로 렌더링
5. block 레이아웃으로 세로 스택 → wrapper 아래로 밀림 → overflow: hidden으로 잘림

---

## 수락 기준

- [ ] 모바일 뷰포트에서 `/products/[id]` 접속 시 Swiper 내 이미지가 정상 표시됨
- [ ] `.swiper-slide` 요소들이 `.swiper-wrapper` 안에 위치함 (elementsFromPoint 검증)
- [ ] Swiper 슬라이드 넘김(터치) 정상 동작
- [ ] 데스크톱 갤러리에 영향 없음

---

## 구현

**파일**: `src/components/product/ImageGallery.tsx`

### 변경 1: 동적 import 제거 (lines 17-32)

```tsx
// === 삭제할 코드 (lines 17-32) ===
const Swiper = dynamic(
  () => import('swiper/react').then((mod) => mod.Swiper),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-[4/5] bg-soft-ivory animate-pulse" />
    ),
  }
);

const SwiperSlide = dynamic(
  () => import('swiper/react').then((mod) => mod.SwiperSlide),
  {
    ssr: false,
  }
);
```

### 변경 2: state에 Swiper 컴포넌트 추가

기존 `swiperModules` state 근처에 추가:
```tsx
const [SwiperComponents, setSwiperComponents] = useState<{
  Swiper: typeof import('swiper/react').Swiper;
  SwiperSlide: typeof import('swiper/react').SwiperSlide;
} | null>(null);
```

### 변경 3: useEffect에서 컴포넌트와 모듈 함께 로드 (lines 54-72)

```tsx
// === 교체할 useEffect ===
useEffect(() => {
  const loadSwiperAssets = async () => {
    await Promise.all([
      // @ts-expect-error CSS modules don't have type definitions
      import('swiper/css'),
      // @ts-expect-error CSS modules don't have type definitions
      import('swiper/css/pagination'),
      // @ts-expect-error CSS modules don't have type definitions
      import('swiper/css/navigation'),
    ]);

    const [reactMod, modulesMod] = await Promise.all([
      import('swiper/react'),
      import('swiper/modules'),
    ]);

    setSwiperComponents({ Swiper: reactMod.Swiper, SwiperSlide: reactMod.SwiperSlide });
    setSwiperModules([modulesMod.Pagination, modulesMod.Navigation]);
  };

  loadSwiperAssets();
}, []);
```

### 변경 4: 렌더링에서 컴포넌트 사용

조건부 렌더링 변경:
```tsx
// Before:
{swiperModules ? (
  <Swiper ...>
    {images.map((image, index) => (
      <SwiperSlide key={index}>
        ...
      </SwiperSlide>
    ))}
  </Swiper>
) : (
  <div className="w-full aspect-[4/5] bg-soft-ivory animate-pulse" />
)}

// After:
{SwiperComponents && swiperModules ? (
  <SwiperComponents.Swiper ...>
    {images.map((image, index) => (
      <SwiperComponents.SwiperSlide key={index}>
        ...
      </SwiperComponents.SwiperSlide>
    ))}
  </SwiperComponents.Swiper>
) : (
  <div className="w-full aspect-[4/5] bg-soft-ivory animate-pulse" />
)}
```

### 변경 5: aspect-[4/5] 유지 (이전 v2 변경)

내부 div의 `aspect-[4/5]`는 유지 (자체 높이 결정은 여전히 좋은 방어적 패턴):
```tsx
<div className="relative w-full aspect-[4/5] overflow-hidden">
```

### 변경 6: dynamic import 관련 import 정리

`import dynamic from 'next/dynamic';` 제거 (더 이상 사용 안 함)

---

## 변경 파일 목록 (1개)

1. `src/components/product/ImageGallery.tsx` — dynamic import 제거, useEffect 통합 로드

## 리스크 및 완화

| 리스크 | 완화 |
|-------|------|
| `import dynamic` 제거 후 다른 곳에서 사용 | 이 파일에서만 사용, 안전하게 제거 |
| useEffect 로드 시간 증가 | CSS + React 컴포넌트 + 모듈을 병렬 로드하므로 차이 미미 |
| SwiperComponents state typing | any 타입 허용 또는 적절한 타입 정의 |

## 검증 방법

1. Playwright에서 `.swiper-slide`의 parentElement가 `.swiper-wrapper`인지 확인
2. `elementsFromPoint(swiperCenter)`에 slide와 img가 포함되는지 확인
3. 모바일 뷰포트에서 이미지 시각적으로 표시되는지 확인
4. 데스크톱에서 기존 갤러리 동작 확인

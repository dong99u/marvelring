# Active Context - Marvelring B2B Platform

## Current Phase
PRD 개선 계획 완료 (ralplan OKAY), 실행 대기 중

## Key Decisions Made (2026-01-26)

### 1. 디자인 시스템 변경
- **변경 전**: Ivory/Cream (#ebdebf) 기반
- **변경 후**: High-Contrast B&W (#FFFFFF, #000000)
- 56px 버튼, 0px border-radius, 4열 그리드

### 2. ERD 수정 사항
- **diamond_size**: BIGINT → DECIMAL(5,2) (캐럿은 소수점 값)
- **product_images**: 별도 테이블로 분리
- **member**: approval_status, business_license_url 추가
- FK 관계: product → category, collection

### 3. 상품 상세 페이지 간소화
8개 필드만 유지:
1. 제품명 (product_name)
2. 제품코드 (product_code)
3. 중량 14K/18K (weight_of_14k, weight_of_18k)
4. 기본 공임 (base_labor_cost)
5. 알 공임 (stone_setting_cost)
6. 기성 사이즈 (ring_size/size)
7. 다이아 개수/사이즈 (diamond_amount, diamond_size)
8. 추가사항 (additional_information)

## Files to Modify
- PRD: `.shipspec/planning/marvelring-b2b-platform/PRD.md`
- Plan: `.omc/plans/marvelring-prd-refinement.md`

## Next Steps
1. PRD 수정 실행 (옵션 A)
2. task-master-ai로 개발 task 생성 (옵션 B)
3. 전체 자동화 (옵션 C)

## Tech Stack
- Framework: Next.js + Supabase
- Target: 40-60대 주얼리 B2B 사업자

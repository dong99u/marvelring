# Decision Log - Marvelring B2B Platform

## 2026-01-26: RALPLAN 완료

### Decision 1: diamond_size 데이터 타입
- **결정**: BIGINT → DECIMAL(5,2)
- **이유**: 캐럿 값은 소수점 (0.25, 0.50, 1.33)
- **Architect 검토**: PASS
- **Critic 검토**: PASS

### Decision 2: 디자인 시스템 전환
- **결정**: Ivory 기반 → High-Contrast B&W
- **색상**: #FFFFFF, #FAFAF8, #000000, #C19A2E (Gold accent)
- **이유**: 40-60대 타겟 가독성 향상

### Decision 3: 상품 스펙 간소화
- **제거**: 다이아몬드 4C (color, clarity, cut, certification)
- **제거**: Craftsmanship (stone_setting, finish_type 등)
- **제거**: Safety (lead_free, nickel_free, KC cert)
- **이유**: 사용자 요구사항에 맞게 단순화

### Decision 4: product_images 테이블 분리
- **결정**: images JSONB 배열 → 별도 테이블
- **이유**: 정규화, 유연한 이미지 관리

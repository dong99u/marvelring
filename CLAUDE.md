# Claude Code Instructions

## Task Master AI Instructions
**Import Task Master's development workflow commands and guidelines, treat as if import is in the main CLAUDE.md file.**
@./.taskmaster/CLAUDE.md

---

## TDD (Test-Driven Development) 원칙

Kent Beck의 TDD와 Tidy First 원칙을 따릅니다.

### 핵심 사이클: Red → Green → Refactor

1. **Red**: 실패하는 테스트 먼저 작성
2. **Green**: 테스트를 통과시키는 최소한의 코드 구현
3. **Refactor**: 테스트 통과 후에만 리팩토링

### Tidy First 접근법

모든 변경을 두 가지로 엄격히 분리:

| 변경 유형 | 설명 | 예시 |
|----------|------|------|
| **구조적 변경** | 동작 변경 없이 코드 재배치 | 리네이밍, 메서드 추출, 코드 이동 |
| **행위적 변경** | 실제 기능 추가/수정 | 새 기능 구현, 버그 수정 |

**절대 규칙**: 구조적 변경과 행위적 변경을 같은 커밋에 섞지 않는다.

### 커밋 규율

커밋 조건:
- [ ] 모든 테스트 통과
- [ ] 컴파일러/린터 경고 해결
- [ ] 단일 논리적 작업 단위
- [ ] 커밋 메시지에 구조적/행위적 변경 명시

### 코드 품질 기준

- 중복 제거
- 명확한 의도 표현 (네이밍, 구조)
- 작고 집중된 메서드
- 상태와 부작용 최소화
- 가장 단순한 해결책 선택

### 개발 워크플로우

```
1. 작은 기능에 대한 실패 테스트 작성
2. 최소한의 코드로 테스트 통과 (Green)
3. 구조적 변경 필요시 별도 커밋
4. 다음 기능에 대한 테스트 추가
5. 반복
```

### 결함 수정 시

1. 먼저 API 레벨의 실패 테스트 작성
2. 문제를 재현하는 가장 작은 테스트 작성
3. 두 테스트 모두 통과시키기

**"go"라고 하면 plan.md의 다음 미완료 테스트를 찾아 구현합니다.**

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보 처리방침 | 마블링 B2B',
  description: '마블링 B2B 주얼리 플랫폼의 개인정보 처리방침을 안내합니다.',
};

export default function PrivacyPage() {
  return (
    <main className="flex-1 w-full max-w-[800px] mx-auto px-6 py-20">
      {/* Hero Section */}
      <div className="text-center mb-24">
        <span className="text-gold-muted font-bold tracking-[0.3em] text-[12px] uppercase mb-4 block">
          PRIVACY POLICY
        </span>
        <h2 className="text-[40px] md:text-[56px] font-bold text-charcoal-light tracking-tight mb-6 leading-tight">
          개인정보 처리방침
        </h2>
        <div className="w-12 h-[1px] bg-gold-muted mx-auto mb-6"></div>
        <p className="text-[20px] text-charcoal-light/60 font-light max-w-lg mx-auto leading-relaxed">
          마블링은 고객의 개인정보를 소중히 보호합니다.
        </p>
        <p className="text-[14px] text-charcoal-light/40 mt-4">
          시행일: 2026년 2월 1일
        </p>
      </div>

      {/* 제1조 */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            제1조 (개인정보의 처리 목적)
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="bg-white border border-card-border rounded-2xl p-8">
          <p className="text-[15px] text-charcoal-light/70 leading-relaxed mb-4">
            마블링은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
            개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이
            변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할
            예정입니다.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                <strong className="text-charcoal-light">
                  회원 가입 및 관리:
                </strong>{' '}
                회원제 서비스 이용에 따른 본인확인, 개인 식별, 회원자격 유지 및
                관리, 서비스 부정이용 방지
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                <strong className="text-charcoal-light">B2B 거래 관리:</strong>{' '}
                사업자 인증, 도매 거래 계약의 체결 및 이행, 거래 대금 정산
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                <strong className="text-charcoal-light">서비스 제공:</strong> 상품
                주문, 결제 및 배송, 맞춤형 서비스 제공, 본인인증, 연령인증
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                <strong className="text-charcoal-light">
                  마케팅 및 광고 활용:
                </strong>{' '}
                신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보
                제공 및 참여기회 제공 (동의를 받은 경우에 한함)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                <strong className="text-charcoal-light">고객 상담:</strong>{' '}
                고객의 문의사항 확인 및 처리, 불만처리 등 민원처리, 고지사항
                전달
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* 제2조 */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            제2조 (처리하는 개인정보 항목)
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="bg-white border border-card-border rounded-2xl p-8">
          <div className="mb-6">
            <h4 className="text-[16px] font-bold text-charcoal-light mb-3">
              필수항목
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
                <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                  이름, 이메일 주소, 전화번호
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
                <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                  사업자등록번호, 사업장 주소
                </span>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <h4 className="text-[16px] font-bold text-charcoal-light mb-3">
              선택항목
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
                <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                  회사명, 업종, 매출규모
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[16px] font-bold text-charcoal-light mb-3">
              자동 수집 항목
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
                <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                  접속 IP 정보, 쿠키, 서비스 이용 기록, 접속 로그, 불량 이용
                  기록
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 제3조 */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            제3조 (개인정보의 처리 및 보유기간)
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="bg-white border border-card-border rounded-2xl p-8">
          <p className="text-[15px] text-charcoal-light/70 leading-relaxed mb-4">
            마블링은 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
            개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서
            개인정보를 처리·보유합니다.
          </p>
          <p className="text-[15px] text-charcoal-light/70 leading-relaxed mb-4">
            각각의 개인정보 처리 및 보유 기간은 다음과 같습니다:
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                <strong className="text-charcoal-light">회원 정보:</strong> 회원
                탈퇴 시까지 (단, 관련 법령에 따라 일정 기간 보관)
              </span>
            </li>
          </ul>
          <p className="text-[15px] text-charcoal-light/70 leading-relaxed mb-3">
            관련 법령에 따른 보유:
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="border-b border-card-border">
                  <th className="text-left py-3 pr-4 font-bold text-charcoal-light">
                    보유 항목
                  </th>
                  <th className="text-left py-3 font-bold text-charcoal-light">
                    보유 기간
                  </th>
                </tr>
              </thead>
              <tbody className="text-charcoal-light/60">
                <tr className="border-b border-card-border/50">
                  <td className="py-3 pr-4">
                    계약 또는 청약철회 등에 관한 기록
                  </td>
                  <td className="py-3">5년</td>
                </tr>
                <tr className="border-b border-card-border/50">
                  <td className="py-3 pr-4">
                    대금결제 및 재화 등의 공급에 관한 기록
                  </td>
                  <td className="py-3">5년</td>
                </tr>
                <tr className="border-b border-card-border/50">
                  <td className="py-3 pr-4">
                    소비자의 불만 또는 분쟁처리에 관한 기록
                  </td>
                  <td className="py-3">3년</td>
                </tr>
                <tr className="border-b border-card-border/50">
                  <td className="py-3 pr-4">표시·광고에 관한 기록</td>
                  <td className="py-3">6개월</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">접속 로그 기록</td>
                  <td className="py-3">3개월</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 제4조 */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            제4조 (개인정보의 제3자 제공)
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="bg-white border border-card-border rounded-2xl p-8">
          <p className="text-[15px] text-charcoal-light/70 leading-relaxed mb-4">
            마블링은 원칙적으로 정보주체의 개인정보를 수집·이용 목적으로
            명시한 범위 내에서 처리하며, 다음의 경우를 제외하고는 정보주체의
            사전 동의 없이 본래의 목적 범위를 초과하여 처리하거나 제3자에게
            제공하지 않습니다.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                정보주체로부터 별도의 동의를 받은 경우
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여
                불가피한 경우
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                정보주체 또는 그 법정대리인이 의사표시를 할 수 없는 상태에
                있거나 주소불명 등으로 사전 동의를 받을 수 없는 경우로서
                명백히 정보주체 또는 제3자의 급박한 생명, 신체, 재산의 이익을
                위하여 필요하다고 인정되는 경우
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* 제5조 */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            제5조 (개인정보의 파기)
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="bg-white border border-card-border rounded-2xl p-8">
          <p className="text-[15px] text-charcoal-light/70 leading-relaxed mb-4">
            마블링은 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가
            불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
          </p>
          <div className="mb-6">
            <h4 className="text-[16px] font-bold text-charcoal-light mb-3">
              파기 절차
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
                <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                  이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의
                  경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간
                  저장된 후 혹은 즉시 파기됩니다.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
                <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                  이때, DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는
                  다른 목적으로 이용되지 않습니다.
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[16px] font-bold text-charcoal-light mb-3">
              파기 방법
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
                <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                  <strong className="text-charcoal-light">전자적 파일 형태:</strong>{' '}
                  복구 및 재생되지 않도록 기술적 방법을 이용하여 완전하게 삭제
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
                <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                  <strong className="text-charcoal-light">종이 문서:</strong>{' '}
                  분쇄기로 분쇄하거나 소각을 통하여 파기
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 제6조 */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            제6조 (정보주체의 권리·의무 및 그 행사방법)
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="bg-white border border-card-border rounded-2xl p-8">
          <p className="text-[15px] text-charcoal-light/70 leading-relaxed mb-4">
            정보주체는 마블링에 대해 언제든지 다음 각 호의 개인정보 보호 관련
            권리를 행사할 수 있습니다.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                개인정보 열람 요구
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                오류 등이 있을 경우 정정 요구
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                삭제 요구
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                처리정지 요구
              </span>
            </li>
          </ul>
          <p className="text-[15px] text-charcoal-light/70 leading-relaxed mb-4">
            위 권리 행사는 서면, 전자우편 등을 통하여 하실 수 있으며 마블링은
            이에 대해 지체 없이 조치하겠습니다.
          </p>
          <p className="text-[15px] text-charcoal-light/70 leading-relaxed">
            권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을
            통하여 하실 수도 있습니다. 이 경우 개인정보 보호법 시행규칙 별지
            제11호 서식에 따른 위임장을 제출하셔야 합니다.
          </p>
        </div>
      </section>

      {/* 제7조 */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            제7조 (개인정보의 안전성 확보조치)
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="bg-white border border-card-border rounded-2xl p-8">
          <p className="text-[15px] text-charcoal-light/70 leading-relaxed mb-4">
            마블링은 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
            있습니다.
          </p>
          <div className="space-y-6">
            <div>
              <h4 className="text-[16px] font-bold text-charcoal-light mb-3">
                관리적 조치
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
                  <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                    내부관리계획 수립 및 시행
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
                  <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                    정기적인 직원 교육 실시
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
                  <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                    개인정보 취급 담당자의 최소화 및 수시 교육
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-charcoal-light mb-3">
                기술적 조치
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
                  <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                    개인정보처리시스템 등의 접근권한 관리
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
                  <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                    접근통제시스템 설치
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
                  <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                    개인정보의 암호화
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
                  <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                    보안프로그램 설치 및 갱신
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-charcoal-light mb-3">
                물리적 조치
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
                  <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                    전산실, 자료보관실 등의 접근통제
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 제8조 */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            제8조 (개인정보 보호책임자)
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="bg-white border border-card-border rounded-2xl p-8">
          <p className="text-[15px] text-charcoal-light/70 leading-relaxed mb-6">
            마블링은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
            처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와
            같이 개인정보 보호책임자를 지정하고 있습니다.
          </p>
          <div className="bg-soft-ivory/30 rounded-xl p-6 border border-card-border/50">
            <h4 className="text-[16px] font-bold text-charcoal-light mb-4">
              개인정보 보호책임자
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-[15px] text-charcoal-light/50 w-20 shrink-0">
                  부서명:
                </span>
                <span className="text-[15px] text-charcoal-light/70">
                  고객지원팀
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[15px] text-charcoal-light/50 w-20 shrink-0">
                  연락처:
                </span>
                <span className="text-[15px] text-charcoal-light/70">
                  010-8365-3303 / 010-8186-4404
                </span>
              </li>
            </ul>
          </div>
          <p className="text-[15px] text-charcoal-light/70 leading-relaxed mt-6">
            정보주체께서는 마블링의 서비스를 이용하시면서 발생한 모든 개인정보
            보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보
            보호책임자에게 문의하실 수 있습니다. 마블링은 정보주체의 문의에 대해
            지체 없이 답변 및 처리해드릴 것입니다.
          </p>
        </div>
      </section>

      {/* 제9조 */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            제9조 (개인정보 처리방침 변경)
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="bg-white border border-card-border rounded-2xl p-8">
          <p className="text-[15px] text-charcoal-light/70 leading-relaxed mb-4">
            이 개인정보 처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른
            변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일
            전부터 공지사항을 통하여 고지할 것입니다.
          </p>
          <p className="text-[15px] text-charcoal-light/70 leading-relaxed">
            다만, 개인정보의 수집 및 활용, 제3자 제공 등과 같이 이용자 권리의
            중요한 변경이 있을 경우에는 최소 30일 전에 고지합니다.
          </p>
        </div>
      </section>

      {/* Footer */}
      <div className="text-center pt-12 border-t border-card-border/30">
        <p className="text-[14px] text-charcoal-light/40">
          본 개인정보 처리방침은 2026년 2월 1일부터 적용됩니다.
        </p>
      </div>
    </main>
  );
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관 | 마블링 B2B',
  description: '마블링 B2B 주얼리 플랫폼의 서비스 이용약관을 안내합니다.',
};

export default function TermsPage() {
  return (
    <main className="flex-1 w-full max-w-[800px] mx-auto px-6 py-20">
      {/* Hero Section */}
      <div className="text-center mb-24">
        <span className="text-gold-muted font-bold tracking-[0.3em] text-[12px] uppercase mb-4 block">
          TERMS OF SERVICE
        </span>
        <h2 className="text-[40px] md:text-[56px] font-bold text-charcoal-light tracking-tight mb-6 leading-tight">
          이용약관
        </h2>
        <div className="w-12 h-[1px] bg-gold-muted mx-auto mb-6"></div>
        <p className="text-[20px] text-charcoal-light/60 font-light max-w-lg mx-auto leading-relaxed">
          마블링 B2B 플랫폼의 이용 조건을 안내합니다.
        </p>
        <p className="text-[14px] text-charcoal-light/40 mt-4">
          시행일: 2026년 2월 1일
        </p>
      </div>

      {/* 제1조 (목적) */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            제1조 (목적)
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="bg-white border border-card-border rounded-2xl p-8">
          <p className="text-[15px] text-charcoal-light/70 leading-relaxed">
            본 약관은 마블링(이하 "회사")이 운영하는 B2B 주얼리 도매 플랫폼 서비스(이하 "서비스")를 이용함에 있어 회사와 회원 간의 권리, 의무 및 책임사항, 서비스 이용조건 및 절차 등 기본적인 사항을 규정함을 목적으로 합니다.
          </p>
        </div>
      </section>

      {/* 제2조 (정의) */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            제2조 (정의)
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="bg-white border border-card-border rounded-2xl p-8">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">①</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                "서비스"란 회사가 제공하는 B2B 주얼리 도매 플랫폼 및 이와 관련된 제반 서비스를 의미합니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">②</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                "회원"이란 회사의 서비스에 접속하여 본 약관에 따라 회사와 이용계약을 체결하고 사업자 인증을 완료하여 회사가 제공하는 서비스를 이용하는 사업자를 말합니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">③</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                "파트너"란 회사와 별도의 파트너십 계약을 체결하고 서비스를 통해 상품을 공급하는 사업자를 말합니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">④</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                "상품"이란 서비스를 통해 거래되는 주얼리 및 관련 제품을 의미합니다.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* 제3조 (약관의 효력 및 변경) */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            제3조 (약관의 효력 및 변경)
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="bg-white border border-card-border rounded-2xl p-8">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">①</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                본 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력이 발생합니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">②</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있으며, 변경된 약관은 시행일자 7일 전부터 서비스 화면에 게시하여 회원에게 공지합니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">③</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                회원은 변경된 약관에 동의하지 않을 권리가 있으며, 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 이용계약을 해지할 수 있습니다. 단, 약관 변경 공지 후 7일 이내에 거부 의사를 표시하지 않을 경우 동의한 것으로 간주됩니다.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* 제4조 (회원 가입) */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            제4조 (회원 가입)
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="bg-white border border-card-border rounded-2xl p-8">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">①</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                회원 가입은 사업자등록증 제출 및 회사가 요구하는 필수 정보 입력을 통해 신청하며, 회사의 승인으로 완료됩니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">②</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                회사는 다음 각 호에 해당하는 신청에 대해서는 승인을 거부하거나 사후에 이용계약을 해지할 수 있습니다.
              </span>
            </li>
          </ul>
          <ul className="space-y-3 mt-4 ml-8">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                가입신청자가 본 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                허위의 정보를 기재하거나 타인의 정보를 도용한 경우
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                사업자등록증이 유효하지 않거나 확인이 불가능한 경우
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                기타 회사가 정한 이용신청 요건이 미비한 경우
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* 제5조 (서비스 이용) */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            제5조 (서비스 이용)
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="bg-white border border-card-border rounded-2xl p-8">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">①</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                서비스는 연중무휴 1일 24시간 제공함을 원칙으로 합니다. 다만, 정기점검이나 시스템 개선 등 회사가 필요한 경우 서비스의 전부 또는 일부를 제한하거나 중지할 수 있습니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">②</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                회사는 서비스 점검 등의 사유로 서비스 제공이 일시적으로 중단되는 경우 사전에 공지합니다. 다만, 회사가 통제할 수 없는 사유로 발생한 서비스의 중단에 대해서는 사전 공지가 불가능할 수 있습니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">③</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                회원은 서비스를 B2B 도매 거래 목적으로만 이용해야 하며, 개인 소비자 대상 소매 판매나 기타 본래 목적 외의 용도로 이용할 수 없습니다.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* 제6조 (주문 및 결제) */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            제6조 (주문 및 결제)
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="bg-white border border-card-border rounded-2xl p-8">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">①</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                회원은 서비스에서 제공하는 절차에 따라 주문을 신청하며, 회사는 주문 내용을 확인한 후 주문을 처리합니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">②</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                결제 방법은 무통장 입금, 카드결제 등 회사가 지정한 방법을 따르며, 회원은 정당한 결제 수단을 사용해야 합니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">③</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                도매가는 회원 등급 및 주문 수량에 따라 차등 적용되며, 회사는 회원에게 적용되는 가격을 서비스 화면에 명시합니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">④</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                회사는 재고 부족, 가격 오류 등 정당한 사유가 있는 경우 주문을 취소하거나 변경할 수 있으며, 이 경우 회원에게 즉시 통지합니다.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* 제7조 (배송) */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            제7조 (배송)
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="bg-white border border-card-border rounded-2xl p-8">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">①</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                회사는 결제 완료 후 영업일 기준 1~3일 이내에 상품을 발송하는 것을 원칙으로 합니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">②</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                배송 지역이 도서산간 지역인 경우 추가 배송 기간이 소요될 수 있으며, 천재지변, 물류 대란 등 불가항력적 사유로 배송이 지연될 수 있습니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">③</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                회사는 회원에게 배송 정보를 제공하며, 회원은 서비스 화면에서 배송 상태를 확인할 수 있습니다.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* 제8조 (교환 및 반품) */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            제8조 (교환 및 반품)
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="bg-white border border-card-border rounded-2xl p-8">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">①</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                교환 및 반품은 상품 수령 후 7일 이내에 신청 가능하며, 회사가 정한 절차에 따라 처리됩니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">②</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                상품 하자 또는 오배송의 경우 회사가 배송비를 부담하며 무상으로 교환 또는 반품 처리합니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">③</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                단순 변심에 의한 교환 또는 반품의 경우 왕복 배송비는 회원이 부담합니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">④</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                다음 각 호의 경우에는 교환 및 반품이 불가능합니다.
              </span>
            </li>
          </ul>
          <ul className="space-y-3 mt-4 ml-8">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                회원의 책임 있는 사유로 상품이 멸실 또는 훼손된 경우
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                착용 흔적이 있거나 포장이 훼손되어 상품 가치가 현저히 감소한 경우
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                주문제작 상품 등 상품의 특성상 교환 또는 반품이 불가능한 경우
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mt-2 shrink-0"></span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                수령 후 7일이 경과한 경우
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* 제9조 (회원의 의무) */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            제9조 (회원의 의무)
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="bg-white border border-card-border rounded-2xl p-8">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">①</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                회원은 가입 시 제공한 정보에 변경사항이 있을 경우 즉시 수정해야 하며, 정보 미수정으로 인한 불이익은 회원이 부담합니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">②</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                회원은 본인의 계정을 타인에게 양도, 증여하거나 담보로 제공할 수 없으며, 타인의 정보를 도용하여 서비스를 이용할 수 없습니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">③</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                회원은 서비스를 통해 구매한 상품을 도매가 이하로 소매 판매하는 등 회사의 영업을 방해하거나 불공정 거래를 유발하는 행위를 할 수 없습니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">④</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                회원은 관련 법령, 본 약관, 이용안내 및 서비스와 관련하여 공지한 주의사항, 회사가 통지하는 사항을 준수해야 하며, 기타 회사의 업무에 방해되는 행위를 해서는 안 됩니다.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* 제10조 (서비스 이용 제한) */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            제10조 (서비스 이용 제한)
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="bg-white border border-card-border rounded-2xl p-8">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">①</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                회사는 회원이 본 약관의 의무를 위반하거나 서비스의 정상적인 운영을 방해한 경우 경고, 일시정지, 영구이용정지 등으로 서비스 이용을 단계적으로 제한할 수 있습니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">②</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                회사는 회원이 관련 법령을 위반하거나 범죄 행위에 이용하는 등 중대한 위반 행위를 한 경우 사전 통지 없이 즉시 이용계약을 해지할 수 있습니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">③</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                회사의 이용 제한에 대해 회원은 회사가 정한 절차에 따라 이의신청을 할 수 있으며, 회사는 이의신청이 정당하다고 판단되는 경우 즉시 서비스 이용을 재개합니다.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* 제11조 (면책) */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            제11조 (면책)
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="bg-white border border-card-border rounded-2xl p-8">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">①</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등 불가항력적 사유로 서비스를 제공할 수 없는 경우 서비스 제공에 대한 책임이 면제됩니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">②</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                회사는 회원의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을 지지 않습니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">③</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                회사는 회원이 서비스를 이용하여 기대하는 수익을 얻지 못하거나 상실한 것에 대하여 책임을 지지 않으며, 서비스를 통하여 얻은 자료로 인한 손해에 대하여도 책임을 지지 않습니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">④</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                회사는 회원 간 또는 회원과 제3자 상호간에 서비스를 매개로 발생한 분쟁에 대해서는 개입할 의무가 없으며 이로 인한 손해를 배상할 책임도 없습니다.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* 제12조 (분쟁 해결) */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            제12조 (분쟁 해결)
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="bg-white border border-card-border rounded-2xl p-8">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">①</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                회사와 회원은 서비스와 관련하여 발생한 분쟁을 원만하게 해결하기 위하여 필요한 모든 노력을 하여야 합니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">②</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                서비스 이용과 관련하여 회사와 회원 사이에 분쟁이 발생한 경우, 회사와 회원은 분쟁의 해결을 위해 성실히 협의합니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">③</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                협의에도 불구하고 분쟁이 해결되지 않을 경우 양 당사자는 전자상거래 등에서의 소비자보호에 관한 법률에 따라 설치된 전자거래분쟁조정위원회에 조정을 신청할 수 있습니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-muted font-bold text-[13px] shrink-0">④</span>
              <span className="text-[15px] text-charcoal-light/70 leading-relaxed">
                본 약관과 관련된 소송은 회사의 본사 소재지를 관할하는 법원을 전속 관할 법원으로 합니다.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* 부칙 */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            부칙
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="bg-white border border-card-border rounded-2xl p-8">
          <p className="text-[15px] text-charcoal-light/70 leading-relaxed">
            본 약관은 2026년 2월 1일부터 시행됩니다.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section>
        <div className="bg-soft-ivory border border-card-border rounded-2xl p-8">
          <h3 className="text-[18px] font-bold text-charcoal-light mb-6">
            문의처
          </h3>
          <div className="space-y-3">
            <p className="text-[15px] text-charcoal-light/70">
              <span className="font-semibold">상호명:</span> 마블링 (MarvelRing)
            </p>
            <p className="text-[15px] text-charcoal-light/70">
              <span className="font-semibold">전화:</span> 010-8365-3303 / 010-8186-4404
            </p>
            <p className="text-[14px] text-charcoal-light/50 mt-6">
              이용약관에 대한 문의는 위 연락처로 부탁드립니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

import { Metadata } from 'next';
import {
  TrendingUp,
  Users,
  Truck,
  Megaphone,
  Store,
  Globe,
  Crown,
  FileText,
  ClipboardCheck,
  Handshake,
  Rocket,
  MessageCircle,
  Phone,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '파트너십 안내 | 마블링 B2B',
  description:
    '마블링 B2B 주얼리 플랫폼의 파트너십 프로그램을 안내합니다. 도매가, 전담 매니저, 마케팅 지원 등 다양한 혜택을 제공합니다.',
};

export default function PartnershipPage() {
  const kakaoLink = process.env.NEXT_PUBLIC_DEFAULT_KAKAO_LINK || '#';

  return (
    <main className="flex-1 w-full max-w-[800px] mx-auto px-6 py-20">
      {/* Hero Section */}
      <div className="text-center mb-24">
        <span className="text-gold-muted font-bold tracking-[0.3em] text-[12px] uppercase mb-4 block">
          PARTNERSHIP
        </span>
        <h2 className="text-[40px] md:text-[56px] font-bold text-charcoal-light tracking-tight mb-6 leading-tight">
          파트너십 안내
        </h2>
        <div className="w-12 h-[1px] bg-gold-muted mx-auto mb-6"></div>
        <p className="text-[20px] text-charcoal-light/60 font-light max-w-lg mx-auto leading-relaxed">
          마블링과 함께 럭셔리 주얼리 비즈니스의 새로운 기회를 만나보세요.
        </p>
      </div>

      {/* 파트너십 혜택 Section */}
      <section className="mb-32">
        <div className="flex items-center gap-4 mb-12">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            파트너십 혜택
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Benefit 1: 경쟁력 있는 도매가 */}
          <div className="bg-white border border-card-border p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="w-14 h-14 rounded-full bg-soft-ivory border border-card-border/50 flex items-center justify-center mb-6">
              <TrendingUp className="w-7 h-7 text-gold-muted" />
            </div>
            <h4 className="text-[20px] font-bold text-charcoal-light mb-3">
              경쟁력 있는 도매가
            </h4>
            <p className="text-[16px] text-charcoal-light/60 leading-relaxed">
              업계 최저 수준의 도매 가격으로 높은 마진을 확보하세요.
            </p>
          </div>

          {/* Benefit 2: 전용 고객 매니저 */}
          <div className="bg-white border border-card-border p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="w-14 h-14 rounded-full bg-soft-ivory border border-card-border/50 flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-gold-muted" />
            </div>
            <h4 className="text-[20px] font-bold text-charcoal-light mb-3">
              전용 고객 매니저
            </h4>
            <p className="text-[16px] text-charcoal-light/60 leading-relaxed">
              1:1 전담 매니저가 비즈니스 성장을 함께합니다.
            </p>
          </div>

          {/* Benefit 3: 빠른 배송 시스템 */}
          <div className="bg-white border border-card-border p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="w-14 h-14 rounded-full bg-soft-ivory border border-card-border/50 flex items-center justify-center mb-6">
              <Truck className="w-7 h-7 text-gold-muted" />
            </div>
            <h4 className="text-[20px] font-bold text-charcoal-light mb-3">
              빠른 배송 시스템
            </h4>
            <p className="text-[16px] text-charcoal-light/60 leading-relaxed">
              파트너 전용 물류 시스템으로 신속한 배송을 보장합니다.
            </p>
          </div>

          {/* Benefit 4: 마케팅 지원 */}
          <div className="bg-white border border-card-border p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="w-14 h-14 rounded-full bg-soft-ivory border border-card-border/50 flex items-center justify-center mb-6">
              <Megaphone className="w-7 h-7 text-gold-muted" />
            </div>
            <h4 className="text-[20px] font-bold text-charcoal-light mb-3">마케팅 지원</h4>
            <p className="text-[16px] text-charcoal-light/60 leading-relaxed">
              브랜드 이미지 소스 및 마케팅 자료를 무상 제공합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 파트너 유형 Section */}
      <section className="mb-32">
        <div className="flex items-center gap-4 mb-12">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">파트너 유형</h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Type 1: 리테일 파트너 */}
          <div className="bg-white border border-card-border rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-500">
            <div className="w-16 h-16 rounded-full bg-soft-ivory border border-card-border/50 flex items-center justify-center mx-auto mb-6">
              <Store className="w-8 h-8 text-gold-muted" />
            </div>
            <h4 className="text-[20px] font-bold text-charcoal-light mb-3">
              리테일 파트너
            </h4>
            <p className="text-[15px] text-charcoal-light/60 leading-relaxed">
              오프라인 매장 운영 사업자
            </p>
          </div>

          {/* Type 2: 온라인 파트너 */}
          <div className="bg-white border border-card-border rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-500">
            <div className="w-16 h-16 rounded-full bg-soft-ivory border border-card-border/50 flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-gold-muted" />
            </div>
            <h4 className="text-[20px] font-bold text-charcoal-light mb-3">
              온라인 파트너
            </h4>
            <p className="text-[15px] text-charcoal-light/60 leading-relaxed">
              온라인 쇼핑몰 및 플랫폼 운영자
            </p>
          </div>

          {/* Type 3: 프리미엄 파트너 */}
          <div className="bg-white border border-card-border rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-500">
            <div className="w-16 h-16 rounded-full bg-soft-ivory border border-card-border/50 flex items-center justify-center mx-auto mb-6">
              <Crown className="w-8 h-8 text-gold-muted" />
            </div>
            <h4 className="text-[20px] font-bold text-charcoal-light mb-3">
              프리미엄 파트너
            </h4>
            <p className="text-[15px] text-charcoal-light/60 leading-relaxed">
              하이엔드 부티크 및 럭셔리 리테일러
            </p>
          </div>
        </div>
      </section>

      {/* 입점 절차 Section */}
      <section className="mb-32">
        <div className="flex items-center gap-4 mb-12">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">입점 절차</h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="relative flex flex-col gap-16 ml-4 before:content-[''] before:absolute before:left-[23px] before:top-0 before:bottom-0 before:w-[1px] before:bg-card-border/60 before:z-0">
          {/* Step 01: 온라인 신청 */}
          <div className="relative z-10 flex gap-8 items-start">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-gold-muted flex items-center justify-center text-gold-muted shrink-0 shadow-sm">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[12px] font-bold text-gold-muted tracking-widest uppercase mb-1 block">
                Step 01
              </span>
              <h4 className="text-[20px] font-bold text-charcoal-light mb-2">온라인 신청</h4>
              <p className="text-[16px] text-charcoal-light/60 leading-relaxed">
                파트너십 신청서를 작성하여 제출해 주세요.
              </p>
            </div>
          </div>

          {/* Step 02: 서류 검토 */}
          <div className="relative z-10 flex gap-8 items-start">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-gold-muted flex items-center justify-center text-gold-muted shrink-0 shadow-sm">
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[12px] font-bold text-gold-muted tracking-widest uppercase mb-1 block">
                Step 02
              </span>
              <h4 className="text-[20px] font-bold text-charcoal-light mb-2">서류 검토</h4>
              <p className="text-[16px] text-charcoal-light/60 leading-relaxed">
                제출된 서류를 바탕으로 사업자 적합성을 검토합니다.
              </p>
            </div>
          </div>

          {/* Step 03: 계약 체결 */}
          <div className="relative z-10 flex gap-8 items-start">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-gold-muted flex items-center justify-center text-gold-muted shrink-0 shadow-sm">
              <Handshake className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[12px] font-bold text-gold-muted tracking-widest uppercase mb-1 block">
                Step 03
              </span>
              <h4 className="text-[20px] font-bold text-charcoal-light mb-2">계약 체결</h4>
              <p className="text-[16px] text-charcoal-light/60 leading-relaxed">
                파트너십 조건 협의 후 공식 계약을 진행합니다.
              </p>
            </div>
          </div>

          {/* Step 04: 운영 시작 */}
          <div className="relative z-10 flex gap-8 items-start">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-gold-muted flex items-center justify-center text-gold-muted shrink-0 shadow-sm">
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[12px] font-bold text-gold-muted tracking-widest uppercase mb-1 block">
                Step 04
              </span>
              <h4 className="text-[20px] font-bold text-charcoal-light mb-2">운영 시작</h4>
              <p className="text-[16px] text-charcoal-light/60 leading-relaxed">
                전용 계정 발급과 함께 본격적인 거래를 시작합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 파트너십 문의 Section */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-4 mb-6">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            파트너십 문의
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>

        {/* KakaoTalk Card */}
        <div className="group bg-white border border-card-border p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <div className="w-16 h-16 bg-[#FEE500] rounded-2xl flex items-center justify-center text-charcoal-light/80 shrink-0">
              <MessageCircle className="w-8 h-8" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-[24px] font-bold text-charcoal-light mb-1">
                카카오톡 1:1 상담
              </h3>
              <p className="text-[15px] text-charcoal-light/50">
                파트너십 가입 및 혜택 문의
              </p>
            </div>
          </div>
          <a
            href={kakaoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-10 h-[64px] bg-gold-muted hover:bg-[#967d50] text-white text-[18px] font-bold rounded-xl transition-all flex items-center justify-center gap-3 shadow-md"
          >
            <MessageCircle className="w-5 h-5" />
            상담하기
          </a>
        </div>

        {/* Phone Card */}
        <div className="group bg-white border border-card-border p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <div className="w-16 h-16 rounded-full bg-soft-ivory flex items-center justify-center border border-card-border/50 shrink-0">
              <Phone className="w-8 h-8 text-gold-muted" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-[24px] font-bold text-charcoal-light mb-1">전화 문의</h3>
              <p className="text-[28px] font-bold text-gold-muted tracking-wide">
                02-1234-5678
              </p>
            </div>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-[14px] text-charcoal-light/40 uppercase tracking-widest mb-1">
              Available Time
            </p>
            <p className="text-[16px] font-semibold text-charcoal-light/70">
              평일 10:00 - 18:00
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

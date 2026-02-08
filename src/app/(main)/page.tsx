import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  const kakaoLink = process.env.NEXT_PUBLIC_DEFAULT_KAKAO_LINK || '#';

  return (
    <>
      {/* Hero Section with Marble Background */}
      <section className="marble-bg w-full py-32 md:py-40 flex flex-col items-center text-center px-6">
        <span className="text-[11px] md:text-[12px] font-bold tracking-[0.4em] uppercase text-gold-muted mb-4">
          B2B Gold Wholesale Hub
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-charcoal-light mb-6 md:mb-8 leading-tight">
          성공적인 비즈니스를 위한
          <br />
          프리미엄 골드 주얼리 플랫폼
        </h2>
        <div className="w-12 md:w-16 h-[1px] bg-gold-muted/40 mb-8 md:mb-10"></div>
        <p className="max-w-xl text-charcoal-light/60 leading-relaxed font-light text-base md:text-lg px-4">
          단순한 상품 공급을 넘어, 귀사의 비즈니스 성장을 지원하는
          <br className="hidden sm:block" />
          맞춤형 B2B 통합 솔루션을 경험하십시오.
        </p>
      </section>

      {/* Service Hub Section */}
      <section className="w-full bg-white py-20 md:py-32 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-12 md:mb-20 text-center">
            <h3 className="text-xl md:text-2xl font-light tracking-tight text-charcoal-light mb-4">
              사업자 맞춤형 서비스 허브
            </h3>
            <p className="text-[11px] md:text-[13px] text-charcoal-light/50 tracking-widest uppercase">
              Customized Business Solutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Card 1: 맞춤 제작 솔루션 */}
            <div className="dashboard-item">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 md:mb-8">
                <span className="material-symbols-outlined text-gold-muted text-2xl">
                  design_services
                </span>
              </div>
              <h4 className="text-sm md:text-[15px] font-bold mb-3 md:mb-4 tracking-tight">
                맞춤 제작 솔루션
              </h4>
              <p className="text-xs md:text-[13px] text-charcoal-light/60 leading-relaxed mb-6 md:mb-8">
                귀사만의 고유한 디자인을 실현하는 맞춤형 ODM/OEM 제작 지원
                시스템을 제공합니다.
              </p>
              <button className="text-[10px] md:text-[11px] font-bold text-gold-muted uppercase tracking-widest flex items-center gap-2 group">
                상세보기{' '}
                <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>

            {/* Card 2: 대량 구매 문의 */}
            <div className="dashboard-item">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 md:mb-8">
                <span className="material-symbols-outlined text-gold-muted text-2xl">
                  inventory_2
                </span>
              </div>
              <h4 className="text-sm md:text-[15px] font-bold mb-3 md:mb-4 tracking-tight">
                대량 구매 문의
              </h4>
              <p className="text-xs md:text-[13px] text-charcoal-light/60 leading-relaxed mb-6 md:mb-8">
                대량 발주 시 경쟁력 있는 단가 제안과 최우선 배송 프로세스로 운영
                효율을 극대화합니다.
              </p>
              <button className="text-[10px] md:text-[11px] font-bold text-gold-muted uppercase tracking-widest flex items-center gap-2 group">
                문의하기{' '}
                <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>

            {/* Card 3: 재고 연동 시스템 */}
            <div className="dashboard-item">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 md:mb-8">
                <span className="material-symbols-outlined text-gold-muted text-2xl">
                  sync_alt
                </span>
              </div>
              <h4 className="text-sm md:text-[15px] font-bold mb-3 md:mb-4 tracking-tight">
                재고 연동 시스템
              </h4>
              <p className="text-xs md:text-[13px] text-charcoal-light/60 leading-relaxed mb-6 md:mb-8">
                실시간 API 연동을 통해 품절 걱정 없는 스마트한 재고 관리 환경을
                제공합니다.
              </p>
              <button className="text-[10px] md:text-[11px] font-bold text-gold-muted uppercase tracking-widest flex items-center gap-2 group">
                API 가이드{' '}
                <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>

            {/* Card 4: 마케팅 자료 지원 */}
            <div className="dashboard-item">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 md:mb-8">
                <span className="material-symbols-outlined text-gold-muted text-2xl">
                  photo_library
                </span>
              </div>
              <h4 className="text-sm md:text-[15px] font-bold mb-3 md:mb-4 tracking-tight">
                마케팅 자료 지원
              </h4>
              <p className="text-xs md:text-[13px] text-charcoal-light/60 leading-relaxed mb-6 md:mb-8">
                판매를 촉진하는 고퀄리티 제품 화보와 상세 이미지, 카탈로그
                소스를 무료로 제공합니다.
              </p>
              <button className="text-[10px] md:text-[11px] font-bold text-gold-muted uppercase tracking-widest flex items-center gap-2 group">
                자료실 이동{' '}
                <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Season Collection Section */}
      <section className="w-full bg-soft-ivory py-20 md:py-32 px-4 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-center">
          <div className="w-full md:w-5/12 aspect-[4/5] bg-gray-100 overflow-hidden shadow-xl relative">
            <Image
              alt="2024 미니멀리스트 헤리티지 시리즈"
              className="object-cover opacity-90"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIEaDRhQiMdJ-MM-sQmZF2tcFhLxPELgGHpgg5kD_rZENLCwTrOdhq1CtHksAY5aMdOpfArLP6zPm-csZbqqxqlg5yunc2VXxbsfoZgE-0u_wzr6AfEclAqLBwNvcP2ftjnjsWM2zhAGdEVXQM92-uK5N-KIradYa-cds6gb-7Mek1emHwcTk4sv-JENUQmyVgszv_dCQWKyhMnIa_h5OxYpqqIM-0hJwQuLWPs1U-F3ffHeuKn3O_9wmWazUgz3dnN_wPLl4QCPcd"
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              priority
            />
          </div>
          <div className="w-full md:w-7/12 flex flex-col items-start">
            <span className="text-gold-muted text-[10px] md:text-[11px] font-bold tracking-[0.3em] uppercase mb-4 md:mb-6">
              시즌 컬렉션
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-charcoal-light mb-6 md:mb-10 leading-snug">
              2024 미니멀리스트 <br />
              헤리티지 시리즈
            </h2>
            <p className="text-charcoal-light/60 text-base md:text-lg leading-relaxed mb-8 md:mb-12 font-light">
              품격과 영속성을 위해 정교하게 설계되었습니다. <br />
              18K 및 24K 골드의 묵직한 중량감과 간결한 라인에 집중한 이번
              컬렉션은 귀사의 쇼룸을 더욱 빛내줄 것입니다.
            </p>
            <button className="px-8 md:px-12 py-4 md:py-5 border border-charcoal-light text-[11px] md:text-[12px] font-bold uppercase tracking-widest hover:bg-charcoal-light hover:text-white transition-all">
              컬렉션 전체보기
            </button>
          </div>
        </div>
      </section>

      {/* Business Consultation Section */}
      <section className="w-full max-w-4xl px-4 md:px-10 py-20 md:py-32 mx-auto">
        <div className="bg-marble-grey border border-gray-100 p-10 md:p-20 flex flex-col items-center">
          <h3 className="text-xl md:text-2xl font-light mb-8 md:mb-10 tracking-tight text-center">
            비즈니스 파트너 전용 상담 채널
          </h3>
          <a
            href={kakaoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 md:gap-4 bg-[#FEE500]/90 hover:bg-[#FEE500] px-10 md:px-16 py-5 md:py-6 transition-all w-full md:w-auto"
          >
            <span className="material-symbols-outlined text-black font-light text-xl md:text-2xl">
              chat_bubble
            </span>
            <span className="text-xs md:text-sm font-bold text-black tracking-wider">
              카카오톡 도매 문의 및 상담
            </span>
          </a>
          <p className="mt-8 md:mt-10 text-[10px] md:text-[11px] text-charcoal-light/40 tracking-[0.2em] uppercase leading-loose text-center">
            영업시간 내 상담 시 1시간 이내 답변을 원칙으로 합니다 <br />
            (평일 09:00 - 18:00)
          </p>
        </div>
      </section>
    </>
  );
}

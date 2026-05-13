import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  const kakaoLink = process.env.NEXT_PUBLIC_DEFAULT_KAKAO_LINK || '#';

  return (
    <>
      {/* Hero Section with Marble Background */}
      <section className="marble-bg w-full py-32 md:py-44 flex flex-col items-center text-center px-6">
        <span className="text-[11px] md:text-[12px] font-bold tracking-[0.4em] uppercase text-gold-muted mb-4">
          B2B Gold Wholesale Hub
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-charcoal-light mb-7 md:mb-9 leading-[1.35] md:leading-[1.28]">
          도매를 넘어,
          <br />
          사업 운영까지 연결합니다.
        </h2>
        <div className="w-12 md:w-16 h-[1px] bg-gold-muted/45 mb-9 md:mb-11"></div>
        <p className="max-w-2xl text-charcoal-light/65 leading-[1.9] md:leading-[1.95] font-light text-base md:text-lg px-4">
          주문 · 제작 · 출고 흐름을
          <br className="block" />
          하나의 시스템으로 관리하세요.
        </p>
      </section>

      {/* Service Hub Section */}
      <section className="w-full bg-white py-20 md:py-32 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-12 md:mb-20 text-center">
            <h3 className="text-xl md:text-2xl font-light tracking-tight text-charcoal-light mb-4">
              사업 운영을 위한 B2B 서비스 허브
            </h3>
            <p className="text-[11px] md:text-[13px] text-charcoal-light/50 tracking-widest uppercase">
              Customized Business Solutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="dashboard-item">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 md:mb-8">
                <span className="material-symbols-outlined text-gold-muted text-2xl">
                  design_services
                </span>
              </div>
              <h4 className="text-sm md:text-[15px] font-bold mb-3 md:mb-4 tracking-tight">
                맞춤 제작 솔루션
              </h4>
              <p className="text-xs md:text-[13px] text-charcoal-light/65 leading-[1.75] mb-6 md:mb-8">
                거래처 스타일에 맞는
                <br />
                맞춤 제작과 안정적인 생산 연결
              </p>
              <button className="text-[10px] md:text-[11px] font-bold text-gold-muted uppercase tracking-widest flex items-center gap-2 group">
                상세보기{' '}
                <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>

            <div className="dashboard-item">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 md:mb-8">
                <span className="material-symbols-outlined text-gold-muted text-2xl">
                  inventory_2
                </span>
              </div>
              <h4 className="text-sm md:text-[15px] font-bold mb-3 md:mb-4 tracking-tight">
                대량 구매 문의
              </h4>
              <p className="text-xs md:text-[13px] text-charcoal-light/65 leading-[1.75] mb-6 md:mb-8">
                대량 주문부터 정기 공급까지,
                <br />
                안정적인 거래 흐름을 지원합니다.
              </p>
              <button className="text-[10px] md:text-[11px] font-bold text-gold-muted uppercase tracking-widest flex items-center gap-2 group">
                문의하기{' '}
                <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>

            <div className="dashboard-item">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 md:mb-8">
                <span className="material-symbols-outlined text-gold-muted text-2xl">
                  sync_alt
                </span>
              </div>
              <h4 className="text-sm md:text-[15px] font-bold mb-3 md:mb-4 tracking-tight">
                재고 연동 시스템
              </h4>
              <p className="text-xs md:text-[13px] text-charcoal-light/65 leading-[1.75] mb-6 md:mb-8">
                실시간 재고 및 출고 흐름 관리로
                <br />
                운영 실수를 줄입니다.
              </p>
              <button className="text-[10px] md:text-[11px] font-bold text-gold-muted uppercase tracking-widest flex items-center gap-2 group">
                API 가이드{' '}
                <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>

            <div className="dashboard-item">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 md:mb-8">
                <span className="material-symbols-outlined text-gold-muted text-2xl">
                  photo_library
                </span>
              </div>
              <h4 className="text-sm md:text-[15px] font-bold mb-3 md:mb-4 tracking-tight">
                마케팅 자료 지원
              </h4>
              <p className="text-xs md:text-[13px] text-charcoal-light/65 leading-[1.75] mb-6 md:mb-8">
                상세페이지 · 카탈로그 · 제품 이미지를
                <br />
                거래처에 바로 활용할 수 있도록 제공합니다.
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

           {/* Signature Collection Section */}
      <section className="w-full bg-soft-ivory py-12 md:py-20 px-4 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1.08fr_0.92fr] gap-6 md:gap-10 items-center">
          <div className="relative w-full aspect-[4/3] md:aspect-[5/4] bg-[#d8c1ad] overflow-hidden shadow-[0_18px_45px_rgba(74,57,45,0.14)]">
            <Image
              alt="마블링 컬렉션"
              className="object-cover opacity-95 scale-[1.02]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIEaDRhQiMdJ-MM-sQmZF2tcFhLxPELgGHpgg5kD_rZENLCwTrOdhq1CtHksAY5aMdOpfArLP6zPm-csZbqqxqlg5yunc2VXxbsfoZgE-0u_wzr6AfEclAqLBwNvcP2ftjnjsWM2zhAGdEVXQM92-uK5N-KIradYa-cds6gb-7Mek1emHwcTk4sv-JENUQmyVgszv_dCQWKyhMnIa_h5OxYpqqIM-0hJwQuLWPs1U-F3ffHeuKn3O_9wmWazUgz3dnN_wPLl4QCPcd"
              fill
              sizes="(max-width: 768px) 100vw, 54vw"
              priority
            />
          </div>
          <div className="w-full flex flex-col items-start py-2 md:py-4">
            <span className="text-gold-muted text-[10px] md:text-[11px] font-bold tracking-[0.28em] uppercase mb-3 md:mb-4">
              Signature Collection
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-[40px] font-light text-charcoal-light mb-4 md:mb-5 leading-[1.22]">
              마블링 컬렉션
            </h2>
            <p className="text-charcoal-light/75 text-base md:text-lg leading-[1.65] mb-4 md:mb-5 font-light">
              현재 트렌디한 제품 가장 많이 찾는 베스트 라인업
            </p>
            <p className="text-charcoal-light/55 text-sm md:text-base leading-[1.7] mb-6 md:mb-7 font-light max-w-xl">
              데일리 착용부터 선물 수요까지, 실제 판매 흐름을 기준으로 선별한
              주얼리 구성을 만나보세요.
            </p>
            <div className="grid grid-cols-3 w-full max-w-lg border border-charcoal-light/10 divide-x divide-charcoal-light/10 mb-7 md:mb-8">
              <div className="px-3 md:px-4 py-3 md:py-4">
                <span className="block text-[9px] md:text-[10px] text-gold-muted font-bold tracking-[0.22em] uppercase mb-1">
                  Best
                </span>
                <strong className="block text-xs md:text-sm text-charcoal-light font-medium">
                  인기 라인
                </strong>
              </div>
              <div className="px-3 md:px-4 py-3 md:py-4">
                <span className="block text-[9px] md:text-[10px] text-gold-muted font-bold tracking-[0.22em] uppercase mb-1">
                  Daily
                </span>
                <strong className="block text-xs md:text-sm text-charcoal-light font-medium">
                  데일리 주얼리
                </strong>
              </div>
              <div className="px-3 md:px-4 py-3 md:py-4">
                <span className="block text-[9px] md:text-[10px] text-gold-muted font-bold tracking-[0.22em] uppercase mb-1">
                  Stock
                </span>
                <strong className="block text-xs md:text-sm text-charcoal-light font-medium">
                  빠른 출고
                </strong>
              </div>
            </div>
            <Link
              href="/collections"
              className="group inline-flex items-center justify-center gap-3 bg-charcoal-light text-white border border-charcoal-light px-7 md:px-9 py-4 text-[11px] md:text-[12px] font-bold uppercase tracking-widest transition-all hover:bg-gold-muted hover:border-gold-muted hover:shadow-[0_14px_30px_rgba(160,122,68,0.22)]"
            >
              컬렉션 전체보기
              <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
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

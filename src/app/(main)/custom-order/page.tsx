import { HeadphonesIcon, Palette, Diamond, Truck, MessageCircle, Phone } from 'lucide-react';

export default function CustomOrderPage() {
  return (
    <main className="flex-1 w-full max-w-[800px] mx-auto px-6 py-20">
      {/* Hero Section */}
      <div className="text-center mb-24">
        <span className="text-gold-muted font-bold tracking-[0.3em] text-[12px] uppercase mb-4 block">
          Personalized Luxury
        </span>
        <h2 className="text-[40px] md:text-[56px] font-bold text-charcoal-light tracking-tight mb-6 leading-tight">
          주문 제작 안내
        </h2>
        <div className="w-12 h-[1px] bg-gold-muted mx-auto mb-6"></div>
        <p className="text-[20px] text-charcoal-light/60 font-light max-w-lg mx-auto leading-relaxed">
          나만의 특별한 주얼리를 마블링에서 실현해 드립니다. <br />
          상담부터 배송까지의 여정을 안내합니다.
        </p>
      </div>

      {/* Process Steps Section */}
      <section className="mb-32">
        <div className="flex items-center gap-4 mb-12">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            제작 과정 안내
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>
        <div className="relative flex flex-col gap-16 ml-4 before:content-[''] before:absolute before:left-[23px] before:top-0 before:bottom-0 before:w-[1px] before:bg-card-border/60 before:z-0">
          {/* Step 01: 상담 */}
          <div className="relative z-10 flex gap-8 items-start">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-gold-muted flex items-center justify-center text-gold-muted shrink-0 shadow-sm">
              <HeadphonesIcon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[12px] font-bold text-gold-muted tracking-widest uppercase mb-1 block">
                Step 01
              </span>
              <h4 className="text-[20px] font-bold text-charcoal-light mb-2">상담</h4>
              <p className="text-[16px] text-charcoal-light/60 leading-relaxed">
                전문화된 매니저와 1:1 상담을 통해 원하시는 컨셉과 예산을 조율합니다.
              </p>
            </div>
          </div>

          {/* Step 02: 디자인 확정 */}
          <div className="relative z-10 flex gap-8 items-start">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-gold-muted flex items-center justify-center text-gold-muted shrink-0 shadow-sm">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[12px] font-bold text-gold-muted tracking-widest uppercase mb-1 block">
                Step 02
              </span>
              <h4 className="text-[20px] font-bold text-charcoal-light mb-2">
                디자인 확정
              </h4>
              <p className="text-[16px] text-charcoal-light/60 leading-relaxed">
                스케치 및 3D 모델링을 통해 완성될 주얼리의 형태를 최종적으로 확인하고 확정합니다.
              </p>
            </div>
          </div>

          {/* Step 03: 제작 */}
          <div className="relative z-10 flex gap-8 items-start">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-gold-muted flex items-center justify-center text-gold-muted shrink-0 shadow-sm">
              <Diamond className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[12px] font-bold text-gold-muted tracking-widest uppercase mb-1 block">
                Step 03
              </span>
              <h4 className="text-[20px] font-bold text-charcoal-light mb-2">제작</h4>
              <p className="text-[16px] text-charcoal-light/60 leading-relaxed">
                숙련된 장인의 손길로 세밀한 공정을 거쳐 세상에 단 하나뿐인 피스를 완성합니다.
              </p>
            </div>
          </div>

          {/* Step 04: 배송 */}
          <div className="relative z-10 flex gap-8 items-start">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-gold-muted flex items-center justify-center text-gold-muted shrink-0 shadow-sm">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[12px] font-bold text-gold-muted tracking-widest uppercase mb-1 block">
                Step 04
              </span>
              <h4 className="text-[20px] font-bold text-charcoal-light mb-2">배송</h4>
              <p className="text-[16px] text-charcoal-light/60 leading-relaxed">
                꼼꼼한 검수를 마친 후 안전하게 포장하여 고객님께 소중히 전달해 드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="flex flex-col gap-6 mb-32">
        <div className="flex items-center gap-4 mb-6">
          <h3 className="text-[22px] font-bold text-charcoal-light shrink-0">
            상담 신청하기
          </h3>
          <div className="h-px bg-card-border/50 w-full"></div>
        </div>

        {/* KakaoTalk Consultation Card */}
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
                커스텀 디자인 및 견적 문의
              </p>
            </div>
          </div>
          <button className="w-full md:w-auto px-10 h-[64px] bg-gold-muted hover:bg-[#967d50] text-white text-[18px] font-bold rounded-xl transition-all flex items-center justify-center gap-3 shadow-md">
            <MessageCircle className="w-5 h-5" />
            상담하기
          </button>
        </div>

        {/* Phone Consultation Card */}
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

      {/* Operating Hours Section */}
      <section className="bg-white border border-card-border rounded-2xl overflow-hidden">
        <div className="p-10 border-b border-soft-ivory bg-soft-ivory/50">
          <h3 className="text-[20px] font-bold text-charcoal-light">운영 시간 안내</h3>
          <p className="text-[15px] text-charcoal-light/50 mt-2">
            상담 시간 및 휴무 안내를 확인해 주세요.
          </p>
        </div>
        <div className="p-10">
          <div className="flex flex-col gap-6 text-[16px] text-charcoal-light/80">
            {/* Weekday Hours */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12">
              <span className="w-20 font-bold text-gold-muted shrink-0 flex items-center gap-2">
                <span className="w-1 h-1 bg-gold-muted rounded-full"></span>
                평일
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <span className="font-medium text-[18px]">10:00 - 18:00</span>
                <span className="text-charcoal-light/40 text-[14px]">
                  (점심시간 12:00 - 13:00)
                </span>
              </div>
            </div>

            <div className="w-full h-px bg-gray-100"></div>

            {/* Closed Days */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12">
              <span className="w-20 font-bold text-gold-muted shrink-0 flex items-center gap-2">
                <span className="w-1 h-1 bg-gold-muted rounded-full"></span>
                휴무
              </span>
              <span className="font-medium">토요일, 일요일, 공휴일</span>
            </div>
          </div>
          <p className="mt-8 text-[14px] text-charcoal-light/40 leading-relaxed border-t border-gray-50 pt-6">
            주말 및 공휴일은 휴무이며, 접수된 문의는 다음 영업일에 순차적으로
            답변드립니다. 급하신 용무는 카카오톡 문의로 남겨주시면 확인 즉시
            도와드리겠습니다.
          </p>
        </div>
      </section>
    </main>
  );
}

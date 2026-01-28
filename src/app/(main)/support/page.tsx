import Link from 'next/link';

export default function SupportPage() {
  return (
    <main className="flex-1 w-full max-w-[1000px] mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-[32px] md:text-[40px] font-bold text-charcoal-light tracking-tight mb-4">
          고객센터
        </h2>
        <p className="text-[18px] text-charcoal-light/60 font-light">
          마블링 이용 중 궁금하신 점을 빠르게 해결해 드립니다.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* KakaoTalk Card */}
        <div className="bg-white border border-card-border rounded-xl p-8 hover:border-gold-muted/30 transition-colors">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-[#FEE500] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[28px] text-[#3C1E1E]">
                chat
              </span>
            </div>
            <div>
              <h3 className="text-[22px] font-bold text-charcoal-light mb-2">
                카카오톡 1:1 상담
              </h3>
              <p className="text-[15px] text-charcoal-light/60 font-light leading-relaxed">
                카카오톡으로 빠르고 편리하게<br />
                상담을 받아보세요.
              </p>
            </div>
          </div>

          <Link
            href="https://pf.kakao.com/_your_channel_id/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3.5 px-6 bg-gold-muted text-white text-[15px] font-medium rounded-lg hover:bg-gold-muted/90 transition-colors text-center"
          >
            카카오톡 상담하기
          </Link>
        </div>

        {/* Phone Card */}
        <div className="bg-white border border-card-border rounded-xl p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[28px] text-charcoal-light">
                call
              </span>
            </div>
            <div>
              <h3 className="text-[22px] font-bold text-charcoal-light mb-2">
                전화 문의
              </h3>
              <p className="text-[24px] font-bold text-gold-muted mb-2">
                02-1234-5678
              </p>
              <p className="text-[14px] text-charcoal-light/50 font-light">
                평일 10:00 - 18:00
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-card-border">
            <p className="text-[13px] text-charcoal-light/50 font-light leading-relaxed">
              상담원 연결까지 다소 시간이 소요될 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* Business Hours Card */}
      <div className="bg-white border border-card-border rounded-xl p-8">
        <div className="mb-6">
          <h3 className="text-[22px] font-bold text-charcoal-light mb-3">
            운영 시간 안내
          </h3>
          <p className="text-[15px] text-charcoal-light/60 font-light leading-relaxed">
            평일에만 운영하며, 주말 및 공휴일은 휴무입니다.<br />
            메시지를 남겨주시면 운영 시간에 순차적으로 답변드립니다.
          </p>
        </div>

        <div className="bg-gray-50/50 rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-card-border/50">
              <span className="text-[15px] font-medium text-charcoal-light">
                평일
              </span>
              <div className="text-right">
                <div className="text-[15px] font-medium text-charcoal-light">
                  10:00 - 18:00
                </div>
                <div className="text-[13px] text-charcoal-light/50 mt-1">
                  (점심시간 12:00 - 13:00)
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <span className="text-[15px] font-medium text-charcoal-light">
                휴무
              </span>
              <span className="text-[15px] text-charcoal-light/60">
                토요일, 일요일, 공휴일
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Help Section */}
      <div className="mt-12 text-center">
        <p className="text-[14px] text-charcoal-light/50 font-light">
          자주 묻는 질문은 FAQ 페이지에서 확인하실 수 있습니다.
        </p>
      </div>
    </main>
  );
}

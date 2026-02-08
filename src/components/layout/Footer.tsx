import { Diamond } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">
          {/* Brand & Company Info */}
          <div className="flex flex-col gap-6 max-w-sm">
            <div className="flex items-center gap-3 opacity-60">
              <Diamond className="text-gold-muted" size={20} />
              <span className="text-sm font-bold tracking-[0.3em] uppercase">
                MARVELRING
              </span>
            </div>
            <p className="text-[12px] text-charcoal-light/40 leading-relaxed">
              현대적인 감각과 신뢰할 수 있는 B2B 서비스를 통해 금주얼리 유통의
              가치를 높입니다.
            </p>
            {/* Contact Numbers */}
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-gold-muted tracking-widest w-8">
                  TEL 1
                </span>
                <a
                  href="tel:010-8365-3303"
                  className="text-[13px] font-medium text-charcoal-light/60 hover:text-gold-muted transition-colors"
                >
                  010-8365-3303
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-gold-muted tracking-widest w-8">
                  TEL 2
                </span>
                <a
                  href="tel:010-8186-4404"
                  className="text-[13px] font-medium text-charcoal-light/60 hover:text-gold-muted transition-colors"
                >
                  010-8186-4404
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-16">
            {/* 기업 정보 */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[11px] font-bold tracking-widest uppercase mb-1">
                기업 정보
              </h4>
              <Link
                href="/privacy"
                className="text-[12px] text-charcoal-light/50 hover:text-gold-muted transition-colors"
              >
                개인정보 처리방침
              </Link>
              <Link
                href="/terms"
                className="text-[12px] text-charcoal-light/50 hover:text-gold-muted transition-colors"
              >
                이용약관
              </Link>
              <Link
                href="/partnership"
                className="text-[12px] text-charcoal-light/50 hover:text-gold-muted transition-colors"
              >
                파트너십 안내
              </Link>
            </div>

            {/* 고객 지원 */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[11px] font-bold tracking-widest uppercase mb-1">
                고객 지원
              </h4>
              <Link
                href="/support"
                className="text-[12px] text-charcoal-light/50 hover:text-gold-muted transition-colors"
              >
                고객센터
              </Link>
              <Link
                href="/custom-order"
                className="text-[12px] text-charcoal-light/50 hover:text-gold-muted transition-colors"
              >
                주문 제작 안내
              </Link>
              <Link
                href="/announcements"
                className="text-[12px] text-charcoal-light/50 hover:text-gold-muted transition-colors"
              >
                공지사항
              </Link>
            </div>

            {/* 쇼핑 */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[11px] font-bold tracking-widest uppercase mb-1">
                쇼핑
              </h4>
              <Link
                href="/new"
                className="text-[12px] text-charcoal-light/50 hover:text-gold-muted transition-colors"
              >
                신상품
              </Link>
              <Link
                href="/collections"
                className="text-[12px] text-charcoal-light/50 hover:text-gold-muted transition-colors"
              >
                컬렉션
              </Link>
              <Link
                href="/sale"
                className="text-[12px] text-charcoal-light/50 hover:text-gold-muted transition-colors"
              >
                세일
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Business Info Bar */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-[11px] text-charcoal-light/30">
              <span>상호명: 마블링</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <p className="text-[10px] text-charcoal-light/30 uppercase tracking-[0.2em]">
                © 2026 MARVELRING. ALL RIGHTS RESERVED.
              </p>
              <span className="hidden sm:inline text-charcoal-light/20">·</span>
              <a
                href="https://dong99u.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-charcoal-light/20 hover:text-gold-muted/60 transition-colors"
              >
                Developed by 박동규
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

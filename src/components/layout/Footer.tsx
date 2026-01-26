import { Diamond } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-20 px-10 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 opacity-60">
            <Diamond className="text-gold-muted" size={20} />
            <span className="text-sm font-bold tracking-[0.3em] uppercase">
              MARVELRING
            </span>
          </div>
          <p className="text-[12px] text-charcoal-light/40 leading-relaxed max-w-xs">
            현대적인 감각과 신뢰할 수 있는 B2B 서비스를 통해 금주얼리 유통의
            가치를 높입니다.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-20">
          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] font-bold tracking-widest mb-2">
              기업 정보
            </h4>
            <Link
              href="#"
              className="text-[12px] text-charcoal-light/50 hover:text-gold-muted transition-colors"
            >
              개인정보 처리방침
            </Link>
            <Link
              href="#"
              className="text-[12px] text-charcoal-light/50 hover:text-gold-muted transition-colors"
            >
              이용약관
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] font-bold tracking-widest mb-2">
              고객 지원
            </h4>
            <Link
              href="#"
              className="text-[12px] text-charcoal-light/50 hover:text-gold-muted transition-colors"
            >
              도매 이용안내
            </Link>
            <Link
              href="#"
              className="text-[12px] text-charcoal-light/50 hover:text-gold-muted transition-colors"
            >
              고객센터
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-gray-50 text-center">
        <p className="text-[10px] text-charcoal-light/30 uppercase tracking-[0.2em]">
          © 2024 MARVELRING. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}

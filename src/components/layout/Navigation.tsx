'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const mainNavItems = [
  { href: '/new', label: '신상품' },
  { href: '/collections', label: '컬렉션' },
  { href: '/fashion', label: '패션' },
  { href: '/sale', label: '세일' },
  { href: '/announcements', label: '공지사항' },
  { href: '/support', label: '고객센터' },
];

const subNavItems = [
  { href: '?category=ring', label: '반지' },
  { href: '?category=necklace', label: '목걸이' },
  { href: '?category=earring', label: '귀걸이' },
  { href: '?category=bracelet', label: '팔찌' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:block sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col">
        {/* Main Navigation */}
        <div className="flex items-center justify-center overflow-x-auto scrollbar-hide">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`min-h-12 flex items-center px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5 text-sm md:text-[15px] font-medium tracking-tight text-charcoal-light/70 hover:text-charcoal-light transition-all relative cursor-pointer whitespace-nowrap touch-manipulation ${
                  isActive ? 'text-charcoal-light font-bold' : ''
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-gold-muted" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center justify-center py-1 bg-soft-ivory border-t border-gray-50 overflow-x-auto scrollbar-hide">
          {subNavItems.map((item, index) => {
            const isFirst = index === 0;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`min-h-10 flex items-center text-xs md:text-[13px] font-normal text-charcoal-light/60 hover:text-gold-muted transition-colors px-3 md:px-4 py-2 md:py-3 whitespace-nowrap touch-manipulation ${
                  isFirst ? 'font-medium text-gold-muted' : ''
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

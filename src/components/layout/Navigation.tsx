'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const categories = [
  { id: 'ring', label: '반지' },
  { id: 'necklace', label: '목걸이' },
  { id: 'earring', label: '귀걸이' },
  { id: 'bracelet', label: '팔찌' },
];

interface Collection {
  brand_name: string;
  slug: string;
}

type SubNavType = 'collections' | 'fashion' | null;

interface NavigationProps {
  collections: Collection[];
}

export default function Navigation({ collections }: NavigationProps) {
  const pathname = usePathname();
  const [activeSubNav, setActiveSubNav] = useState<SubNavType>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (subNavType: SubNavType) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (subNavType) {
      setActiveSubNav(subNavType);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveSubNav(null);
    }, 150);
  };

  const handleSubNavEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleSubNavLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveSubNav(null);
    }, 150);
  };

  const mainNavItems = [
    { href: '/new', label: '신상품', subNavType: null },
    { href: '/collections', label: '컬렉션', subNavType: 'collections' as SubNavType },
    { href: '/fashion', label: '패션', subNavType: 'fashion' as SubNavType },
    { href: '/sale', label: '세일', subNavType: null },
    { href: '/custom-order', label: '주문제작', subNavType: null },
    { href: '/announcements', label: '공지사항', subNavType: null },
    { href: '/support', label: '고객센터', subNavType: null },
  ];

  return (
    <nav className="hidden lg:block sticky top-0 z-40 bg-white shadow-sm">
      {/* Main Navigation */}
      <div className="border-b border-gray-100">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.subNavType && activeSubNav === item.subNavType);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`min-h-14 flex items-center px-6 lg:px-10 py-4 lg:py-5 text-[15px] font-medium tracking-tight text-charcoal-light/70 hover:text-charcoal-light transition-all relative cursor-pointer whitespace-nowrap ${
                    isActive ? 'text-charcoal-light font-bold' : ''
                  }`}
                  onMouseEnter={() => handleMouseEnter(item.subNavType)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-gold-muted" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Full-Width Sub-Navigation Bar */}
      <div
        className={`w-full bg-soft-ivory transition-all duration-200 overflow-hidden ${
          activeSubNav ? 'max-h-20 opacity-100 border-b-2 border-gold-muted/30' : 'max-h-0 opacity-0'
        }`}
        onMouseEnter={handleSubNavEnter}
        onMouseLeave={handleSubNavLeave}
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center gap-x-8 py-4">
            {activeSubNav === 'collections' && (
              <>
                {collections.length > 0 ? (
                  collections.map((collection) => (
                    <Link
                      key={collection.slug}
                      href={`/collections?brand=${collection.slug}`}
                      className="text-sm text-charcoal-light/70 hover:text-gold-muted transition-colors whitespace-nowrap"
                    >
                      {collection.brand_name}
                    </Link>
                  ))
                ) : (
                  <div className="text-sm text-charcoal-light/60">No collections available</div>
                )}
              </>
            )}

            {activeSubNav === 'fashion' && (
              <>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/fashion?category=${category.id}`}
                    className="text-sm text-charcoal-light/70 hover:text-gold-muted transition-colors whitespace-nowrap"
                  >
                    {category.label}
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

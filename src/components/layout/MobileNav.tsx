/**
 * Mobile Navigation Component
 * Hamburger menu with slide-out drawer for mobile devices
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/ToastProvider';

interface NavSection {
  title: string;
  items: { label: string; href: string }[];
}

const navigationData: NavSection[] = [
  {
    title: '컬렉션',
    items: [
      { label: '전체보기', href: '/collections' },
      { label: '반지', href: '/collections?category=ring' },
      { label: '목걸이', href: '/collections?category=necklace' },
      { label: '귀걸이', href: '/collections?category=earring' },
      { label: '팔찌', href: '/collections?category=bracelet' },
    ],
  },
  {
    title: '패션',
    items: [
      { label: '전체보기', href: '/fashion' },
      { label: '반지', href: '/fashion?category=ring' },
      { label: '목걸이', href: '/fashion?category=necklace' },
      { label: '귀걸이', href: '/fashion?category=earring' },
      { label: '팔찌', href: '/fashion?category=bracelet' },
    ],
  },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { user, signOut } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();

  const handleAuthClick = async () => {
    setIsOpen(false);
    if (user) {
      try {
        await signOut();
        showToast('로그아웃 되었습니다', 'success');
        router.refresh();
        router.push('/');
      } catch (error) {
        console.error('Logout failed:', error);
        showToast('로그아웃에 실패했습니다', 'error');
      }
    } else {
      router.push('/login');
    }
  };

  const toggleSection = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden min-h-12 min-w-12 flex items-center justify-center text-charcoal-light"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 transform transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold tracking-[0.2em] uppercase text-charcoal-light">
            MARVELRING
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="min-h-12 min-w-12 flex items-center justify-center text-charcoal-light"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Menu Content */}
        <div className="overflow-y-auto h-[calc(100%-73px)] pb-safe">
          <nav className="py-4">
            {/* Top Level Links */}
            <Link
              href="/new"
              className="block min-h-12 px-6 py-3 text-base font-medium text-charcoal-light hover:bg-soft-ivory transition-colors"
              onClick={() => setIsOpen(false)}
            >
              신상품
            </Link>

            {/* Expandable Sections */}
            {navigationData.map((section) => (
              <div key={section.title} className="border-b border-gray-100">
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full min-h-12 px-6 py-3 flex items-center justify-between text-base font-medium text-charcoal-light hover:bg-soft-ivory transition-colors"
                >
                  <span>{section.title}</span>
                  <ChevronDown
                    size={20}
                    className={`transform transition-transform ${
                      expandedSection === section.title ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedSection === section.title && (
                  <div className="bg-marble-grey">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block min-h-12 px-10 py-3 text-sm text-charcoal-light/70 hover:text-charcoal-light hover:bg-soft-ivory transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/sale"
              className="block min-h-12 px-6 py-3 text-base font-medium text-charcoal-light hover:bg-soft-ivory transition-colors"
              onClick={() => setIsOpen(false)}
            >
              시즌오프
            </Link>
            <Link
              href="/custom-order"
              className="block min-h-12 px-6 py-3 text-base font-medium text-charcoal-light hover:bg-soft-ivory transition-colors"
              onClick={() => setIsOpen(false)}
            >
              주문제작
            </Link>
            <Link
              href="/announcements"
              className="block min-h-12 px-6 py-3 text-base font-medium text-charcoal-light hover:bg-soft-ivory transition-colors"
              onClick={() => setIsOpen(false)}
            >
              공지사항
            </Link>
            <Link
              href="/support"
              className="block min-h-12 px-6 py-3 text-base font-medium text-charcoal-light hover:bg-soft-ivory transition-colors"
              onClick={() => setIsOpen(false)}
            >
              고객센터
            </Link>
          </nav>

          {/* Bottom Links */}
          <div className="p-6 border-t border-gray-100">
            <Link
              href="/partnership"
              className="block min-h-12 mb-3 px-4 py-3 text-center text-sm font-semibold tracking-widest text-charcoal-light/40 hover:text-charcoal-light border border-gray-200 rounded"
              onClick={() => setIsOpen(false)}
            >
              파트너십 안내
            </Link>
            <button
              onClick={handleAuthClick}
              className="block w-full min-h-12 px-4 py-3 text-center text-sm font-semibold tracking-widest text-white bg-charcoal-light hover:bg-charcoal-hover rounded"
            >
              {user ? '로그아웃' : '로그인'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Diamond, Heart } from 'lucide-react';
import MobileNav from './MobileNav';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/ToastProvider';

interface Collection {
  brand_name: string;
  slug: string;
}

interface Category {
  category_name: string;
  slug: string;
}

interface HeaderProps {
  collections: Collection[];
  categories: Category[];
}

export default function Header({ collections, categories }: HeaderProps) {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();

  const handleAuthClick = async () => {
    if (user) {
      try {
        await signOut();
        // Hard redirect to fully reset all server/client state
        window.location.href = '/';
      } catch (error) {
        console.error('Logout failed:', error);
        showToast('로그아웃에 실패했습니다', 'error');
      }
    } else {
      router.push('/login');
    }
  };

  return (
    <header className="sticky top-0 flex items-center justify-between bg-white px-4 md:px-6 lg:px-10 py-4 md:py-6 z-50 border-b border-gray-100">
      {/* Mobile Menu */}
      <div className="lg:hidden">
        <MobileNav collections={collections} categories={categories} />
      </div>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 md:gap-3">
        <Diamond className="text-gold-muted text-xl md:text-2xl" />
        <h1 className="text-base md:text-xl font-bold tracking-[0.2em] uppercase text-charcoal-light">
          MARVELRING
        </h1>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-8">
        <Link
          href="/partnership"
          className="min-h-12 flex items-center text-[12px] font-semibold tracking-widest text-charcoal-light/40 hover:text-charcoal-light transition-colors"
        >
          파트너십 안내
        </Link>
        <button
          onClick={handleAuthClick}
          className="min-h-12 flex items-center text-[12px] font-semibold tracking-widest text-charcoal-light/40 hover:text-charcoal-light transition-colors"
        >
          {user ? '로그아웃' : '로그인'}
        </button>
        {user && (
          <Link
            href="/mypage/wishlist"
            className="min-h-12 min-w-12 flex items-center justify-center text-charcoal-light/60 hover:text-charcoal-light transition-colors"
          >
            <Heart size={20} />
          </Link>
        )}
        <button className="min-h-12 min-w-12 flex items-center justify-center text-charcoal-light/60 hover:text-charcoal-light transition-colors">
          <Search size={20} />
        </button>
      </div>

      {/* Mobile Search Icon */}
      <button className="lg:hidden min-h-12 min-w-12 flex items-center justify-center text-charcoal-light/60">
        <Search size={20} />
      </button>
    </header>
  );
}

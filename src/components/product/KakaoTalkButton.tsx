/**
 * KakaoTalk Inquiry Button Component
 * Handles KakaoTalk chat link with authentication checks
 */

'use client';

import { useRouter } from 'next/navigation';

interface KakaoTalkButtonProps {
  kakaoLink?: string | null;
  isLoggedIn: boolean;
  isApproved: boolean;
}

export default function KakaoTalkButton({
  kakaoLink,
  isLoggedIn,
  isApproved,
}: KakaoTalkButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    // Guest or pending users: redirect to login
    if (!isLoggedIn || !isApproved) {
      router.push('/login');
      return;
    }

    // Approved users: open KakaoTalk link
    const link =
      kakaoLink || process.env.NEXT_PUBLIC_DEFAULT_KAKAO_LINK || '#';

    if (link && link !== '#') {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-champagne hover:bg-champagne-dark text-charcoal-light py-5 flex items-center justify-center gap-2 transition-all shadow-lg group"
      aria-label="카카오톡 문의하기"
    >
      <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
        chat_bubble
      </span>
      <span className="text-[14px] font-bold tracking-[0.1em]">
        카카오톡 문의하기
      </span>
    </button>
  );
}

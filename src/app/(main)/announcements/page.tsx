import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '공지사항 | 마블링 B2B',
  description: '마블링 B2B 플랫폼의 새로운 소식과 주요 안내사항을 확인하세요.',
};

interface PinnedNotice {
  id: number;
  title: string;
  date: string;
  author: string;
  badge: string;
  badgeColor: 'gold' | 'gray';
}

interface GeneralNotice {
  id: number;
  title: string;
  date: string;
  author: string;
  views: string;
}

const pinnedNotices: PinnedNotice[] = [
  {
    id: 1,
    title: '[필독] 2024년 추석 연휴 배송 및 고객센터 운영 안내',
    date: '2024.09.10',
    author: '마블링 운영팀',
    badge: '중요',
    badgeColor: 'gold',
  },
  {
    id: 2,
    title: '시스템 정기 점검 안내 (10/15 02:00 ~ 06:00)',
    date: '2024.10.12',
    author: '기술지원팀',
    badge: '점검',
    badgeColor: 'gray',
  },
];

const generalNotices: GeneralNotice[] = [
  {
    id: 1,
    title: '10월 베스트 포토 리뷰 이벤트 당첨자 발표',
    date: '2024.10.05',
    author: '마케팅팀',
    views: '1.2k',
  },
  {
    id: 2,
    title: "신규 하이엔드 브랜드 'LUMIERE' 공식 입점 안내",
    date: '2024.10.02',
    author: '상품기획팀',
    views: '856',
  },
  {
    id: 3,
    title: '개인정보 처리방침 변경 안내 (시행일: 2024.10.01)',
    date: '2024.09.25',
    author: '법무팀',
    views: '542',
  },
  {
    id: 4,
    title: '9월 카드사 무이자 할부 혜택 안내',
    date: '2024.09.01',
    author: '재무팀',
    views: '2.1k',
  },
  {
    id: 5,
    title: 'B2B 회원 등급별 추가 혜택 리뉴얼 안내',
    date: '2024.08.28',
    author: '운영팀',
    views: '3.4k',
  },
];

export default function AnnouncementsPage() {
  return (
    <main className="flex flex-1 w-full max-w-3xl mx-auto px-6 py-12 flex-col">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold tracking-[0.1em] text-charcoal-light uppercase mb-3">
          공지사항
        </h2>
        <p className="text-sm text-charcoal-light/50 font-light">
          마블링 B2B 플랫폼의 새로운 소식과 주요 안내사항을 확인하세요.
        </p>
      </div>

      <div className="space-y-8">
        {/* Pinned Notices Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gold-muted tracking-widest uppercase mb-2 ml-1">
            주요 공지
          </h3>

          {pinnedNotices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white border border-card-border p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-start gap-4 border-l-4 border-l-gold-muted cursor-pointer"
            >
              <div className="flex-shrink-0 pt-1">
                <span className="material-symbols-outlined text-gold-muted">
                  push_pin
                </span>
              </div>
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="text-[16px] font-bold text-charcoal-light leading-snug">
                    {notice.title}
                  </h3>
                  <span
                    className={`inline-block px-2 py-1 text-[10px] font-bold tracking-wider rounded-sm w-fit ${
                      notice.badgeColor === 'gold'
                        ? 'bg-gold-muted/10 text-gold-muted'
                        : 'bg-gray-100 text-charcoal-light/60'
                    }`}
                  >
                    {notice.badge}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[12px] text-charcoal-light/40 mt-1">
                  <span>{notice.date}</span>
                  <span className="w-[1px] h-3 bg-gray-200"></span>
                  <span>{notice.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr className="border-card-border/50" />

        {/* General Notices Section */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold text-charcoal-light/40 tracking-widest uppercase mb-2 ml-1">
            일반 공지
          </h3>

          {generalNotices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white border border-card-border p-6 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <h3 className="text-[15px] font-bold text-charcoal-light mb-3 group-hover:text-gold-muted transition-colors">
                {notice.title}
              </h3>
              <div className="flex items-center gap-3 text-[12px] text-charcoal-light/40">
                <span>{notice.date}</span>
                <span className="w-[1px] h-3 bg-gray-200"></span>
                <span>{notice.author}</span>
                <span className="ml-auto flex items-center gap-1 text-charcoal-light/30">
                  <span className="material-symbols-outlined text-[14px]">
                    visibility
                  </span>
                  {notice.views}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Loading Spinner for Infinite Scroll */}
      <div
        className="mt-20 mb-8 flex flex-col items-center justify-center gap-4"
        id="infinite-scroll-trigger"
      >
        <div className="w-8 h-8 border-2 border-gold-muted/20 border-t-gold-muted rounded-full animate-spin"></div>
        <span className="text-[13px] text-charcoal-light/40 tracking-widest font-medium">
          이전 공지사항을 불러오는 중입니다...
        </span>
      </div>
    </main>
  );
}

import { Metadata } from 'next'
import { fetchNoticesAction } from '@/app/actions/notices'

export const metadata: Metadata = {
  title: '공지사항 | 마블링 B2B',
  description: '마블링 B2B 플랫폼의 새로운 소식과 주요 안내사항을 확인하세요.',
}

function formatNoticeDate(date: string) {
  return new Date(date).toLocaleDateString('ko-KR')
}

export default async function AnnouncementsPage() {
  const { data: notices, error } = await fetchNoticesAction()

  if (error) {
    return (
      <main className="flex flex-1 w-full max-w-3xl mx-auto px-6 py-12 flex-col">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-[0.1em] text-charcoal-light uppercase mb-3">
            공지사항
          </h2>
          <p className="text-sm text-charcoal-light/50 font-light">
            공지사항을 불러오는 중 문제가 발생했습니다.
          </p>
        </div>
      </main>
    )
  }

  const allNotices = notices ?? []
  const pinnedNotices = allNotices.filter((notice) => notice.is_pinned)
  const generalNotices = allNotices.filter((notice) => !notice.is_pinned)

  return (
    <main className="flex flex-1 w-full max-w-3xl mx-auto px-6 py-12 flex-col">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold tracking-[0.1em] text-charcoal-light uppercase mb-3">
          공지사항
        </h2>
        <p className="text-sm text-charcoal-light/50 font-light">
          마블링 B2B 플랫폼의 새로운 소식과 주요 안내사항을 확인하세요.
        </p>
      </div>

      {allNotices.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600">등록된 공지사항이 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {pinnedNotices.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gold-muted tracking-widest uppercase mb-2 ml-1">
                주요 공지
              </h3>

              {pinnedNotices.map((notice) => (
                <article
                  key={notice.notice_id}
                  className="bg-white border border-card-border p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-start gap-4 border-l-4 border-l-gold-muted"
                >
                  <div className="flex-shrink-0 pt-1">
                    <span className="material-symbols-outlined text-gold-muted">
                      push_pin
                    </span>
                  </div>
                  <div className="flex-1 w-full">
                    <h3 className="text-[16px] font-bold text-charcoal-light leading-snug mb-2">
                      {notice.title}
                    </h3>
                    <p className="text-[14px] text-charcoal-light/70 whitespace-pre-wrap mb-3">
                      {notice.content}
                    </p>
                    <div className="flex items-center gap-3 text-[12px] text-charcoal-light/40 mt-1">
                      <span>{formatNoticeDate(notice.created_at)}</span>
                      <span className="w-[1px] h-3 bg-gray-200"></span>
                      <span>마블링 운영팀</span>
                      <span className="ml-auto flex items-center gap-1 text-charcoal-light/30">
                        <span className="material-symbols-outlined text-[14px]">
                          visibility
                        </span>
                        {notice.view_count.toLocaleString('ko-KR')}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {pinnedNotices.length > 0 && generalNotices.length > 0 && (
            <hr className="border-card-border/50" />
          )}

          {generalNotices.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-charcoal-light/40 tracking-widest uppercase mb-2 ml-1">
                일반 공지
              </h3>

              {generalNotices.map((notice) => (
                <article
                  key={notice.notice_id}
                  className="bg-white border border-card-border p-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-[15px] font-bold text-charcoal-light mb-2">
                    {notice.title}
                  </h3>
                  <p className="text-[14px] text-charcoal-light/70 whitespace-pre-wrap mb-3">
                    {notice.content}
                  </p>
                  <div className="flex items-center gap-3 text-[12px] text-charcoal-light/40">
                    <span>{formatNoticeDate(notice.created_at)}</span>
                    <span className="w-[1px] h-3 bg-gray-200"></span>
                    <span>마블링 운영팀</span>
                    <span className="ml-auto flex items-center gap-1 text-charcoal-light/30">
                      <span className="material-symbols-outlined text-[14px]">
                        visibility
                      </span>
                      {notice.view_count.toLocaleString('ko-KR')}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-10 text-center text-sm text-charcoal-light/50">
        총 <strong>{allNotices.length}</strong>개의 공지사항
      </div>
    </main>
  )
}

'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

function LoadingSpinner() {
  return (
    <main className="w-full max-w-[1200px] min-h-[85vh] flex items-center justify-center bg-white shadow-[0_0_100px_rgba(0,0,0,0.03)] border border-gray-200 rounded-[2px]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-gold-muted border-t-transparent rounded-full animate-spin" />
        <p className="text-charcoal-deep/50 text-sm">로딩 중...</p>
      </div>
    </main>
  )
}

function AdminLoginContent() {
  const searchParams = useSearchParams()
  const { signIn } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const errorParam = searchParams.get('error')
    if (errorParam === 'unauthorized') {
      setError('관리자 권한이 없습니다. 관리자 계정으로 로그인해주세요.')
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(username, password)
      window.location.href = '/admin'
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '로그인에 실패했습니다.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 min-h-[85vh] bg-white shadow-[0_0_100px_rgba(0,0,0,0.03)] border border-gray-200 rounded-[2px] overflow-hidden">
      {/* Brand Section - Hidden on mobile */}
      <div className="hidden md:flex bg-charcoal-deep items-center justify-center p-20 border-r border-gray-200">
        <div className="text-center">
          <div className="flex items-center justify-center mb-8">
            <span className="material-symbols-outlined text-gold-muted text-6xl font-light">
              admin_panel_settings
            </span>
          </div>
          <h1 className="font-serif-display text-4xl tracking-[0.3em] uppercase mb-4 text-white">
            Marvelring Admin
          </h1>
          <p className="text-gold-muted/60 tracking-[0.4em] text-[12px] uppercase">
            관리자 전용 로그인
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex items-center justify-center p-8 md:p-20 bg-white">
        <div className="w-full max-w-[420px]">
          <header className="mb-16 text-center md:text-left">
            <div className="md:hidden flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-charcoal-deep text-4xl">
                admin_panel_settings
              </span>
            </div>
            <h2 className="font-serif-display text-5xl md:text-6xl tracking-wider text-charcoal-deep mb-2">
              관리자
            </h2>
            <div className="h-[1px] w-16 bg-gold-muted mx-auto md:mx-0 mt-6"></div>
          </header>

          <form className="space-y-10" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label
                className="block text-[15px] font-medium text-charcoal-deep/60 uppercase tracking-widest mb-3"
                htmlFor="username"
              >
                관리자 아이디
              </label>
              <input
                className="w-full h-[60px] px-0 bg-transparent border-0 border-b border-boutique-silver text-[20px] text-charcoal-deep focus:border-gold-muted focus:ring-0 outline-none transition-all placeholder-gray-300"
                id="username"
                name="username"
                type="text"
                placeholder="관리자 아이디를 입력하세요"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label
                className="block text-[15px] font-medium text-charcoal-deep/60 uppercase tracking-widest mb-3"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full h-[60px] px-0 bg-transparent border-0 border-b border-boutique-silver text-[20px] text-charcoal-deep focus:border-gold-muted focus:ring-0 outline-none transition-all placeholder-gray-300"
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-4 pt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[64px] bg-charcoal-deep text-white hover:bg-charcoal-hover flex items-center justify-center text-[16px] font-semibold tracking-[0.15em] transition-all duration-300 disabled:opacity-50"
              >
                {loading ? '로그인 중...' : '관리자 로그인'}
              </button>
            </div>
          </form>

          <footer className="mt-16 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-muted/30 bg-gold-muted/5">
              <span className="material-symbols-outlined text-[16px] text-gold-muted">
                shield
              </span>
              <span className="text-[12px] font-medium text-charcoal-deep/60 tracking-wide">
                관리자 전용 페이지
              </span>
            </div>
          </footer>
        </div>
      </div>
    </main>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AdminLoginContent />
    </Suspense>
  )
}

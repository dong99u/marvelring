'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
// UI components not used directly in this file - custom styling applied

export default function LoginPage() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
      router.push('/')
    } catch (err: any) {
      setError(err.message || '로그인에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 min-h-[85vh] bg-white shadow-[0_0_100px_rgba(0,0,0,0.03)] border border-gray-200 rounded-[2px] overflow-hidden">
      {/* Brand Section - Hidden on mobile */}
      <div className="hidden md:flex bg-soft-grey items-center justify-center p-20 border-r border-gray-200">
        <div className="text-center">
          <div className="flex items-center justify-center mb-8">
            <span className="material-symbols-outlined text-charcoal-deep text-6xl font-light">
              diamond
            </span>
          </div>
          <h1 className="font-serif-display text-4xl tracking-[0.3em] uppercase mb-4">
            Marvelring
          </h1>
          <p className="text-charcoal-deep/40 tracking-[0.4em] text-[12px] uppercase">
            Est. 2024 • Jewelry B2B Platform
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex items-center justify-center p-8 md:p-20 bg-white">
        <div className="w-full max-w-[420px]">
          <header className="mb-16 text-center md:text-left">
            <div className="md:hidden flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-charcoal-deep text-4xl">
                diamond
              </span>
            </div>
            <h2 className="font-serif-display text-5xl md:text-6xl tracking-wider text-charcoal-deep mb-2">
              로그인
            </h2>
            <div className="h-[1px] w-16 bg-charcoal-deep mx-auto md:mx-0 mt-6"></div>
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
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="w-full h-[60px] px-0 bg-transparent border-0 border-b border-boutique-silver text-[20px] text-charcoal-deep focus:border-charcoal-deep focus:ring-0 outline-none transition-all placeholder-gray-300"
                id="email"
                name="email"
                type="email"
                placeholder="example@marvelring.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                className="w-full h-[60px] px-0 bg-transparent border-0 border-b border-boutique-silver text-[20px] text-charcoal-deep focus:border-charcoal-deep focus:ring-0 outline-none transition-all placeholder-gray-300"
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center">
                <input
                  className="w-5 h-5 text-charcoal-deep border-boutique-silver rounded-none focus:ring-0 cursor-pointer"
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label
                  className="ml-3 text-[15px] text-charcoal-deep/60 cursor-pointer select-none font-light"
                  htmlFor="remember-me"
                >
                  로그인 상태 유지
                </label>
              </div>
              <Link
                className="text-[14px] text-charcoal-deep/50 hover:text-charcoal-deep transition-colors underline underline-offset-4"
                href="/forgot-password"
              >
                비밀번호 찾기
              </Link>
            </div>

            <div className="space-y-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[64px] bg-charcoal-deep text-white hover:bg-charcoal-hover flex items-center justify-center text-[16px] font-semibold tracking-[0.15em] transition-all duration-300 disabled:opacity-50"
              >
                {loading ? '로그인 중...' : '로그인'}
              </button>

              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-6 text-charcoal-deep/20 text-[12px] tracking-widest font-light">
                  OR
                </span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <Link href="/signup">
                <button
                  type="button"
                  className="w-full h-[64px] border border-boutique-silver text-charcoal-deep hover:bg-soft-grey flex items-center justify-center text-[16px] font-semibold tracking-[0.15em] transition-all duration-300"
                >
                  회원가입
                </button>
              </Link>
            </div>
          </form>

          <footer className="mt-16 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-soft-grey/50">
              <span className="material-symbols-outlined text-[16px] text-charcoal-deep/50">
                verified_user
              </span>
              <span className="text-[12px] font-medium text-charcoal-deep/60 tracking-wide">
                B2B 전용: 사업자 인증 후 이용 가능
              </span>
            </div>
          </footer>
        </div>
      </div>
    </main>
  )
}

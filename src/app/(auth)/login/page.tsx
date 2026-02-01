'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
// UI components not used directly in this file - custom styling applied

export default function LoginPage() {
  const { signIn } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Ensure video plays on load
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked, video will still show first frame
      })
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(username, password)
      // Use window.location for full page reload to ensure auth state is synced
      window.location.href = '/'
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '로그인에 실패했습니다.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 min-h-[85vh] bg-white shadow-[0_0_100px_rgba(0,0,0,0.03)] border border-translucent-silver rounded-[2px] overflow-hidden">
      {/* Brand Section with Video Background - Hidden on mobile */}
      <div className="hidden md:flex relative items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            poster="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1920"
          >
            {/* Luxury jewelry video */}
            <source src="/login_video.mp4" type="video/mp4" />
          </video>

          {/* Elegant overlay gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(
                  135deg,
                  rgba(26, 26, 26, 0.75) 0%,
                  rgba(26, 26, 26, 0.60) 50%,
                  rgba(26, 26, 26, 0.70) 100%
                )
              `,
            }}
          />

          {/* Subtle vignette effect */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)',
            }}
          />

          {/* Animated shimmer overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)',
              backgroundSize: '200% 200%',
              animation: 'shimmer 8s ease-in-out infinite',
            }}
          />
        </div>

        {/* Brand Content */}
        <div className="relative z-10 text-center px-12">
          {/* Decorative top line */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/30" />
            <span
              className="material-symbols-outlined text-white/90 text-5xl"
              style={{
                fontVariationSettings: "'FILL' 0, 'wght' 200",
                filter: 'drop-shadow(0 0 20px rgba(166, 141, 96, 0.4))',
              }}
            >
              diamond
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/30" />
          </div>

          {/* Main brand name with elegant styling */}
          <h1
            className="font-serif-display text-5xl tracking-[0.4em] uppercase mb-6 text-white"
            style={{
              textShadow: '0 2px 30px rgba(0,0,0,0.3)',
              letterSpacing: '0.4em',
            }}
          >
            Marvelring
          </h1>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-gold-muted/60 to-transparent" />
            <div
              className="w-1.5 h-1.5 rotate-45 border border-gold-muted/60"
              style={{ backgroundColor: 'transparent' }}
            />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent via-gold-muted/60 to-transparent" />
          </div>

          {/* Tagline */}
          <p
            className="tracking-[0.5em] text-[11px] uppercase font-light"
            style={{
              color: 'rgba(255, 255, 255, 0.6)',
              textShadow: '0 1px 10px rgba(0,0,0,0.2)',
            }}
          >
            Est. 2024 • Jewelry B2B Platform
          </p>

          {/* Bottom decorative element */}
          <div className="mt-16 flex items-center justify-center">
            <div
              className="px-6 py-2 border border-white/10 backdrop-blur-sm"
              style={{
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              <span
                className="text-[10px] tracking-[0.3em] uppercase font-light"
                style={{ color: 'rgba(255, 255, 255, 0.4)' }}
              >
                Premium • Exclusive • Trusted
              </span>
            </div>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-white/10" />
        <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-white/10" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-white/10" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-white/10" />
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
                htmlFor="username"
              >
                아이디
              </label>
              <input
                className="w-full h-[60px] px-0 bg-transparent border-0 border-b border-boutique-silver text-[20px] text-charcoal-deep focus:border-charcoal-deep focus:ring-0 outline-none transition-all placeholder-gray-300"
                id="username"
                name="username"
                type="text"
                placeholder="아이디를 입력하세요"
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
                <div className="flex-grow border-t border-translucent-silver"></div>
                <span className="flex-shrink-0 mx-6 text-charcoal-deep/20 text-[12px] tracking-widest font-light">
                  OR
                </span>
                <div className="flex-grow border-t border-translucent-silver"></div>
              </div>

              <Link
                href="/signup"
                className="w-full h-[64px] border border-boutique-silver text-charcoal-deep hover:bg-soft-grey flex items-center justify-center text-[16px] font-semibold tracking-[0.15em] transition-all duration-300"
              >
                회원가입
              </Link>
            </div>
          </form>

          <div className="mt-16 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-translucent-silver bg-soft-grey/50">
              <span className="material-symbols-outlined text-[16px] text-charcoal-deep/50">
                verified_user
              </span>
              <span className="text-[12px] font-medium text-charcoal-deep/60 tracking-wide">
                B2B 전용: 사업자 인증 후 이용 가능
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import SignupProgress from '@/components/auth/SignupProgress'

export default function SignupStep1Page() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    userid: '',
    realname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.userid.trim()) {
      newErrors.userid = '아이디를 입력하세요'
    }

    if (!formData.realname.trim()) {
      newErrors.realname = '실명을 입력하세요'
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력하세요'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다'
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력하세요'
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다'
    }

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Store data in sessionStorage and move to next step
      sessionStorage.setItem('signup_step1', JSON.stringify(formData))
      router.push('/signup/business')
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <main className="w-full max-w-[540px]">
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="material-symbols-outlined text-black text-4xl">diamond</span>
        </div>
        <h1 className="text-[32px] font-bold tracking-tight text-black mb-3">계정 생성</h1>
        <p className="text-gray-700 text-sm font-normal">비즈니스 회원을 위한 전용 서비스입니다.</p>
      </div>

      <SignupProgress currentStep={1} />

      <form className="space-y-12" onSubmit={handleSubmit}>
        <div className="space-y-8">
          <div className="relative group">
            <label className="block text-[13px] font-medium text-gray-700 mb-1" htmlFor="userid">
              아이디
            </label>
            <input
              className={`
                w-full h-[50px] px-0 bg-transparent border-0 border-b text-[16px] text-black
                focus:ring-0 outline-none transition-all placeholder-gray-400
                ${errors.userid ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-black'}
              `}
              id="userid"
              name="userid"
              type="text"
              placeholder="사용하실 아이디를 입력하세요"
              value={formData.userid}
              onChange={(e) => handleChange('userid', e.target.value)}
              autoComplete="off"
            />
            {errors.userid && <p className="mt-1 text-xs text-red-500">{errors.userid}</p>}
          </div>

          <div className="relative group">
            <label className="block text-[13px] font-medium text-gray-700 mb-1" htmlFor="realname">
              실명
            </label>
            <input
              className={`
                w-full h-[50px] px-0 bg-transparent border-0 border-b text-[16px] text-black
                focus:ring-0 outline-none transition-all placeholder-gray-400
                ${errors.realname ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-black'}
              `}
              id="realname"
              name="realname"
              type="text"
              placeholder="성함을 입력하세요"
              value={formData.realname}
              onChange={(e) => handleChange('realname', e.target.value)}
              autoComplete="off"
            />
            {errors.realname && <p className="mt-1 text-xs text-red-500">{errors.realname}</p>}
          </div>

          <div className="relative group">
            <label className="block text-[13px] font-medium text-gray-700 mb-1" htmlFor="email">
              이메일
            </label>
            <input
              className={`
                w-full h-[50px] px-0 bg-transparent border-0 border-b text-[16px] text-black
                focus:ring-0 outline-none transition-all placeholder-gray-400
                ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-black'}
              `}
              id="email"
              name="email"
              type="email"
              placeholder="business@example.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              autoComplete="off"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group">
              <label className="block text-[13px] font-medium text-gray-700 mb-1" htmlFor="password">
                비밀번호
              </label>
              <input
                className={`
                  w-full h-[50px] px-0 bg-transparent border-0 border-b text-[16px] text-black
                  focus:ring-0 outline-none transition-all placeholder-gray-400
                  ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-black'}
                `}
                id="password"
                name="password"
                type="password"
                placeholder="8자 이상 입력"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
              />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            <div className="relative group">
              <label className="block text-[13px] font-medium text-gray-700 mb-1" htmlFor="password-confirm">
                비밀번호 확인
              </label>
              <input
                className={`
                  w-full h-[50px] px-0 bg-transparent border-0 border-b text-[16px] text-black
                  focus:ring-0 outline-none transition-all placeholder-gray-400
                  ${errors.passwordConfirm ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-black'}
                `}
                id="password-confirm"
                name="password-confirm"
                type="password"
                placeholder="비밀번호 재입력"
                value={formData.passwordConfirm}
                onChange={(e) => handleChange('passwordConfirm', e.target.value)}
              />
              {errors.passwordConfirm && <p className="mt-1 text-xs text-red-500">{errors.passwordConfirm}</p>}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col items-center gap-5">
          <button
            type="submit"
            className="w-full h-[56px] bg-black text-white hover:bg-gray-800 text-[15px] font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group shadow-md"
          >
            <span>다음 단계</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>

          <div className="text-center mt-2">
            <span className="text-[13px] text-gray-700">이미 계정이 있으신가요?</span>
            <Link
              href="/login"
              className="ml-2 text-[13px] font-bold text-black border-b border-black pb-0.5 hover:opacity-70 transition-opacity"
            >
              로그인하기
            </Link>
          </div>
        </div>
      </form>

      <footer className="mt-20 pt-8 border-t border-gray-100 text-center">
        <div className="flex justify-center gap-6 text-[12px] text-gray-700 font-medium mb-4">
          <a href="#" className="hover:text-black transition-colors">이용약관</a>
          <a href="#" className="hover:text-black transition-colors">개인정보처리방침</a>
          <a href="#" className="hover:text-black transition-colors">고객센터</a>
        </div>
        <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase">
          © 2024 Marvelring Platform
        </p>
      </footer>
    </main>
  )
}

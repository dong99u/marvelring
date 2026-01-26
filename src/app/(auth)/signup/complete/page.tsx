'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import SignupProgress from '@/components/auth/SignupProgress'

export default function SignupCompletePage() {
  const router = useRouter()
  const { signUp } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const processSignup = async () => {
      // Check if all steps are completed
      const step1Data = sessionStorage.getItem('signup_step1')
      const step2Data = sessionStorage.getItem('signup_step2')

      if (!step1Data || !step2Data) {
        router.push('/signup')
        return
      }

      setLoading(true)

      try {
        const step1 = JSON.parse(step1Data)
        const step2 = JSON.parse(step2Data)

        // Call signup API
        await signUp({
          email: step1.email,
          password: step1.password,
          username: step1.userid,
          fullName: step1.realname,
          companyName: step2.companyName,
          ceoName: step2.ceoName,
          bizRegNum: step2.bizRegNum,
          businessType: step2.businessType,
          zipCode: step2.zipCode,
          addressMain: step2.addressMain,
          addressDetail: step2.addressDetail,
        })

        // Clear session storage
        sessionStorage.removeItem('signup_step1')
        sessionStorage.removeItem('signup_step2')

        setSuccess(true)
      } catch (err: any) {
        setError(err.message || '회원가입에 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    processSignup()
  }, [router, signUp])

  if (loading) {
    return (
      <main className="w-full max-w-[560px] text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="material-symbols-outlined text-black text-3xl animate-spin">refresh</span>
        </div>
        <h1 className="text-[32px] font-bold tracking-tight text-black mb-3">처리 중...</h1>
        <p className="text-gray-600 text-sm">회원가입을 진행하고 있습니다.</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="w-full max-w-[560px] text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="material-symbols-outlined text-red-600 text-6xl">error</span>
        </div>
        <h1 className="text-[32px] font-bold tracking-tight text-black mb-3">가입 실패</h1>
        <p className="text-gray-600 text-sm mb-8">{error}</p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/signup"
            className="px-6 py-3 border border-black text-black hover:bg-gray-100 transition-colors"
          >
            처음부터 다시하기
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            로그인하기
          </Link>
        </div>
      </main>
    )
  }

  if (success) {
    return (
      <main className="w-full max-w-[560px]">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="material-symbols-outlined text-black text-3xl">diamond</span>
            <span className="text-xl font-light tracking-[0.4em] uppercase text-black">Marvelring</span>
          </div>

          <SignupProgress currentStep={3} />

          <div className="mt-16 mb-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-green-600 text-5xl">check_circle</span>
            </div>
            <h1 className="text-[32px] font-bold tracking-tight text-black mb-2">가입 완료!</h1>
            <p className="text-gray-600 text-[16px] font-normal">
              회원가입이 성공적으로 완료되었습니다.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mb-8">
          <div className="flex items-start gap-3 mb-6">
            <span className="material-symbols-outlined text-yellow-600 text-2xl">info</span>
            <div>
              <h2 className="text-lg font-bold text-black mb-2">승인 대기 중</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                귀하의 계정은 현재 <span className="font-bold text-yellow-600">PENDING</span> 상태입니다.
                관리자가 사업자 정보를 확인한 후 승인하면 모든 기능을 이용하실 수 있습니다.
              </p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-gray-400 text-[20px]">schedule</span>
              <p>승인까지 <strong>1-2 영업일</strong>이 소요됩니다.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-gray-400 text-[20px]">email</span>
              <p>승인 완료 시 등록하신 이메일로 알림을 보내드립니다.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-gray-400 text-[20px]">help</span>
              <p>문의사항은 고객센터로 연락주시기 바랍니다.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Link href="/login">
            <button className="w-full h-[64px] bg-black text-white hover:bg-gray-800 text-[18px] font-bold tracking-wider transition-all duration-300 shadow-md hover:shadow-lg">
              로그인하기
            </button>
          </Link>
        </div>

        <footer className="mt-20 text-center">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-gray-400">
              <span className="material-symbols-outlined text-[20px]">lock</span>
              <span className="text-[12px] uppercase tracking-wider">SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="material-symbols-outlined text-[20px]">shield</span>
              <span className="text-[12px] uppercase tracking-wider">Secure Storage</span>
            </div>
          </div>
          <p className="text-[10px] text-gray-300 tracking-[0.3em] uppercase">
            © 2024 Marvelring Platform
          </p>
        </footer>
      </main>
    )
  }

  return null
}

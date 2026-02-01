'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import SignupProgress from '@/components/auth/SignupProgress'

// Convert base64 to File for FormData
const base64ToFile = (base64: string, fileName: string, type: string): File => {
  const byteCharacters = atob(base64.split(',')[1])
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  return new File([byteArray], fileName, { type })
}

export default function SignupCompletePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const isProcessingRef = useRef(false) // Prevent double execution in StrictMode

  useEffect(() => {
    const processSignup = async () => {
      // Prevent double execution
      if (isProcessingRef.current) return
      isProcessingRef.current = true
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

        // Step 1: Call signup API (creates auth user + member record via service role)
        const signupResponse = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
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
            bizRegImageUrl: null, // Will be updated after file upload if needed
          }),
        })

        const signupResult = await signupResponse.json()

        if (!signupResponse.ok) {
          throw new Error(signupResult.error || '계정 생성에 실패했습니다.')
        }

        const userId = signupResult.data?.user?.id

        // Step 2: Upload business registration document if provided
        if (step2.bizRegFileData && userId) {
          try {
            const file = base64ToFile(
              step2.bizRegFileData,
              step2.bizRegFileName,
              step2.bizRegFileType
            )

            const formData = new FormData()
            formData.append('file', file)
            formData.append('userId', userId)
            formData.append('email', step1.email) // Pass email to update member record

            const uploadResponse = await fetch('/api/auth/signup/upload', {
              method: 'POST',
              body: formData,
            })

            if (!uploadResponse.ok) {
              // Log error but don't fail signup
              console.error('File upload failed')
            }
          } catch (uploadError) {
            // Log error but continue - don't fail signup for upload issues
            console.error('File upload failed:', uploadError)
          }
        }

        // Clear session storage
        sessionStorage.removeItem('signup_step1')
        sessionStorage.removeItem('signup_step2')

        setSuccess(true)
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : '회원가입에 실패했습니다.'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    processSignup()
  }, [router])

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
          <Link href="/login" className="group block">
            <button className="relative w-full h-[72px] overflow-hidden bg-gradient-to-r from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a] text-white tracking-[0.25em] uppercase transition-all duration-500 ease-out
              before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-[#c9a962]/20 before:to-transparent before:translate-x-[-200%] before:transition-transform before:duration-700 before:ease-out
              hover:before:translate-x-[200%]
              after:absolute after:inset-[1px] after:bg-gradient-to-r after:from-[#1a1a1a] after:via-[#2d2d2d] after:to-[#1a1a1a] after:z-0
              border border-[#c9a962]/40 hover:border-[#c9a962]/80 hover:shadow-[0_0_30px_rgba(201,169,98,0.15)]
            ">
              {/* Golden shimmer line */}
              <span className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c9a962]/60 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Button content */}
              <span className="relative z-10 flex items-center justify-center gap-4">
                <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#c9a962]/70 group-hover:w-12 transition-all duration-500" />
                <span className="text-[15px] font-normal text-white/90 group-hover:text-white transition-colors duration-300" style={{ fontFamily: 'var(--font-family-serif-display)' }}>
                  로그인하기
                </span>
                <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#c9a962]/70 group-hover:w-12 transition-all duration-500" />
              </span>

              {/* Bottom golden line */}
              <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c9a962]/60 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Corner accents */}
              <span className="absolute top-2 left-2 w-3 h-3 border-l border-t border-[#c9a962]/30 group-hover:border-[#c9a962]/60 transition-colors duration-500" />
              <span className="absolute top-2 right-2 w-3 h-3 border-r border-t border-[#c9a962]/30 group-hover:border-[#c9a962]/60 transition-colors duration-500" />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-[#c9a962]/30 group-hover:border-[#c9a962]/60 transition-colors duration-500" />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-[#c9a962]/30 group-hover:border-[#c9a962]/60 transition-colors duration-500" />
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

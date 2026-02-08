'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SignupProgress from '@/components/auth/SignupProgress'
import BusinessTypeSelector from '@/components/auth/BusinessTypeSelector'
import AddressSearch from '@/components/auth/AddressSearch'

export default function SignupStep2Page() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    companyName: '',
    ceoName: '',
    bizRegNum: '',
    businessType: null as 'WHOLESALE' | 'RETAIL' | null,
    addressMain: '',
    zipCode: '',
    addressDetail: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [bizRegFile, setBizRegFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)

  useEffect(() => {
    // Check if step 1 is completed
    const step1Data = sessionStorage.getItem('signup_step1')
    if (!step1Data) {
      router.push('/signup')
    }
  }, [router])

  const validateFile = (file: File): string | null => {
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf']
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!validTypes.includes(file.type)) {
      return '허용된 파일 형식: JPG, PNG, PDF'
    }
    if (file.size > maxSize) {
      return '파일 크기는 5MB 이하여야 합니다'
    }
    return null
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const error = validateFile(file)
    if (error) {
      setErrors(prev => ({ ...prev, bizRegFile: error }))
      return
    }

    setBizRegFile(file)
    setErrors(prev => ({ ...prev, bizRegFile: '' }))

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => setFilePreview(reader.result as string)
      reader.readAsDataURL(file)
    } else {
      setFilePreview(null)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.companyName.trim()) {
      newErrors.companyName = '상호명을 입력하세요'
    }

    if (!formData.ceoName.trim()) {
      newErrors.ceoName = '대표자명을 입력하세요'
    }

    if (!formData.bizRegNum.trim()) {
      newErrors.bizRegNum = '사업자등록번호를 입력하세요'
    } else if (!/^\d{3}-\d{2}-\d{5}$/.test(formData.bizRegNum)) {
      newErrors.bizRegNum = '올바른 형식이 아닙니다 (예: 123-45-67890)'
    }

    if (!bizRegFile) {
      newErrors.bizRegFile = '사업자등록증을 업로드하세요'
    }

    if (!formData.businessType) {
      newErrors.businessType = '사업 유형을 선택하세요'
    }

    if (!formData.addressMain.trim()) {
      newErrors.addressMain = '주소를 입력하세요'
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = '우편번호를 입력하세요'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Convert file to base64 for sessionStorage (temporary)
      if (bizRegFile) {
        const reader = new FileReader()
        reader.onloadend = () => {
          sessionStorage.setItem('signup_step2', JSON.stringify({
            ...formData,
            bizRegFileData: reader.result,
            bizRegFileName: bizRegFile.name,
            bizRegFileType: bizRegFile.type,
          }))
          router.push('/signup/complete')
        }
        reader.readAsDataURL(bizRegFile)
      } else {
        sessionStorage.setItem('signup_step2', JSON.stringify(formData))
        router.push('/signup/complete')
      }
    }
  }

  const formatBizRegNum = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    if (digits.length <= 3) return digits
    if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`
  }

  const handleChange = (field: string, value: string | 'WHOLESALE' | 'RETAIL') => {
    const formatted = field === 'bizRegNum' ? formatBizRegNum(value) : value
    setFormData((prev) => ({ ...prev, [field]: formatted }))
    // Clear error when user starts typing/selecting
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const handleBack = () => {
    router.push('/signup')
  }

  return (
    <main className="w-full max-w-[680px]">
      <nav className="w-full h-[80px] flex items-center justify-center px-8 border-b border-gray-200 mb-12 -mt-6">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-black text-2xl">diamond</span>
          <span className="font-serif text-lg tracking-[0.2em] font-semibold text-black">
            MARVELRING
          </span>
        </div>
      </nav>

      <div className="px-4 sm:px-6">
        <SignupProgress currentStep={2} />

        <header className="mb-12 text-center">
          <h1 className="font-serif text-3xl md:text-4xl text-black mb-6">Business Information</h1>
          <div className="w-12 h-[2px] bg-black mx-auto"></div>
          <p className="text-gray-600 text-sm mt-6 leading-relaxed max-w-md mx-auto">
            귀하의 비즈니스에 대한 정확한 정보는 저희가 최적화된 상품을 제안하는 데 도움이 됩니다.
          </p>
        </header>

        <form className="space-y-12 bg-white p-0 md:p-8" onSubmit={handleSubmit}>
          {/* Company Details */}
          <div className="space-y-6">
            <h3 className="font-serif text-lg text-black border-b border-gray-200 pb-2 mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-black block"></span>
              Company Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-[13px] font-medium text-black mb-2 tracking-wide uppercase"
                  htmlFor="company-name"
                >
                  상호명 (Company Name)
                </label>
                <input
                  className={`
                    w-full h-[56px] px-4 bg-white border text-[15px] text-black
                    focus:ring-1 focus:ring-black outline-none transition-all placeholder-gray-400 rounded-none
                    ${errors.companyName ? 'border-red-500 focus:ring-red-500' : 'border-black focus:border-black'}
                  `}
                  id="company-name"
                  name="company-name"
                  type="text"
                  placeholder="예: 마블 주얼리"
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                />
                {errors.companyName && <p className="mt-1 text-xs text-red-500">{errors.companyName}</p>}
              </div>

              <div>
                <label
                  className="block text-[13px] font-medium text-black mb-2 tracking-wide uppercase"
                  htmlFor="ceo-name"
                >
                  대표자명 (CEO Name)
                </label>
                <input
                  className={`
                    w-full h-[56px] px-4 bg-white border text-[15px] text-black
                    focus:ring-1 focus:ring-black outline-none transition-all placeholder-gray-400 rounded-none
                    ${errors.ceoName ? 'border-red-500 focus:ring-red-500' : 'border-black focus:border-black'}
                  `}
                  id="ceo-name"
                  name="ceo-name"
                  type="text"
                  placeholder="홍길동"
                  value={formData.ceoName}
                  onChange={(e) => handleChange('ceoName', e.target.value)}
                />
                {errors.ceoName && <p className="mt-1 text-xs text-red-500">{errors.ceoName}</p>}
              </div>
            </div>

            <div>
              <label
                className="block text-[13px] font-medium text-black mb-2 tracking-wide uppercase"
                htmlFor="biz-num"
              >
                사업자 등록번호 (Business Registration No.)
              </label>
              <input
                className={`
                  w-full h-[56px] px-4 bg-white border text-[15px] text-black font-mono
                  focus:ring-1 focus:ring-black outline-none transition-all placeholder-gray-400 rounded-none
                  ${errors.bizRegNum ? 'border-red-500 focus:ring-red-500' : 'border-black focus:border-black'}
                `}
                id="biz-num"
                name="biz-num"
                type="text"
                placeholder="000-00-00000"
                value={formData.bizRegNum}
                onChange={(e) => handleChange('bizRegNum', e.target.value)}
              />
              {errors.bizRegNum && <p className="mt-1 text-xs text-red-500">{errors.bizRegNum}</p>}
            </div>

            {/* Business License Upload */}
            <div className="mt-6">
              <label className="block text-[13px] font-medium text-black mb-2 tracking-wide uppercase">
                사업자등록증 (Business License) *
              </label>
              <div className={`border-2 border-dashed p-6 text-center ${errors.bizRegFile ? 'border-red-500' : 'border-gray-300'}`}>
                <input
                  type="file"
                  id="biz-reg-file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="biz-reg-file" className="cursor-pointer">
                  {bizRegFile ? (
                    <div className="space-y-2">
                      {filePreview ? (
                        <img src={filePreview} alt="Preview" className="max-h-32 mx-auto" />
                      ) : (
                        <div className="flex items-center justify-center gap-2 text-black">
                          <span className="material-symbols-outlined">description</span>
                          <span>{bizRegFile.name}</span>
                        </div>
                      )}
                      <p className="text-sm text-gray-500">클릭하여 파일 변경</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <span className="material-symbols-outlined text-4xl text-gray-400">cloud_upload</span>
                      <p className="text-sm text-gray-600">클릭하여 파일 업로드</p>
                      <p className="text-xs text-gray-400">JPG, PNG, PDF (최대 5MB)</p>
                    </div>
                  )}
                </label>
              </div>
              {errors.bizRegFile && <p className="mt-1 text-xs text-red-500">{errors.bizRegFile}</p>}
            </div>
          </div>

          {/* Business Type */}
          <div className="space-y-6">
            <h3 className="font-serif text-lg text-black border-b border-gray-200 pb-2 mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-black block"></span>
              Business Type
            </h3>

            <BusinessTypeSelector
              value={formData.businessType}
              onChange={(value) => handleChange('businessType', value)}
            />
            {errors.businessType && <p className="mt-1 text-xs text-red-500">{errors.businessType}</p>}
          </div>

          {/* Location */}
          <div className="space-y-6">
            <h3 className="font-serif text-lg text-black border-b border-gray-200 pb-2 mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-black block"></span>
              Location
            </h3>

            <AddressSearch
              addressMain={formData.addressMain}
              zipCode={formData.zipCode}
              onAddressSelect={(address, zip) => {
                setFormData(prev => ({ ...prev, addressMain: address, zipCode: zip }))
                setErrors(prev => ({ ...prev, addressMain: '', zipCode: '' }))
              }}
              error={errors.addressMain}
              zipCodeError={errors.zipCode}
            />

            <div>
              <label
                className="block text-[13px] font-medium text-black mb-2 tracking-wide uppercase"
                htmlFor="address-detail"
              >
                상세 주소 (Detail Address)
              </label>
              <input
                className="w-full h-[56px] px-4 bg-white border border-black text-[15px] text-black focus:ring-1 focus:ring-black focus:border-black outline-none transition-all placeholder-gray-400 rounded-none"
                id="address-detail"
                name="address-detail"
                type="text"
                placeholder="층, 호수 등 상세 주소 입력"
                value={formData.addressDetail}
                onChange={(e) => handleChange('addressDetail', e.target.value)}
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="pt-10 flex items-center justify-between border-t border-gray-200 mt-12">
            <button
              type="button"
              onClick={handleBack}
              className="text-gray-600 hover:text-black text-sm font-medium flex items-center gap-2 transition-colors uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              이전 단계
            </button>

            <button
              type="submit"
              className="bg-black text-white h-[56px] px-12 text-[14px] font-medium tracking-widest hover:bg-gray-800 transition-all duration-300 flex items-center gap-3 uppercase shadow-lg"
            >
              다음 단계
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

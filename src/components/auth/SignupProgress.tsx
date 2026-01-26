'use client'

interface SignupProgressProps {
  currentStep: 1 | 2 | 3
}

export default function SignupProgress({ currentStep }: SignupProgressProps) {
  const steps = [
    { number: 1, label: '계정 정보' },
    { number: 2, label: '사업자 정보' },
    { number: 3, label: '인증 완료' },
  ]

  return (
    <div className="w-full max-w-[380px] mx-auto mb-16 relative">
      {/* Progress line */}
      <div className="absolute top-[15px] left-0 w-full h-[1px] bg-gray-200 -z-0"></div>

      {/* Active progress line */}
      <div
        className="absolute top-[15px] left-0 h-[1px] bg-black -z-0 transition-all duration-500"
        style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
      ></div>

      <div className="flex justify-between items-start relative z-10">
        {steps.map((step) => {
          const isActive = currentStep === step.number
          const isCompleted = currentStep > step.number

          return (
            <div key={step.number} className="flex flex-col items-center gap-3">
              <div
                className={`
                  w-[32px] h-[32px] rounded-full flex items-center justify-center text-[13px]
                  ring-4 ring-white transition-all
                  ${isActive || isCompleted
                    ? 'bg-black text-white font-bold shadow-sm'
                    : 'bg-white border border-black text-black font-medium'
                  }
                `}
              >
                {isCompleted ? (
                  <span className="material-symbols-outlined text-[16px]">check</span>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`
                  text-[13px] tracking-wide
                  ${isActive ? 'font-bold text-black' : 'font-medium text-gray-600'}
                `}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

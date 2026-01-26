'use client'

interface BusinessTypeSelectorProps {
  value: 'WHOLESALE' | 'RETAIL' | null
  onChange: (value: 'WHOLESALE' | 'RETAIL') => void
}

export default function BusinessTypeSelector({ value, onChange }: BusinessTypeSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <label
        className={`
          relative flex items-center p-5 border bg-white transition-all cursor-pointer
          ${value === 'WHOLESALE'
            ? 'border-2 border-black'
            : 'border border-gray-300 hover:border-black'
          }
        `}
      >
        <input
          type="radio"
          name="business-type"
          value="WHOLESALE"
          checked={value === 'WHOLESALE'}
          onChange={() => onChange('WHOLESALE')}
          className="w-5 h-5 text-black border-gray-300 focus:ring-black focus:ring-offset-0 cursor-pointer"
        />
        <div className="ml-4">
          <span className="block text-[15px] font-semibold text-black">
            Wholesale (도매)
          </span>
          <span className="block text-[12px] text-gray-600 mt-1">
            대량 구매 및 유통
          </span>
        </div>
      </label>

      <label
        className={`
          relative flex items-center p-5 border bg-white transition-all cursor-pointer
          ${value === 'RETAIL'
            ? 'border-2 border-black'
            : 'border border-gray-300 hover:border-black'
          }
        `}
      >
        <input
          type="radio"
          name="business-type"
          value="RETAIL"
          checked={value === 'RETAIL'}
          onChange={() => onChange('RETAIL')}
          className="w-5 h-5 text-black border-gray-300 focus:ring-black focus:ring-offset-0 cursor-pointer"
        />
        <div className="ml-4">
          <span className="block text-[15px] font-semibold text-black">
            Retail (소매)
          </span>
          <span className="block text-[12px] text-gray-600 mt-1">
            매장 운영 및 소비자 판매
          </span>
        </div>
      </label>
    </div>
  )
}

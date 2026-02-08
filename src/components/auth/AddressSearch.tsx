'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    daum: {
      Postcode: new (config: {
        oncomplete: (data: DaumPostcodeData) => void;
        width: string | number;
        height: string | number;
      }) => {
        open: () => void;
      };
    };
  }
}

interface DaumPostcodeData {
  address: string;
  addressEnglish: string;
  addressType: 'R' | 'J';
  apartment: 'Y' | 'N';
  autoJibunAddress: string;
  autoJibunAddressEnglish: string;
  autoRoadAddress: string;
  autoRoadAddressEnglish: string;
  bcode: string;
  bname: string;
  bname1: string;
  bname1English: string;
  bname2: string;
  bname2English: string;
  bnameEnglish: string;
  buildingCode: string;
  buildingName: string;
  hname: string;
  jibunAddress: string;
  jibunAddressEnglish: string;
  noSelected: 'Y' | 'N';
  postcode: string;
  postcode1: string;
  postcode2: string;
  postcodeSeq: string;
  query: string;
  roadAddress: string;
  roadAddressEnglish: string;
  roadname: string;
  roadnameCode: string;
  roadnameEnglish: string;
  sido: string;
  sidoEnglish: string;
  sigungu: string;
  sigunguCode: string;
  sigunguEnglish: string;
  userLanguageType: 'K' | 'E';
  userSelectedType: 'R' | 'J';
  zonecode: string;
}

interface AddressSearchProps {
  addressMain: string;
  zipCode: string;
  onAddressSelect: (address: string, zipCode: string) => void;
  error?: string;
  zipCodeError?: string;
}

export default function AddressSearch({
  addressMain,
  zipCode,
  onAddressSelect,
  error,
  zipCodeError,
}: AddressSearchProps) {
  useEffect(() => {
    // Check if script is already loaded
    if (window.daum?.Postcode) {
      return;
    }

    // Load Daum Postcode script
    const script = document.createElement('script');
    script.src =
      'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script if component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleSearchClick = () => {
    if (!window.daum?.Postcode) {
      alert('주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data: DaumPostcodeData) => {
        // Use road address if available, otherwise use jibun address
        const fullAddress = data.roadAddress || data.jibunAddress;
        const postalCode = data.zonecode;

        onAddressSelect(fullAddress, postalCode);
      },
      width: '100%',
      height: 500,
    }).open();
  };

  const addressInputClasses = `w-full h-[56px] px-4 bg-gray-50 border text-[15px] text-black focus:ring-1 outline-none transition-all placeholder-gray-400 rounded-none cursor-pointer ${
    error
      ? 'border-red-500 focus:ring-red-500'
      : 'border-black focus:ring-black focus:border-black'
  }`;

  const zipCodeInputClasses = `w-full h-[56px] px-4 bg-white border text-[15px] text-black focus:ring-1 outline-none transition-all placeholder-gray-400 rounded-none cursor-not-allowed ${
    zipCodeError
      ? 'border-red-500 focus:ring-red-500'
      : 'border-black focus:ring-black focus:border-black'
  }`;

  const labelClasses =
    'block text-[13px] font-medium text-black mb-2 tracking-wide uppercase';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Main Address Input */}
      <div className="md:col-span-2">
        <label htmlFor="addressMain" className={labelClasses}>
          주소 (Address) <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="addressMain"
            type="text"
            readOnly
            value={addressMain}
            onClick={handleSearchClick}
            placeholder="클릭하여 주소 검색"
            className={addressInputClasses}
          />
          <button
            type="button"
            onClick={handleSearchClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-black text-white text-[13px] font-medium tracking-wide uppercase hover:bg-gray-800 transition-colors"
          >
            주소 검색
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>

      {/* Zip Code Input */}
      <div>
        <label htmlFor="zipCode" className={labelClasses}>
          우편번호 (Zip) <span className="text-red-500">*</span>
        </label>
        <input
          id="zipCode"
          type="text"
          readOnly
          value={zipCode}
          placeholder="00000"
          className={zipCodeInputClasses}
        />
        {zipCodeError && (
          <p className="mt-2 text-sm text-red-500">{zipCodeError}</p>
        )}
      </div>
    </div>
  );
}

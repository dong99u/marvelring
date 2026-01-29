/**
 * Product Info Component
 * Displays product specifications in step sections
 */

import KakaoTalkButton from './KakaoTalkButton';
import ProductBadges from './ProductBadges';

interface ProductInfoProps {
  product: {
    product_name: string;
    product_code: string;
    description: string | null;
    weight: number | null;
    ring_size: string | null;
    size: string | null;
    base_labor_cost: number | null;
    stone_setting_cost: number | null;
    additional_information: string | null;
    price: number | null;
    kakao_link?: string | null;
    created_at: string;
    is_sale: boolean;
  };
  diamondInfo?: {
    diamond_size?: string | null;
    diamond_amount?: number | null;
  };
  isLoggedIn: boolean;
  isApproved: boolean;
}

export default function ProductInfo({
  product,
  diamondInfo,
  isLoggedIn,
  isApproved,
}: ProductInfoProps) {
  const displaySize = product.ring_size || product.size;
  const totalLaborCost =
    (product.base_labor_cost || 0) + (product.stone_setting_cost || 0);

  return (
    <div className="lg:col-span-5 flex flex-col h-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-light text-charcoal-light tracking-tight">
              {product.product_name}
            </h2>
            <ProductBadges
              createdAt={product.created_at}
              isSale={product.is_sale}
            />
          </div>
          <span className="text-[11px] font-bold text-charcoal-light/40 bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
            #{product.product_code}
          </span>
        </div>
        {product.description && (
          <>
            <div className="flex items-center gap-4 border-b border-gray-100 pb-4 mb-4">
              <span className="text-[13px] text-primary font-bold uppercase tracking-widest">
                Description
              </span>
            </div>
            <p className="text-[13px] text-charcoal-light/70 leading-relaxed font-light">
              {product.description}
            </p>
          </>
        )}
      </div>

      {/* Step Sections */}
      <div className="flex flex-col border-t border-gray-100">
        {/* Step 01: Material & Weight */}
        {product.weight && (
          <div className="workbench-step">
            <span className="step-number">01</span>
            <div className="step-content">
              <span className="config-label">Material &amp; Weight</span>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-charcoal-light/40 uppercase font-bold tracking-wider">
                    14K Gold
                  </span>
                  <div className="config-value">
                    {product.weight}g{' '}
                    <span className="text-[11px] font-normal text-charcoal-light/40">
                      (approx)
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 border-l border-gray-100 pl-6">
                  <span className="text-[10px] text-charcoal-light/40 uppercase font-bold tracking-wider">
                    18K Gold
                  </span>
                  <div className="config-value">
                    {(product.weight * 1.52).toFixed(1)}g{' '}
                    <span className="text-[11px] font-normal text-charcoal-light/40">
                      (approx)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 02: Size & Diamonds */}
        {(displaySize || diamondInfo) && (
          <div className="workbench-step">
            <span className="step-number">02</span>
            <div className="step-content">
              <span className="config-label">Size &amp; Diamonds</span>
              <div className="grid grid-cols-1 gap-3">
                {displaySize && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-gold-muted text-[16px]">
                        ring_volume
                      </span>
                      <span className="text-[13px] text-charcoal-light font-medium">
                        Ring Size (호수)
                      </span>
                    </div>
                    <span className="text-[13px] font-bold text-charcoal-light">
                      {displaySize}
                    </span>
                  </div>
                )}
                {diamondInfo &&
                  (diamondInfo.diamond_size || diamondInfo.diamond_amount) && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-gold-muted text-[16px]">
                          diamond
                        </span>
                        <span className="text-[13px] text-charcoal-light font-medium">
                          Diamond Info
                        </span>
                      </div>
                      <span className="text-[13px] font-bold text-charcoal-light">
                        {diamondInfo.diamond_amount}ea / {diamondInfo.diamond_size}
                      </span>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}

        {/* Step 03: Detailed Costs */}
        {(product.base_labor_cost || product.stone_setting_cost) && (
          <div className="workbench-step">
            <span className="step-number">03</span>
            <div className="step-content">
              <span className="config-label">Detailed Costs</span>
              <div className="grid grid-cols-2 gap-y-2 mb-3 bg-gray-50/50 p-3 rounded-sm">
                {product.base_labor_cost && (
                  <>
                    <div className="text-[12px] text-charcoal-light/60">
                      기본공임비
                    </div>
                    <div className="text-[12px] font-bold text-right text-charcoal-light">
                      {product.base_labor_cost.toLocaleString()}원
                    </div>
                  </>
                )}
                {product.stone_setting_cost && (
                  <>
                    <div className="text-[12px] text-charcoal-light/60">
                      알공임비 (Setting)
                    </div>
                    <div className="text-[12px] font-bold text-right text-charcoal-light">
                      {product.stone_setting_cost.toLocaleString()}원
                    </div>
                  </>
                )}
              </div>
              <div className="flex justify-between items-center px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-light/40">
                  Total Labor Cost
                </span>
                <span className="text-[14px] font-bold text-gold-muted">
                  {totalLaborCost.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Step 04: Special Notes */}
        <div className="workbench-step border-none pb-0">
          <span className="step-number">04</span>
          <div className="step-content">
            <span className="config-label">Special Notes</span>
            <div className="mb-2">
              <span className="spec-tag">각인비 포함</span>
              <span className="spec-tag">도금비 별도</span>
              <span className="spec-tag">주문 제작</span>
            </div>
            {product.additional_information && (
              <p className="text-[11px] text-charcoal-light/50 leading-relaxed italic">
                {product.additional_information}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Price Summary Card */}
      <div className="price-summary-card">
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="flex flex-col gap-1 relative z-10">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-1">
                Total Price
              </span>
              <span className="text-md font-light text-white/80">
                총 제품 가격
              </span>
            </div>
            <div className="text-right">
              {isLoggedIn && isApproved && product.price !== null ? (
                <span className="text-[32px] font-bold tracking-tight text-white leading-none">
                  {product.price.toLocaleString()}원
                </span>
              ) : (
                <p className="text-[14px] text-white/70 italic">
                  가격은 로그인 후 확인하실 수 있습니다
                </p>
              )}
            </div>
          </div>
          <p className="text-[10px] text-white/30 text-right mt-2 tracking-wide">
            * 금 시세 및 옵션 선택에 따라 최종 금액은 변동될 수 있습니다.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col gap-3">
        <KakaoTalkButton
          kakaoLink={product.kakao_link}
          isLoggedIn={isLoggedIn}
          isApproved={isApproved}
        />
        <div className="grid grid-cols-2 gap-3">
          <button className="border border-gray-200 hover:border-gold-muted py-3 text-[11px] font-bold tracking-widest uppercase transition-colors text-charcoal-light/60">
            스펙시트 다운로드
          </button>
          <button className="border border-gray-200 hover:border-gold-muted py-3 text-[11px] font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 text-charcoal-light/60">
            <span className="material-symbols-outlined text-[14px]">
              favorite
            </span>{' '}
            관심저장
          </button>
        </div>
      </div>
    </div>
  );
}

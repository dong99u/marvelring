/**
 * Product Info Component
 * Displays product specifications with elegant card-based layout
 */

import KakaoTalkButton from './KakaoTalkButton';
import ProductBadges from './ProductBadges';
import WishlistButton from './WishlistButton';

interface MaterialInfo {
  material_type: string;
  weight: number | null;
}

interface ProductInfoProps {
  productId: string;
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
    material_info?: MaterialInfo[];
  };
  diamondInfo?: {
    diamond_size?: string | null;
    diamond_amount?: number | null;
  };
  isLoggedIn: boolean;
  isApproved: boolean;
}

export default function ProductInfo({
  productId,
  product,
  diamondInfo,
  isLoggedIn,
  isApproved,
}: ProductInfoProps) {
  const displaySize = product.ring_size || product.size;
  const hasLaborData =
    product.base_labor_cost !== null || product.stone_setting_cost !== null;
  const totalLaborCost =
    (product.base_labor_cost || 0) + (product.stone_setting_cost || 0);
  const priceHiddenMessage = !isLoggedIn
    ? '가격은 로그인 후 확인하실 수 있습니다'
    : !isApproved
      ? '가격은 승인된 회원만 확인할 수 있습니다'
      : '가격 정보를 준비 중입니다';
  const laborHiddenMessage = !isLoggedIn
    ? '공임은 로그인 후 확인하실 수 있습니다'
    : !isApproved
      ? '공임은 승인된 회원만 확인할 수 있습니다'
      : '공임 정보를 준비 중입니다';

  return (
    <div className="lg:col-span-5 flex flex-col h-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl lg:text-4xl font-light text-charcoal-light tracking-tight leading-tight">
              {product.product_name}
            </h2>
            <ProductBadges
              createdAt={product.created_at}
              isSale={product.is_sale}
            />
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[9px] font-bold text-charcoal-light/30 uppercase tracking-widest">
              Product Code
            </span>
            <span className="text-[13px] font-bold text-charcoal-light/50 font-mono">
              {product.product_code}
            </span>
          </div>
        </div>

        {product.description && (
          <div className="mt-6 pt-6 border-t border-gold-muted/20">
            <p className="text-[14px] text-charcoal-light/75 leading-relaxed font-light">
              {product.description}
            </p>
          </div>
        )}
      </div>

      {/* Specification Cards */}
      <div className="flex flex-col gap-4 mb-8">

        {/* Material & Weight Card */}
        {(product.material_info && product.material_info.length > 0) ? (
          <div className="product-info-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-gold-muted text-[20px]">
                science
              </span>
              <h3 className="product-info-card-title">Material & Weight</h3>
            </div>
            <div className={`grid gap-6 ${product.material_info.length === 1 ? 'grid-cols-1' : product.material_info.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {product.material_info.map((mat, index) => (
                <div key={mat.material_type} className={`flex flex-col gap-2 ${index > 0 ? 'border-l border-gray-200 pl-6' : ''}`}>
                  <span className="product-info-label">
                    {mat.material_type} Gold
                  </span>
                  <div className="product-info-value">
                    {mat.weight ? `${mat.weight}g` : '-'}
                  </div>
                  <span className="product-info-sublabel">
                    approximate weight
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : product.weight ? (
          <div className="product-info-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-gold-muted text-[20px]">
                science
              </span>
              <h3 className="product-info-card-title">Material & Weight</h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <span className="product-info-label">14K Gold</span>
                <div className="product-info-value">{product.weight}g</div>
                <span className="product-info-sublabel">approximate weight</span>
              </div>
              <div className="flex flex-col gap-2 border-l border-gray-200 pl-6">
                <span className="product-info-label">18K Gold</span>
                <div className="product-info-value">
                  {(product.weight * 1.52).toFixed(1)}g
                </div>
                <span className="product-info-sublabel">approximate weight</span>
              </div>
            </div>
          </div>
        ) : null}

        {/* Size & Diamonds Card */}
        {(displaySize || diamondInfo) && (
          <div className="product-info-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-gold-muted text-[20px]">
                {displaySize ? 'ring_volume' : 'diamond'}
              </span>
              <h3 className="product-info-card-title">
                {displaySize && diamondInfo ? 'Size & Diamonds' : displaySize ? 'Ring Size' : 'Diamond Details'}
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              {displaySize && (
                <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-soft-ivory flex items-center justify-center">
                      <span className="material-symbols-outlined text-gold-muted text-[16px]">
                        ring_volume
                      </span>
                    </div>
                    <span className="product-info-detail-label">Ring Size (호수)</span>
                  </div>
                  <span className="product-info-detail-value">{displaySize}</span>
                </div>
              )}
              {diamondInfo &&
                (diamondInfo.diamond_size || diamondInfo.diamond_amount) && (
                  <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-soft-ivory flex items-center justify-center">
                        <span className="material-symbols-outlined text-gold-muted text-[16px]">
                          diamond
                        </span>
                      </div>
                      <span className="product-info-detail-label">Diamond Info</span>
                    </div>
                    <span className="product-info-detail-value">
                      {diamondInfo.diamond_amount}ea / {diamondInfo.diamond_size}
                    </span>
                  </div>
                )}
            </div>
          </div>
        )}

        {/* Labor Costs Card */}
        {(hasLaborData || !isLoggedIn || !isApproved) && (
          <div className="product-info-card bg-soft-ivory/50 border-gold-muted/20">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-gold-muted text-[20px]">
                construction
              </span>
              <h3 className="product-info-card-title">Labor Costs</h3>
            </div>
            {isLoggedIn && isApproved && hasLaborData ? (
              <div className="flex flex-col gap-3">
                {product.base_labor_cost !== null && (
                  <div className="flex items-center justify-between py-2">
                    <span className="product-info-detail-label">기본 공임비</span>
                    <span className="product-info-detail-value">
                      {product.base_labor_cost.toLocaleString()}원
                    </span>
                  </div>
                )}
                {product.stone_setting_cost !== null && (
                  <div className="flex items-center justify-between py-2">
                    <span className="product-info-detail-label">알 공임 비용</span>
                    <span className="product-info-detail-value">
                      {product.stone_setting_cost.toLocaleString()}원
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-3 mt-2 border-t border-gold-muted/20">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-charcoal-light/50">
                    Total Labor Cost
                  </span>
                  <span className="text-[18px] font-bold text-gold-muted">
                    {totalLaborCost.toLocaleString()}원
                  </span>
                </div>
              </div>
            ) : (
              <div className="py-2">
                <p className="text-[13px] text-charcoal-light/70 font-light leading-relaxed">
                  {laborHiddenMessage}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Additional Information */}
        {product.additional_information && (
          <div className="product-info-card bg-white border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-gold-muted text-[20px]">
                info
              </span>
              <h3 className="product-info-card-title">추가 사항</h3>
            </div>
            <p className="text-[13px] text-charcoal-light/70 leading-relaxed">
              {product.additional_information}
            </p>
          </div>
        )}
      </div>

      {/* Price Summary Card */}
      <div className="price-summary-card-elegant">
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-gold-muted/10 rounded-full blur-3xl"></div>
        <div className="flex flex-col gap-3 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-[24px]">
              payments
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
              Total Price
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {isLoggedIn && isApproved && product.price !== null ? (
              <>
                <span className="text-[36px] lg:text-[42px] font-bold tracking-tight text-white leading-none">
                  {product.price.toLocaleString()}
                  <span className="text-[20px] font-light ml-1">원</span>
                </span>
                <span className="text-[13px] font-light text-white/60 mt-1">
                  총 제품 가격
                </span>
              </>
            ) : (
              <div className="py-4">
                <p className="text-[15px] text-white/80 font-light leading-relaxed">
                  {priceHiddenMessage}
                </p>
              </div>
            )}
          </div>
          <p className="text-[10px] text-white/40 mt-3 pt-3 border-t border-white/10 tracking-wide leading-relaxed">
            금 시세 및 옵션 선택에 따라 최종 금액은 변동될 수 있습니다.
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
          <button className="product-info-action-btn">
            <span className="material-symbols-outlined text-[16px]">
              download
            </span>
            <span>스펙시트</span>
          </button>
          <WishlistButton productId={productId} isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </div>
  );
}

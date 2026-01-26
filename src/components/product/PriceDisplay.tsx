/**
 * Price Display Component
 *
 * CRITICAL SECURITY RULES:
 * 1. NEVER show "도매가" or "소매가" labels
 * 2. ALWAYS use "가격" label for price display
 * 3. Show login prompt for unauthenticated or unapproved users
 */

interface PriceDisplayProps {
  price: number | null;
  isLoggedIn: boolean;
  isApproved: boolean;
  isSale?: boolean;
  originalPrice?: number | null;
}

export default function PriceDisplay({
  price,
  isLoggedIn,
  isApproved,
  isSale = false,
  originalPrice,
}: PriceDisplayProps) {
  // Show login prompt if:
  // 1. User is not logged in
  // 2. User is logged in but not approved
  // 3. Price is null (shouldn't happen if logged in and approved)
  if (!isLoggedIn || !isApproved || price === null) {
    return (
      <div className="flex flex-col items-center gap-1">
        <p className="text-[14px] text-gray-500 italic">
          가격은 로그인 후 확인하실 수 있습니다
        </p>
      </div>
    );
  }

  // Show price with optional sale original price
  return (
    <div className="flex flex-col items-center gap-1">
      {isSale && originalPrice && originalPrice !== price && (
        <p className="text-[13px] text-gray-400 line-through">
          ₩{originalPrice.toLocaleString()}
        </p>
      )}
      <div className="flex items-baseline gap-2">
        <span className="text-[14px] text-charcoal-light/70 font-medium">
          가격
        </span>
        <span className="text-[16px] font-bold text-charcoal-light">
          ₩{price.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

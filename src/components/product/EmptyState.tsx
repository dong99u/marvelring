interface EmptyStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function EmptyState({
  message = '상품이 없습니다',
  onRetry,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-charcoal-light/40">
      <p className="text-lg mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 border border-charcoal-light/20 text-charcoal-light hover:bg-charcoal-light hover:text-white transition-colors"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}

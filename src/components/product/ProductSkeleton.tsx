export default function ProductSkeleton() {
  return (
    <div className="flex flex-col bg-white border border-card-border p-4 animate-pulse">
      {/* Image placeholder */}
      <div className="relative w-full aspect-square bg-marble-grey mb-6 overflow-hidden">
        <div className="w-full h-full bg-charcoal-light/10" />
      </div>

      {/* Text content */}
      <div className="text-center space-y-3">
        {/* Product name */}
        <div className="h-5 bg-charcoal-light/10 rounded mx-auto w-3/4" />

        {/* Product code */}
        <div className="h-4 bg-charcoal-light/10 rounded mx-auto w-1/2" />

        {/* Price */}
        <div className="flex flex-col items-center gap-1">
          <div className="h-4 bg-charcoal-light/10 rounded w-20" />
        </div>
      </div>
    </div>
  );
}

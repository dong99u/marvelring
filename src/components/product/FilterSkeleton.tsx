export default function FilterSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Sort dropdown skeleton */}
      <div className="h-10 bg-charcoal-light/10 rounded w-full" />

      {/* Filter sections skeleton */}
      <div className="space-y-4">
        <div className="h-5 bg-charcoal-light/10 rounded w-24" />
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 bg-charcoal-light/10 rounded w-32" />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="h-5 bg-charcoal-light/10 rounded w-20" />
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-4 bg-charcoal-light/10 rounded w-28" />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Breadcrumb Component
 * Navigation breadcrumb for product detail page
 */

import Link from 'next/link';

interface BreadcrumbProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-2 text-[12px] text-charcoal-light/40 uppercase tracking-widest font-medium">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-charcoal-light transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={
                index === items.length - 1
                  ? 'text-gold-muted font-bold'
                  : undefined
              }
            >
              {item.label}
            </span>
          )}
          {index < items.length - 1 && (
            <span className="material-symbols-outlined text-[12px]">
              chevron_right
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

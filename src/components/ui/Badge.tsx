import { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center justify-center px-3 py-1 text-xs font-bold uppercase tracking-wider transition-all',
  {
    variants: {
      variant: {
        new: 'bg-gold-muted text-pure-white',
        sale: 'bg-charcoal-deep text-pure-white',
        exclusive: 'bg-primary text-charcoal-deep',
        default: 'bg-boutique-silver text-charcoal-light',
      },
      size: {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-xs px-3 py-1',
        lg: 'text-sm px-4 py-1.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={badgeVariants({ variant, size, className })}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;

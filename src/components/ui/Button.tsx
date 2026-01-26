import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none touch-manipulation active:scale-95',
  {
    variants: {
      variant: {
        primary: 'bg-charcoal-deep text-pure-white hover:bg-charcoal-hover',
        secondary: 'bg-pure-white text-charcoal-deep border border-charcoal-light hover:bg-soft-ivory',
        outline: 'border border-charcoal-light text-charcoal-light bg-transparent hover:bg-soft-ivory',
        ghost: 'text-charcoal-light hover:bg-soft-ivory',
        gold: 'bg-gold-muted text-white hover:bg-gold-muted/90',
        kakao: 'bg-[#FEE500] text-[#000000] hover:bg-[#FDD700]',
      },
      size: {
        sm: 'h-12 px-4 md:px-6 text-xs md:text-sm min-h-[48px]',
        md: 'h-12 md:h-14 px-6 md:px-8 text-sm md:text-base min-h-[48px]',
        lg: 'h-14 px-8 md:px-10 text-base md:text-lg min-h-[48px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;

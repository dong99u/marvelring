import { HTMLAttributes, forwardRef, createElement } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-charcoal-deep',
      h2: 'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-charcoal-deep',
      h3: 'text-2xl md:text-3xl lg:text-4xl font-bold leading-snug text-charcoal-deep',
      h4: 'text-xl md:text-2xl font-semibold leading-snug text-charcoal-deep',
      h5: 'text-lg md:text-xl font-semibold leading-normal text-charcoal-deep',
      h6: 'text-base md:text-lg font-semibold leading-normal text-charcoal-deep',
      body: 'text-base md:text-lg leading-relaxed text-charcoal-light',
      bodySmall: 'text-sm md:text-base leading-relaxed text-charcoal-light',
      caption: 'text-sm md:text-base leading-normal text-charcoal-light/70',
      captionSmall: 'text-xs md:text-sm leading-normal text-charcoal-light/70',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

interface TypographyProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as, ...props }, ref) => {
    const Component = as || getDefaultTag(variant);

    return createElement(Component, {
      ref,
      className: typographyVariants({ variant, className }),
      ...props,
    });
  }
);

Typography.displayName = 'Typography';

function getDefaultTag(variant: TypographyProps['variant']): string {
  switch (variant) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'h5':
      return 'h5';
    case 'h6':
      return 'h6';
    case 'caption':
    case 'captionSmall':
      return 'span';
    default:
      return 'p';
  }
}

// Convenience components
export const H1 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant' | 'as'>>(
  (props, ref) => createElement(Typography, { ref, variant: 'h1', as: 'h1', ...props })
);
H1.displayName = 'H1';

export const H2 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant' | 'as'>>(
  (props, ref) => createElement(Typography, { ref, variant: 'h2', as: 'h2', ...props })
);
H2.displayName = 'H2';

export const H3 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant' | 'as'>>(
  (props, ref) => createElement(Typography, { ref, variant: 'h3', as: 'h3', ...props })
);
H3.displayName = 'H3';

export const H4 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant' | 'as'>>(
  (props, ref) => createElement(Typography, { ref, variant: 'h4', as: 'h4', ...props })
);
H4.displayName = 'H4';

export const H5 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant' | 'as'>>(
  (props, ref) => createElement(Typography, { ref, variant: 'h5', as: 'h5', ...props })
);
H5.displayName = 'H5';

export const H6 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant' | 'as'>>(
  (props, ref) => createElement(Typography, { ref, variant: 'h6', as: 'h6', ...props })
);
H6.displayName = 'H6';

export const Body = forwardRef<HTMLParagraphElement, Omit<TypographyProps, 'variant' | 'as'>>(
  (props, ref) => createElement(Typography, { ref, variant: 'body', as: 'p', ...props })
);
Body.displayName = 'Body';

export const Caption = forwardRef<HTMLSpanElement, Omit<TypographyProps, 'variant' | 'as'>>(
  (props, ref) => createElement(Typography, { ref, variant: 'caption', as: 'span', ...props })
);
Caption.displayName = 'Caption';

export default Typography;

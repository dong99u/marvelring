# Marvelring Design System

High-Contrast design system implementation for the Marvelring B2B Platform.

## Components

### Button

Primary, secondary, outline, and ghost button variants with three sizes.

```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="lg">Primary Button</Button>
<Button variant="secondary" size="md">Secondary Button</Button>
<Button variant="outline" size="sm">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost'
- `size`: 'sm' | 'md' | 'lg' (default: 'lg')
- All standard button HTML attributes

**Specs:**
- Primary: 56px height (lg), charcoal-deep background, white text
- Secondary: 56px height (lg), white background, charcoal-deep text, 1px border
- Minimum touch target: 48px
- Transition duration: 300ms

### Input

Form input field with label, helper text, and error support.

```tsx
import { Input } from '@/components/ui';

<Input
  label="Email Address"
  placeholder="Enter your email"
  helperText="We'll never share your email"
/>

<Input
  label="Password"
  type="password"
  error="This field is required"
/>
```

**Props:**
- `label`: Optional label text
- `error`: Error message (displays in red)
- `helperText`: Helper text (displays below input)
- All standard input HTML attributes

**Specs:**
- Height: 56px (h-14)
- Border: 1px boutique-silver
- Focus: 2px ring gold-muted

### Card

Container component with product card hover effects.

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui';

<Card variant="product" padding="none">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
  <CardFooter>
    Footer content
  </CardFooter>
</Card>
```

**Props:**
- `variant`: 'default' | 'bordered' | 'product'
- `padding`: 'none' | 'sm' | 'md' | 'lg'

**Product Card Specs:**
- Border: 1px boutique-silver
- Hover: scale-105 + shadow-2xl
- Transition: 700ms duration

### Badge

Status and category badges.

```tsx
import { Badge } from '@/components/ui';

<Badge variant="new">NEW</Badge>
<Badge variant="sale">SALE</Badge>
<Badge variant="exclusive">B2B EXCLUSIVE</Badge>
```

**Props:**
- `variant`: 'new' | 'sale' | 'exclusive' | 'default'
- `size`: 'sm' | 'md' | 'lg'

**Specs:**
- NEW: gold-muted background (#A68D60)
- SALE: charcoal-deep background (#1A1A1A)
- Text: uppercase, bold, tracking-wider

### Typography

Semantic typography components with responsive sizing.

```tsx
import { H1, H2, H3, Body, Caption, Typography } from '@/components/ui';

<H1>Main Heading</H1>
<H2>Secondary Heading</H2>
<H3>Tertiary Heading</H3>
<Body>Body text content</Body>
<Caption>Small caption text</Caption>

// Or use the base component
<Typography variant="h1" as="h1">Heading</Typography>
```

**Variants:**
- `h1`: 32-36px bold (responsive)
- `h2`: 24-28px bold (responsive)
- `h3`, `h4`, `h5`, `h6`: Progressive heading sizes
- `body`: 18px regular, line-height 1.6-1.8
- `caption`: 14-16px

**Specs:**
- Main font: Manrope + Noto Sans KR
- Auth pages: Playfair Display + Inter
- Line height: 1.6-1.8 for body text
- All headings: charcoal-deep (#1A1A1A)
- Body text: charcoal-light (#4A4A48)

## Color Palette

```css
--color-primary: #d4c2a1;           /* Soft Gold */
--color-soft-ivory: #faf9f6;        /* Background */
--color-marble-grey: #f2f2f2;       /* Section BG */
--color-gold-muted: #a68d60;        /* Accent */
--color-charcoal-light: #4a4a48;    /* Text */
--color-pure-white: #ffffff;
--color-charcoal-deep: #1a1a1a;
--color-boutique-silver: #e5e7eb;
```

## Usage

Import components individually:

```tsx
import { Button, Input, Card } from '@/components/ui';
```

Or import specific components:

```tsx
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
```

## Demo Page

View all components at: `/design-system`

## Design Reference

Based on HTML design specifications in `.design-reference/SCREENS.md`

# Mobile Development Guide

## Quick Reference for Mobile-Optimized Development

### Touch Target Guidelines

**Rule: All interactive elements must be at least 48x48px**

```tsx
// ✅ Good - Minimum 48px height
<button className="min-h-12 px-4">Click me</button>

// ✅ Good - Icon buttons with minimum size
<button className="min-h-12 min-w-12 flex items-center justify-center">
  <Icon size={20} />
</button>

// ❌ Bad - Too small
<button className="h-8 px-2">Click me</button>
```

### Responsive Typography

**Use Tailwind responsive variants consistently**

```tsx
// ✅ Good - Scales appropriately
<h1 className="text-2xl md:text-3xl lg:text-4xl">Title</h1>
<p className="text-sm md:text-base">Body text</p>

// ❌ Bad - Fixed size
<h1 className="text-4xl">Title</h1>
```

### Touch Optimization

**Add touch-manipulation to interactive elements**

```tsx
// ✅ Good - Fast tap response
<button className="touch-manipulation">Tap me</button>
<Link href="/" className="touch-manipulation">Link</Link>

// ✅ Good - Active state feedback
<button className="active:scale-95 transition-transform">Press me</button>
```

### Mobile Navigation

**Show/hide based on screen size**

```tsx
// Mobile menu (hidden on desktop)
<div className="lg:hidden">
  <MobileNav />
</div>

// Desktop navigation (hidden on mobile)
<nav className="hidden lg:block">
  <DesktopNav />
</nav>
```

### Responsive Images

**Use Next.js Image with proper sizes**

```tsx
// ✅ Good - Responsive sizes
<Image
  src="/image.jpg"
  alt="Product"
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>

// ❌ Bad - Fixed size or missing sizes
<Image src="/image.jpg" alt="Product" width={500} height={500} />
```

### Form Inputs

**Mobile-friendly input sizing**

```tsx
// ✅ Good - Responsive height, prevents iOS zoom
<input
  type="email"
  className="h-12 md:h-14 px-4 text-base touch-manipulation"
/>

// ❌ Bad - Too small, will zoom on iOS
<input type="email" className="h-8 text-xs" />
```

### Modal/Drawer Animations

**Use Tailwind transforms for smooth animations**

```tsx
// ✅ Good - GPU-accelerated transform
<div className={`
  transform transition-transform duration-300
  ${isOpen ? 'translate-x-0' : '-translate-x-full'}
`}>
  Drawer content
</div>

// ❌ Bad - Forces layout recalculation
<div className={`transition-all ${isOpen ? 'left-0' : 'left-[-280px]'}`}>
  Drawer content
</div>
```

### Swiper Integration

**Using Swiper for touch galleries**

```tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

function Gallery({ images }) {
  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
    >
      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <Image src={img} alt="" fill />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
```

### Safe Area Support

**Handle notched devices**

```tsx
// ✅ Good - Respects safe areas
<div className="pt-safe pb-safe">
  Content safe from notch
</div>

// In CSS
body {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
```

### Prevent Unwanted Behaviors

**iOS Safari and Android Chrome fixes**

```css
/* Remove tap highlight */
* {
  -webkit-tap-highlight-color: transparent;
}

/* Prevent text size adjust on iOS */
html {
  -webkit-text-size-adjust: 100%;
}

/* Prevent overscroll bounce */
body {
  overscroll-behavior-y: none;
}

/* Faster tap response */
.touch-manipulation {
  touch-action: manipulation;
}
```

### Horizontal Scroll

**Hide scrollbar while keeping functionality**

```tsx
// ✅ Good - Scrollable without visible scrollbar
<div className="overflow-x-auto scrollbar-hide">
  <div className="flex gap-4">
    {items.map(item => <Item key={item.id} {...item} />)}
  </div>
</div>
```

### Text Overflow

**Truncate long text**

```tsx
// ✅ Good - Truncate with ellipsis
<h3 className="line-clamp-2">
  Very long product name that might overflow
</h3>

// For single line
<p className="truncate">Single line truncation</p>
```

### Loading States

**Show loading feedback on mobile**

```tsx
function Button({ loading, children }) {
  return (
    <button
      disabled={loading}
      className="min-h-12 px-6 disabled:opacity-50"
    >
      {loading ? (
        <span className="inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
```

### Accordion Menus

**Mobile-friendly expandable sections**

```tsx
function AccordionItem({ title, children, isOpen, onToggle }) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full min-h-12 flex items-center justify-between px-4"
      >
        <span>{title}</span>
        <ChevronDown
          className={`transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="bg-marble-grey">
          {children}
        </div>
      )}
    </div>
  );
}
```

### Grid Layouts

**Responsive grid system**

```tsx
// ✅ Good - Responsive columns
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>

// Mobile: 1 column
// Small tablet: 2 columns
// Tablet: 3 columns
// Desktop: 4 columns
```

### Spacing

**Use responsive spacing**

```tsx
// ✅ Good - Responsive padding and margins
<section className="px-4 md:px-6 lg:px-10 py-8 md:py-12 lg:py-16">
  <h2 className="mb-4 md:mb-6 lg:mb-8">Section Title</h2>
</section>
```

### Button Variants

**Mobile-optimized button component**

```tsx
import Button from '@/components/ui/Button';

// Different variants
<Button variant="primary" size="md">Submit</Button>
<Button variant="secondary" size="md">Cancel</Button>
<Button variant="outline" size="sm">Learn More</Button>
<Button variant="kakao" size="lg" fullWidth>카카오톡 문의</Button>
```

### Overlay/Modal

**Lock body scroll when modal open**

```tsx
function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4">
        {children}
      </div>
    </div>
  );
}
```

### Performance Tips

**Optimize for mobile devices**

```tsx
// ✅ Good - Lazy load images
<Image
  src="/large-image.jpg"
  alt=""
  loading="lazy"
  sizes="(max-width: 640px) 100vw, 50vw"
/>

// ✅ Good - Debounce expensive operations
const debouncedSearch = useMemo(
  () => debounce((value) => performSearch(value), 300),
  []
);

// ✅ Good - Use CSS transforms for animations
<div className="transition-transform hover:scale-105">
  Content
</div>
```

## Common Patterns

### Product Card

```tsx
<Link
  href={`/products/${id}`}
  className="group flex flex-col p-3 md:p-4 min-h-[300px] border hover:shadow-lg transition-all"
>
  <div className="relative w-full aspect-square mb-4">
    <Image
      src={image}
      alt={name}
      fill
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      className="object-cover group-hover:scale-105 transition-transform"
    />
  </div>
  <h3 className="text-base md:text-lg font-bold line-clamp-2">
    {name}
  </h3>
  <p className="text-xs md:text-sm text-gray-400">
    {code}
  </p>
</Link>
```

### Mobile Header

```tsx
<header className="sticky top-0 z-50 bg-white border-b px-4 md:px-6 lg:px-10 py-4">
  {/* Mobile menu button */}
  <div className="lg:hidden">
    <button className="min-h-12 min-w-12">
      <Menu size={24} />
    </button>
  </div>

  {/* Logo */}
  <Link href="/" className="flex items-center gap-2">
    <Logo />
    <span className="text-base md:text-xl font-bold">BRAND</span>
  </Link>

  {/* Desktop nav */}
  <nav className="hidden lg:flex gap-4">
    {/* Nav items */}
  </nav>
</header>
```

## Testing Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Test on mobile device
# 1. Find local IP
ipconfig getifaddr en0  # Mac
ipconfig               # Windows

# 2. Access from phone
# http://YOUR_IP:3000

# Run Lighthouse mobile audit
npm run lighthouse:mobile
```

## Breakpoints Reference

```typescript
// Tailwind breakpoints
const breakpoints = {
  sm: '640px',   // Small tablet
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px' // Extra large
};

// Usage
<div className="
  w-full          // Mobile: 100%
  sm:w-1/2        // Small tablet: 50%
  md:w-1/3        // Tablet: 33%
  lg:w-1/4        // Desktop: 25%
">
```

## Device Sizes Reference

```typescript
// Common mobile viewport sizes
const viewports = {
  'iPhone SE': { width: 375, height: 667 },
  'iPhone 12': { width: 390, height: 844 },
  'iPhone Pro Max': { width: 428, height: 926 },
  'iPad Mini': { width: 768, height: 1024 },
  'iPad Pro': { width: 1024, height: 1366 },
  'Galaxy S20': { width: 360, height: 800 },
  'Pixel 5': { width: 393, height: 851 },
};
```

## Debugging Mobile

### iOS Safari
```bash
# Enable Safari Developer menu
# Safari > Preferences > Advanced > Show Develop menu

# Connect iPhone via USB
# Develop > [Your iPhone] > [Your Page]
```

### Android Chrome
```bash
# Enable USB debugging on Android device
# Chrome DevTools > More tools > Remote devices
# Select your device and inspect
```

### Console Logging on Device
```tsx
// Add visible console for mobile debugging
{process.env.NODE_ENV === 'development' && (
  <div className="fixed bottom-0 left-0 right-0 bg-black text-white text-xs p-2 z-[9999]">
    Screen: {typeof window !== 'undefined' && window.innerWidth}px
  </div>
)}
```

## Resources

- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Swiper Documentation](https://swiperjs.com/react)
- [iOS Safari Web API](https://developer.apple.com/documentation/safari-release-notes)
- [Android Chrome Web APIs](https://developer.chrome.com/docs/android/)

## Checklist for New Components

- [ ] All touch targets minimum 48x48px
- [ ] Responsive typography (text-sm md:text-base)
- [ ] Responsive spacing (px-4 md:px-6 lg:px-10)
- [ ] Touch-manipulation on interactive elements
- [ ] Active state feedback (active:scale-95)
- [ ] Loading states for async operations
- [ ] Error states with clear messages
- [ ] Keyboard navigation support
- [ ] Screen reader labels (aria-label)
- [ ] Tested on real iOS device
- [ ] Tested on real Android device
- [ ] Lighthouse mobile score >90

## Anti-Patterns to Avoid

```tsx
// ❌ Bad - Fixed positioning without safe area
<div className="fixed bottom-0">Footer</div>

// ✅ Good - With safe area
<div className="fixed bottom-0 pb-safe">Footer</div>

// ❌ Bad - Small touch targets
<button className="h-8 w-8"><Icon /></button>

// ✅ Good - Proper touch targets
<button className="min-h-12 min-w-12"><Icon /></button>

// ❌ Bad - No responsive sizing
<h1 className="text-4xl">Title</h1>

// ✅ Good - Responsive sizing
<h1 className="text-2xl md:text-3xl lg:text-4xl">Title</h1>

// ❌ Bad - Prevents native behavior
<div onTouchStart={handleTouch}>...</div>

// ✅ Good - Uses standard events
<div onClick={handleClick}>...</div>
```

## Questions?

Refer to:
- `/MOBILE_OPTIMIZATION.md` - Complete implementation details
- `/MOBILE_TEST_CHECKLIST.md` - Testing guidelines
- `.design-reference/SCREENS.md` - Design specifications

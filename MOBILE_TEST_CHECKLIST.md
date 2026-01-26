# Mobile Optimization Test Checklist

## Test Environment Setup

### Required Test Devices
- [ ] iPhone 12/13/14/15 (iOS Safari)
- [ ] iPad (iOS Safari)
- [ ] Android phone (Chrome)
- [ ] Android tablet (Chrome)

### Browser Testing
- [ ] iOS Safari 15+
- [ ] Android Chrome 90+
- [ ] Samsung Internet
- [ ] Firefox Mobile

### Network Conditions
- [ ] WiFi
- [ ] 4G/LTE
- [ ] 3G (throttled)

## 1. Touch Target Testing (48px minimum)

### Header Components
- [ ] Logo link is tappable (48px+)
- [ ] Hamburger menu button (48px x 48px)
- [ ] Search icon button (48px x 48px)
- [ ] Desktop: 파트너십 안내 button
- [ ] Desktop: 로그인 button

### Mobile Navigation Drawer
- [ ] Hamburger open button (48px x 48px)
- [ ] X close button (48px x 48px)
- [ ] 신상품 link (48px height)
- [ ] Collection accordion button (48px height)
- [ ] Fashion accordion button (48px height)
- [ ] All submenu items (48px height)
- [ ] 시즌오프 link (48px height)
- [ ] 공지사항 link (48px height)
- [ ] 고객센터 link (48px height)
- [ ] 파트너십 안내 bottom button (48px height)
- [ ] 로그인 bottom button (48px height)

### Product Cards
- [ ] Entire card is tappable
- [ ] Cards have enough padding
- [ ] Badge does not overlap tap area

### Image Gallery
- [ ] Zoom button (48px x 48px)
- [ ] Lightbox close button (48px x 48px)
- [ ] Desktop: Thumbnail buttons (48px minimum)

### Form Elements
- [ ] All input fields (48px height mobile)
- [ ] All buttons (48px height)
- [ ] Checkbox/radio touch areas
- [ ] Select dropdowns

## 2. Mobile Swipe Gallery Testing

### Basic Swipe Functionality
- [ ] Swipe left to next image
- [ ] Swipe right to previous image
- [ ] Swipe feels smooth (60fps)
- [ ] No lag or jank during swipe

### Pagination Dots
- [ ] Dots are visible
- [ ] Active dot is highlighted (gold color)
- [ ] Dots update on swipe
- [ ] Dots are tappable

### Zoom Functionality
- [ ] Zoom button appears on mobile
- [ ] Tap zoom button opens lightbox
- [ ] Lightbox image loads correctly
- [ ] Close button works
- [ ] Tap outside closes lightbox

### Desktop Behavior
- [ ] Thumbnails appear on desktop
- [ ] Click thumbnail changes main image
- [ ] Active thumbnail is highlighted
- [ ] Hover zoom effect works

## 3. Hamburger Menu Testing

### Opening Menu
- [ ] Tap hamburger icon opens menu
- [ ] Menu slides in from left
- [ ] Smooth animation (300ms)
- [ ] Overlay appears behind menu
- [ ] Body scroll is locked

### Navigation
- [ ] All top-level items are tappable
- [ ] Collection expands/collapses
- [ ] Fashion expands/collapses
- [ ] Chevron icon rotates on expand
- [ ] Submenu background changes color
- [ ] All submenu items work

### Closing Menu
- [ ] X button closes menu
- [ ] Tap overlay closes menu
- [ ] Tap menu item closes menu
- [ ] Menu slides out smoothly
- [ ] Body scroll is restored

### Edge Cases
- [ ] Menu scrolls if content overflows
- [ ] Safe area padding on notched devices
- [ ] No horizontal scroll
- [ ] Landscape orientation works

## 4. Responsive Typography Testing

### Mobile (320px - 767px)
- [ ] H1: 24px (text-2xl)
- [ ] H2: 20px (text-xl)
- [ ] H3: 18px (text-lg)
- [ ] H4: 16px (text-base)
- [ ] Body: 14px (text-sm)
- [ ] Captions: 12px (text-xs)

### Tablet (768px - 1023px)
- [ ] H1: 30px (text-3xl)
- [ ] H2: 24px (text-2xl)
- [ ] H3: 20px (text-xl)
- [ ] H4: 18px (text-lg)
- [ ] Body: 16px (text-base)
- [ ] Captions: 14px (text-sm)

### Desktop (1024px+)
- [ ] H1: 36px (text-4xl)
- [ ] H2: 30px (text-3xl)
- [ ] H3: 24px (text-2xl)
- [ ] H4: 18px (text-lg)
- [ ] Body: 16px (text-base)
- [ ] Captions: 14px (text-sm)

### Readability
- [ ] No text too small to read
- [ ] Line height is comfortable
- [ ] No text overflow
- [ ] Korean text renders correctly
- [ ] English text renders correctly

## 5. iOS Safari Compatibility

### Tap Behavior
- [ ] No blue tap highlight flash
- [ ] Tap feels responsive (not 300ms delay)
- [ ] Active states show feedback
- [ ] No accidental double-tap zoom

### Text Rendering
- [ ] Text doesn't auto-zoom on input focus
- [ ] Font sizes are consistent
- [ ] Font smoothing looks good
- [ ] No text rendering bugs

### Safe Area (Notch)
- [ ] Header respects safe area top
- [ ] Footer respects safe area bottom
- [ ] Mobile menu respects safe area
- [ ] No content hidden behind notch

### Scrolling
- [ ] Smooth scrolling works
- [ ] No rubber-band bounce (overscroll)
- [ ] Scroll position is maintained
- [ ] Fixed header stays fixed

### Forms
- [ ] Input focus doesn't zoom page
- [ ] Keyboard pushes content up
- [ ] Submit doesn't require double-tap
- [ ] Date pickers work natively

## 6. Android Chrome Compatibility

### Touch Response
- [ ] Tap feels immediate
- [ ] Touch-manipulation is working
- [ ] Ripple effect on buttons
- [ ] No ghost clicks

### Layout
- [ ] No layout shift on load
- [ ] Safe area padding works
- [ ] Viewport is correct
- [ ] No horizontal scroll

### Scrolling
- [ ] Smooth scrolling works
- [ ] Overscroll behavior controlled
- [ ] Scroll snapping (if used)
- [ ] Pull-to-refresh disabled

### Performance
- [ ] 60fps animations
- [ ] No jank during scroll
- [ ] Images load progressively
- [ ] Transitions are smooth

## 7. Product Card Testing

### Layout
- [ ] Grid adapts to screen size
- [ ] 1 column on mobile (<640px)
- [ ] 2 columns on small tablet (640px+)
- [ ] 3 columns on tablet (1024px+)
- [ ] 4 columns on desktop (1280px+)

### Content
- [ ] Images load correctly
- [ ] Product name visible (no overflow)
- [ ] Product code visible
- [ ] Price displays correctly
- [ ] Badge (NEW/SALE) positioned correctly

### Interaction
- [ ] Entire card is tappable
- [ ] Tap navigates to product detail
- [ ] Hover effect on desktop
- [ ] No lag on tap

## 8. Navigation Testing

### Mobile Behavior
- [ ] Desktop navigation is hidden (<1024px)
- [ ] Mobile menu is visible (<1024px)
- [ ] Hamburger menu works

### Tablet Behavior
- [ ] Desktop navigation may show
- [ ] Horizontal scroll works if needed
- [ ] Nav items are tappable

### Desktop Behavior
- [ ] Full navigation visible
- [ ] Hover states work
- [ ] Active state shows correctly
- [ ] Underline animation smooth

## 9. Form Input Testing

### Mobile
- [ ] Input height 48px
- [ ] Font size 16px (prevents zoom on iOS)
- [ ] Touch-manipulation enabled
- [ ] Keyboard doesn't hide input

### Interaction
- [ ] Tap shows focus ring
- [ ] Error states visible
- [ ] Helper text readable
- [ ] Label tappable to focus

### Keyboard
- [ ] Correct keyboard type shown
- [ ] Email: email keyboard
- [ ] Phone: numeric keyboard
- [ ] Text: standard keyboard

## 10. Performance Testing

### Load Time
- [ ] First Contentful Paint <1.5s
- [ ] Largest Contentful Paint <2.5s
- [ ] Time to Interactive <3s
- [ ] Images lazy load

### Runtime Performance
- [ ] 60fps scrolling
- [ ] Smooth animations
- [ ] No memory leaks
- [ ] No excessive re-renders

### Network
- [ ] Works on slow 3G
- [ ] Images optimized
- [ ] Code is minified
- [ ] Fonts load efficiently

## 11. Accessibility Testing

### Screen Reader
- [ ] All buttons have aria-labels
- [ ] Images have alt text
- [ ] Form labels are associated
- [ ] Landmark regions defined

### Keyboard Navigation
- [ ] Tab order is logical
- [ ] Focus visible
- [ ] Escape closes modals
- [ ] Enter submits forms

### Visual
- [ ] Color contrast sufficient (WCAG AA)
- [ ] Text is scalable
- [ ] Touch targets are large
- [ ] No reliance on color alone

## 12. Edge Cases

### Device Orientation
- [ ] Portrait mode works
- [ ] Landscape mode works
- [ ] Orientation change handled
- [ ] No layout breaks

### Extreme Screen Sizes
- [ ] iPhone SE (375px)
- [ ] iPhone Pro Max (428px)
- [ ] iPad Mini (768px)
- [ ] iPad Pro (1024px)
- [ ] Large desktop (1920px+)

### Content Edge Cases
- [ ] Very long product names
- [ ] Missing product images
- [ ] Empty states
- [ ] Loading states

### Network Edge Cases
- [ ] Slow network loading
- [ ] Failed image loads
- [ ] API timeouts
- [ ] Offline mode

## 13. Browser-Specific Testing

### iOS Safari Specific
- [ ] Modal doesn't scroll body
- [ ] Fixed positioning works
- [ ] Touch events not blocked
- [ ] Video playback inline

### Android Chrome Specific
- [ ] Chrome autofill works
- [ ] Back button behavior
- [ ] Pull-to-refresh disabled
- [ ] PWA manifest works

### Samsung Internet
- [ ] Layout is correct
- [ ] Touch events work
- [ ] Fonts load
- [ ] Colors accurate

### Firefox Mobile
- [ ] Swiper works
- [ ] Animations smooth
- [ ] Forms work
- [ ] Layout correct

## Testing Tools

### Manual Testing
- [ ] Real device testing (primary)
- [ ] Chrome DevTools device emulation
- [ ] Safari Responsive Design Mode

### Automated Testing
- [ ] Lighthouse mobile audit (>90 score)
- [ ] PageSpeed Insights mobile
- [ ] WebPageTest mobile simulation

### Debugging Tools
- [ ] Remote debugging iOS Safari
- [ ] Remote debugging Android Chrome
- [ ] Console logs on device
- [ ] Network inspector

## Success Criteria

### Must Pass (Critical)
- All touch targets minimum 48px
- Swipe gallery works smoothly
- Hamburger menu opens/closes
- iOS Safari no tap highlight
- Android Chrome fast response
- All forms usable on mobile

### Should Pass (Important)
- Typography scales appropriately
- Performance >90 Lighthouse score
- No layout shift on load
- Keyboard doesn't break layout
- Safe area respected on all devices

### Nice to Have (Enhancement)
- Haptic feedback on interactions
- Pull-to-refresh custom message
- Swipe gestures for navigation
- Progressive image loading

## Bug Report Template

```markdown
### Bug Description
[What went wrong]

### Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happened]

### Environment
- Device: [iPhone 14, Samsung Galaxy S22, etc.]
- OS: [iOS 17.2, Android 13, etc.]
- Browser: [Safari, Chrome, etc.]
- Screen Size: [375x667, etc.]

### Screenshots/Video
[Attach screenshots or video]

### Additional Context
[Any other relevant information]
```

## Notes

1. **Test on real devices** - Browser DevTools emulation is not enough
2. **Test with real users** - Different people have different interaction patterns
3. **Test under realistic conditions** - Slow networks, low battery, multitasking
4. **Document all issues** - Even minor ones can impact UX
5. **Prioritize critical paths** - Focus on most-used features first

## Test Results Summary

| Category | Pass Rate | Notes |
|----------|-----------|-------|
| Touch Targets | __/__ | |
| Swipe Gallery | __/__ | |
| Hamburger Menu | __/__ | |
| Typography | __/__ | |
| iOS Safari | __/__ | |
| Android Chrome | __/__ | |
| Product Cards | __/__ | |
| Navigation | __/__ | |
| Forms | __/__ | |
| Performance | __/__ | |
| Accessibility | __/__ | |
| Edge Cases | __/__ | |

**Overall Pass Rate: ___%**

**Date Tested:** ___________
**Tested By:** ___________
**Approved By:** ___________

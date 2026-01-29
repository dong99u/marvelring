/**
 * Image Gallery Component
 * Main image with zoom functionality and thumbnail navigation
 * Mobile: Swiper touch carousel
 * Desktop: Click-based thumbnail navigation
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import type { Swiper as SwiperType, SwiperModule } from 'swiper/types';

// Dynamic import for Swiper (client-only, reduces initial bundle)
const Swiper = dynamic(
  () => import('swiper/react').then((mod) => mod.Swiper),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-[4/5] bg-soft-ivory animate-pulse" />
    ),
  }
);

const SwiperSlide = dynamic(
  () => import('swiper/react').then((mod) => mod.SwiperSlide),
  {
    ssr: false,
  }
);

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({
  images,
  productName,
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [swiperModules, setSwiperModules] = useState<SwiperModule[] | null>(null);

  const currentImage = images[selectedIndex] || images[0];

  // Load Swiper CSS and modules dynamically
  useEffect(() => {
    const loadSwiperAssets = async () => {
      // Load CSS as side effects (suppress TS module resolution for CSS)
      await Promise.all([
        // @ts-expect-error CSS modules don't have type definitions
        import('swiper/css'),
        // @ts-expect-error CSS modules don't have type definitions
        import('swiper/css/pagination'),
        // @ts-expect-error CSS modules don't have type definitions
        import('swiper/css/navigation'),
      ]);

      // Load modules
      const modules = await import('swiper/modules');
      setSwiperModules([modules.Pagination, modules.Navigation]);
    };

    loadSwiperAssets();
  }, []);

  const handleSlideChange = (swiper: SwiperType) => {
    setSelectedIndex(swiper.activeIndex);
  };

  return (
    <>
      {/* Mobile Swiper Gallery */}
      <div className="lg:hidden lg:col-span-7 relative w-full bg-soft-ivory overflow-hidden border border-gray-100">
        {swiperModules ? (
          <Swiper
            modules={swiperModules}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-charcoal-light/30',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-gold-muted',
            }}
            onSwiper={setSwiperInstance}
            onSlideChange={handleSlideChange}
            className="w-full aspect-[4/5]"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <Image
                    src={image}
                    alt={`${productName} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="100vw"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="w-full aspect-[4/5] bg-soft-ivory animate-pulse" />
        )}

        {/* Zoom Button */}
        <button
          onClick={() => setIsZoomed(true)}
          className="absolute bottom-4 right-4 min-h-12 min-w-12 bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center rounded-full text-charcoal-light hover:text-gold-muted transition-all z-10 cursor-zoom-in"
          aria-label="Zoom image"
        >
          <span className="material-symbols-outlined text-xl">zoom_in</span>
        </button>

        {/* B2B Exclusive Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-charcoal-light text-white text-[10px] font-bold px-3 py-2 uppercase tracking-[0.2em]">
            B2B Exclusive
          </span>
        </div>
      </div>

      {/* Desktop Main Image + Thumbnails Container */}
      <div className="hidden lg:block lg:col-span-7 space-y-2">
        {/* Main Image */}
        <div className="relative group w-full h-fit bg-soft-ivory overflow-hidden border border-gray-100">
          <div className="relative w-full aspect-[4/5]">
            <Image
              src={currentImage}
              alt={`${productName} - Image ${selectedIndex + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority={selectedIndex === 0}
              sizes="(max-width: 1024px) 50vw, 58vw"
            />
          </div>

          {/* Zoom Button */}
          <button
            onClick={() => setIsZoomed(true)}
            className="absolute bottom-8 right-8 min-h-12 min-w-12 w-14 h-14 bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center rounded-full text-charcoal-light hover:text-gold-muted transition-all z-10 cursor-zoom-in"
            aria-label="Zoom image"
          >
            <span className="material-symbols-outlined text-2xl">zoom_in</span>
          </button>

          {/* B2B Exclusive Badge */}
          <div className="absolute top-8 left-8">
            <span className="bg-charcoal-light text-white text-[10px] font-bold px-4 py-2 uppercase tracking-[0.2em]">
              B2B Exclusive
            </span>
          </div>
        </div>

        {/* Thumbnail Navigation (if multiple images) */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`relative flex-shrink-0 min-h-12 min-w-12 w-20 h-20 border-2 transition-all ${
                  index === selectedIndex
                    ? 'border-gold-muted'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Image
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button
            className="absolute top-4 right-4 min-h-12 min-w-12 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            onClick={() => setIsZoomed(false)}
            aria-label="Close lightbox"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
          <div className="relative w-full max-w-5xl aspect-[4/5]">
            <Image
              src={currentImage}
              alt={`${productName} - Zoomed`}
              fill
              className="object-contain"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </div>
      )}
    </>
  );
}

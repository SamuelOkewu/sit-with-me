import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  autoPlayInterval?: number;
  className?: string;
  showPeek?: boolean;
}

export default function Carousel<T>({
  items,
  renderItem,
  autoPlayInterval = 3000,
  className,
  showPeek = false,
}: CarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const next = useCallback(() => {
    if (items.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    if (items.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (items.length > 1) {
      autoPlayRef.current = setInterval(next, autoPlayInterval);
    }
  }, [next, autoPlayInterval, items.length]);

  useEffect(() => {
    resetAutoPlay();
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [resetAutoPlay]);

  const goTo = (idx: number) => { setCurrentIndex(idx); resetAutoPlay(); };
  const handlePrev = () => { prev(); resetAutoPlay(); };
  const handleNext = () => { next(); resetAutoPlay(); };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? handleNext() : handlePrev(); }
    touchStartX.current = null;
  };

  if (items.length === 0) {
    return (
      <div className={cn('relative overflow-hidden bg-sand/10 flex items-center justify-center', className)}>
        <p className="text-ink/20 font-serif italic">Loading stories...</p>
      </div>
    );
  }

  /* ── FULL-WIDTH (hero banner) ── */
  if (!showPeek) {
    return (
      <div
        className={cn('relative overflow-hidden group', className)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, idx) => (
            <div key={idx} className="flex-shrink-0 w-full h-full">
              {renderItem(item)}
            </div>
          ))}
        </div>

        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/25 backdrop-blur-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white/40 active:scale-95"
        >
          <ChevronLeft size={22} className="text-white" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/25 backdrop-blur-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white/40 active:scale-95"
        >
          <ChevronRight size={22} className="text-white" />
        </button>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={cn('h-1.5 rounded-full transition-all duration-300', idx === currentIndex ? 'bg-white w-6' : 'bg-white/40 w-1.5')}
            />
          ))}
        </div>
      </div>
    );
  }

  /* ── PEEK mode (blog & shop) ── */
  const isMobile = containerWidth < 640;
  const peekFraction = isMobile ? 0.07 : 0.10;
  const gap = isMobile ? 12 : 24;
  const itemWidth = containerWidth > 0 ? containerWidth * (1 - 2 * peekFraction) : 300;
  const startOffset = containerWidth > 0 ? containerWidth * peekFraction : 0;
  const trackX = -(currentIndex * (itemWidth + gap)) + startOffset;

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex items-center h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(${trackX}px)`, gap: `${gap}px`, willChange: 'transform' }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 h-full flex items-center justify-center transition-opacity duration-500"
            style={{
              width: `${itemWidth}px`,
              opacity: idx === currentIndex ? 1 : 0.55,
              pointerEvents: idx === currentIndex ? 'auto' : 'none',
            }}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>

      <button
        onClick={handlePrev}
        aria-label="Previous"
        className="absolute left-1.5 md:left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 shadow-md hover:bg-white active:scale-95 transition-colors"
      >
        <ChevronLeft size={16} className="text-ink" />
      </button>
      <button
        onClick={handleNext}
        aria-label="Next"
        className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 shadow-md hover:bg-white active:scale-95 transition-colors"
      >
        <ChevronRight size={16} className="text-ink" />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to item ${idx + 1}`}
            className={cn('h-1.5 rounded-full transition-all duration-300', idx === currentIndex ? 'bg-ink w-6' : 'bg-ink/20 w-1.5')}
          />
        ))}
      </div>
    </div>
  );
}

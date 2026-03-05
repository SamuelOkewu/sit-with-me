/**
 * SmartImage
 * Automatically detects whether an image is portrait or landscape
 * and applies the appropriate CSS so nothing is cropped incorrectly.
 *
 * If the image metadata (width/height) is already available (e.g. from
 * Sanity), pass them in to skip the onLoad detection entirely.
 */
import React, { useState, useRef, ImgHTMLAttributes } from 'react';
import { cn } from '../lib/utils';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** Pre-known natural width (e.g. from Sanity metadata). */
  naturalWidth?: number;
  /** Pre-known natural height (e.g. from Sanity metadata). */
  naturalHeight?: number;
  /** Extra classes applied to the outer wrapper div. */
  containerClassName?: string;
   className?: string;
}

export default function SmartImage({
  src,
  alt,
  naturalWidth,
  naturalHeight,
  className,
  containerClassName,
  ...rest
}: SmartImageProps) {
  // Initialise from props if available, otherwise detect on load
  const initialPortrait =
    naturalWidth != null && naturalHeight != null
      ? naturalHeight > naturalWidth
      : null;

  const [isPortrait, setIsPortrait] = useState<boolean | null>(initialPortrait);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoad = () => {
    if (isPortrait !== null) return; // already known
    if (imgRef.current) {
      const { naturalWidth: w, naturalHeight: h } = imgRef.current;
      setIsPortrait(h > w);
    }
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center overflow-hidden bg-sand/10',
        containerClassName
      )}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={handleLoad}
        className={cn(
          'transition-all duration-300',
          // Portrait → show full height, no crop
          // Landscape / unknown → cover the container
          isPortrait === true
            ? 'h-full w-auto max-w-full object-contain'
            : 'w-full h-full object-cover',
          className
        )}
        {...rest}
      />
    </div>
  );
}


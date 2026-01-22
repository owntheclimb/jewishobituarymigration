'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onError'> {
  fallback?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  showSkeleton?: boolean;
}

const aspectRatioClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  auto: '',
};

/**
 * OptimizedImage - A wrapper around Next.js Image with:
 * - Automatic loading skeleton
 * - Error fallback handling
 * - Blur placeholder support
 * - Aspect ratio presets
 */
export function OptimizedImage({
  src,
  alt,
  fallback = '/placeholder-image.jpg',
  aspectRatio = 'auto',
  showSkeleton = true,
  className,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const imageSrc = error ? fallback : src;

  return (
    <div className={cn('relative overflow-hidden', aspectRatioClasses[aspectRatio], className)}>
      {showSkeleton && isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      <Image
        src={imageSrc}
        alt={alt}
        className={cn(
          'object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
        {...props}
      />
    </div>
  );
}

/**
 * Avatar with optimized loading
 */
export function OptimizedAvatar({
  src,
  alt,
  size = 40,
  fallbackInitials,
  className,
}: {
  src?: string | null;
  alt: string;
  size?: number;
  fallbackInitials?: string;
  className?: string;
}) {
  const [error, setError] = useState(false);

  if (!src || error) {
    // Show initials fallback
    const initials = fallbackInitials || alt.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    return (
      <div
        className={cn(
          'rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium',
          className
        )}
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn('rounded-full object-cover', className)}
      onError={() => setError(true)}
    />
  );
}

/**
 * Background image with lazy loading
 */
export function LazyBackgroundImage({
  src,
  alt,
  children,
  className,
  overlayClassName,
}: {
  src: string;
  alt: string;
  children?: React.ReactNode;
  className?: string;
  overlayClassName?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(
          'object-cover transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        onLoad={() => setIsLoaded(true)}
        priority={false}
      />
      {overlayClassName && <div className={cn('absolute inset-0', overlayClassName)} />}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default OptimizedImage;

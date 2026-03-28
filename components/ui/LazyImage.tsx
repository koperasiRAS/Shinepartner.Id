"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  blurDataURL?: string;
}

/**
 * Optimized image component with lazy loading
 * - Uses Next.js Image component for automatic optimization
 * - Supports blur placeholder
 * - Priority loading for above-fold images
 */
export function LazyImage({
  src,
  alt,
  width,
  height,
  fill,
  className,
  priority = false,
  sizes,
  blurDataURL,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate a simple blur placeholder if not provided
  const placeholder = blurDataURL || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWRlZGVkZSIvPjwvc3ZnPg==";

  if (hasError) {
    return (
      <div
        className={cn(
          "bg-gray-100 flex items-center justify-center",
          fill ? "absolute inset-0" : "",
          className
        )}
        style={!fill ? { width, height } : undefined}
      >
        <svg
          className="w-12 h-12 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Blur placeholder */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          isLoaded ? "opacity-0" : "opacity-100"
        )}
        style={{
          backgroundImage: `url(${placeholder})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(10px)",
          transform: "scale(1.1)",
        }}
      />

      <Image
        src={src}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        priority={priority}
        sizes={sizes}
        className={cn(
          "transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
}

/**
 * Blur hash placeholder generator
 * Simple implementation for blur placeholders
 */
export function generateBlurPlaceholder(
  dominantColor: string = "#1f3d2b"
): string {
  // Generate a simple SVG placeholder with the dominant color
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
      <rect width="8" height="8" fill="${dominantColor}"/>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

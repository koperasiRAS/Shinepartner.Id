"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  onLoad?: () => void;
}

/**
 * Lazy loading video component
 * - Video loads only when it enters the viewport
 * - Supports poster image for initial display
 * - Reduces initial page load by deferring video loading
 */
export function LazyVideo({
  src,
  poster,
  className,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  onLoad,
}: LazyVideoProps) {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "100px", // Start loading 100px before entering viewport
        threshold: 0,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.load();
    }
  }, [isInView]);

  const handleLoadedData = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      {/* Poster / Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse" />
      )}

      {/* Video element - only has src when in view */}
      <video
        ref={videoRef}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        poster={poster}
        onLoadedData={handleLoadedData}
        // Only add src when in view to prevent loading
        {...(isInView ? { src } : {})}
        // Preload none until in view
        preload={isInView ? "auto" : "none"}
      />
    </div>
  );
}

/**
 * Video background component with overlay
 * - Optimized for hero sections
 * - Falls back gracefully if video doesn't load
 */
export function VideoBackground({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (hasError) {
    // Fallback gradient background
    return (
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-primary-dark/60 via-primary/40 to-primary-light/30",
          className
        )}
      />
    );
  }

  return (
    <div ref={containerRef} className={cn("absolute inset-0", className)}>
      {/* Fallback gradient while loading or on error */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/60 via-primary/40 to-primary-light/30" />

      {isInView && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster={poster}
          onError={() => setHasError(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

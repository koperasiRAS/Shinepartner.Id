"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LazyIframeProps {
  src: string;
  title: string;
  className?: string;
  aspectRatio?: "16:9" | "4:3" | "1:1" | string;
  thumbnail?: string;
  playIcon?: boolean;
}

/**
 * Lazy loading iframe component for embedded content
 * - Loads iframe only when it enters the viewport
 * - Shows thumbnail with play button until loaded
 * - Reduces initial page load by deferring iframe loading
 */
export function LazyIframe({
  src,
  title,
  className,
  aspectRatio = "16:9",
  thumbnail,
  playIcon = true,
}: LazyIframeProps) {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
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
        rootMargin: "100px",
        threshold: 0,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Parse aspect ratio
  const [ratioWidth, ratioHeight] = aspectRatio.split(":").map(Number);
  const paddingBottom = `${(ratioHeight / ratioWidth) * 100}%`;

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden rounded-2xl bg-gray-100", className)}
      style={{ paddingBottom }}
    >
      {/* Thumbnail / Loading state */}
      {!isLoaded && thumbnail && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${thumbnail})` }}
        >
          {playIcon && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <button
                onClick={() => setIsInView(true)}
                className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                aria-label={`Play ${title}`}
              >
                <svg
                  className="w-8 h-8 text-primary ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Loading indicator */}
      {!isLoaded && !thumbnail && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {/* Iframe - only renders when in view */}
      {isInView && (
        <iframe
          src={src}
          title={title}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}
    </div>
  );
}

/**
 * YouTube embed with lazy loading
 * Automatically constructs the embed URL from video ID
 */
export function YouTubeEmbed({
  videoId,
  title,
  className,
  startTime,
}: {
  videoId: string;
  title: string;
  className?: string;
  startTime?: number;
}) {
  let embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
  if (startTime) {
    embedUrl += `&start=${startTime}`;
  }

  return (
    <LazyIframe
      src={embedUrl}
      title={title}
      className={className}
      thumbnail={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
    />
  );
}

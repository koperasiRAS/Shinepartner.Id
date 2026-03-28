/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    domains: [
      "lh3.googleusercontent.com", // Google avatars
      "images.unsplash.com",
    ],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
    // Image optimization settings
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compiler options for performance
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Security headers
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/:path*",
        headers: [
          // Prevent DNS prefetch
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          // Prevent clickjacking
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // Prevent MIME type sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Control referrer information
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // XSS Protection (legacy, but still useful)
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Permissions Policy
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Strict CSP for API routes
        source: "/api/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob:",
              "font-src 'self'",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "form-action 'self'",
              "base-uri 'self'",
            ].join("; "),
          },
        ],
      },
      {
        // Cache control for static assets
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Enable strict mode for React
  reactStrictMode: true,

  // Production-only settings
  poweredByHeader: false,

  // Compress responses
  compress: true,

  // Experimental features for performance
  experimental: {
    // Optimize package imports - reduces bundle size by tree-shaking unused exports
    optimizePackageImports: ["lucide-react", "framer-motion", "@supabase/supabase-js"],
  },
};

module.exports = nextConfig;

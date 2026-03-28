import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60; // 60 requests per minute

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now - value.timestamp > RATE_LIMIT_WINDOW * 2) {
      rateLimitStore.delete(key);
    }
  }
}, RATE_LIMIT_WINDOW * 2);

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return ip;
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitStore.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count++;
  return true;
}

// Suspicious patterns to block
const SUSPICIOUS_PATTERNS = [
  /<script/i,
  /javascript:/i,
  /on\w+=/i,
  /<iframe/i,
  /<embed/i,
  /<object/i,
  /eval\(/i,
  /expression\(/i,
  /url\(/i,
];

function containsSuspiciousContent(request: NextRequest): boolean {
  // Check query parameters
  const queryString = request.nextUrl.search;
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(queryString)) {
      return true;
    }
  }

  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".") // Static files
  ) {
    return NextResponse.next();
  }

  // API routes rate limiting
  if (pathname.startsWith("/api/")) {
    const ip = getClientIP(request);

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: "Terlalu banyak permintaan. Silakan coba lagi nanti.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
          },
        }
      );
    }

    // Check for suspicious content
    if (containsSuspiciousContent(request)) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: "Permintaan tidak valid.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }

  // Add security headers to all responses
  const response = NextResponse.next();

  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|_next).*)",
  ],
};

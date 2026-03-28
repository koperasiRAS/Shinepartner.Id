import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "@/lib/booking-service";
import { bookingSchema } from "@/lib/schemas";
import { sanitizeInput, isValidName } from "@/lib/utils";

// Rate limiting map (simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : "unknown";
  return ip;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(key, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now - value.timestamp > RATE_LIMIT_WINDOW * 2) {
      rateLimitMap.delete(key);
    }
  }
}, RATE_LIMIT_WINDOW * 2);

// Suspicious patterns for content validation
const SUSPICIOUS_PATTERNS = [
  /<script/i,
  /javascript:/i,
  /on\w+=/i,
  /<iframe/i,
  /http:/i,
  /https:/i,
];

function containsSuspiciousContent(data: Record<string, unknown>): boolean {
  for (const value of Object.values(data)) {
    if (typeof value === "string") {
      for (const pattern of SUSPICIOUS_PATTERNS) {
        if (pattern.test(value)) {
          return true;
        }
      }
    }
  }
  return false;
}

// Honeypot field names to check
const HONEYPOT_FIELDS = ["website", "url", "homepage", "fax"];

function isHoneypotFilled(body: Record<string, unknown>): boolean {
  for (const field of HONEYPOT_FIELDS) {
    if (body[field] && typeof body[field] === "string" && (body[field] as string).length > 0) {
      return true;
    }
  }
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const rateLimitKey = getRateLimitKey(request);
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        {
          success: false,
          error: "Terlalu banyak permintaan. Silakan coba lagi dalam beberapa menit.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check - reject if filled
    if (isHoneypotFilled(body)) {
      // Return success to not alert bots, but don't actually process
      return NextResponse.json(
        { success: true, message: "Pemesanan berhasil dibuat" },
        { status: 201 }
      );
    }

    // Suspicious content check
    if (containsSuspiciousContent(body)) {
      return NextResponse.json(
        {
          success: false,
          error: "Permintaan tidak valid.",
        },
        { status: 400 }
      );
    }

    // Validate request body with Zod
    const validationResult = bookingSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          error: "Validasi gagal",
          errors,
        },
        { status: 400 }
      );
    }

    const { name, phone, event_date, location } = validationResult.data;

    // Validate name contains only allowed characters
    if (!isValidName(name)) {
      return NextResponse.json(
        {
          success: false,
          error: "Nama tidak valid. Hanya huruf dan spasi yang diizinkan.",
        },
        { status: 400 }
      );
    }

    // Server-side sanitization
    const sanitizedData = {
      name: sanitizeInput(name),
      phone: sanitizeInput(phone),
      event_date: event_date,
      location: sanitizeInput(location),
    };

    // Create booking
    const result = await createBooking({
      ...sanitizedData,
      service: body.service || "Unknown",
      package: body.package || "Unknown",
    });

    if (!result.success) {
      if (result.duplicate) {
        return NextResponse.json(
          { success: false, error: result.error, duplicate: true },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        booking: result.booking,
        message: "Pemesanan berhasil dibuat",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Terjadi kesalahan server. Silakan coba lagi.",
      },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch bookings (requires admin authentication in production)
export async function GET(request: NextRequest) {
  // In production, add authentication check here
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET || "admin-secret"}`) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { getBookings } = await import("@/lib/booking-service");
    const bookings = await getBookings();

    return NextResponse.json({
      success: true,
      bookings,
      count: bookings.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

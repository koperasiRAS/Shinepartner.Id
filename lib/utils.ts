import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind class merging utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Currency formatting
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Date formatting
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatShortDate(date: string | Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

// WhatsApp link generation
export function generateWhatsAppLink(
  phone: string,
  message: string
): string {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

// Slug generation
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// String truncation
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

// ============================================================================
// SECURITY: Input Sanitization
// ============================================================================

// Dangerous patterns to remove
const DANGEROUS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
  /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
  /<embed\b[^>]*>/gi,
  /<link\b[^>]*>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  /data:/gi,
  /vbscript:/gi,
  /expression\s*\(/gi,
  /url\s*\(/gi,
];

// HTML entities mapping
const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
};

/**
 * Sanitize user input to prevent XSS attacks
 * - Removes dangerous HTML tags
 * - Escapes HTML special characters
 * - Trims whitespace
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  let sanitized = input;

  // Remove dangerous patterns first
  for (const pattern of DANGEROUS_PATTERNS) {
    sanitized = sanitized.replace(pattern, "");
  }

  // Escape HTML special characters
  sanitized = sanitized
    .replace(/[&<>"'/]/g, (char) => HTML_ENTITIES[char] || char)
    .trim();

  // Limit length
  return sanitized.slice(0, 1000);
}

/**
 * Sanitize for display in HTML context
 */
export function sanitizeForHTML(input: string): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

/**
 * Sanitize for URL context
 */
export function sanitizeForURL(input: string): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  return encodeURIComponent(input)
    .replace(/%(2[0-9]|5[Cc]|3[0-9])/g, decodeURIComponent)
    .slice(0, 500);
}

/**
 * Sanitize for plain text (for WhatsApp messages)
 */
export function sanitizeForPlainText(input: string): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  return input
    // Remove HTML tags
    .replace(/<[^>]*>/g, "")
    // Remove script-like content
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    // Remove extra whitespace
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 500);
}

// ============================================================================
// VALIDATION
// ============================================================================

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

export function isValidDate(date: string): boolean {
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate >= today;
}

// ============================================================================
// UTILITIES
// ============================================================================

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Generate a random token for form submission
 */
export function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/**
 * Check if input contains only allowed characters
 */
export function containsOnlyAllowedChars(input: string, allowedRegex: RegExp): boolean {
  return allowedRegex.test(input);
}

/**
 * Name validation (letters, spaces, hyphens, apostrophes)
 */
export function isValidName(name: string): boolean {
  return /^[a-zA-Z\s'-]{2,100}$/.test(name);
}

import { supabase, isSupabaseConfigured } from "./supabase";
import type { Booking } from "./types";
import { sanitizeInput } from "./utils";

const STORAGE_KEY = "shinepartner_bookings";

// Generate a unique ID
function generateId(): string {
  return `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Check for duplicate booking (same name, phone, event_date within 5 minutes)
function isDuplicate(
  existingBookings: Booking[],
  newBooking: Partial<Booking>
): Booking | null {
  const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;

  return (
    existingBookings.find((booking) => {
      const createdAt = new Date(booking.created_at || 0).getTime();
      return (
        createdAt > fiveMinutesAgo &&
        booking.name.toLowerCase() === newBooking.name?.toLowerCase() &&
        booking.phone === newBooking.phone &&
        booking.event_date === newBooking.event_date
      );
    }) || null
  );
}

// Local storage operations
function getLocalBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveLocalBooking(booking: Booking): void {
  if (typeof window === "undefined") return;
  const bookings = getLocalBookings();
  bookings.push(booking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

// Get unavailable dates (dates with confirmed bookings)
export async function getUnavailableDates(): Promise<string[]> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("bookings")
        .select("event_date")
        .eq("status", "confirmed");

      if (error) throw error;
      return (data || []).map((b) => b.event_date);
    }

    // Fallback to local storage
    const bookings = getLocalBookings();
    return bookings
      .filter((b) => b.status === "confirmed")
      .map((b) => b.event_date);
  } catch (error) {
    console.error("Error fetching unavailable dates:", error);
    return [];
  }
}

// Create a new booking
export async function createBooking(
  bookingData: Omit<Booking, "id" | "status" | "created_at">
): Promise<{ success: boolean; booking?: Booking; error?: string; duplicate?: boolean }> {
  try {
    const sanitizedData = {
      name: sanitizeInput(bookingData.name),
      phone: sanitizeInput(bookingData.phone),
      service: sanitizeInput(bookingData.service),
      package: sanitizeInput(bookingData.package),
      event_date: bookingData.event_date,
      location: sanitizeInput(bookingData.location),
    };

    // Check for duplicates first
    if (isSupabaseConfigured && supabase) {
      const { data: existing } = await supabase
        .from("bookings")
        .select("*")
        .eq("phone", sanitizedData.phone)
        .eq("event_date", sanitizedData.event_date)
        .gt("created_at", new Date(Date.now() - 5 * 60 * 1000).toISOString());

      if (existing && existing.length > 0) {
        return {
          success: false,
          error: "Pemesanan duplikat terdeteksi",
          duplicate: true,
        };
      }
    } else {
      const localBookings = getLocalBookings();
      const duplicate = isDuplicate(localBookings, sanitizedData);
      if (duplicate) {
        return {
          success: false,
          error: "Pemesanan duplikat terdeteksi",
          duplicate: true,
        };
      }
    }

    const newBooking: Booking = {
      ...sanitizedData,
      id: generateId(),
      status: "pending",
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("bookings")
        .insert([newBooking])
        .select()
        .single();

      if (error) throw error;
      return { success: true, booking: data };
    }

    // Fallback to local storage
    saveLocalBooking(newBooking);
    return { success: true, booking: newBooking };
  } catch (error) {
    console.error("Error creating booking:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Terjadi kesalahan",
    };
  }
}

// Get all bookings (admin only - server-side only)
export async function getBookings(): Promise<Booking[]> {
  if (!isSupabaseConfigured || !supabase) {
    return getLocalBookings();
  }

  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
}

// Update booking status
export async function updateBookingStatus(
  id: string,
  status: Booking["status"]
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    // Update local storage
    const bookings = getLocalBookings();
    const index = bookings.findIndex((b) => b.id === id);
    if (index !== -1) {
      bookings[index].status = status;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    }
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Terjadi kesalahan",
    };
  }
}

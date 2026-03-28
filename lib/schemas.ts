import { z } from "zod";

export const bookingSchema = z.object({
  name: z
    .string()
    .min(3, "Nama minimal 3 karakter")
    .max(100, "Nama maksimal 100 karakter")
    .regex(/^[a-zA-Z\s']+$/, "Nama hanya boleh berisi huruf dan spasi")
    .trim(),
  phone: z
    .string()
    .min(9, "Nomor WhatsApp minimal 9 digit")
    .max(15, "Nomor WhatsApp maksimal 15 digit")
    .regex(/^(\+62|62|0)[0-9]{9,12}$/, "Format nomor WhatsApp tidak valid (contoh: 081234567890)")
    .trim(),
  event_date: z
    .string()
    .min(1, "Tanggal acara harus diisi")
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, "Tanggal tidak boleh kurang dari hari ini"),
  location: z
    .string()
    .min(5, "Lokasi minimal 5 karakter")
    .max(200, "Lokasi maksimal 200 karakter")
    .trim(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

// Contact form schema (for general inquiries)
export const contactSchema = z.object({
  name: z
    .string()
    .min(3, "Nama minimal 3 karakter")
    .max(100, "Nama maksimal 100 karakter")
    .trim(),
  email: z
    .string()
    .email("Format email tidak valid")
    .or(z.literal("")),
  phone: z
    .string()
    .min(9, "Nomor WhatsApp minimal 9 digit")
    .max(15, "Nomor WhatsApp maksimal 15 digit")
    .regex(/^(\+62|62|0)[0-9]{9,12}$/, "Format nomor WhatsApp tidak valid")
    .trim(),
  message: z
    .string()
    .min(10, "Pesan minimal 10 karakter")
    .max(1000, "Pesan maksimal 1000 karakter")
    .trim(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Honeymoon/Destination inquiry schema
export const travelInquirySchema = z.object({
  name: z
    .string()
    .min(3, "Nama minimal 3 karakter")
    .max(100, "Nama maksimal 100 karakter")
    .trim(),
  phone: z
    .string()
    .min(9, "Nomor WhatsApp minimal 9 digit")
    .max(15, "Nomor WhatsApp maksimal 15 digit")
    .regex(/^(\+62|62|0)[0-9]{9,12}$/, "Format nomor WhatsApp tidak valid")
    .trim(),
  travel_type: z.enum(["honeymoon", "destination_wedding", "tour_guide"], {
    required_error: "Pilih jenis layanan travel",
  }),
  destination: z
    .string()
    .min(2, "Destinasi minimal 2 karakter")
    .max(100, "Destinasi maksimal 100 karakter")
    .optional(),
  estimated_date: z
    .string()
    .optional(),
  budget: z
    .string()
    .optional(),
  message: z
    .string()
    .min(10, "Pesan minimal 10 karakter")
    .max(1000, "Pesan maksimal 1000 karakter")
    .trim(),
});

export type TravelInquiryData = z.infer<typeof travelInquirySchema>;

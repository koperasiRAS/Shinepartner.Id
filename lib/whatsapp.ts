import { formatCurrency, formatShortDate, sanitizeInput } from "./utils";
import type { Booking } from "./types";
import type { Package } from "./data";

// WhatsApp configuration
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6282138016904";
const COMPANY_NAME = "Shinepartner";
const COMPANY_TAGLINE = "Your Wedding, Perfectly Managed";

// Generate booking reference code
export function generateBookingReference(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SP-${timestamp.slice(-4)}${random}`;
}

// Format phone number for WhatsApp
export function formatWhatsAppPhone(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "");

  // Convert to international format
  if (digits.startsWith("0")) {
    return "62" + digits.slice(1);
  }
  if (digits.startsWith("62")) {
    return digits;
  }
  return digits;
}

// Generate WhatsApp link
export function generateWhatsAppLink(
  message: string,
  phone: string = WHATSAPP_NUMBER
): string {
  const formattedPhone = formatWhatsAppPhone(phone);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
}

// Booking inquiry message — FROM client TO admin
export function createBookingMessage(
  packageData: Package,
  formData: {
    name: string;
    phone: string;
    event_date: string;
    location: string;
  }
): string {
  const categoryLabels: Record<string, string> = {
    "content-creator": "Content Creator",
    organizer: "Wedding Organizer",
    planner: "Wedding Planner",
    "bride-assist": "Bride Assistant",
    "add-on": "Add-On",
  };

  const serviceLabel = categoryLabels[packageData.category] || packageData.category;

  return `Halo! Perkenalkan nama saya ${sanitizeInput(formData.name)}, saya ingin booking paket berikut:

🎁 Paket: ${packageData.name}
📂 Kategori: ${serviceLabel}
💰 Estimasi Harga: ${formatCurrency(packageData.price)}
📅 Tanggal: ${formatShortDate(formData.event_date)}
📍 Lokasi: ${sanitizeInput(formData.location)}

No. HP saya: ${sanitizeInput(formData.phone)}

Mohon dapat divalidasi dan diinformasikan lebih lanjut. Terima kasih! 🙏`;
}

// General inquiry message
export function createInquiryMessage(
  formData: {
    name: string;
    phone: string;
    message: string;
  }
): string {
  return `Halo! Perkenalkan nama saya ${sanitizeInput(formData.name)}.

Pertanyaan saya:
${sanitizeInput(formData.message)}

No. HP saya: ${sanitizeInput(formData.phone)}

Mohon informasinya. Terima kasih! 🙏`;
}

// Travel inquiry message
export function createTravelInquiryMessage(
  formData: {
    name: string;
    phone: string;
    travelType: string;
    destination?: string;
    message?: string;
  }
): string {
  const travelTypes: Record<string, string> = {
    honeymoon: "Honeymoon Trip",
    destination_wedding: "Destination Wedding",
    tour_guide: "Private Tour Guide",
  };

  let msg = `Halo! Perkenalkan nama saya ${sanitizeInput(formData.name)}.

✈️ Jenis Layanan: ${travelTypes[formData.travelType] || formData.travelType}`;
  if (formData.destination) msg += `\n🌍 Destinasi: ${sanitizeInput(formData.destination)}`;
  if (formData.message) msg += `\n💬 Pesan: ${sanitizeInput(formData.message)}`;
  msg += `\n\nNo. HP saya: ${sanitizeInput(formData.phone)}\n\nMohon infonya. Terima kasih! 🌍`;

  return msg;
}

// Booking confirmation message (for admin to send)
export function createConfirmationMessage(
  booking: Booking,
  bookingReference: string
): string {
  return `━━━━━━━━━━━━━━━━━━━━━━
*${COMPANY_NAME}*
_Pesanan Anda Dikonfirmasi!_ ✅
━━━━━━━━━━━━━━━━━━━━━━

*Halo ${sanitizeInput(booking.name)}!* 🎉

Selamat! Pesanan Anda telah kami terima dan konfirmasi.

*Detail Pesanan:*
━━━━━━━━━━━━━━━━━━━━━━
🔖 Ref: ${bookingReference}
📅 Tanggal: ${formatShortDate(booking.event_date)}
📍 Lokasi: ${sanitizeInput(booking.location)}
🎁 Paket: ${sanitizeInput(booking.package)}
💰 Status: Menunggu Pembayaran
━━━━━━━━━━━━━━━━━━━━━━

*Langkah Selanjutnya:*
1. Mohon lakukan pembayaran sesuai paket
2. Kirim bukti pembayaran ke nomor ini
3. Kami akan konfirmasi setelah pembayaran diterima

*Metode Pembayaran:*
BCA: 123456789 (a.n. Shinepartner)
OVO/Dana: 082138016904

Terima kasih telah mempercayakan momen spesial Anda kepada kami! 💚

Salam hangat,
*Tim ${COMPANY_NAME}*
`;
}

// Reminder message template
export function createReminderMessage(booking: Booking): string {
  return `━━━━━━━━━━━━━━━━━━━━━━
*${COMPANY_NAME}*
_Reminder - H-3 Acara_ 📅
━━━━━━━━━━━━━━━━━━━━━━

*Halo ${sanitizeInput(booking.name)}!* 👋

Hanya *3 hari lagi* menuju hari spesial Anda!

*Detail acara:*
📅 Tanggal: ${formatShortDate(booking.event_date)}
📍 Lokasi: ${sanitizeInput(booking.location)}
🎁 Paket: ${sanitizeInput(booking.package)}

*Pastikan semuanya siap:*
✅ Konfirmasi vendor
✅ Siapkan dokumen
✅ Atur transportasi
✅ Nikmati momen Anda! 💚

Jika ada pertanyaan, jangan ragu untuk menghubungi kami.

Salam,
*Tim ${COMPANY_NAME}*
`;
}

// Thank you message after booking
export function createThankYouMessage(bookingReference: string): string {
  return `━━━━━━━━━━━━━━━━━━━━━━
*${COMPANY_NAME}*
_Pesanan Terkirim!_ ✉️
━━━━━━━━━━━━━━━━━━━━━━

Terima kasih! 🙏

Pesanan Anda telah kami terima dan sedang dalam proses review.

🔖 *Booking Reference:* ${bookingReference}

Kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi.

Jika butuh bantuan segera:
📱 WhatsApp: wa.me/${WHATSAPP_NUMBER}

Salam,
*Tim ${COMPANY_NAME}* 💚
`;
}

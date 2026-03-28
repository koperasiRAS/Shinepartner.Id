import { jsPDF } from "jspdf";
import { formatCurrency, formatDate, sanitizeInput } from "./utils";
import type { Package } from "./data";

interface InvoiceData {
  clientName: string;
  phone: string;
  eventDate: string;
  location: string;
  packageName: string;
  packageCategory: string;
  price: number;
  bookingReference: string;
  bookingDate?: string;
}

// Brand colors
const COLORS = {
  primary: [31, 61, 43] as [number, number, number], // #1f3d2b
  accent: [198, 167, 105] as [number, number, number], // #C6A769
  dark: [21, 42, 29] as [number, number, number], // #152a1d
  white: [255, 255, 255] as [number, number, number],
  gray: [100, 100, 100] as [number, number, number],
  lightGray: [240, 240, 240] as [number, number, number],
};

export async function generateInvoice(data: InvoiceData): Promise<Blob> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = margin;

  // Load brand logo
  let logoDataUrl: string | null = null;
  try {
    const res = await fetch("/invoice-logo.jpeg");
    const blob = await res.blob();
    logoDataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    // Logo not available, skip
  }

  // Header Background
  doc.setFillColor(...COLORS.primary);
  doc.rect(0, 0, pageWidth, logoDataUrl ? 52 : 60, "F");

  // Brand Logo
  if (logoDataUrl) {
    doc.addImage(logoDataUrl, "JPEG", pageWidth / 2 - 8, 6, 16, 16);
  }

  // Company Name
  doc.setTextColor(...COLORS.white);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("SHINEPARTNER", pageWidth / 2, logoDataUrl ? 30 : 25, { align: "center" });

  // Tagline
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Your Wedding, Perfectly Managed", pageWidth / 2, logoDataUrl ? 40 : 35, { align: "center" });

  // Website
  doc.setFontSize(9);
  doc.text("shinepartner.id", pageWidth / 2, logoDataUrl ? 50 : 45, { align: "center" });

  yPos = logoDataUrl ? 65 : 75;

  // Invoice Title
  doc.setTextColor(...COLORS.primary);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", pageWidth / 2, yPos, { align: "center" });

  yPos += 5;

  // Decorative line
  doc.setDrawColor(...COLORS.accent);
  doc.setLineWidth(1);
  doc.line(margin + 60, yPos, pageWidth - margin - 60, yPos);

  yPos += 15;

  // Booking Reference & Date Section
  doc.setFillColor(...COLORS.lightGray);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 25, 3, 3, "F");

  yPos += 10;

  // Left column - Booking Info
  doc.setTextColor(...COLORS.gray);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("BOOKING REFERENCE", margin + 8, yPos);
  doc.text("BOOKING DATE", margin + 8, yPos + 10);

  // Right column - Values
  doc.setTextColor(...COLORS.primary);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(data.bookingReference, pageWidth - margin - 8, yPos, { align: "right" });
  doc.text(data.bookingDate || formatDate(new Date().toISOString()), pageWidth - margin - 8, yPos + 10, { align: "right" });

  yPos += 35;

  // Client Information
  doc.setTextColor(...COLORS.primary);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("BILL TO", margin, yPos);

  yPos += 7;

  doc.setTextColor(...COLORS.dark);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(sanitizeInput(data.clientName), margin, yPos);
  doc.text(sanitizeInput(data.phone), margin, yPos + 6);

  yPos += 20;

  // Event Details Box
  doc.setFillColor(...COLORS.primary);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 30, 3, 3, "F");

  doc.setTextColor(...COLORS.white);
  doc.setFontSize(9);

  // Event date
  doc.text("EVENT DATE", pageWidth / 2, yPos + 8, { align: "center" });
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(formatDate(data.eventDate), pageWidth / 2, yPos + 16, { align: "center" });

  // Location
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("LOCATION", pageWidth / 2, yPos + 24, { align: "center" });
  doc.setFontSize(10);
  doc.text(sanitizeInput(data.location), pageWidth / 2, yPos + 30, { align: "center" });

  yPos += 45;

  // Order Details Table Header
  doc.setFillColor(...COLORS.primary);
  doc.rect(margin, yPos, pageWidth - margin * 2, 10, "F");

  doc.setTextColor(...COLORS.white);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("SERVICE", margin + 5, yPos + 7);
  doc.text("PACKAGE", 90, yPos + 7);
  doc.text("PRICE", pageWidth - margin - 5, yPos + 7, { align: "right" });

  yPos += 10;

  // Table Content
  doc.setTextColor(...COLORS.dark);
  doc.setFont("helvetica", "normal");

  // Service name
  const serviceNames: Record<string, string> = {
    "content-creator": "Wedding Content Creator",
    "planner": "Wedding Planner",
    "organizer": "Wedding Organizer",
  };

  doc.text(serviceNames[data.packageCategory] || data.packageCategory, margin + 5, yPos + 6);
  doc.text(sanitizeInput(data.packageName), 90, yPos + 6);
  doc.setFont("helvetica", "bold");
  doc.text(formatCurrency(data.price), pageWidth - margin - 5, yPos + 6, { align: "right" });

  yPos += 15;

  // Divider line
  doc.setDrawColor(...COLORS.lightGray);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);

  yPos += 10;

  // Total
  doc.setFillColor(...COLORS.accent);
  doc.roundedRect(120, yPos - 5, pageWidth - margin - 120, 18, 2, 2, "F");

  doc.setTextColor(...COLORS.primary);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("TOTAL", 130, yPos + 4);
  doc.setFontSize(14);
  doc.text(formatCurrency(data.price), pageWidth - margin - 5, yPos + 4, { align: "right" });

  yPos += 25;

  // Terms & Conditions
  doc.setTextColor(...COLORS.primary);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Terms & Conditions", margin, yPos);

  yPos += 7;

  doc.setTextColor(...COLORS.gray);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  const terms = [
    "1. Booking akan dikonfirmasi setelah pembayaran dp sebesar 50% diterima.",
    "2. Pelunasan dilakukan H-7 sebelum hari acara.",
    "3. Pembatalan: H-30 = 75% refund, H-14 = 50% refund, H-7 = 25% refund.",
    "4. Harga dapat berubah sewaktu-waktu tanpa pemberitahuan terlebih dahulu.",
    "5. Include 1x revisi untuk konten digital invitation.",
  ];

  terms.forEach((term) => {
    doc.text(term, margin, yPos);
    yPos += 5;
  });

  yPos += 10;

  // Payment Information
  doc.setTextColor(...COLORS.primary);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Payment Information", margin, yPos);

  yPos += 7;

  doc.setTextColor(...COLORS.gray);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Bank BCA: 1234567890 (a.n. Shinepartner)", margin, yPos);
  yPos += 5;
  doc.text("OVO/Dana: 082138016904", margin, yPos);

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 25;

  doc.setFillColor(...COLORS.primary);
  doc.rect(0, footerY - 10, pageWidth, 35, "F");

  doc.setTextColor(...COLORS.white);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Hubungi Kami", pageWidth / 2, footerY, { align: "center" });

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("WhatsApp: +62 821 3801 6904", pageWidth / 2, footerY + 7, { align: "center" });
  doc.text("Instagram: @shinepartner.id", pageWidth / 2, footerY + 14, { align: "center" });
  doc.text("TikTok: @shinepartner.id", pageWidth / 2, footerY + 21, { align: "center" });

  // Generate blob
  return doc.output("blob");
}

export async function downloadInvoice(data: InvoiceData): Promise<void> {
  const blob = await generateInvoice(data);
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `Invoice_${data.bookingReference}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up
  URL.revokeObjectURL(url);
}

export function getInvoicePdfBase64(data: InvoiceData): Promise<string> {
  return generateInvoice(data).then((blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        resolve(base64.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  });
}

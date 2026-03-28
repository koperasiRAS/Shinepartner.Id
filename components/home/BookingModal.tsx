"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, User, Phone, AlertCircle, CheckCircle, Sparkles, Download, FileText, CalendarDays } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/FormField";
import { Label } from "@/components/ui/Label";
import { HoneypotField } from "@/components/ui/HoneypotField";
import { AvailabilityCalendar } from "./AvailabilityCalendar";
import { formatCurrency, formatShortDate, sanitizeInput } from "@/lib/utils";
import { bookingSchema, type BookingFormData } from "@/lib/schemas";
import { createBookingMessage, generateBookingReference, generateWhatsAppLink } from "@/lib/whatsapp";
import { downloadInvoice } from "@/lib/invoice";
import { useUnavailableDates } from "@/hooks/useUnavailableDates";
import type { Package } from "@/lib/data";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: Package | null;
}

export function BookingModal({ isOpen, onClose, selectedPackage }: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [formDataForInvoice, setFormDataForInvoice] = useState<BookingFormData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const { unavailableDates, isLoading: isLoadingDates } = useUnavailableDates();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSubmitError(null);
      setSubmitSuccess(false);
      setBookingRef(null);
    } else {
      document.body.style.overflow = "";
      reset();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, reset]);

  const onSubmit = async (data: BookingFormData) => {
    if (!selectedPackage) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Try to save booking to API
      try {
        const response = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: sanitizeInput(data.name),
            phone: sanitizeInput(data.phone),
            event_date: data.event_date,
            location: sanitizeInput(data.location),
            service: selectedPackage.category,
            package: selectedPackage.name,
          }),
        });

        const result = await response.json();

        if (result.success && result.booking?.id) {
          setBookingRef(result.booking.id.slice(0, 12).toUpperCase());
        }
      } catch {
        // Continue even if API fails
      }

      // Generate booking reference
      const ref = generateBookingReference();
      setBookingRef(ref);

      // Generate WhatsApp message
      const message = createBookingMessage(selectedPackage, {
        name: data.name,
        phone: data.phone,
        event_date: data.event_date,
        location: data.location,
      });

      const whatsappUrl = generateWhatsAppLink(message);

      // Store form data for invoice
      setFormDataForInvoice(data);
      setSubmitSuccess(true);

      // Open WhatsApp after short delay
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
        onClose();
        reset();
      }, 2000);

    } catch (error) {
      setSubmitError("Terjadi kesalahan. Silakan coba lagi.");

      // Fallback: open WhatsApp anyway
      if (selectedPackage) {
        const message = createBookingMessage(selectedPackage, {
          name: data.name,
          phone: data.phone,
          event_date: data.event_date,
          location: data.location,
        });
        const whatsappUrl = generateWhatsAppLink(message);
        window.open(whatsappUrl, "_blank");
        onClose();
        reset();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleDownloadInvoice = async () => {
    if (!selectedPackage || !formDataForInvoice || !bookingRef) return;

    setIsDownloading(true);
    try {
      await downloadInvoice({
        clientName: formDataForInvoice.name,
        phone: formDataForInvoice.phone,
        eventDate: formDataForInvoice.event_date,
        location: formDataForInvoice.location,
        packageName: selectedPackage.name,
        packageCategory: selectedPackage.category,
        price: selectedPackage.price,
        bookingReference: bookingRef,
        bookingDate: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error downloading invoice:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const watchedValues = watch();

  if (!selectedPackage) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-3xl shadow-elegant w-full max-w-lg max-h-[90vh] overflow-y-auto pointer-events-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-100">
                <div>
                  <h2 className="font-heading font-bold text-2xl text-primary">
                    {submitSuccess ? "Pesanan Terkirim!" : "Book Package"}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {selectedPackage.name} - {formatCurrency(selectedPackage.price)}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Success State */}
              {submitSuccess ? (
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  </motion.div>

                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-4">
                      <Sparkles className="w-4 h-4" />
                      <span className="font-medium">Booking Reference</span>
                    </div>
                    {bookingRef && (
                      <p className="font-mono font-bold text-2xl text-primary">
                        {bookingRef}
                      </p>
                    )}
                  </div>

                  <h3 className="font-heading font-bold text-xl text-primary mb-2">
                    Terima Kasih!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Pesanan Anda telah kami terima.
                    <br />
                    WhatsApp akan terbuka untuk konfirmasi.
                  </p>

                  <div className="bg-primary/5 rounded-2xl p-4 text-left text-sm mb-6">
                    <p className="text-gray-600">
                      <strong>Langkah selanjutnya:</strong>
                    </p>
                    <ul className="mt-2 space-y-1 text-gray-600">
                      <li>1. Kirim pesan konfirmasi via WhatsApp</li>
                      <li>2. Download invoice untuk referensi</li>
                      <li>3. Tim kami akan menghubungi Anda</li>
                    </ul>
                  </div>

                  {/* Invoice Download */}
                  <div className="mb-6">
                    <button
                      onClick={handleDownloadInvoice}
                      disabled={isDownloading}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent/10 text-accent font-medium rounded-2xl hover:bg-accent/20 transition-colors disabled:opacity-50"
                    >
                      {isDownloading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                          Membuat Invoice...
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5" />
                          Download Invoice PDF
                        </>
                      )}
                    </button>
                    <p className="text-gray-400 text-xs mt-2 flex items-center justify-center gap-1">
                      <FileText className="w-3 h-3" />
                      {bookingRef}
                    </p>
                  </div>

                  {/* WhatsApp Button */}
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      if (selectedPackage) {
                        const message = createBookingMessage(selectedPackage, {
                          name: watchedValues.name || "",
                          phone: watchedValues.phone || "",
                          event_date: watchedValues.event_date || "",
                          location: watchedValues.location || "",
                        });
                        const whatsappUrl = generateWhatsAppLink(message);
                        window.open(whatsappUrl, "_blank");
                        onClose();
                        reset();
                      }
                    }}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Buka WhatsApp
                  </Button>
                </div>
              ) : (
                <>
                  {/* Form */}
                  <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                    {/* Honeypot field for spam prevention */}
                    <HoneypotField name="website" />

                    {/* Name */}
                    <div>
                      <Label htmlFor="name" required>
                        Nama Lengkap
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Masukkan nama lengkap"
                        icon={<User className="w-5 h-5" />}
                        error={errors.name?.message}
                        {...register("name")}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <Label htmlFor="phone" required>
                        Nomor WhatsApp
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="08xxxxxxxxxx"
                        icon={<Phone className="w-5 h-5" />}
                        error={errors.phone?.message}
                        {...register("phone")}
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Event Date */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="event_date" required>
                          Tanggal Acara
                        </Label>
                        <button
                          type="button"
                          onClick={() => setShowCalendar(!showCalendar)}
                          className="text-accent text-sm font-medium flex items-center gap-1 hover:text-accent-dark transition-colors"
                        >
                          <CalendarDays className="w-4 h-4" />
                          {showCalendar ? "Input Manual" : "Lihat Kalender"}
                        </button>
                      </div>

                      {showCalendar ? (
                        <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50">
                          <AvailabilityCalendar
                            selectedDate={watch("event_date")}
                            onDateSelect={(date) => {
                              setValue("event_date", date, { shouldValidate: true });
                              setShowCalendar(false);
                            }}
                            unavailableDates={unavailableDates}
                            isLoading={isLoadingDates}
                            minDate={getMinDate()}
                          />
                        </div>
                      ) : (
                        <Input
                          id="event_date"
                          type="date"
                          icon={<Calendar className="w-5 h-5" />}
                          error={errors.event_date?.message}
                          min={getMinDate()}
                          {...register("event_date")}
                          aria-invalid={!!errors.event_date}
                        />
                      )}

                      {errors.event_date && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.event_date.message}
                        </p>
                      )}

                      {/* Show unavailable dates warning */}
                      {watch("event_date") && unavailableDates.includes(watch("event_date")) && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          Tanggal ini sudah tidak tersedia
                        </p>
                      )}
                    </div>

                    {/* Location */}
                    <div>
                      <Label htmlFor="location" required>
                        Lokasi Acara
                      </Label>
                      <Input
                        id="location"
                        type="text"
                        placeholder="Masukkan lokasi acara"
                        icon={<MapPin className="w-5 h-5" />}
                        error={errors.location?.message}
                        {...register("location")}
                        aria-invalid={!!errors.location}
                      />
                      {errors.location && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.location.message}
                        </p>
                      )}
                    </div>

                    {/* Summary */}
                    <Card className="bg-primary/5 border border-primary/10">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Paket:</span>
                          <span className="font-medium text-primary">{selectedPackage.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Estimasi Harga:</span>
                          <span className="font-bold text-primary text-lg">
                            {formatCurrency(selectedPackage.price)}
                          </span>
                        </div>
                        {watchedValues.name && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Nama:</span>
                            <span className="font-medium text-primary">{watchedValues.name}</span>
                          </div>
                        )}
                      </div>
                    </Card>

                    {/* Error Message */}
                    {submitError && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-red-600 text-sm">{submitError}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="secondary"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                      isLoading={isSubmitting}
                    >
                      {!isSubmitting && (
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      )}
                      Hubungi via WhatsApp
                    </Button>

                    <p className="text-center text-gray-500 text-xs">
                      Pesan akan terbuka di WhatsApp untuk konfirmasi
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

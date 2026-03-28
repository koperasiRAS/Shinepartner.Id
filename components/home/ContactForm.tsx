"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, Mail, MessageSquare, Send, AlertCircle, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/FormField";
import { Label } from "@/components/ui/Label";
import { contactSchema, type ContactFormData } from "@/lib/schemas";
import { createInquiryMessage, generateWhatsAppLink } from "@/lib/whatsapp";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const message = createInquiryMessage({
        name: data.name,
        phone: data.phone,
        message: data.message,
      });

      const whatsappUrl = generateWhatsAppLink(message);
      window.open(whatsappUrl, "_blank");

      setSubmitSuccess(true);
      setTimeout(() => {
        onClose();
        reset();
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl shadow-elegant w-full max-w-lg max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <h2 className="font-heading font-bold text-2xl text-primary">
                Hubungi Kami
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Kirim pesan via WhatsApp
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
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-10 h-10 text-green-500" />
              </motion.div>
              <h3 className="font-heading font-bold text-xl text-primary mb-2">
                Pesan Terkirim!
              </h3>
              <p className="text-gray-600">
                WhatsApp akan terbuka secara otomatis. Terima kasih!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
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

              {/* Email (Optional) */}
              <div>
                <Label htmlFor="email">
                  Email <span className="text-gray-400">(opsional)</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@contoh.com"
                  icon={<Mail className="w-5 h-5" />}
                  error={errors.email?.message}
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message" required>
                  Pesan
                </Label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tulis pesan Anda di sini..."
                    className={`input-field pl-12 resize-none ${
                      errors.message ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                    {...register("message")}
                    aria-invalid={!!errors.message}
                  />
                </div>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
                isLoading={isSubmitting}
              >
                {!isSubmitting && <Send className="w-5 h-5 mr-2" />}
                Kirim via WhatsApp
              </Button>

              <p className="text-center text-gray-500 text-xs">
                Pesan Anda akan terbuka di WhatsApp untuk dikirim
              </p>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

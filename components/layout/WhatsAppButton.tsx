"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  className?: string;
}

export function WhatsAppButton({ className }: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  const whatsappNumber = "6282138016904";
  const message = encodeURIComponent(
    "Halo Shinepartner! Saya tertarik dengan layanan wedding services. Mohon info lebih lanjut."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isVisible ? 1 : 0,
        opacity: isVisible ? 1 : 0
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50",
        "w-14 h-14 sm:w-16 sm:h-16",
        "bg-green-500 hover:bg-green-600",
        "rounded-full flex items-center justify-center shadow-lg",
        "transition-colors duration-300",
        "touch-manipulation", // Better touch handling
        className
      )}
      aria-label="Chat via WhatsApp - Opens WhatsApp messenger"
      style={{
        // Safe area insets for notched devices
        bottom: "max(1.5rem, env(safe-area-inset-bottom))",
      }}
    >
      <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
      {/* Pulse ring effect */}
      <span className="absolute w-full h-full rounded-full bg-green-500 animate-ping opacity-20" />
    </motion.a>
  );
}

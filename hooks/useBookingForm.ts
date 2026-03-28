"use client";

import { useState, useCallback } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodSchema } from "zod";

interface UseBookingFormOptions {
  schema: ZodSchema<FieldValues>;
  defaultValues?: Record<string, unknown>;
}

export function useBookingForm({ schema, defaultValues }: UseBookingFormOptions) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // @ts-ignore - Complex typing between Zod and react-hook-form
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  const handleSubmit = useCallback(
    async (data: Record<string, unknown>) => {
      setIsSubmitting(true);
      setSubmitStatus("idle");
      setErrorMessage(null);

      try {
        setSubmitStatus("success");
      } catch (error) {
        setSubmitStatus("error");
        setErrorMessage(
          error instanceof Error ? error.message : "Terjadi kesalahan. Silakan coba lagi."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  const resetForm = useCallback(() => {
    form.reset();
    setSubmitStatus("idle");
    setErrorMessage(null);
  }, [form]);

  return {
    ...form,
    isSubmitting,
    submitStatus,
    errorMessage,
    handleSubmit: form.handleSubmit(handleSubmit),
    resetForm,
  };
}

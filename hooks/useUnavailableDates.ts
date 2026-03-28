"use client";

import { useState, useEffect, useCallback } from "react";

interface UseUnavailableDatesResult {
  unavailableDates: string[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useUnavailableDates(): UseUnavailableDatesResult {
  const [unavailableDates, setUnavailableDates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUnavailableDates = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/unavailable-dates");

      if (!response.ok) {
        throw new Error("Failed to fetch unavailable dates");
      }

      const result = await response.json();

      if (result.success) {
        setUnavailableDates(result.unavailableDates || []);
      } else {
        throw new Error(result.error || "Unknown error");
      }
    } catch (err) {
      console.error("Error fetching unavailable dates:", err);
      setError(err instanceof Error ? err.message : "Failed to load calendar");
      // Fallback: use sample unavailable dates for demo
      setUnavailableDates(getSampleUnavailableDates());
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUnavailableDates();
  }, [fetchUnavailableDates]);

  return {
    unavailableDates,
    isLoading,
    error,
    refetch: fetchUnavailableDates,
  };
}

// Sample unavailable dates for demo (when API is not configured)
function getSampleUnavailableDates(): string[] {
  const dates: string[] = [];
  const today = new Date();

  // Add some sample unavailable dates in the next 3 months
  for (let i = 0; i < 5; i++) {
    const randomDays = Math.floor(Math.random() * 60) + 7;
    const date = new Date(today);
    date.setDate(date.getDate() + randomDays);
    dates.push(date.toISOString().split("T")[0]);
  }

  return dates;
}

// Check if a specific date is unavailable
export function isDateUnavailable(
  date: Date,
  unavailableDates: string[]
): boolean {
  const dateStr = date.toISOString().split("T")[0];
  return unavailableDates.includes(dateStr);
}

// Get dates to block in a month (for calendar display)
export function getBlockedDatesInMonth(
  year: number,
  month: number,
  unavailableDates: string[]
): Set<string> {
  const blocked = new Set<string>();

  unavailableDates.forEach((dateStr) => {
    const date = new Date(dateStr);
    if (date.getFullYear() === year && date.getMonth() === month) {
      blocked.add(dateStr);
    }
  });

  return blocked;
}

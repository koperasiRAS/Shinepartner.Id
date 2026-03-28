"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getBlockedDatesInMonth } from "@/hooks/useUnavailableDates";

interface AvailabilityCalendarProps {
  selectedDate: string | null;
  onDateSelect: (date: string) => void;
  unavailableDates: string[];
  isLoading?: boolean;
  minDate?: string;
}

const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

export function AvailabilityCalendar({
  selectedDate,
  onDateSelect,
  unavailableDates,
  isLoading = false,
  minDate,
}: AvailabilityCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const minDateObj = useMemo(() => {
    if (!minDate) return today;
    const d = new Date(minDate);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [minDate, today]);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const blockedDates = useMemo(
    () => getBlockedDatesInMonth(currentYear, currentMonth, unavailableDates),
    [currentYear, currentMonth, unavailableDates]
  );

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    // Get the day of week for the first day (0 = Sunday, adjust for Monday start)
    let startDay = firstDay.getDay();
    // Convert to Monday-start (0 = Monday)
    startDay = startDay === 0 ? 6 : startDay - 1;

    const days: Array<{ date: Date | null; dateStr: string }> = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      days.push({ date: null, dateStr: "" });
    }

    // Add days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateStr = date.toISOString().split("T")[0];
      days.push({ date, dateStr });
    }

    return days;
  }, [currentYear, currentMonth]);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const canGoPrevious = useMemo(() => {
    const prevMonth = new Date(currentYear, currentMonth - 1, 1);
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    return prevMonth >= currentMonthStart;
  }, [currentYear, currentMonth, today]);

  const isDateDisabled = (date: Date, dateStr: string): boolean => {
    // Past dates
    if (date < today) return true;

    // Before min date
    if (date < minDateObj) return true;

    // Unavailable dates
    if (blockedDates.has(dateStr)) return true;

    return false;
  };

  const isToday = (date: Date): boolean => {
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (dateStr: string): boolean => {
    return dateStr === selectedDate;
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          disabled={!canGoPrevious}
          className={cn(
            "p-2 rounded-xl transition-colors",
            canGoPrevious
              ? "hover:bg-gray-100 text-primary"
              : "text-gray-300 cursor-not-allowed"
          )}
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h3 className="font-heading font-bold text-primary">
            {MONTHS[currentMonth]} {currentYear}
          </h3>
          {isLoading && (
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1 mt-1">
              <Loader2 className="w-3 h-3 animate-spin" />
              Loading...
            </p>
          )}
        </div>

        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-xl text-primary transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map(({ date, dateStr }, index) => {
          if (!date || !dateStr) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const disabled = isDateDisabled(date, dateStr);
          const selected = isSelected(dateStr);
          const todayDate = isToday(date);
          const blocked = blockedDates.has(dateStr);

          return (
            <button
              key={dateStr}
              onClick={() => !disabled && onDateSelect(dateStr)}
              disabled={disabled}
              aria-label={`${date.getDate()} ${MONTHS[currentMonth]} ${currentYear}${blocked ? " (tidak tersedia)" : ""}${selected ? " (terpilih)" : ""}`}
              className={cn(
                "aspect-square rounded-xl text-sm font-medium transition-all duration-200 relative",
                disabled
                  ? "text-gray-300 cursor-not-allowed"
                  : "hover:bg-primary/10 cursor-pointer",
                selected && !disabled
                  ? "bg-primary text-white hover:bg-primary-light ring-2 ring-accent"
                  : todayDate && !disabled
                  ? "bg-accent/20 text-primary"
                  : "text-gray-700"
              )}
            >
              {date.getDate()}

              {/* Blocked indicator */}
              {blocked && !selected && (
                <span className="absolute inset-x-0 bottom-1 flex justify-center">
                  <span className="w-1 h-1 rounded-full bg-red-400" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-accent/20" />
          <span>Hari ini</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-gray-200" />
          <span>Tidak tersedia</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

interface HoneypotFieldProps {
  name: string;
  className?: string;
}

/**
 * Honeypot field for spam prevention
 * - Hidden field that bots will fill out
 * - If filled, submission is rejected
 */
export function HoneypotField({ name, className = "" }: HoneypotFieldProps) {
  const [value, setValue] = useState("");

  return (
    <div className={`absolute -left-[9999px] ${className}`} aria-hidden="true">
      <label htmlFor={name}>Leave this field empty</label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        // Make it completely hidden but accessible to bots
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      />
    </div>
  );
}

/**
 * Check if honeypot field was filled (spam detection)
 */
export function isHoneypotFilled(formData: FormData): boolean {
  // Check common honeypot field names
  const honeypotFields = ["website", "url", "email", "phone", "name"];

  for (const field of honeypotFields) {
    const value = formData.get(field);
    if (value && typeof value === "string" && value.length > 0) {
      return true;
    }
  }

  return false;
}

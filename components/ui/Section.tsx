"use client";

import { forwardRef, HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  variant?: "default" | "primary" | "accent";
  animate?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, id, variant = "default", animate = true, children, ...props }, ref) => {
    const variants = {
      default: "bg-white",
      primary: "bg-primary text-white",
      accent: "bg-accent/10",
    };

    const sectionContent = (
      <section
        ref={ref as React.Ref<HTMLElement>}
        id={id}
        className={cn(
          "section-padding relative overflow-hidden",
          variants[variant],
          className
        )}
        {...props}
      >
        <div className="container-custom relative z-10">{children}</div>
      </section>
    );

    if (animate) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {sectionContent}
        </motion.div>
      );
    }

    return sectionContent;
  }
);

Section.displayName = "Section";

const SectionHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-center mb-12 md:mb-16", className)}
      {...props}
    />
  )
);

SectionHeader.displayName = "SectionHeader";

const SectionTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("section-title mb-4", className)}
      {...props}
    />
  )
);

SectionTitle.displayName = "SectionTitle";

const SectionSubtitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("section-subtitle mx-auto", className)}
      {...props}
    />
  )
);

SectionSubtitle.displayName = "SectionSubtitle";

const SectionDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-gray-600 mt-4 max-w-2xl mx-auto", className)}
      {...props}
    />
  )
);

SectionDescription.displayName = "SectionDescription";

export { Section, SectionHeader, SectionTitle, SectionSubtitle, SectionDescription };

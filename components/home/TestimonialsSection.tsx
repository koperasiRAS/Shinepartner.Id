"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Section, SectionHeader, SectionTitle, SectionSubtitle } from "@/components/ui/Section";

const testimonials = [
  {
    id: 1,
    name: "Sarah & Michael",
    role: "Wedding Client",
    location: "Jakarta",
    content:
      "Shinepartner made our wedding absolutely magical! From the smallest detail to the grandest moment, everything was perfectly orchestrated. The team was professional, creative, and truly cared about making our day special.",
    rating: 5,
    image: null,
  },
  {
    id: 2,
    name: "Diana Putri",
    role: "Wedding Planner Package",
    location: "Bandung",
    content:
      "I was stressed about planning my wedding until I found Shinepartner. Their Full Service package took all the pressure off my shoulders. They handled everything with such care and attention to detail. Highly recommended!",
    rating: 5,
    image: null,
  },
  {
    id: 3,
    name: "Rina & Jaya",
    role: "Destination Wedding",
    location: "Bali",
    content:
      "We wanted a beach wedding in Bali and Shinepartner made it happen flawlessly. The vendor coordination, timeline management, and execution were beyond our expectations. Our guests are still talking about it!",
    rating: 5,
    image: null,
  },
  {
    id: 4,
    name: "Amanda Chen",
    role: "Content Creator Package",
    location: "Surabaya",
    content:
      "The wedding video and photos exceeded all our expectations! The team captured every emotion, every moment. The highlight reel brought tears to our eyes. Worth every rupiah!",
    rating: 5,
    image: null,
  },
  {
    id: 5,
    name: "Lisa & David",
    role: "Wedding Organizer Package",
    location: "Yogyakarta",
    content:
      "From setup to breakdown, Shinepartner's team was phenomenal. They anticipated our needs before we even knew what we needed. Our intimate wedding was everything we dreamed of and more.",
    rating: 5,
    image: null,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <Section id="testimonials" variant="accent">
      <SectionHeader>
        <SectionTitle>What Our Couples Say</SectionTitle>
        <SectionSubtitle>
          Real stories from real couples who trusted us with their special day
        </SectionSubtitle>
      </SectionHeader>

      <div className="max-w-4xl mx-auto">
        {/* Main Carousel */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative"
            >
              <Card className="text-center py-12 px-8 md:px-16">
                {/* Quote Icon */}
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg
                    className="w-8 h-8 text-accent"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Content */}
                <CardContent className="px-0">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                    &ldquo;{currentTestimonial.content}&rdquo;
                  </p>

                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                    ))}
                  </div>

                  {/* Author */}
                  <div className="space-y-1">
                    <h4 className="font-heading font-bold text-lg text-primary">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-accent font-medium">{currentTestimonial.role}</p>
                    <p className="text-gray-500 text-sm">{currentTestimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:translate-x-0 w-12 h-12 bg-white shadow-soft rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-0 w-12 h-12 bg-white shadow-soft rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-accent w-8"
                  : "bg-primary/20 hover:bg-primary/40"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

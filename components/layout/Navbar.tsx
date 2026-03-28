"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { label: "Layanan", href: "#services" },
  { label: "Paket", href: "#packages" },
  { label: "Travel", href: "#travel" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontak", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-soft"
            : "bg-transparent"
        )}
        role="banner"
      >
        <nav
          className="container-custom"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-accent rounded-lg p-1"
              aria-label="Shinepartner - Go to top"
            >
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-accent font-heading font-bold text-lg">
                  S
                </span>
              </div>
              <div className={cn(
                "font-heading font-bold transition-colors",
                isScrolled ? "text-primary" : "text-white",
                "hidden sm:block"
              )}>
                Shinepartner
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <button
                      onClick={() => setActiveDropdown(
                        activeDropdown === item.label ? null : item.label
                      )}
                      className={cn(
                        "flex items-center space-x-1 px-4 py-2 rounded-xl font-medium transition-colors",
                        isScrolled
                          ? "text-primary hover:bg-primary/10"
                          : "text-white hover:bg-white/10"
                      )}
                      aria-expanded={activeDropdown === item.label}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          activeDropdown === item.label && "rotate-180"
                        )}
                      />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        "px-4 py-2 rounded-xl font-medium transition-colors",
                        isScrolled
                          ? "text-primary hover:bg-primary/10"
                          : "text-white hover:bg-white/10"
                      )}
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button (Desktop) */}
            <div className="hidden lg:block">
              <button
                onClick={() => handleNavClick("#contact")}
                className={cn(
                  "px-6 py-2.5 rounded-xl font-medium transition-all duration-300",
                  isScrolled
                    ? "bg-primary text-white hover:bg-primary-light shadow-soft hover:shadow-card"
                    : "bg-accent text-primary hover:bg-accent-light"
                )}
              >
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "lg:hidden p-2 rounded-xl transition-colors",
                isScrolled
                  ? "text-primary hover:bg-primary/10"
                  : "text-white hover:bg-white/10"
              )}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-primary/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="relative bg-white shadow-elegant"
              style={{ top: "80px" }}
            >
              <div className="container-custom py-6">
                <div className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item.href)}
                      className="text-left px-4 py-3 text-primary font-medium rounded-xl hover:bg-primary/5 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="pt-4">
                    <button
                      onClick={() => handleNavClick("#contact")}
                      className="w-full bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-light transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

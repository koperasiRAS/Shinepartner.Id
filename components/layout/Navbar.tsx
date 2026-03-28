"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ShoppingBag, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
  description?: string;
}

interface NavDropdown {
  label: string;
  items: NavItem[];
}

const navItems: NavItem[] = [
  { label: "Layanan", href: "#services" },
  { label: "Paket", href: "#packages" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontak", href: "#contact" },
];

const ecosystemDropdown: NavDropdown = {
  label: "Ekosistem",
  items: [
    {
      label: "Portfolio",
      href: "/portfolio",
      description: "Dokumentasi wedding & event",
    },
    {
      label: "ShineTalent.co",
      href: "/shinetalent",
      description: "Talent community & management",
    },
    {
      label: "FindYourShine.id",
      href: "/findyourshine",
      description: "Blind date event",
    },
    {
      label: "Travel Guide",
      href: "/travel-guide",
      description: "Honeymoon & destination wedding",
    },
  ],
};

interface NavbarProps {
  onCartOpen: () => void;
}

export function Navbar({ onCartOpen }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { itemCount } = useCart();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveDropdown(null);
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleAnchorClick = (href: string) => {
    if (!href.startsWith("#")) return;
    setIsOpen(false);
    const id = href.slice(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      // Fallback: navigate to home and scroll after a short delay
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  const handleDropdownItemClick = () => {
    setActiveDropdown(null);
    setIsOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const textColorClass = isScrolled ? "text-primary" : "text-white";
  const hoverBgClass = isScrolled ? "hover:bg-primary/10" : "hover:bg-white/10";

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
        <nav className="container-custom" aria-label="Main navigation">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={scrollToTop}
              className={cn(
                "flex items-center focus:outline-none focus:ring-2 focus:ring-accent rounded-lg p-1",
                textColorClass
              )}
              aria-label="Shinepartner - Kembali ke atas"
            >
              <span className="hidden sm:block font-heading font-bold text-lg transition-colors">
                ShinePartner.id
              </span>
              <span className="sm:hidden font-heading font-bold text-lg transition-colors">
                ShinePartner
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1" ref={dropdownRef}>
              {/* Regular Nav Items */}
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleAnchorClick(item.href)}
                  className={cn(
                    "px-4 py-2 rounded-xl font-medium transition-colors",
                    textColorClass,
                    hoverBgClass
                  )}
                >
                  {item.label}
                </button>
              ))}

              {/* Ecosystem Dropdown */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle(ecosystemDropdown.label)}
                  className={cn(
                    "flex items-center space-x-1 px-4 py-2 rounded-xl font-medium transition-colors",
                    textColorClass,
                    hoverBgClass
                  )}
                  aria-expanded={activeDropdown === ecosystemDropdown.label}
                  aria-haspopup="true"
                >
                  <span>{ecosystemDropdown.label}</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      activeDropdown === ecosystemDropdown.label && "rotate-180"
                    )}
                  />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {activeDropdown === ecosystemDropdown.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-elegant border border-gray-100 overflow-hidden"
                      role="menu"
                    >
                      <div className="p-2">
                        {/* Dropdown header */}
                        <div className="px-3 py-2 mb-1">
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Sub-brand & Portfolio
                          </p>
                        </div>
                        {ecosystemDropdown.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={handleDropdownItemClick}
                            className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-primary/5 transition-colors group"
                            role="menuitem"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="font-medium text-primary text-sm group-hover:text-accent transition-colors">
                                  {item.label}
                                </span>
                                <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-accent transition-colors" />
                              </div>
                              {item.description && (
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center gap-3">
              {/* Cart Button */}
              <button
                onClick={onCartOpen}
                className={cn(
                  "relative p-2 rounded-xl transition-colors",
                  textColorClass,
                  hoverBgClass
                )}
                aria-label={`Keranjang (${itemCount} item)`}
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-primary text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>

              {/* CTA Button (Desktop) */}
              <button
                onClick={() => handleAnchorClick("#contact")}
                className={cn(
                  "hidden lg:flex px-6 py-2.5 rounded-xl font-medium transition-all duration-300",
                  isScrolled
                    ? "bg-primary text-white hover:bg-primary-light shadow-soft hover:shadow-card"
                    : "bg-accent text-primary hover:bg-accent-light"
                )}
              >
                Book Now
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "lg:hidden p-2 rounded-xl transition-colors",
                  textColorClass,
                  hoverBgClass
                )}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? "Tutup menu" : "Buka menu"}
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
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
                <div className="flex flex-col space-y-1">
                  {/* Regular Nav Items */}
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleAnchorClick(item.href)}
                      className="text-left px-4 py-3 text-primary font-medium rounded-xl hover:bg-primary/5 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}

                  {/* Ecosystem Section Header */}
                  <div className="px-4 pt-4 pb-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Ekosistem Shinepartner
                    </p>
                  </div>

                  {/* Ecosystem Items */}
                  {ecosystemDropdown.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleDropdownItemClick}
                      className="flex items-center gap-2 px-4 py-3 text-primary font-medium rounded-xl hover:bg-primary/5 transition-colors"
                    >
                      <span>{item.label}</span>
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    </Link>
                  ))}

                  {/* CTA */}
                  <div className="pt-4">
                    <button
                      onClick={() => handleAnchorClick("#contact")}
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

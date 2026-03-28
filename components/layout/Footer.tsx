"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  { label: "Wedding Content Creator", href: "#wedding" },
  { label: "Wedding Planner", href: "#wedding" },
  { label: "Wedding Organizer", href: "#wedding" },
  { label: "Honeymoon Trip", href: "#travel" },
  { label: "Destination Wedding", href: "#travel" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const brands = [
  { name: "Shinepartner.id", href: "https://shinepartner.id", desc: "Wedding Services" },
  { name: "FindYourShine.id", href: "https://findyourshine.id", desc: "Blind Date Events" },
  { name: "ShineTalent.co", href: "https://shivetalent.co", desc: "Talent Management" },
];

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/shinepartner", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com/shinepartner", label: "Facebook" },
  { icon: Youtube, href: "https://youtube.com/shinepartner", label: "YouTube" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white" role="contentinfo">
      <div className="container-custom py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                <span className="text-primary font-heading font-bold text-xl">
                  S
                </span>
              </div>
              <div>
                <span className="font-heading font-bold text-xl">Shinepartner</span>
                <span className="block text-accent text-sm">Ecosystem</span>
              </div>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed">
              Your premier wedding services partner. From planning to execution,
              we make your special day unforgettable.
            </p>
            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-accent hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <button
                    onClick={() => {
                      const element = document.querySelector(service.href);
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-white/70 hover:text-accent transition-colors"
                  >
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-white/70">
                  Jakarta, Indonesia
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <a
                  href="https://wa.me/6282138016904"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  +62 821 3801 6904
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:hello@shinepartner.id"
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  hello@shinepartner.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Ecosystem Brands Banner */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <a
                key={brand.name}
                href={brand.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center justify-between p-4 rounded-2xl transition-colors group",
                  "bg-white/5 hover:bg-white/10"
                )}
              >
                <div>
                  <span className="font-heading font-bold text-accent group-hover:text-white transition-colors">
                    {brand.name}
                  </span>
                  <span className="block text-sm text-white/60">
                    {brand.desc}
                  </span>
                </div>
                <svg
                  className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              © {currentYear} Shinepartner Ecosystem. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-white/60">
              <Link href="/privacy" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-accent transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

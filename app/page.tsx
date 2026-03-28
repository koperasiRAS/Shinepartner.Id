"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, MapPin, Calendar, Star, Heart, Users, Sparkles, Clock, Camera } from "lucide-react";
import { faqData, BreadcrumbStructuredData } from "@/components/SeoStructuredData";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/Section";
import { PackagesSection } from "@/components/home/PackagesSection";
import { BookingModal } from "@/components/home/BookingModal";
import { formatCurrency } from "@/lib/utils";
import { packages } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import type { Package } from "@/lib/data";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const { addItem } = useCart();

  // Filter packages by category
  const woPackages = packages.filter(p => p.category === "organizer");
  const wpPackages = packages.filter(p => p.category === "planner");
  const brideAssist = packages.find(p => p.category === "bride-assist");
  const addOns = packages.filter(p => p.category === "add-on");

  const handleBook = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  return (
    <div>
      {/* ============================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex items-center justify-center bg-primary overflow-hidden">
        {/* Wedding decorative accents */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 border border-accent/20 rounded-full" />
          <div className="absolute bottom-32 right-20 w-48 h-48 border border-accent/10 rounded-full" />
          <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-accent/30 rounded-full" />
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-accent/20 rounded-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/60 via-primary/40 to-primary-light/30" />

        <div className="container-custom relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-4">
              Creative Partner untuk Momen Spesial
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              ShinePartner.id
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
              Tidak hanya merekam visual, tapi menceritakan kisah cinta dengan{" "}
              <span className="text-accent font-semibold">cahaya</span> dan{" "}
              <span className="text-accent font-semibold">rasa</span>.
              <br className="hidden md:block" />
              Dari akad hingga pesta, setiap momen dibuat{" "}
              <span className="text-accent font-semibold">bersinar</span> dan{" "}
              <span className="text-accent font-semibold">abadi</span>.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://wa.me/6282138016904?text=Halo%20Shinepartner!%20Saya%20tertarik%20dengan%20layanan%20Shinepartner.id.%20Mohon%20info%20lebih%20lanjut."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent text-primary font-medium rounded-2xl hover:bg-accent-light transition-all duration-300 shadow-soft hover:shadow-card"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Konsultasi Sekarang
            </a>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() =>
                document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Lihat Paket
            </Button>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 2. ABOUT SHINEPARTNER */}
      {/* ============================================ */}
      <Section id="about">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle>Tentang ShinePartner.id</SectionTitle>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mt-8">
            ShinePartner.id adalah <strong className="text-primary">creative partner</strong> untuk momen pernikahanmu.
          </p>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mt-4">
            Kami hadir sebagai wedding content creator yang tidak hanya merekam visual, tapi menceritakan kisah cinta dengan{" "}
            <strong className="text-accent">cahaya</strong> dan <strong className="text-accent">rasa</strong>.
          </p>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mt-4">
            Dari detik-detik haru menjelang akad hingga tawa lepas saat pesta —
            <br />
            kami percaya setiap momen layak untuk <strong className="text-primary">bersinar</strong> dan{" "}
            <strong className="text-primary">abadi</strong>.
          </p>
        </div>
      </Section>

      {/* ============================================ */}
      {/* 3. APA YANG KAMI TAWARKAN */}
      {/* ============================================ */}
      <Section id="services" variant="accent">
        <SectionHeader>
          <SectionTitle>Apa Yang Kami Tawarkan</SectionTitle>
        </SectionHeader>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Prewedding", desc: "Storytelling Video & Foto" },
            { name: "Akad & Resepsi", desc: "Cinematic Content" },
            { name: "Social Media", desc: "Instagram Reels & TikTok" },
            { name: "Real-time Content", desc: "Untuk Social Media" },
            { name: "Custom Wedding", desc: "Story untuk Pasangan" },
            { name: "Event Lainnya", desc: "Engagement, Birthday, Bridal Shower" },
          ].map((item) => (
            <Card key={item.name} hover className="text-center group">
              <CardContent className="py-8">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft group-hover:shadow-card transition-shadow">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-lg text-primary mb-1">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* ============================================ */}
      {/* 4. CONTENT CREATOR PACKAGES */}
      {/* ============================================ */}
      <PackagesSection />

      {/* ============================================ */}
      {/* 5. WEDDING ORGANIZER PACKAGE */}
      {/* ============================================ */}
      <Section id="wo-packages" variant="accent">
        <SectionHeader>
          <SectionTitle>Wedding Organizer Package</SectionTitle>
        </SectionHeader>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {woPackages.map((pkg) => (
            <Card key={pkg.id} className={`flex flex-col ${pkg.recommended ? "border-2 border-accent" : ""}`}>
              {pkg.recommended && (
                <div className="bg-accent text-primary text-sm font-medium px-4 py-2 text-center rounded-t-3xl">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                <p className="text-primary font-bold text-3xl mt-2">
                  {formatCurrency(pkg.price)}
                </p>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-gray-600 text-center mb-6">{pkg.description}</p>
                <div className="space-y-3">
                  {pkg.crew && pkg.crew.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-2 h-2 bg-accent rounded-full" />
                      {c}
                    </div>
                  ))}
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-2 h-2 bg-accent rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
              <div className="p-6 pt-0 mt-auto flex flex-col gap-2">
                <Button
                  variant={pkg.recommended ? "secondary" : "primary"}
                  size="lg"
                  className="w-full"
                  onClick={() => handleBook(pkg)}
                >
                  Book Now
                </Button>
                <button
                  onClick={() => addItem(pkg)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-primary/10 text-primary/60 font-medium rounded-xl hover:bg-primary/5 hover:border-primary/20 transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Tambah ke Keranjang
                </button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ============================================ */}
      {/* 6. WEDDING PLANNER PACKAGE */}
      {/* ============================================ */}
      <Section id="wp-packages">
        <SectionHeader>
          <SectionTitle>Wedding Planner Package</SectionTitle>
        </SectionHeader>
        <div className="grid md:grid-cols-3 gap-6">
          {wpPackages.map((pkg) => (
            <Card key={pkg.id} className={`flex flex-col ${pkg.recommended ? "border-2 border-accent" : ""}`}>
              {pkg.recommended && (
                <div className="bg-accent text-primary text-sm font-medium px-4 py-2 text-center rounded-t-3xl">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <p className="text-primary font-bold text-2xl mt-2">
                  {formatCurrency(pkg.price)}
                </p>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-gray-600 text-sm text-center mb-4">{pkg.description}</p>
                <div className="space-y-2">
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-2 h-2 bg-accent rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
              <div className="p-6 pt-0 mt-auto flex flex-col gap-2">
                <Button
                  variant={pkg.recommended ? "secondary" : "primary"}
                  size="lg"
                  className="w-full"
                  onClick={() => handleBook(pkg)}
                >
                  Book Now
                </Button>
                <button
                  onClick={() => addItem(pkg)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-primary/10 text-primary/60 font-medium rounded-xl hover:bg-primary/5 hover:border-primary/20 transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Tambah ke Keranjang
                </button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ============================================ */}
      {/* 7. PERSONAL BRIDE ASSISTANT */}
      {/* ============================================ */}
      {brideAssist && (
        <Section id="bride-assistant" variant="accent">
          <SectionHeader>
            <SectionTitle>Personal Bride Assistant</SectionTitle>
            <SectionSubtitle>
              Asisten pribadi untuk menemani brides di hari spesial
            </SectionSubtitle>
          </SectionHeader>
          <div className="max-w-2xl mx-auto">
            <Card className={`text-center border-2 border-accent flex flex-col`}>
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-10 h-10 text-accent" />
                </div>
                <CardTitle className="text-2xl">{brideAssist.name}</CardTitle>
                <p className="text-primary font-bold text-4xl mt-2">
                  {formatCurrency(brideAssist.price)}
                </p>
                <p className="text-gray-500">{brideAssist.duration} Standby</p>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="grid sm:grid-cols-2 gap-3">
                  {brideAssist.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600 text-left">
                      <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
              <div className="p-6 pt-0 mt-auto flex flex-col gap-2">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full"
                  onClick={() => handleBook(brideAssist)}
                >
                  Book Now
                </Button>
                <button
                  onClick={() => addItem(brideAssist)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-primary/10 text-primary/60 font-medium rounded-xl hover:bg-primary/5 hover:border-primary/20 transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Tambah ke Keranjang
                </button>
              </div>
            </Card>
          </div>
        </Section>
      )}

      {/* ============================================ */}
      {/* 8. ADD-ONS */}
      {/* ============================================ */}
      <Section id="addons">
        <SectionHeader>
          <SectionTitle>Add-Ons & Custom</SectionTitle>
          <SectionSubtitle>
            Tingkatkan paketmu dengan layanan tambahan atau buat paket sesuai kebutuhan
          </SectionSubtitle>
        </SectionHeader>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {addOns.map((addon) => (
            <Card key={addon.id} className="flex flex-col text-center">
              <CardContent className="py-6 flex-1">
                <h4 className="font-heading font-bold text-primary mb-2">{addon.name}</h4>
                <p className="text-accent font-bold text-lg">
                  {addon.price >= 1000000 ? "mulai " : ""}
                  {formatCurrency(addon.price)}
                </p>
                <p className="text-gray-500 text-xs mt-1">{addon.description}</p>
              </CardContent>
              <div className="p-4 pt-0 mt-auto flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleBook(addon)}
                >
                  Book
                </Button>
                <button
                  onClick={() => addItem(addon)}
                  className="w-full flex items-center justify-center gap-1 px-3 py-2 border border-primary/10 text-primary/60 font-medium rounded-xl hover:bg-primary/5 transition-colors text-xs"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </Card>
          ))}

          {/* Custom Package CTA Card */}
          <Card className="flex flex-col text-center bg-gradient-to-br from-primary/5 to-accent/10 border-2 border-dashed border-primary/20">
            <CardContent className="py-8 flex-1 flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-heading font-bold text-primary mb-2">Buat Paket Sendiri</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                Butuh kombinasi layanan spesifik? Konsultasi gratis untuk paket custom.
              </p>
            </CardContent>
            <div className="p-4 pt-0 mt-auto">
              <a
                href="https://wa.me/6282138016904?text=Halo%20Shinepartner!%20Saya%20tertarik%20membuat%20paket%20custom.%20Mohon%20konsultasi%20lebih%20lanjut."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-accent text-primary font-medium rounded-xl hover:bg-accent-light transition-colors text-sm font-semibold"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Konsultasi Custom
              </a>
            </div>
          </Card>
        </div>
      </Section>

      {/* ============================================ */}
      {/* 9. KENAPA SHINEPARTNER.ID */}
      {/* ============================================ */}
      <Section id="why-us" variant="accent">
        <SectionHeader>
          <SectionTitle>Kenapa ShinePartner.id?</SectionTitle>
        </SectionHeader>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Tim Profesional", desc: "Tim profesional wedding & content creator" },
            { title: "Fokus Social Media", desc: "Format Reels / TikTok yang viral" },
            { title: "Personal Storytelling", desc: "Tiap pasangan punya cerita unik" },
            { title: "Fast Delivery", desc: "Real-time editing & fast delivery" },
            { title: "Hari-H Ready", desc: "Bisa tayang saat hari-H" },
          ].map((item) => (
            <Card key={item.title} hover className="text-center">
              <CardContent className="py-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-heading font-bold text-primary mb-1">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* ============================================ */}
      {/* 10. AREA LAYANAN */}
      {/* ============================================ */}
      <Section id="area">
        <SectionHeader>
          <SectionTitle>Area Layanan</SectionTitle>
        </SectionHeader>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardContent className="py-8">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <h4 className="font-heading font-bold text-primary text-lg mb-3">Jabodetabek</h4>
              <div className="flex flex-wrap justify-center gap-2">
                {["Jakarta", "Bogor", "Depok", "Tangerang", "Bekasi"].map((city) => (
                  <span key={city} className="bg-primary/5 text-primary text-sm px-3 py-1 rounded-full">
                    {city}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="py-8">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <h4 className="font-heading font-bold text-primary text-lg mb-3">Luar Jabodetabek</h4>
              <div className="flex flex-wrap justify-center gap-2">
                {["Bandung", "Surabaya", "Yogyakarta", "Semarang", "Bali", "Medan", "Makassar"].map((city) => (
                  <span key={city} className="bg-primary/5 text-primary text-sm px-3 py-1 rounded-full">
                    {city}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <p className="text-center text-gray-500 mt-6">
          Destination Wedding tersedia untuk seluruh Indonesia
        </p>
      </Section>

      {/* ============================================ */}
      {/* 11. TESTIMONIALS */}
      {/* ============================================ */}
      <Section id="testimonials">
        <SectionHeader>
          <SectionTitle>Mereka yang Sudah Percaya</SectionTitle>
          <SectionSubtitle>
            Cerita dari pasangan yang sudah mengandalkan Shinepartner
          </SectionSubtitle>
        </SectionHeader>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              quote: "Shinepartner bikin hari-H kami jadi makin berkesan! Video dan fotonya keren banget, even bisa langsung share ke social media saat itu juga.",
              name: "Anisa",
              role: "Bride, Jakarta",
              pkg: "Gold Package",
            },
            {
              quote: "Crew-nya super ramah dan profesional. Mereka paham banget mau bikin konten kayak gimana. Highly recommended!",
              name: "Dimas & Rina",
              role: "Couple, Bandung",
              pkg: "WO Signature + Gold CC",
            },
            {
              quote: "Kami pilih Shinepartner karena pendekatannya beda — mereka fokus bikin cerita kami yangunique, bukan template-video biasa.",
              name: "Fajar & Maya",
              role: "Bride & Groom, Surabaya",
              pkg: "Platinum Package",
            },
          ].map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <CardContent className="flex-1">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic leading-relaxed mb-4">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-primary text-sm">{t.name}</p>
                      <p className="text-gray-400 text-xs">{t.role}</p>
                    </div>
                    <span className="ml-auto text-xs bg-accent/10 text-accent px-2.5 py-1 rounded-full font-medium">
                      {t.pkg}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ============================================ */}
      {/* 12. FAQ */}
      {/* ============================================ */}
      <Section id="faq" variant="accent">
        <SectionHeader>
          <SectionTitle>Pertanyaan Umum</SectionTitle>
          <SectionSubtitle>
            Jawaban untuk pertanyaan yang sering ditanyakan
          </SectionSubtitle>
        </SectionHeader>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqData.map((faq, i) => (
            <Card key={i} className="overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-heading font-bold text-primary list-none">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    <span>{faq.q}</span>
                  </div>
                  <span className="text-accent group-open:rotate-180 transition-transform flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-5 text-gray-600 pl-10">{faq.a}</div>
              </details>
            </Card>
          ))}
        </div>
      </Section>

      {/* ============================================ */}
      {/* 12. CTA FINAL */}
      {/* ============================================ */}
      <Section id="contact" variant="primary">
        <div className="text-center text-white max-w-4xl mx-auto">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
            Buat Momen Pernikahanmu
            <br />
            <span className="text-accent">Bersinar</span> Bersama Kami
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Konsultasi gratis untuk paket impianmu
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/6282138016904?text=Halo%20Shinepartner!%20Saya%20tertarik%20dengan%20layanan%20Shinepartner.id.%20Mohon%20info%20lebih%20lanjut."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent text-primary font-medium rounded-2xl hover:bg-accent-light transition-all duration-300 shadow-soft hover:shadow-card"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Konsultasi via WhatsApp
            </a>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() =>
                document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Lihat Paket Lengkap
            </Button>
          </div>
        </div>
      </Section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedPackage={selectedPackage}
      />
    </div>
  );
}

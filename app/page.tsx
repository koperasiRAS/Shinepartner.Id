"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/Section";
import { PackagesSection } from "@/components/home/PackagesSection";
import { ContactForm } from "@/components/home/ContactForm";
import { formatCurrency } from "@/lib/utils";
import { packages, addOnPricing } from "@/lib/data";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Filter packages by category
  const woPackages = packages.filter(p => p.category === "organizer");
  const wpPackages = packages.filter(p => p.category === "planner");
  const brideAssist = packages.find(p => p.category === "bride-assist");
  const addOns = packages.filter(p => p.category === "add-on");

  return (
    <div>
      {/* ============================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex items-center justify-center bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/60 via-primary/40 to-primary-light/30" />

        <div className="container-custom relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
            ShinePartner.id <br />
            <span className="text-accent">Creative Partner</span> untuk Momen Pernikahanmu
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
            Kami tidak hanya merekam visual, tapi menceritakan kisah cinta dengan cahaya dan rasa.
            <br className="hidden md:block" />
            Dari akad hingga pesta, setiap momen dibuat <span className="text-accent font-semibold">bersinar</span> dan <span className="text-accent font-semibold">abadi</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/6282138016904?text=Halo%20Shinepartner!%20Saya%20tertarik%20dengan%20layanan%20wedding%20services.%20Mohon%20info%20lebih%20lanjut."
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
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ============================================ */}
      {/* 2. ABOUT SHINEPARTNER */}
      {/* ============================================ */}
      <Section id="about">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle>About ShinePartner.id</SectionTitle>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mt-8">
            ShinePartner.id adalah <strong className="text-primary">creative partner</strong> untuk momen pernikahanmu.
          </p>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mt-4">
            Kami hadir sebagai wedding content creator yang tidak hanya merekam visual, tapi menceritakan kisah cinta dengan <strong className="text-accent">cahaya</strong> dan <strong className="text-accent">rasa</strong>.
          </p>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mt-4">
            Dari detik-detik haru menjelang akad hingga tawa lepas saat pesta —
            <br />
            kami percaya setiap momen layak untuk <strong className="text-primary">bersinar</strong> dan <strong className="text-primary">abadi</strong>.
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
            { name: "Prewedding", desc: "Storytelling Video & Foto", icon: "📸" },
            { name: "Akad & Resepsi", desc: "Cinematic Content", icon: "💒" },
            { name: "Social Media", desc: "Instagram Reels & TikTok", icon: "📱" },
            { name: "Real-time Content", desc: "Untuk Social Media", icon: "⚡" },
            { name: "Custom Wedding", desc: "Story untuk Pasangan", icon: "💕" },
            { name: "Event Lainnya", desc: "Engagement, Birthday, Bridal Shower, dll", icon: "🎉" },
          ].map((item) => (
            <Card key={item.name} hover className="text-center group">
              <CardContent className="py-8">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft group-hover:shadow-card transition-shadow">
                  <span className="text-3xl">{item.icon}</span>
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
            <Card key={pkg.id} hover className={`text-center ${pkg.recommended ? "border-2 border-accent" : ""}`}>
              {pkg.recommended && (
                <div className="bg-accent text-primary text-sm font-medium px-4 py-1 rounded-b-xl">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                <p className="text-primary font-bold text-3xl mt-2">
                  {formatCurrency(pkg.price)}
                </p>
              </CardHeader>
              <CardContent>
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
            <Card key={pkg.id} hover className={`text-center ${pkg.recommended ? "border-2 border-accent" : ""}`}>
              {pkg.recommended && (
                <div className="bg-accent text-primary text-sm font-medium px-4 py-1 rounded-b-xl">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <p className="text-primary font-bold text-2xl mt-2">
                  {formatCurrency(pkg.price)}
                </p>
              </CardHeader>
              <CardContent>
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
            <Card className="text-center border-2 border-accent">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">👰</span>
                </div>
                <CardTitle className="text-2xl">{brideAssist.name}</CardTitle>
                <p className="text-primary font-bold text-4xl mt-2">
                  {formatCurrency(brideAssist.price)}
                </p>
                <p className="text-gray-500">{brideAssist.duration} Standby</p>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {brideAssist.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600 text-left">
                      <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>
      )}

      {/* ============================================ */}
      {/* 8. ADD-ONS */}
      {/* ============================================ */}
      <Section id="addons">
        <SectionHeader>
          <SectionTitle>Add-Ons</SectionTitle>
          <SectionSubtitle>
            Tingkatkan paketmu dengan layanan tambahan
          </SectionSubtitle>
        </SectionHeader>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {addOns.map((addon) => (
            <Card key={addon.id} className="text-center">
              <CardContent className="py-6">
                <h4 className="font-heading font-bold text-primary mb-2">{addon.name}</h4>
                <p className="text-accent font-bold text-lg">
                  {addon.price >= 1000000 ? "mulai " : ""}
                  {formatCurrency(addon.price)}
                </p>
                <p className="text-gray-500 text-xs mt-1">{addon.description}</p>
              </CardContent>
            </Card>
          ))}
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
            { title: "Tim Profesional", desc: "Tim profesional wedding & content creator", icon: "👥" },
            { title: "Fokus Social Media", desc: "Format Reels / TikTok yang viral", icon: "📱" },
            { title: "Personal Storytelling", desc: "Tiap pasangan punya cerita unik", icon: "💕" },
            { title: "Fast Delivery", desc: "Real-time editing & fast delivery", icon: "⚡" },
            { title: "Hari-H Ready", desc: "Bisa tayang saat hari-H", icon: "🎬" },
          ].map((item) => (
            <Card key={item.title} hover className="text-center">
              <CardContent className="py-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">{item.icon}</span>
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
        <div className="text-center">
          <div className="inline-flex items-center gap-4 bg-primary/5 rounded-2xl px-8 py-6">
            <span className="text-4xl">📍</span>
            <div className="text-left">
              <p className="font-heading font-bold text-primary text-xl">Bandung</p>
              <p className="text-gray-600">Available seluruh Indonesia</p>
            </div>
          </div>
          <p className="text-gray-500 mt-4">
            Destination Wedding tersedia untuk seluruh Indonesia
          </p>
        </div>
      </Section>

      {/* ============================================ */}
      {/* 11. FAQ / TERMS & CONDITIONS */}
      {/* ============================================ */}
      <Section id="faq" variant="accent">
        <SectionHeader>
          <SectionTitle>Terms & Conditions</SectionTitle>
          <SectionSubtitle>
            Syarat dan ketentuan layanan Shinepartner
          </SectionSubtitle>
        </SectionHeader>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: "Bagaimana sistem pembayaran?",
              a: "Pembayaran dimulai dengan DP 50% dari harga paket yang dipilih saat booking. Pelunasan dilakukan H-3 sebelum hari H event.",
            },
            {
              q: "Bagaimana jika klien membatalkan pesanan?",
              a: "Jika klien membatalkan setelah booking: DP tidak bisa dikembalikan. Pembatalan harus dilakukan minimal H-7 sebelum hari H event.",
            },
            {
              q: "Bagaimana jika Shinepartner membatalkan pesanan?",
              a: "Jika Shinepartner membatalkan pesanan: DP akan 100% dikembalikan kepada klien. Perlu konfirmasi minimal H-3 sebelum hari H event.",
            },
            {
              q: "Apakah biaya sudah termasuk transport?",
              a: "Harga yang tertera sudah termasuk biaya transport untuk area Bandung/Jabodetabek. Untuk area luar akan ada biaya tambahan.",
            },
            {
              q: "Event apa saja yang bisa menggunakan jasa Shinepartner?",
              a: "Kami melayani berbagai event seperti: Wedding, Engagement, Siraman, Pengajian, Prewedding, Sangjit, Birthday, Graduation, dan event lainnya.",
            },
          ].map((faq) => (
            <Card key={faq.q} className="overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-heading font-bold text-primary list-none">
                  <span>{faq.q}</span>
                  <span className="text-accent group-open:rotate-180 transition-transform">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600">{faq.a}</div>
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
            Buat Momen Pernikahanmu
            <br />
            <span className="text-accent">Bersinar</span> Bersama ShinePartner.id
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/6282138016904?text=Halo%20Shinepartner!%20Saya%20tertarik%20dengan%20layanan%20wedding%20services.%20Mohon%20info%20lebih%20lanjut."
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
              Lihat Ketersediaan Tanggal
            </Button>
          </div>
        </div>
      </Section>

      {/* Contact Form Modal */}
      <ContactForm isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}

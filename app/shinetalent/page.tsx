"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Heart,
  Users,
  Target,
  TrendingUp,
  Sparkles,
  Star,
  Instagram,
  Video,
  Mic,
  ChevronRight,
} from "lucide-react";
import { Section, SectionHeader, SectionTitle, SectionSubtitle } from "@/components/ui/Section";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const platformLogos = [
  {
    name: "Instagram",
    icon: Instagram,
    color: "from-purple-500 to-pink-500",
    followers: "Nano to Growing",
  },
  {
    name: "TikTok",
    icon: Video,
    color: "from-black to-gray-800",
    followers: "All Levels",
  },
  {
    name: "YouTube",
    icon: Video,
    color: "from-red-600 to-red-500",
    followers: "All Levels",
  },
  {
    name: "Other",
    icon: Mic,
    color: "from-blue-500 to-blue-400",
    followers: "All Platforms",
  },
];

const focuses = [
  {
    icon: Users,
    title: "Talent Handling & Support",
    desc: "Kami siap di samping kamu — dari koordinasi jadwal, manajemen brand deal, sampai handle hal-hal administratif yang sering bikin kamu kewalahan.",
  },
  {
    icon: Target,
    title: "Content Direction & Consistency",
    desc: "Bantu kamu punya arah yang jelas: niche yang tajam, format yang konsisten, dan posting schedule yang realistis.",
  },
  {
    icon: TrendingUp,
    title: "Personal Growth as a Creator",
    desc: "Bukan soal viral atau trending. Ini tentang growth yang genuine — skill, confidence, dan karisma kamu sebagai talent.",
  },
];

const principles = [
  "Creator dari nano sampai growing level tetap berhak mendapatkan guidance, bukan pressure.",
  "Ini bukan tentang Mengejar brand — ini tentang membangun talent first.",
  "Setiap creator punya pace masing-masing. Kami respek itu.",
  "Community-driven: saling belajar, saling grow bareng.",
];

export default function ShineTalentPage() {
  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbJsonLd
        items={[
          { name: "Shinepartner.id", url: "https://shinepartner.id" },
          { name: "ShineTalent.co", url: "https://shinepartner.id/shinetalent" },
        ]}
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 border border-accent/20 rounded-full" />
          <div className="absolute bottom-20 right-20 w-48 h-48 border border-accent/10 rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-accent/30 rounded-full" />
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-accent/20 rounded-full" />
        </div>

        <div className="container-custom relative z-10 text-center text-white">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-white/60 hover:text-accent transition-colors text-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Brand badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm px-4 py-1.5 rounded-full mb-6">
              <Star className="w-3.5 h-3.5 text-accent" />
              Part of Shinepartner Ecosystem
            </div>

            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-4">
              Sub-brand
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              ShineTalent<span className="text-accent">.co</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed mb-4">
              Talent community & support system yang menjadi ruang aman untuk
              KOL dan content creator dari berbagai platform.
            </p>
            <p className="text-white/60 text-base max-w-2xl mx-auto leading-relaxed">
              (Instagram, TikTok, YouTube, dan lainnya.)
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <Section id="about">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-6">
            Kami adalah rumah untuk para creator
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Shine Talent Management hadir sebagai forum dan link untuk
            creator — <strong className="text-primary">tempat untuk saling
            belajar, berkembang, dan punya arah yang lebih jelas sebagai talent.</strong>
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Kami percaya, creator dari{" "}
            <strong className="text-primary">nano</strong> sampai{" "}
            <strong className="text-primary">growing level</strong> tetap
            berhak mendapatkan{" "}
            <strong className="text-accent">guidance</strong>, bukan
            pressure.
          </p>
        </div>
      </Section>

      {/* Platforms Section */}
      <Section variant="accent" id="platforms">
        <SectionHeader>
          <SectionTitle>Beragam Platform, Satu Komunitas</SectionTitle>
          <SectionSubtitle>
            Tidak peduli kamu aktif di mana — kami support kamu di semua platform
          </SectionSubtitle>
        </SectionHeader>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformLogos.map((platform) => (
            <div
              key={platform.name}
              className="bg-white rounded-2xl p-6 text-center shadow-soft hover:shadow-card transition-all duration-300"
            >
              <div
                className={`w-14 h-14 bg-gradient-to-br ${platform.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
              >
                <platform.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading font-bold text-primary mb-1">
                {platform.name}
              </h3>
              <p className="text-gray-500 text-sm">{platform.followers}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Focus Areas */}
      <Section id="focus">
        <SectionHeader>
          <SectionTitle>Fokus Kami</SectionTitle>
        </SectionHeader>
        <div className="grid md:grid-cols-3 gap-8">
          {focuses.map((focus, index) => (
            <motion.div
              key={focus.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <focus.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg text-primary mb-3">
                {focus.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {focus.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Core Principle Banner */}
      <section className="bg-primary py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Sparkles className="w-12 h-12 text-accent mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl font-heading font-bold leading-relaxed mb-4">
              &ldquo;This is not about chasing brands —
              <br />
              this is about{" "}
              <span className="text-accent">building the talent first</span>.&rdquo;
            </blockquote>
            <p className="text-white/60 text-lg">
              — Prinsip utama Shine Talent Management
            </p>
          </div>
        </div>
      </section>

      {/* Principles List */}
      <Section id="principles">
        <SectionHeader>
          <SectionTitle>Apa yang Kami Yakini</SectionTitle>
        </SectionHeader>
        <div className="max-w-2xl mx-auto space-y-4">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-start gap-4 bg-gray-50 rounded-2xl p-5"
            >
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-xs font-bold">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed">{principle}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section variant="accent">
        <div className="text-center max-w-2xl mx-auto">
          <Users className="w-10 h-10 text-accent mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4">
            Tertarik Bergabung?
          </h2>
          <p className="text-gray-600 mb-8">
            Mau jadi bagian dari komunitas kami atau butuh talent untuk brand
            kamu? Hubungi kami!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/6282138016904?text=Halo%20ShineTalent!%20Saya%20tertarik%20dengan%20Shine%20Talent%20Management.%20Mohon%20info%20lebih%20lanjut."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent text-primary font-medium rounded-2xl hover:bg-accent-light transition-all duration-300 shadow-soft hover:shadow-card"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Hubungi ShineTalent
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary font-medium rounded-2xl hover:bg-primary hover:text-white transition-all duration-300"
            >
              Lihat Shinepartner.id
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Users,
  Sparkles,
  Star,
  Calendar,
  MapPin,
  ChevronRight,
  HeartHandshake,
  Music,
  Wine,
} from "lucide-react";
import { Section, SectionHeader, SectionTitle, SectionSubtitle } from "@/components/ui/Section";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const howItWorks = [
  {
    step: "01",
    title: "Registrasi & Isi Form",
    desc: "Daftar melalui form kami dan isi informasi singkat tentang dirimu — minat, hobi, ekspektasi, dan kriteria yang kamu cari.",
  },
  {
    step: "02",
    title: "Proses Matching",
    desc: "Tim kami melakukan proses matching berdasarkan data yang kamu isi, untuk memastikan kecocokan yang terbaik.",
  },
  {
    step: "03",
    title: "Kamu Dapat Info Partner",
    desc: "Setelah cocok, kamu akan dapat informasi singkat tentang partner blind date-mu. Tanpa perlu tahu siapa dia sebelumnya.",
  },
  {
    step: "04",
    title: "Temui di Event",
    desc: "Datang ke event blind date, kenali partner kamu, dan lihat apakah chemistry terjadi!",
  },
];

const eventTypes = [
  {
    icon: Heart,
    title: "Blind Date Classic",
    desc: "Format klasik 1-on-1 conversation sessions di venue yang telah ditentukan.",
    participants: "20-40 peserta",
  },
  {
    icon: Music,
    title: "Blind Date with Music",
    desc: "Aktivitas musik & games yang bikin suasana lebih rileks dan natural.",
    participants: "30-50 peserta",
  },
  {
    icon: Wine,
    title: "Blind Date Premium Night",
    desc: "Event eksklusif dengan suasana upscale, cocktail & dinner untuk age 25+.",
    participants: "15-30 peserta",
  },
];

const testimonials = [
  {
    quote: "Nggak nyangka bakal ketemu seseorang yang cocok banget di blind date! Venue-nya seru dan organisasinya rapi.",
    name: "Rina",
    age: 27,
    city: "Jakarta",
  },
  {
    quote: "Awalnya ragu, tapi ternyata seru banget! Tim FindYourShine emang jago bikin suasana jadi comfortable.",
    name: "Dimas",
    age: 29,
    city: "Jakarta",
  },
  {
    quote: "Dari semua event yang pernah aku ikut, ini yang paling fresh dan fun. Worth it banget!",
    name: "Sari",
    age: 25,
    city: "Bandung",
  },
];

const faqs = [
  {
    q: "Apa itu blind date event?",
    a: "Blind date event adalah acara mempertemukan orang-orang yang belum saling kenal untuk berkenalan secara langsung dalam suasana yang seru dan terkurasi.",
  },
  {
    q: "Bagaimana proses matching-nya?",
    a: "Kami melakukan matching berdasarkan data yang kamu isi saat registrasi — minat, hobi, ekspektasi, dan preferensi. Matching dilakukan oleh tim kami secara manual.",
  },
  {
    q: "Apakah identitas peserta dijaga kerahasiaannya?",
    a: "Ya! Identitas peserta dijaga sebelum dan selama event. Partner kamu akan di-reveal setelah kamu tiba di venue.",
  },
  {
    q: "Berapa usia minimal untuk ikut?",
    a: "Umumnya 21 tahun ke atas. Untuk Premium Night, usia minimal 25 tahun.",
  },
  {
    q: "Bagaimana jika tidak ada chemistry dengan partner saya?",
    a: "Tidak masalah! Ini adalah pengalaman — datang, coba, dan nikmati prosesnya. Kami akan usahakan pengalaman terbaik untukmu.",
  },
  {
    q: "Apakah ada jaminan kecocokan?",
    a: "Kami tidak bisa menjamin kecocokan karena itu adalah proses personal. Yang bisa kami jamin adalah pengalaman event yang seru, aman, dan terkurasi.",
  },
];

export default function FindYourShinePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbJsonLd
        items={[
          { name: "Shinepartner.id", url: "https://shinepartner.id" },
          { name: "FindYourShine.id", url: "https://shinepartner.id/findyourshine" },
        ]}
      />

      {/* Hero Section — Sky Blue Theme */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Sky blue gradient background with dark accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600 via-sky-500 to-blue-700" />
        {/* Dark overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
        {/* Decorative circles */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-40 h-40 border border-white/20 rounded-full" />
          <div className="absolute bottom-20 right-20 w-60 h-60 border border-white/10 rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-5 h-5 bg-white/30 rounded-full" />
          <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-white/20 rounded-full" />
          {/* Subtle hearts */}
          <Heart className="absolute top-1/4 left-1/4 w-8 h-8 text-white/10" />
          <Heart className="absolute bottom-1/4 right-1/3 w-10 h-10 text-white/10 rotate-45" />
          <Heart className="absolute top-1/2 right-1/4 w-6 h-6 text-white/15 -rotate-12" />
        </div>

        <div className="container-custom relative z-10 text-center text-white">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-white/60 hover:text-white transition-colors text-sm mb-8"
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
              <Star className="w-3.5 h-3.5 text-white" />
              Part of Shinepartner Ecosystem
            </div>

            <p className="text-white/70 font-medium tracking-widest uppercase text-sm mb-4">
              Sub-brand
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              FindYourShine<span className="text-white">.id</span>
            </h1>
            <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              Event blind date yang seru dan terkurasi untuk kamu yang siap
              menemukan <span className="text-white font-semibold">chemistry</span>{" "}
              yang nyata.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/6282138016904?text=Halo%20FindYourShine!%20Saya%20tertarik%20dengan%20event%20blind%20date.%20Mohon%20info%20lebih%20lanjut."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-sky-600 font-semibold rounded-2xl hover:bg-white/90 transition-all duration-300 shadow-soft"
              >
                <HeartHandshake className="w-5 h-5 mr-2" />
                Ikut Event Berikutnya
              </a>
              <button
                onClick={() =>
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white font-medium rounded-2xl hover:bg-white/10 transition-all duration-300"
              >
                Pelajari Lebih Lanjut
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <Section id="about">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-sky-500" />
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-sky-700 mb-6">
            Temukan Chemistry yang Nyata
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            FindYourShine.id adalah event blind date yang dirancang untuk
            menjadi ruang aman bertemu orang baru — tanpa swipe, tanpa fake
            profile, tanpa awkwardness.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Datang dengan autentik, ketemu dengan cara yang seru, dan lihat
            apakah{" "}
            <strong className="text-sky-600">chemistry terjadi secara
            natural</strong>.
          </p>
        </div>
      </Section>

      {/* How It Works */}
      <Section className="bg-sky-50" id="how-it-works">
        <SectionHeader>
          <SectionTitle>Bagaimana Caramu Bekerja</SectionTitle>
          <SectionSubtitle>
            Dari registrasi sampai menemukan partner — prosessnya seru dan transparan
          </SectionSubtitle>
        </SectionHeader>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-soft"
            >
              <div className="text-4xl font-heading font-bold text-sky-400/60 mb-4">
                {step.step}
              </div>
              <h3 className="font-heading font-bold text-sky-700 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Event Types */}
      <Section id="events">
        <SectionHeader>
          <SectionTitle>Jenis Event</SectionTitle>
          <SectionSubtitle>
            Pilih format yang paling sesuai dengan preferensimu
          </SectionSubtitle>
        </SectionHeader>
        <div className="grid md:grid-cols-3 gap-8">
          {eventTypes.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-sky-50 rounded-2xl p-8 text-center hover:bg-sky-100/60 transition-colors"
            >
              <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <event.icon className="w-7 h-7 text-sky-600" />
              </div>
              <h3 className="font-heading font-bold text-lg text-sky-700 mb-2">
                {event.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {event.desc}
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs text-sky-600 font-medium bg-sky-100 px-3 py-1.5 rounded-full">
                <Users className="w-3 h-3" />
                {event.participants}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Upcoming Events */}
      <Section className="bg-sky-50" id="upcoming-events">
        <SectionHeader>
          <SectionTitle>Event Berikutnya</SectionTitle>
          <SectionSubtitle>
            Jangan sampai ketinggalan — slot terbatas!
          </SectionSubtitle>
        </SectionHeader>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              type: "Blind Date Classic",
              date: "April 2026",
              time: "14:00 - 18:00 WIB",
              location: "Jakarta",
              slots: 20,
              price: "Rp 150.000",
              badge: "Segera Hadir",
              badgeClass: "bg-sky-100 text-sky-600",
            },
            {
              type: "Blind Date with Music",
              date: "Mei 2026",
              time: "15:00 - 19:00 WIB",
              location: "Jakarta",
              slots: 30,
              price: "Rp 200.000",
              badge: "Segera Hadir",
              badgeClass: "bg-sky-100 text-sky-600",
            },
            {
              type: "Premium Night",
              date: "Juni 2026",
              time: "19:00 - 23:00 WIB",
              location: "Jakarta",
              slots: 15,
              price: "Rp 350.000",
              badge: "Segera Hadir",
              badgeClass: "bg-sky-100 text-sky-600",
            },
          ].map((event) => (
            <motion.div
              key={event.type + event.date}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-card transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 text-sky-500" />
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${event.badgeClass}`}>
                  {event.badge}
                </span>
              </div>
              <h3 className="font-heading font-bold text-sky-700 mb-3">{event.type}</h3>
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4 text-sky-400" />
                  <span>{event.date} &middot; {event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4 text-sky-400" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="w-4 h-4 text-sky-400" />
                  <span>{event.slots} slot tersedia</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="font-bold text-sky-700">{event.price}</span>
                <a
                  href={`https://wa.me/6282138016904?text=Halo%20FindYourShine!%20Saya%20tertarik%20daftar%20event%20${encodeURIComponent(event.type)}%20${event.date}.%20Mohon%20info%20lebih%20lanjut.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm bg-sky-500 text-white font-medium px-4 py-2 rounded-xl hover:bg-sky-600 transition-colors"
                >
                  Daftar
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-gray-500 text-sm mt-6">
          Registrasi ditutup H-3 sebelum event &middot;{" "}
          <a href="https://wa.me/6282138016904" className="text-sky-500 font-medium hover:underline">
            Hubungi kami untuk waitlist
          </a>
        </p>
      </Section>

      {/* Testimonials */}
      <Section id="testimonials">
        <SectionHeader>
          <SectionTitle>Mereka yang Sudah Menemukan Shine-nya</SectionTitle>
        </SectionHeader>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-sky-50 rounded-2xl p-6 shadow-soft"
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-4 h-4 text-sky-400 fill-sky-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 italic leading-relaxed mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-medium text-sky-700">{t.name}</p>
                <p className="text-gray-400 text-sm">{t.age} tahun &middot; {t.city}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <SectionHeader>
          <SectionTitle>Pertanyaan Umum</SectionTitle>
        </SectionHeader>
        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-sky-50 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left font-heading font-bold text-sky-700"
              >
                <span>{faq.q}</span>
                <span
                  className={`text-sky-500 transition-transform duration-200 flex-shrink-0 ml-4 ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              {openFaq === index && (
                <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-sky-600">
        <div className="text-center max-w-2xl mx-auto text-white">
          <Sparkles className="w-10 h-10 text-white/70 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
            Siap Menemukan Shine-mu?
          </h2>
          <p className="text-white/70 mb-8">
            Jangan tunggu lebih lama — event blind date berikutnya mungkin adalah
            awal dari cerita terbaikmu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/6282138016904?text=Halo%20FindYourShine!%20Saya%20tertarik%20untuk%20daftar%20event%20blind%20date%20berikutnya.%20Mohon%20info%20jadwal%20dan%20harga."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-sky-600 font-semibold rounded-2xl hover:bg-white/90 transition-all duration-300 shadow-soft"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Daftar via WhatsApp
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white font-medium rounded-2xl hover:bg-white/10 transition-all duration-300"
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

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Heart,
  Plane,
  MapPin,
  Calendar,
  Star,
  ChevronRight,
  Sparkles,
  Palmtree,
  Camera,
  Sun,
} from "lucide-react";
import { Section, SectionHeader, SectionTitle, SectionSubtitle } from "@/components/ui/Section";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const destinations = [
  {
    name: "Bali",
    country: "Indonesia",
    tagline: "Surga tropis dengan sunset spektakuler",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    type: "Honeymoon & Destination Wedding",
  },
  {
    name: "Yogyakarta",
    country: "Indonesia",
    tagline: "Ramah tamah dengan budaya Jawa yang kaya",
    image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80",
    type: "Pre-wedding & Honeymoon",
  },
  {
    name: "Bandung",
    country: "Indonesia",
    tagline: "Sejuk, asri, dan penuh tempat romantis",
    image: "https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=800&q=80",
    type: "Pre-wedding & Staycation",
  },
  {
    name: "Lombok",
    country: "Indonesia",
    tagline: "Pink Beach yang ikonik dengan pasir berwarna pink alami",
    image: "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?w=800&q=80",
    type: "Honeymoon & Elopement",
  },
  {
    name: "Raja Ampat",
    country: "Indonesia",
    tagline: "Surga bawah laut terbaik di dunia",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80",
    type: "Honeymoon & Intimate Wedding",
  },
  {
    name: "Labuan Bajo",
    country: "Indonesia",
    tagline: "Gerbang menuju kepulauan eksotis NTT",
    image: "https://images.unsplash.com/photo-1573790387438-4da905039392?w=800&q=80",
    type: "Honeymoon & Island Wedding",
  },
];

const services = [
  {
    icon: Plane,
    title: "Honeymoon Package",
    desc: "Paket lengkap honeymoon ke destinasi impian — transportasi, akomodasi, dan itinerary yang sudah dirancang khusus untuk couples.",
  },
  {
    icon: Camera,
    title: "Destination Prewedding",
    desc: "Foto & video prewedding di lokasi eksotis pilihanmu. Tim kami akan mengatur logistics dari A sampai Z.",
  },
  {
    icon: Heart,
    title: "Destination Wedding",
    desc: "Pernikahan di destinasi impian — dari intimate beach wedding hingga romantis garden ceremony di villa pribadi.",
  },
  {
    icon: Palmtree,
    title: "Elopement Package",
    desc: "Untuk couples yang ingin pernikahan kecil-kecilan tapi berkesan — intimate ceremony dengan all-in service.",
  },
];

const includes = [
  "Tiket pesawat pulang-pergi (domestik)",
  "Akomodasi hotel / villa bintang 4-5",
  "Private transport selama di destinasi",
  "Itinerary rinci (rencana harian)",
  "Dokumentasi foto & video (opsional add-on)",
  "Coordinate dengan vendor lokal",
  "Travel insurance",
  "Personal assistant saat di lokasi",
];

export default function TravelGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbJsonLd
        items={[
          { name: "Shinepartner.id", url: "https://shinepartner.id" },
          { name: "Travel Guide", url: "https://shinepartner.id/travel-guide" },
        ]}
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-primary-dark to-primary" />
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-48 h-48 border border-accent/20 rounded-full" />
          <div className="absolute bottom-20 left-10 w-32 h-32 border border-accent/10 rounded-full" />
          <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-accent/30 rounded-full" />
          <div className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-accent/20 rounded-full" />
          {/* Travel icons decoration */}
          <Palmtree className="absolute top-1/4 right-1/4 w-12 h-12 text-white/5" />
          <Plane className="absolute bottom-1/4 left-1/3 w-10 h-10 text-white/5 rotate-45" />
          <Sun className="absolute top-1/2 right-1/3 w-8 h-8 text-white/5" />
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
              <Star className="w-3.5 h-3.5 text-accent" />
              Part of Shinepartner Ecosystem
            </div>

            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-4">
              Sub-brand
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Travel Guide
              <br />
              <span className="text-accent">by Shinepartner.id</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed mb-4">
              Honeymoon, destination wedding, dan prewedding di destinasi impian
              — semua diatur dengan sempurna.
            </p>
            <p className="text-white/50 text-base max-w-2xl mx-auto leading-relaxed">
              Dari Bali yang romantis sampai Raja Ampat yang eksotis.
              <br />
              Biarkan kami yang urus logistics, kamu cukup{" "}
              <span className="text-accent font-semibold">nikmati momen</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <Section id="about">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Palmtree className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-6">
            Liburan Pernikahan Tanpa Stres
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Kami percaya bulan madu dan pernikahan destinasi seharusnya jadi
            momen paling berkesan — bukan yang paling bikin stress.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Tim kami menyediakan <strong className="text-primary">end-to-end
            travel service</strong> — dari bantuan pilih destinasi, booking
            akomodasi terbaik, sampai koordinasi vendor lokal di lokasi.
          </p>
        </div>
      </Section>

      {/* Services */}
      <Section variant="accent" id="services">
        <SectionHeader>
          <SectionTitle>Layanan Kami</SectionTitle>
          <SectionSubtitle>
            Berbagai layanan travel untuk melengkapi perjalanan pernikahanmu
          </SectionSubtitle>
        </SectionHeader>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-primary mb-2 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed text-center">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* What's Included */}
      <Section id="includes">
        <SectionHeader>
          <SectionTitle>Yang Termasuk</SectionTitle>
          <SectionSubtitle>
            Semua paket sudah termasuk kebutuhan essentials — kamu tinggal enjoy
          </SectionSubtitle>
        </SectionHeader>
        <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-4">
          {includes.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-start gap-3 bg-gray-50 rounded-xl p-4"
            >
              <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-gray-700 text-sm">{item}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Destinations */}
      <Section variant="accent" id="destinations">
        <SectionHeader>
          <SectionTitle>Destinasi Populer</SectionTitle>
          <SectionSubtitle>
            Pilihan destinasi terbaik untuk honeymoon dan pernikahan destinasi
          </SectionSubtitle>
        </SectionHeader>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group relative bg-gray-100 rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer"
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs bg-accent/90 text-primary px-2.5 py-1 rounded-full font-medium">
                  {dest.type}
                </span>
                <h3 className="text-white font-heading font-bold text-xl mt-3">
                  {dest.name}
                </h3>
                <div className="flex items-center gap-1 text-white/70 text-sm mt-1">
                  <MapPin className="w-3 h-3" />
                  {dest.country}
                </div>
                <p className="text-white/60 text-sm mt-2 line-clamp-2">
                  {dest.tagline}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section variant="primary">
        <div className="text-center text-white max-w-2xl mx-auto">
          <Plane className="w-10 h-10 text-accent mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
            Siap Liburan ke Destinasi Impian?
          </h2>
          <p className="text-white/60 mb-8">
            Konsultasi gratis untuk rencana honeymoon atau destination wedding
            kamu. Tim kami siap membantu!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/6282138016904?text=Halo%20Shinepartner%20Travel%20Guide!%20Saya%20tertarik%20dengan%20layanan%20honeymoon%20/%20destination%20wedding.%20Mohon%20info%20lebih%20lanjut."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent text-primary font-medium rounded-2xl hover:bg-accent-light transition-all duration-300 shadow-soft hover:shadow-card"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Konsultasi via WhatsApp
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

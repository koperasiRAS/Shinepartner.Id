"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import {
  ArrowLeft,
  Play,
  Heart,
  Camera,
  MapPin,
  Calendar,
  X,
  Youtube,
  Instagram,
} from "lucide-react";
import { Section } from "@/components/ui/Section";

const categories = [
  { id: "all", label: "Semua" },
  { id: "prewedding", label: "Prewedding" },
  { id: "akad-resepsi", label: "Akad & Resepsi" },
  { id: "engagement", label: "Engagement" },
  { id: "celebration", label: "Celebration" },
];

// Portfolio items — ganti field `videoUrl` dengan URL video asli dari pasangan
const portfolioItems = [
  {
    id: 1,
    title: "Adinda & Raka",
    category: "akad-resepsi",
    location: "Jakarta",
    date: "Januari 2025",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    type: "video",
    platform: "Instagram Reels",
    // Replace with real video URL, e.g.: "https://www.youtube.com/embed/VIDEO_ID"
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Sari & Budi",
    category: "prewedding",
    location: "Bali",
    date: "Februari 2025",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    type: "video",
    platform: "TikTok",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Maya & Fajar",
    category: "engagement",
    location: "Bandung",
    date: "Maret 2025",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80",
    type: "video",
    platform: "Instagram Reels",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "Dewi & Herman",
    category: "akad-resepsi",
    location: "Surabaya",
    date: "Maret 2025",
    image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80",
    type: "video",
    platform: "YouTube Shorts",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 5,
    title: "Nisa & Galuh",
    category: "prewedding",
    location: "Yogyakarta",
    date: "April 2025",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
    type: "video",
    platform: "Instagram Reels",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 6,
    title: "Fitri & Reno",
    category: "celebration",
    location: "Jakarta",
    date: "April 2025",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80",
    type: "video",
    platform: "TikTok",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 7,
    title: "Anisa & Dimas",
    category: "akad-resepsi",
    location: "Semarang",
    date: "Mei 2025",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
    type: "video",
    platform: "Instagram Reels",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 8,
    title: "Rini & Wahyu",
    category: "prewedding",
    location: "Bogor",
    date: "Juni 2025",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
    type: "video",
    platform: "YouTube Shorts",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 9,
    title: "Citra & Argo",
    category: "engagement",
    location: "Tangerang",
    date: "Juni 2025",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
    type: "video",
    platform: "Instagram Reels",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

const stats = [
  { number: "200+", label: "Event Diabadikan" },
  { number: "150+", label: "Pasangan Bahagia" },
  { number: "50M+", label: "Total Views" },
  { number: "15+", label: "Kota DiCover" },
];

type PortfolioItem = (typeof portfolioItems)[0];

function VideoModal({
  item,
  onClose,
}: {
  item: PortfolioItem;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-3xl z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white font-heading font-bold text-xl">
              {item.title}
            </h3>
            <div className="flex items-center gap-3 text-white/60 text-sm mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {item.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {item.date}
              </span>
              <span className="flex items-center gap-1">
                {item.platform === "Instagram Reels" ? (
                  <Instagram className="w-3 h-3" />
                ) : (
                  <Youtube className="w-3 h-3" />
                )}
                {item.platform}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            src={`${item.videoUrl}?autoplay=1&rel=0`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Caption */}
        <p className="text-white/50 text-sm text-center mt-4">
          Demo video — ganti <code className="text-white/70">videoUrl</code> di{" "}
          <code className="text-white/70">app/portfolio/page.tsx</code> dengan URL
          video asli pasangan.
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbJsonLd
        items={[
          { name: "Shinepartner.id", url: "https://shinepartner.id" },
          { name: "Portfolio", url: "https://shinepartner.id/portfolio" },
        ]}
      />

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal
            item={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-40 h-40 border border-accent/20 rounded-full" />
          <div className="absolute bottom-10 left-10 w-24 h-24 border border-accent/10 rounded-full" />
        </div>

        <div className="container-custom relative z-10 text-center text-white">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-white/60 hover:text-accent transition-colors text-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>

          <div>
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-4">
              Dokumentasi & Portfolio
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Momen yang Kami
              <br />
              <span className="text-accent">Abadikan</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Setiap pasangan punya cerita unik. Berikut beberapa momen yang telah
              kami abadikan dalam bentuk video.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary-dark py-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-heading font-bold text-accent">
                  {stat.number}
                </p>
                <p className="text-white/60 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <Section id="portfolio">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-primary text-white shadow-soft"
                  : "bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div
                className="group relative bg-gray-100 rounded-3xl overflow-hidden cursor-pointer aspect-[4/5]"
                onClick={() => setSelectedVideo(item)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Play Button */}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-accent/90 hover:bg-accent rounded-full flex items-center justify-center shadow-soft transition-transform duration-200 group-hover:scale-110">
                      <Play className="w-6 h-6 text-primary ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                )}

                {/* Info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-xs bg-accent/90 text-primary px-2.5 py-1 rounded-full font-medium inline-block mb-2">
                    {item.platform}
                  </span>
                  <h3 className="text-white font-heading font-bold text-lg">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-3 text-white/70 text-sm mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <Camera className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">Belum ada project dalam kategori ini</p>
          </div>
        )}
      </Section>

      {/* CTA Section */}
      <Section variant="accent">
        <div className="text-center max-w-2xl mx-auto">
          <Heart className="w-10 h-10 text-accent mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4">
            Ingin Momenmu Diabadikan?
          </h2>
          <p className="text-gray-600 mb-8">
            Hubungi kami untuk mendiskusikan konsep dan paket yang sesuai
            dengan kebutuhanmu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/6282138016904?text=Halo%20Shinepartner!%20Saya%20tertarik%20dengan%20layanan%20portfolio/content%20creator."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-medium rounded-2xl hover:bg-primary-light transition-all duration-300 shadow-soft"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Konsultasi via WhatsApp
            </a>
            <Link
              href="/#packages"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary font-medium rounded-2xl hover:bg-primary hover:text-white transition-all duration-300"
            >
              Lihat Paket
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}

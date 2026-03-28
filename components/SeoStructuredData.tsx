/**
 * SEO Structured Data Component
 * Outputs JSON-LD structured data for search engines
 */

// --- FAQ Data (shared with app/page.tsx) ---
export const faqData = [
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
    q: "Apakah bisa booking kurang dari 30 hari sebelum event?",
    a: "Bisa, tergantung ketersediaan. Namun disarankan booking minimal 2-4 minggu sebelumnya untuk koordinasi yang maksimal.",
  },
  {
    q: "Bagaimana cara booking?",
    a: "Cukup pilih paket yang diinginkan, klik Book Now atau tambahkan ke keranjang. Anda akan diarahkan ke WhatsApp untuk konfirmasi lebih lanjut.",
  },
  {
    q: "Berapa lama hasil video bisa diterima?",
    a: "Video highlight sameday edit bisa ditayangkan saat hari-H. File lengkap melalui Google Drive dalam 48 jam setelah event.",
  },
  {
    q: "Sudah termasuk editing?",
    a: "Ya, semua paket Content Creator sudah termasuk editing video cinematic highlight, wedding trend, dan moment video.",
  },
  {
    q: "Bisa request konsep/tema video?",
    a: "Bisa! Kami menerima request konsep dan tema video sesuai keinginan pasangan. Silakan diskusikan melalui WhatsApp.",
  },
  {
    q: "Apa bedanya Story IG Takeover real-time dan photo cut to cut?",
    a: "Real-time: story di-post langsung saat event berlangsung. Photo cut to cut: foto-foto pilihan diedit menjadi format slide story.",
  },
  {
    q: "Apa saja yang ditangani Wedding Organizer?",
    a: "WO menangani koordinasi vendor, rundown acara, gladi bersih, technical meeting, dan penanganan tamu VIP di hari-H.",
  },
  {
    q: "Berapa crew yang Included di paket WO?",
    a: "WO Intimate: 3 crew (1 Chief Coordinator + 2 Supporting). WO Signature: 5 crew (1 Chief Coordinator + 4 Supporting).",
  },
  {
    q: "Apa perbedaan WO Intimate dan Signature?",
    a: "Intimate untuk pernikahan dengan tamu terbatas (hingga 100 orang). Signature untuk celebration dengan tamu lebih banyak dan termasuk Day of Coordinator tambahan.",
  },
  {
    q: "Kapan sebaiknya hire Wedding Planner?",
    a: "Idealnya sejak 6-12 bulan sebelum pernikahan untuk planning yang matang. Namun partial planning dan day-of coordination bisa diambil sesuai kebutuhan.",
  },
  {
    q: "Apa perbedaan Full Service Planning dan Partial Planning?",
    a: "Full Service: kami handle dari awal hingga akhir termasuk vendor management dan on-the-day. Partial Planning: kami bantu sesuai kebutuhan spesifik Anda.",
  },
  {
    q: "Day-of Coordination mencakup apa saja?",
    a: "Final meeting, timeline execution, dan vendor coordination di hari-H event.",
  },
  {
    q: "Apa tugas Personal Bride Assistant?",
    a: "Mendampingi pengantin seharian, menjaga kelancaran outfit, touch up, koordinasi dengan WO & vendor, membawa barang penting, dan memberikan dukungan emosional.",
  },
  {
    q: "Berapa lama standby Bride Assistant?",
    a: "Standby 7 jam di hari-H event. Bisa ditambah extra time jika diperlukan.",
  },
  {
    q: "Apakah biaya sudah termasuk transport?",
    a: "Harga sudah termasuk biaya transport untuk area Jabodetabek dan Bandung. Untuk area luar akan ada biaya tambahan.",
  },
  {
    q: "Event apa saja yang bisa dilayani?",
    a: "Wedding (Akad, Pemberkatan, Resepsi), Engagement, Siraman, Pengajian, Prewedding, Sangjit, Birthday, Graduation, dan event lainnya.",
  },
  {
    q: "Apakah melayani destination wedding?",
    a: "Ya! Kami melayani destination wedding ke seluruh Indonesia bahkan internasional. Biaya transport dan akomodasi akan dihitung terpisah.",
  },
  {
    q: "Apa beda Shinepartner dengan Blind Date / Travel / Talent?",
    a: "Shinepartner.id fokus di wedding services (content creator, WO, WP). Blind Date, Travel, dan Talent adalah brand ekosistem kami yang bergerak di bidang masing-masing.",
  },
  {
    q: "Bagaimana联系 brand ekosistem lainnya?",
    a: "Silakan hubungi kami via WhatsApp untuk informasi brand ekosistem kami: FindYourShine.id, ShineTalent.co, dan layanan travel.",
  },
];

export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Shinepartner Ecosystem",
    url: "https://shinepartner.id",
    logo: "https://shinepartner.id/logo.png",
    description:
      "Your premier wedding services partner offering wedding content creator, wedding planner, travel services, and more.",
    foundingDate: "2020",
    foundingLocation: "Jakarta, Indonesia",
    areaServed: "Indonesia",
    knowsAbout: [
      "Wedding Planning",
      "Wedding Content Creator",
      "Destination Wedding",
      "Honeymoon Packages",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-821-3801-6904",
      contactType: "customer service",
      availableLanguage: ["Indonesian", "English"],
      areaServed: "ID",
    },
    sameAs: [
      "https://www.instagram.com/shinepartner",
      "https://www.facebook.com/shinepartner",
      "https://wa.me/6282138016904",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function LocalBusinessStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://shinepartner.id",
    name: "Shinepartner Ecosystem",
    image: "https://shinepartner.id/og-image.jpg",
    description:
      "Premier wedding services in Indonesia. Wedding planner, content creator, and travel services.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "-6.2088",
      longitude: "106.8456",
    },
    url: "https://shinepartner.id",
    telephone: "+6282138016904",
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "21:00",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Wedding Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Content Creator",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Planner",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Organizer",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Destination Wedding",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function ServiceStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Wedding Services",
    provider: {
      "@type": "Organization",
      name: "Shinepartner Ecosystem",
      url: "https://shinepartner.id",
    },
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Wedding Packages",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Silver Package",
            description: "Essential wedding content creator package",
          },
          price: "250000",
          priceCurrency: "IDR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Gold Package",
            description: "Premium wedding content creator with extra coverage",
          },
          price: "350000",
          priceCurrency: "IDR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Platinum Package",
            description: "Complete wedding coverage with full service",
          },
          price: "450000",
          priceCurrency: "IDR",
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function FAQStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function BreadcrumbStructuredData({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

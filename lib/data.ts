export interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
  category: "content-creator" | "planner" | "organizer" | "bride-assist" | "add-on";
  duration?: string;
  crew?: string[];
  subNote?: string;
}

export const packages: Package[] = [
  // === CONTENT CREATOR PACKAGES ===
  {
    id: "cc-silver",
    name: "Silver",
    price: 500000,
    description: "Akad / Pemberkatan / Resepsi",
    features: [
      "1 Content Creator",
      "3 Jam Stand By",
      "Shoot by iPhone",
      "5 Story IG Takeover (real-time)",
      "2 Story IG Takeover (photo cut to cut)",
      "1 Video Cinematic Highlight (max 1 menit, sameday edit)",
      "1 Video Wedding Trend (sesuai request, sameday edit)",
      "Unlimited Moment Video",
      "Google Drive 48 Jam",
      "1x Online Meeting (opsional)",
    ],
    category: "content-creator",
    duration: "3 Jam",
    crew: ["1 Content Creator"],
    subNote: "Pilih salah satu: Akad / Pemberkatan / Resepsi",
  },
  {
    id: "cc-gold",
    name: "Gold",
    price: 650000,
    description: "Akad / Pemberkatan / Resepsi",
    features: [
      "1 Content Creator",
      "5 Jam Stand By",
      "Shoot by iPhone",
      "5 Story IG Takeover (real-time)",
      "3 Story IG Takeover (photo cut to cut)",
      "2 Video Cinematic Highlight (max 1 menit, sameday edit)",
      "1 Video Wedding Trend (sesuai request, sameday edit)",
      "Unlimited Moment Video",
      "Google Drive 48 Jam",
      "1x Online Meeting (opsional)",
    ],
    recommended: true,
    category: "content-creator",
    duration: "5 Jam",
    crew: ["1 Content Creator"],
    subNote: "Pilih salah satu: Akad / Pemberkatan / Resepsi",
  },
  {
    id: "cc-platinum",
    name: "Platinum",
    price: 750000,
    description: "Akad / Pemberkatan / Resepsi",
    features: [
      "1 Content Creator",
      "7 Jam Stand By",
      "Shoot by iPhone",
      "6 Story IG Takeover (real-time)",
      "4 Story IG Takeover (photo cut to cut)",
      "3 Video Cinematic Highlight (max 1 menit, sameday edit)",
      "2 Video Wedding Trend (sesuai request, sameday edit)",
      "Unlimited Moment Video",
      "Google Drive 48 Jam",
      "1x Online Meeting (opsional)",
    ],
    category: "content-creator",
    duration: "7 Jam",
    crew: ["1 Content Creator"],
    subNote: "Pilih salah satu: Akad / Pemberkatan / Resepsi",
  },
  {
    id: "cc-event",
    name: "Event Package",
    price: 300000,
    description: "Engagement / Siraman / Pengajian / Prewedding / Sangjit / Birthday / Graduation",
    features: [
      "1 Content Creator",
      "2,5 Jam Stand By",
      "Shoot by iPhone",
      "5 Story IG Takeover (real-time)",
      "1 Video Cinematic Highlight (max 1 menit, sameday edit)",
      "Unlimited Moment Video",
      "Google Drive 48 Jam",
      "1x Online Meeting (opsional)",
    ],
    category: "content-creator",
    duration: "2.5 Jam",
    crew: ["1 Content Creator"],
  },

  // === WEDDING ORGANIZER PACKAGES ===
  {
    id: "wo-intimate",
    name: "WO Intimate",
    price: 1500000,
    description: "3 Crew untuk intimate wedding",
    features: [
      "3 Crew",
      "1 Chief Coordinator",
      "2 Supporting Crew",
      "Rapat Koordinasi 2x",
      "Rundown & Vendor Management",
      "Technical Meeting & Gladi",
      "7 Jam Standby",
    ],
    category: "organizer",
    duration: "7 Jam",
    crew: ["1 Chief Coordinator", "2 Supporting Crew"],
  },
  {
    id: "wo-signature",
    name: "WO Signature",
    price: 2500000,
    description: "5 Crew untuk celebration dengan tamu lebih banyak",
    features: [
      "5 Crew",
      "1 Chief Coordinator",
      "4 Supporting Crew",
      "All Service WO Intimate",
      "1 Day of Coordinator Tambahan",
      "Handling Vendor + Tamu VIP",
    ],
    recommended: true,
    category: "organizer",
    duration: "Full Day",
    crew: ["1 Chief Coordinator", "4 Supporting Crew"],
  },

  // === WEDDING PLANNER PACKAGES ===
  {
    id: "wp-full",
    name: "Full Service Planning",
    price: 1500000,
    description: "Perencanaan wedding komprehensif dari awal hingga akhir",
    features: [
      "Initial Consultation",
      "Vendor Management",
      "Event Design",
      "On-the-Day Coordination",
    ],
    category: "planner",
    duration: "Full Service",
    crew: ["1 Wedding Planner"],
  },
  {
    id: "wp-partial",
    name: "Partial Planning",
    price: 1000000,
    description: "Bantuan perencanaan sesuai kebutuhan",
    features: [
      "Consultation",
      "Vendor Help",
      "Task Assistance",
    ],
    category: "planner",
    duration: "Partial",
    crew: ["1 Wedding Planner"],
  },
  {
    id: "wp-day",
    name: "Day-of Coordination",
    price: 500000,
    description: "Koordinasi di hari H event",
    features: [
      "Final Meeting",
      "Timeline Execution",
      "Vendor Coordination",
    ],
    category: "planner",
    duration: "Day Of",
    crew: ["1 Day Coordinator"],
  },

  // === PERSONAL BRIDE ASSISTANT ===
  {
    id: "bride-assist",
    name: "Personal Bride Assistant",
    price: 350000,
    description: "Asisten pendamping pengantin wanita seharian",
    features: [
      "7 Jam Standby",
      "Mendampingi pengantin seharian",
      "Menjaga kelancaran outfit",
      "Touch up pengantin",
      "Membantu kebutuhan pribadi",
      "Pemenuhan kebutuhan makan minum",
      "Membawa barang penting (ponsel, dompet, lipstick)",
      "Menjaga gaun & aksesoris tertata rapi",
      "Koordinasi dengan WO & vendor",
      "Dukungan emosional",
      "Memastikan kelancaran acara",
      "Mendampingi hingga pelepasan pengantin",
    ],
    category: "bride-assist",
    duration: "7 Jam",
    crew: ["1 Bride Assistant"],
  },

  // === ADD-ONS ===
  {
    id: "add-wp-full",
    name: "Wedding Planner Full Service",
    price: 1500000,
    description: "Layanan perencanaan wedding lengkap",
    features: [
      "Initial Consultation",
      "Vendor Management",
      "Event Design",
      "On-the-Day Coordination",
    ],
    category: "add-on",
  },
  {
    id: "add-cc",
    name: "Content Creator",
    price: 500000,
    description: "Tambah layanan Content Creator",
    features: [
      "1 Content Creator",
      "3 Jam Standby",
    ],
    category: "add-on",
  },
  {
    id: "add-mc",
    name: "MC / Host",
    price: 1500000,
    description: "Layanan MC atau Host professional",
    features: [
      "MC Professional",
      "Starting from Rp 1.500.000",
    ],
    category: "add-on",
  },
  {
    id: "add-docs",
    name: "Dokumentasi Foto + Video",
    price: 2500000,
    description: "Paket dokumentasi lengkap",
    features: [
      "Foto + Video",
      "Starting from Rp 2.500.000",
    ],
    category: "add-on",
  },
  {
    id: "add-extra-time",
    name: "Extra Time CC",
    price: 50000,
    description: "Tambah jam Content Creator",
    features: [
      "Per jam",
      "Extra Time Content Creator",
    ],
    category: "add-on",
  },
  {
    id: "add-video-cinematic",
    name: "Video Cinematic",
    price: 100000,
    description: "Tambah Video Cinematic",
    features: [
      "Per video",
      "Cinematic Quality",
    ],
    category: "add-on",
  },
  {
    id: "add-video-tiktok",
    name: "Video TikTok",
    price: 50000,
    description: "Tambah Video TikTok",
    features: [
      "Per video",
      "TikTok Ready",
    ],
    category: "add-on",
  },
];

// Add-ons pricing (for display purposes)
export const addOnPricing = {
  weddingPlanner: { price: 1500000, name: "Wedding Planner Full Service" },
  contentCreator: { price: 500000, name: "Content Creator" },
  mcHost: { price: 1500000, name: "MC / Host" },
  dokumentasi: { price: 2500000, name: "Dokumentasi Foto + Video" },
  extraTime: { price: 50000, name: "Extra Time CC" },
  videoCinematic: { price: 100000, name: "Video Cinematic" },
  videoTikTok: { price: 50000, name: "Video TikTok" },
};

// Service categories for tabs
export const serviceCategories = [
  { id: "content-creator", label: "Content Creator", icon: "📹" },
  { id: "organizer", label: "Wedding Organizer", icon: "🎯" },
  { id: "planner", label: "Wedding Planner", icon: "📋" },
] as const;

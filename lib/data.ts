export interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
  category: "content-creator" | "planner" | "organizer";
}

export const packages: Package[] = [
  // Wedding Content Creator Packages
  {
    id: "cc-silver",
    name: "Silver Package",
    price: 250000,
    description: "Perfect for intimate weddings seeking quality content",
    features: [
      "4 hours coverage",
      "1 photographer",
      "100 edited photos",
      "1 minute highlight video",
      "Online gallery",
    ],
    category: "content-creator",
  },
  {
    id: "cc-gold",
    name: "Gold Package",
    price: 350000,
    description: "Our most popular choice for complete wedding coverage",
    features: [
      "8 hours coverage",
      "1 photographer + 1 videographer",
      "300 edited photos",
      "3 minute highlight video",
      "Online gallery",
      "Same-day preview",
    ],
    recommended: true,
    category: "content-creator",
  },
  {
    id: "cc-platinum",
    name: "Platinum Package",
    price: 450000,
    description: "Premium coverage for the most important day",
    features: [
      "12 hours coverage",
      "2 photographers + 1 videographer",
      "500 edited photos",
      "5 minute cinematic video",
      "Online gallery",
      "Same-day preview",
      "Photo album",
    ],
    category: "content-creator",
  },

  // Wedding Planner Packages
  {
    id: "wp-full",
    name: "Full Service",
    price: 1500000,
    description: "Complete wedding planning from start to finish",
    features: [
      "Unlimited consultations",
      "Vendor research & booking",
      "Budget management",
      "Timeline creation",
      "Day-of coordination",
      "Full rehearsal direction",
      "Emergency contact",
    ],
    recommended: true,
    category: "planner",
  },
  {
    id: "wp-partial",
    name: "Partial Service",
    price: 1000000,
    description: "Perfect when you've started planning but need guidance",
    features: [
      "6 consultations",
      "Vendor recommendations",
      "Budget review",
      "Timeline assistance",
      "Day-of coordination",
    ],
    category: "planner",
  },
  {
    id: "wp-day",
    name: "Day Of Coordination",
    price: 500000,
    description: "Relax on your day while we handle everything",
    features: [
      "2 consultations prior",
      "Vendor confirmation",
      "Timeline execution",
      "Day-of coordination",
      "Emergency handling",
    ],
    category: "planner",
  },

  // Wedding Organizer Packages
  {
    id: "wo-intimate",
    name: "WO Intimate",
    price: 1500000,
    description: "For intimate gatherings up to 50 guests",
    features: [
      "Venue setup & breakdown",
      "Guest coordination",
      "Timeline management",
      "Vendor liaison",
      "Decoration handling",
      "1 assistant coordinator",
    ],
    category: "organizer",
  },
  {
    id: "wo-signature",
    name: "WO Signature",
    price: 2500000,
    description: "For grand celebrations up to 200 guests",
    features: [
      "Complete venue management",
      "Guest coordination",
      "Full timeline execution",
      "Multi-vendor liaison",
      "Premium decoration",
      "3 assistant coordinators",
      "Emergency protocol",
    ],
    recommended: true,
    category: "organizer",
  },
];

export const serviceCategories = [
  { id: "content-creator", label: "Content Creator", icon: "📹" },
  { id: "planner", label: "Wedding Planner", icon: "📋" },
  { id: "organizer", label: "Wedding Organizer", icon: "🎯" },
] as const;

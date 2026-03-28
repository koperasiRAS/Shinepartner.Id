import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Footer } from "@/components/layout";
import {
  WebsiteStructuredData,
  LocalBusinessStructuredData,
  ServiceStructuredData,
  FAQStructuredData,
} from "@/components/SeoStructuredData";
import { ClientLayout } from "@/components/layout/ClientLayout";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shinepartner.id"),
  title: {
    default: "Shinepartner Ecosystem | Wedding Services, Travel & Talent",
    template: "%s | Shinepartner Ecosystem",
  },
  description:
    "Shinepartner Ecosystem — Your premier partner for wedding services, honeymoon travel, talent management, and blind date events. Shinepartner.id (wedding), Travel Guide (honeymoon & destination wedding), ShineTalent.co (KOL & content creator community), FindYourShine.id (blind date events).",
  keywords: [
    "wedding services",
    "wedding planner jakarta",
    "wedding content creator",
    "destination wedding bali",
    "honeymoon trip",
    "wedding organizer",
    "Indonesia wedding",
    "wedding packages",
    "pre-wedding",
    "wedding MC",
    "bride assistant",
    "shinetalent",
    "findyourshine",
    "shinetalent management",
    "content creator community",
    "blind date jakarta",
    "blind date event",
    "destination wedding",
    "honeymoon package indonesia",
  ],
  authors: [{ name: "Shinepartner" }],
  creator: "Shinepartner",
  publisher: "Shinepartner Ecosystem",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://shinepartner.id",
    languages: {
      "id-ID": "https://shinepartner.id",
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://shinepartner.id",
    siteName: "Shinepartner Ecosystem",
    title: "Shinepartner Ecosystem | Wedding Services & Travel",
    description:
      "Your premier wedding services partner offering wedding content creator, wedding planner, travel services, and more.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Shinepartner Ecosystem - Wedding Services",
      },
      {
        url: "/og-image.svg",
        width: 1080,
        height: 1080,
        alt: "Shinepartner Wedding",
      },
    ],
    videos: [
      {
        url: "https://shinepartner.id/intro-video.mp4",
        width: 1280,
        height: 720,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@shinepartner",
    creator: "@shinepartner",
    title: "Shinepartner Ecosystem | Wedding Services & Travel",
    description:
      "Your premier wedding services partner offering wedding content creator, wedding planner, travel services, and more.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Shinepartner",
  },
  appLinks: {
    ios: {
      url: "https://shinepartner.id",
      app_store_id: "123456789",
    },
    android: {
      package: "com.shinepartner.app",
      url: "https://shinepartner.id",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#1f3d2b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <WebsiteStructuredData />
        <LocalBusinessStructuredData />
        <ServiceStructuredData />
        <FAQStructuredData />
      </head>
      <body className="min-h-screen bg-white font-body antialiased">
        <ClientLayout>{children}</ClientLayout>
        <Footer />
      </body>
    </html>
  );
}

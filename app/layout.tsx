import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Navbar, Footer, WhatsAppButton } from "@/components/layout";
import {
  WebsiteStructuredData,
  LocalBusinessStructuredData,
  ServiceStructuredData,
} from "@/components/SeoStructuredData";
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
    default: "Shinepartner Ecosystem | Wedding Services & Travel",
    template: "%s | Shinepartner Ecosystem",
  },
  description:
    "Shinepartner Ecosystem - Your premier wedding services partner offering wedding content creator, wedding planner, travel services, and more. Perfect wedding, perfectly managed.",
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
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shinepartner Ecosystem - Wedding Services",
      },
      {
        url: "/og-image-square.jpg",
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
    images: ["/og-image.jpg"],
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
      </head>
      <body className="min-h-screen bg-white font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

/**
 * SEO Structured Data Component
 * Outputs JSON-LD structured data for search engines
 */

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

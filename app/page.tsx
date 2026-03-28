"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/Section";
import { PackagesSection } from "@/components/home/PackagesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ContactForm } from "@/components/home/ContactForm";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-primary overflow-hidden">
        {/* Video Background Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/60 via-primary/40 to-primary-light/30" />

        <div className="container-custom relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
            Your Wedding, <br />
            <span className="text-accent">Perfectly Managed</span> & Captured
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
            Premium wedding services with love and dedication. From planning to
            execution, we make your special day unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() =>
                document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Book Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() =>
                document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Services
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Ecosystem Section */}
      <Section id="ecosystem">
        <SectionHeader>
          <SectionTitle>Our Ecosystem</SectionTitle>
          <SectionSubtitle>
            Three brands working together to serve your wedding needs
          </SectionSubtitle>
        </SectionHeader>
        <div className="grid md:grid-cols-3 gap-8">
          <Card hover className="text-center border-t-4 border-t-accent">
            <CardHeader>
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💍</span>
              </div>
              <CardTitle>Shinepartner.id</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Wedding services & travel solutions. Complete wedding packages
                from content creation to honeymoon trips.
              </p>
            </CardContent>
          </Card>
          <Card hover className="text-center border-t-4 border-t-primary">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">❤️</span>
              </div>
              <CardTitle>FindYourShine.id</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Blind date events for meaningful connections. Find your perfect
                match in our exclusive matchmaking events.
              </p>
            </CardContent>
          </Card>
          <Card hover className="text-center border-t-4 border-t-accent">
            <CardHeader>
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⭐</span>
              </div>
              <CardTitle>ShineTalent.co</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Talent management & KOL community. Connect with top influencers
                and content creators for your wedding.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Services Section */}
      <Section id="services" variant="accent">
        <SectionHeader>
          <SectionTitle>Our Services</SectionTitle>
          <SectionSubtitle>
            Comprehensive wedding services to make your day perfect
          </SectionSubtitle>
        </SectionHeader>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Wedding Content Creator", icon: "📹", desc: "Capture every moment" },
            { name: "Wedding Planner", icon: "📋", desc: "Full planning support" },
            { name: "Wedding Organizer", icon: "🎯", desc: "Day-of coordination" },
            { name: "Personal Bride Assistant", icon: "👰", desc: "VIP bride care" },
            { name: "MC Wedding", icon: "🎤", desc: "Professional host" },
            { name: "Digital Invitation", icon: "💌", desc: "Elegant e-invites" },
            { name: "Custom Souvenir", icon: "🎁", desc: "Personalized gifts" },
          ].map((service) => (
            <Card key={service.name} hover className="text-center group">
              <CardContent className="py-8">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft group-hover:shadow-card transition-shadow">
                  <span className="text-4xl">{service.icon}</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-primary mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-500 text-sm">{service.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Wedding Packages Section */}
      <PackagesSection />

      {/* Travel Section */}
      <Section id="travel">
        <SectionHeader>
          <SectionTitle>Travel Services</SectionTitle>
          <SectionSubtitle>
            Make your wedding journey memorable with our travel services
          </SectionSubtitle>
        </SectionHeader>
        <div className="grid md:grid-cols-3 gap-8">
          <Card hover>
            <div className="aspect-video bg-gradient-to-br from-primary to-primary-light rounded-2xl mb-4 flex items-center justify-center">
              <span className="text-6xl">✈️</span>
            </div>
            <CardHeader>
              <CardTitle>Honeymoon Trip</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Romantic honeymoon packages to dream destinations. Let us handle
                every detail of your post-wedding getaway.
              </p>
            </CardContent>
          </Card>
          <Card hover>
            <div className="aspect-video bg-gradient-to-br from-accent/80 to-accent rounded-2xl mb-4 flex items-center justify-center">
              <span className="text-6xl">🏝️</span>
            </div>
            <CardHeader>
              <CardTitle>Destination Wedding</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Exchange vows in breathtaking locations. Beach, mountain, or
                city - we make your destination wedding seamless.
              </p>
            </CardContent>
          </Card>
          <Card hover>
            <div className="aspect-video bg-gradient-to-br from-primary-light to-primary rounded-2xl mb-4 flex items-center justify-center">
              <span className="text-6xl">🗺️</span>
            </div>
            <CardHeader>
              <CardTitle>Private Tour Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Personal tour guide services for wedding guests. Explore local
                attractions with professional guidance.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Sub Brand Section */}
      <Section id="sub-brand" variant="primary">
        <SectionHeader>
          <SectionTitle className="text-white">Our Brands</SectionTitle>
          <SectionSubtitle className="text-white/80">
            Discover our family of brands serving different needs
          </SectionSubtitle>
        </SectionHeader>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/15 transition-colors">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center">
                <span className="text-3xl">💕</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-2xl text-white">
                  FindYourShine.id
                </h3>
                <p className="text-accent">Blind Date Events</p>
              </div>
            </div>
            <p className="text-white/80 mb-6">
              Find your perfect match through our exclusive blind date events.
              We create meaningful connections in a safe, fun environment.
            </p>
            <a
              href="https://findyourshine.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-accent hover:text-white transition-colors"
            >
              Visit FindYourShine.id
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/15 transition-colors">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center">
                <span className="text-3xl">✨</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-2xl text-white">
                  ShineTalent.co
                </h3>
                <p className="text-accent">Talent Management</p>
              </div>
            </div>
            <p className="text-white/80 mb-6">
              Connect with top influencers and content creators for your
              wedding. Professional talent management for memorable events.
            </p>
            <a
              href="https://shinetalent.co"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-accent hover:text-white transition-colors"
            >
              Visit ShineTalent.co
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </Section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Portfolio Section */}
      <Section id="portfolio">
        <SectionHeader>
          <SectionTitle>Our Portfolio</SectionTitle>
          <SectionSubtitle>
            See our work in action - captured moments from beautiful weddings
          </SectionSubtitle>
        </SectionHeader>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { name: "Wedding Ceremony", emoji: "💒" },
            { name: "Pre-Wedding", emoji: "📸" },
            { name: "Reception", emoji: "🎉" },
            { name: "Editorial", emoji: "✨" },
            { name: "Cultural", emoji: "🏛️" },
            { name: "Modern", emoji: "🌟" },
            { name: "Intimate", emoji: "💐" },
            { name: "Luxury", emoji: "👑" },
          ].map((category) => (
            <div
              key={category.name}
              className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl flex flex-col items-center justify-center gap-3 hover:from-primary/30 hover:to-accent/30 transition-colors cursor-pointer group"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">
                {category.emoji}
              </span>
              <span className="font-heading font-bold text-primary/60 text-sm group-hover:text-primary transition-colors">
                {category.name}
              </span>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button variant="outline" size="lg">
            View All Portfolio
          </Button>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section id="faq" variant="accent">
        <SectionHeader>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <SectionSubtitle>
            Find answers to common questions about our services
          </SectionSubtitle>
        </SectionHeader>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: "How far in advance should I book your services?",
              a: "We recommend booking at least 3-6 months in advance, especially for peak wedding seasons. However, we also accommodate last-minute bookings based on availability.",
            },
            {
              q: "Do you offer customized packages?",
              a: "Yes! We understand every wedding is unique. Contact us for a personalized package that fits your needs and budget.",
            },
            {
              q: "What areas do you serve?",
              a: "We primarily serve Jakarta and surrounding areas, but we also handle destination weddings throughout Indonesia and internationally.",
            },
            {
              q: "How do I book your services?",
              a: "Simply fill out the booking form on our website or contact us via WhatsApp. We'll get back to you within 24 hours to discuss your requirements.",
            },
          ].map((faq) => (
            <Card key={faq.q} className="overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-heading font-bold text-primary list-none">
                  <span>{faq.q}</span>
                  <span className="text-accent group-open:rotate-180 transition-transform">
                    <svg
                      className="w-6 h-6"
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
                </summary>
                <div className="px-6 pb-6 text-gray-600">{faq.a}</div>
              </details>
            </Card>
          ))}
        </div>
      </Section>

      {/* Contact CTA Section */}
      <Section id="contact" variant="primary">
        <div className="text-center text-white max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Contact us via WhatsApp for a free consultation and let us help make
            your wedding dreams come true.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/6282138016904?text=Halo%20Shinepartner!%20Saya%20tertarik%20dengan%20layanan%20wedding%20services.%20Mohon%20info%20lebih%20lanjut."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent text-primary font-medium rounded-2xl hover:bg-accent-light transition-all duration-300 shadow-soft hover:shadow-card"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() =>
                document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Services
            </Button>
          </div>
        </div>
      </Section>

      {/* Contact Form Modal */}
      <ContactForm isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}

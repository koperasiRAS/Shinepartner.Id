"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PackageCard } from "./PackageCard";
import { BookingModal } from "./BookingModal";
import { Section, SectionHeader, SectionTitle, SectionSubtitle } from "@/components/ui/Section";
import { packages, serviceCategories } from "@/lib/data";
import type { Package } from "@/lib/data";

export function PackagesSection() {
  const [activeTab, setActiveTab] = useState<string>(serviceCategories[0].id);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPackages = packages.filter((pkg) => pkg.category === activeTab);

  const handleBook = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  return (
    <>
      <Section id="packages" variant="default">
        <SectionHeader>
          <SectionTitle>Wedding Packages</SectionTitle>
          <SectionSubtitle>
            Choose the perfect package for your special day
          </SectionSubtitle>
        </SectionHeader>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-primary/5 p-1.5 rounded-2xl">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300
                  ${
                    activeTab === category.id
                      ? "bg-primary text-white shadow-soft"
                      : "text-primary hover:bg-primary/10"
                  }
                `}
                aria-selected={activeTab === category.id}
                role="tab"
              >
                <span>{category.icon}</span>
                <span className="hidden sm:inline">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <PackageCard pkg={pkg} onBook={handleBook} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Additional Services */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {/* Bride Assistant */}
          <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-3xl p-8 border border-accent/20">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">👰</span>
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-bold text-xl text-primary mb-2">
                  Personal Bride Assistant
                </h3>
                <p className="text-gray-600 mb-4">
                  Make your special day stress-free with our dedicated bride assistant.
                  From preparation to the ceremony, we&apos;ve got you covered.
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-2xl text-primary">
                    Rp 500.000
                  </span>
                  <button
                    onClick={() =>
                      handleBook({
                        id: "bride-assistant",
                        name: "Bride Assistant",
                        price: 500000,
                        description: "VIP bride care for your special day",
                        features: [
                          "Full-day assistant",
                          "Dress handling",
                          "Schedule management",
                          "Emergency support",
                          "Vendor coordination",
                        ],
                        category: "content-creator",
                      })
                    }
                    className="text-accent hover:text-accent-dark font-medium flex items-center gap-1"
                  >
                    Book Now
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MC Wedding */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 border border-primary/20">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">🎤</span>
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-bold text-xl text-primary mb-2">
                  MC Wedding
                </h3>
                <p className="text-gray-600 mb-4">
                  Professional wedding emcee to keep your guests entertained and
                  the flow of your celebration seamless.
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-2xl text-primary">
                    Contact for Price
                  </span>
                  <a
                    href="https://wa.me/6282138016904?text=Halo%20Shinepartner!%20Saya%20tertarik%20dengan%20layanan%20MC%20Wedding.%20Mohon%20info%20lebih%20lanjut."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-dark font-medium flex items-center gap-1"
                  >
                    Inquire Now
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedPackage={selectedPackage}
      />
    </>
  );
}

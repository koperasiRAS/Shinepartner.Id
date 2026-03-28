"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { PackageCard } from "./PackageCard";
import { Section, SectionHeader, SectionTitle, SectionSubtitle } from "@/components/ui/Section";
import { packages } from "@/lib/data";
import type { Package } from "@/lib/data";

// Lazy-load BookingModal — only needed on interaction
const BookingModal = dynamic(
  () => import("./BookingModal").then((mod) => mod.BookingModal),
  {
    ssr: false,
    loading: () => null,
  }
);

export function PackagesSection() {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Only show Content Creator packages
  const ccPackages = packages.filter((pkg) => pkg.category === "content-creator");

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
          <SectionTitle>Content Creator Package</SectionTitle>
          <SectionSubtitle>
            Pilihan paket content creator untuk momen spesialmu
          </SectionSubtitle>
        </SectionHeader>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ccPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <PackageCard pkg={pkg} onBook={handleBook} />
            </motion.div>
          ))}
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

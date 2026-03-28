"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown, ChevronUp, Clock, Camera, ShoppingBag } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import type { Package } from "@/lib/data";

interface PackageCardProps {
  pkg: Package;
  onBook: (pkg: Package) => void;
}

export function PackageCard({ pkg, onBook }: PackageCardProps) {
  const [showFeatures, setShowFeatures] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(pkg);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative flex flex-col h-full"
    >
      {pkg.recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span className="bg-accent text-primary text-sm font-medium px-4 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <Card
        variant={pkg.recommended ? "elevated" : "default"}
        className={`flex flex-col h-full ${pkg.recommended ? "border-2 border-accent" : ""}`}
      >
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl">{pkg.name}</CardTitle>

          {/* Duration Badge */}
          {pkg.duration && (
            <div className="inline-flex items-center justify-center gap-1 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full mt-2">
              <Clock className="w-3 h-3" />
              {pkg.duration}
            </div>
          )}

          <p className="text-primary font-bold text-3xl mt-2">
            {formatCurrency(pkg.price)}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            {pkg.price >= 1000000 ? "per package" : "per session"}
          </p>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          <p className="text-gray-600 text-center mb-4">{pkg.description}</p>

          {/* Crew Info */}
          {pkg.crew && pkg.crew.length > 0 && (
            <div className="bg-primary/5 rounded-xl p-3 mb-4">
              <div className="flex items-center gap-2 text-primary text-xs font-medium mb-2">
                <Camera className="w-3 h-3" />
                Crew
              </div>
              <div className="flex flex-wrap gap-1">
                {pkg.crew.map((crew, index) => (
                  <span key={`${pkg.id}-crew-${index}`} className="bg-white text-gray-600 text-xs px-2 py-1 rounded-full">
                    {crew}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3 flex-1">
            {pkg.features.slice(0, showFeatures ? undefined : 5).map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-accent" />
                </div>
                <span className="text-gray-600 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {pkg.features.length > 5 && (
            <button
              onClick={() => setShowFeatures(!showFeatures)}
              className="flex items-center justify-center gap-1 text-primary text-sm font-medium mt-4 w-full hover:text-accent transition-colors"
            >
              {showFeatures ? (
                <>
                  Show less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  View all {pkg.features.length} features <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </CardContent>

        <CardFooter className="pt-4 flex-col gap-2">
          <Button
            variant={pkg.recommended ? "secondary" : "outline"}
            size="lg"
            className="w-full"
            onClick={() => onBook(pkg)}
          >
            Book Now
          </Button>
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-primary/10 text-primary/60 font-medium rounded-xl hover:bg-primary/5 hover:border-primary/20 transition-colors text-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            Tambah ke Keranjang
          </button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

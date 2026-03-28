"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import type { Package } from "@/lib/data";

interface PackageCardProps {
  pkg: Package;
  onBook: (pkg: Package) => void;
}

export function PackageCard({ pkg, onBook }: PackageCardProps) {
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
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
        className={`h-full flex flex-col ${pkg.recommended ? "border-2 border-accent" : ""}`}
      >
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl">{pkg.name}</CardTitle>
          <p className="text-primary font-bold text-3xl mt-2">
            {formatCurrency(pkg.price)}
          </p>
          <p className="text-gray-500 text-sm mt-1">per package</p>
        </CardHeader>

        <CardContent className="flex-1">
          <p className="text-gray-600 text-center mb-6">{pkg.description}</p>

          <div className="space-y-3">
            {pkg.features.slice(0, showFeatures ? undefined : 4).map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-accent" />
                </div>
                <span className="text-gray-600 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {pkg.features.length > 4 && (
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

        <CardFooter className="pt-4">
          <Button
            variant={pkg.recommended ? "secondary" : "outline"}
            size="lg"
            className="w-full"
            onClick={() => onBook(pkg)}
          >
            Book Now
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout";
import { CartDrawer } from "@/components/home/CartDrawer";
import { CartProvider } from "@/lib/cart-context";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      {children}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </CartProvider>
  );
}

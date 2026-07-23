import { useState } from "react";
import type { Product } from "@/types";

export interface CartState {
  count: number;
  lastAdded: Product | null;
  addToCart: (product: Product) => void;
  clearNotification: () => void;
}

export function useCart(): CartState {
  const [count, setCount] = useState(2);
  const [lastAdded, setLastAdded] = useState<Product | null>(null);

  const addToCart = (product: Product) => {
    setCount((current) => current + 1);
    setLastAdded(product);
    window.setTimeout(() => setLastAdded(null), 2800);
  };

  return {
    count,
    lastAdded,
    addToCart,
    clearNotification: () => setLastAdded(null),
  };
}

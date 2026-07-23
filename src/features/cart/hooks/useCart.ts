import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/types";
import type { AddToCartInput, CartItem } from "@/features/cart/types";

const STORAGE_KEY = "noir-district-cart";

function readStoredCart(): CartItem[] {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? (JSON.parse(value) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export interface CartState {
  items: CartItem[];
  count: number;
  isOpen: boolean;
  lastAdded: Product | null;
  addToCart: (input: AddToCartInput) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  clearNotification: () => void;
}

export function useCart(): CartState {
  const [items, setItems] = useState<CartItem[]>(readStoredCart);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<Product | null>(null);
  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = ({ product, size, color, quantity }: AddToCartInput) => {
    const itemId = `${product.id}-${size ?? "unique"}-${color}`;
    setItems((current) => {
      const existing = current.find((item) => item.id === itemId);
      if (!existing) {
        return [...current, { id: itemId, product, size, color, quantity }];
      }
      return current.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.min(10, item.quantity + quantity) }
          : item,
      );
    });
    setLastAdded(product);
    window.setTimeout(() => setLastAdded(null), 2800);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      setItems((current) => current.filter((item) => item.id !== itemId));
      return;
    }
    setItems((current) =>
      current.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.min(10, quantity) }
          : item,
      ),
    );
  };

  return {
    items,
    count,
    isOpen,
    lastAdded,
    addToCart,
    updateQuantity,
    removeItem: (itemId) =>
      setItems((current) => current.filter((item) => item.id !== itemId)),
    clearCart: () => setItems([]),
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    clearNotification: () => setLastAdded(null),
  };
}

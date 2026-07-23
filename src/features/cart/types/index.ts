import type { Product, ProductColor, ProductSize } from "@/types";

export interface CartItem {
  id: string;
  product: Product;
  size: ProductSize | null;
  color: ProductColor;
  quantity: number;
}

export interface AddToCartInput {
  product: Product;
  size: ProductSize | null;
  color: ProductColor;
  quantity: number;
}

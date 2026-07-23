export type ProductBadge = "MÁS VENDIDO" | "NUEVO" | "ÚLTIMAS UNIDADES";
export type ProductSize = "S" | "M" | "L" | "XL";
export type ProductColor =
  | "Negro"
  | "Blanco"
  | "Hueso"
  | "Azul lavado"
  | "Gris carbón";
export type ProductCategory =
  | "Essential Oversize"
  | "Core Neutrals"
  | "Denim & Cargo"
  | "After Dark";
export type ProductType = "Polo" | "Chaqueta" | "Pantalón" | "Hoodie";

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  badge: ProductBadge;
  category: ProductCategory;
  type: ProductType;
  sizes: ProductSize[];
  colors: ProductColor[];
  spritePosition: string;
  imageAlt: string;
}

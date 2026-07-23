export type ProductBadge = "MÁS VENDIDO" | "NUEVO" | "ÚLTIMAS UNIDADES";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  badge: ProductBadge;
  spritePosition: string;
  imageAlt: string;
}

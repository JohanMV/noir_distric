import type { Product } from "@/types";

const products: Product[] = [
  {
    id: "shadow-tee",
    name: "Shadow Graphic Tee",
    description: "Algodón pesado · fit oversize",
    price: 129,
    badge: "MÁS VENDIDO",
    spritePosition: "0% 0%",
    imageAlt: "Polo negro oversize con gráfico abstracto",
  },
  {
    id: "washed-denim",
    name: "Washed Denim Jacket",
    description: "Denim lavado · corte relajado",
    price: 249,
    badge: "NUEVO",
    spritePosition: "50% 0%",
    imageAlt: "Chaqueta de denim azul lavado",
  },
  {
    id: "utility-cargo",
    name: "Utility Cargo 02",
    description: "Sarga resistente · pierna amplia",
    price: 189,
    badge: "MÁS VENDIDO",
    spritePosition: "100% 0%",
    imageAlt: "Pantalón cargo negro de pierna amplia",
  },
  {
    id: "bone-hoodie",
    name: "Bone Heavy Hoodie",
    description: "Felpa premium · 480 gramos",
    price: 219,
    badge: "NUEVO",
    spritePosition: "0% 100%",
    imageAlt: "Hoodie color crema de corte amplio",
  },
  {
    id: "night-bomber",
    name: "Night Bomber",
    description: "Nylon mate · relleno ligero",
    price: 289,
    badge: "ÚLTIMAS UNIDADES",
    spritePosition: "50% 100%",
    imageAlt: "Chaqueta bomber negra de nylon",
  },
  {
    id: "blank-tee",
    name: "Blank Tee White",
    description: "Algodón peinado · boxy fit",
    price: 99,
    badge: "NUEVO",
    spritePosition: "100% 100%",
    imageAlt: "Polo blanco liso de corte boxy",
  },
];

export function getCatalogProducts(): Product[] {
  return products;
}

import { productsSprite } from "@/assets";
import type { Product } from "@/types";

export interface ProductImageProps {
  product: Product;
  className?: string;
}

export function ProductImage({
  product,
  className = "",
}: ProductImageProps) {
  return (
    <div
      role="img"
      aria-label={product.imageAlt}
      className={`bg-no-repeat ${className}`}
      style={{
        backgroundImage: `url(${productsSprite})`,
        backgroundPosition: product.spritePosition,
        backgroundSize: "300% auto",
      }}
    />
  );
}

import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { productsSprite } from "@/assets";
import type { Product } from "@/types";

export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const currency = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
  minimumFractionDigits: 0,
});

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      layout
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className="group flex min-w-0 flex-col rounded-[1.75rem] border border-ink/8 bg-card p-3 transition-shadow hover:shadow-card"
    >
      <div className="relative overflow-hidden rounded-[1.3rem] bg-white">
        <span
          className={`absolute top-3 left-3 z-10 rounded-full px-3 py-1.5 text-[0.62rem] font-extrabold tracking-wide ${
            product.badge === "NUEVO" ? "bg-blue-soft" : "bg-sand"
          }`}
        >
          {product.badge}
        </span>
        <button
          type="button"
          onClick={() => setIsFavorite((current) => !current)}
          className="absolute top-2.5 right-2.5 z-10 grid size-10 place-items-center rounded-full text-ink transition hover:bg-mist focus-visible:outline-2 focus-visible:outline-ink"
          aria-label={
            isFavorite
              ? `Quitar ${product.name} de favoritos`
              : `Añadir ${product.name} a favoritos`
          }
          aria-pressed={isFavorite}
        >
          <Heart
            className="size-5"
            fill={isFavorite ? "currentColor" : "none"}
            aria-hidden
          />
        </button>
        <div
          role="img"
          aria-label={product.imageAlt}
          className="aspect-[4/3] w-full bg-no-repeat transition-transform duration-500 group-hover:scale-[1.035]"
          style={{
            backgroundImage: `url(${productsSprite})`,
            backgroundPosition: product.spritePosition,
            backgroundSize: "300% auto",
          }}
        />
      </div>
      <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
        <h3 className="font-bold tracking-[-0.02em] text-ink">{product.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          {product.description}
        </p>
        <div className="mt-5 flex items-center justify-between">
          <p className="text-xl font-extrabold tracking-[-0.04em] text-ink">
            {currency.format(product.price)}
          </p>
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="grid size-11 place-items-center rounded-full border border-ink/20 bg-white transition hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink active:scale-95"
            aria-label={`Añadir ${product.name} al carrito`}
          >
            <ShoppingBag className="size-4.5" aria-hidden />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

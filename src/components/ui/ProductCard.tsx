import { useState } from "react";
import { ArrowUpRight, Heart } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ProductImage } from "@/components/ui/ProductImage";
import { STORE_CONFIG } from "@/lib/storeConfig";
import type { Product } from "@/types";

export interface ProductCardProps {
  product: Product;
  compactOnMobile?: boolean;
  onSelectProduct: (product: Product) => void;
}

const currency = new Intl.NumberFormat(STORE_CONFIG.locale, {
  style: "currency",
  currency: STORE_CONFIG.currency,
  minimumFractionDigits: 0,
});

export function ProductCard({
  product,
  compactOnMobile = false,
  onSelectProduct,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      layout
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className={`group flex min-w-0 flex-col rounded-[1.75rem] border border-ink/8 bg-card transition-shadow hover:shadow-card ${compactOnMobile ? "p-2 sm:p-3" : "p-3"}`}
    >
      <div className="relative overflow-hidden rounded-[1.3rem] bg-white">
        <span className={`absolute z-10 rounded-full font-extrabold tracking-wide ${compactOnMobile ? "top-2 left-2 max-w-[calc(100%-2.75rem)] truncate px-2 py-1 text-[0.48rem] sm:top-3 sm:left-3 sm:px-3 sm:py-1.5 sm:text-[0.62rem]" : "top-3 left-3 px-3 py-1.5 text-[0.62rem]"} ${product.badge === "NUEVO" ? "bg-blue-soft" : "bg-sand"}`}>
          {product.badge}
        </span>
        <button
          type="button"
          onClick={() => setIsFavorite((current) => !current)}
          className={`absolute z-10 grid place-items-center rounded-full text-ink transition hover:bg-mist focus-visible:outline-2 focus-visible:outline-ink ${compactOnMobile ? "top-1.5 right-1.5 size-8 sm:top-2.5 sm:right-2.5 sm:size-10" : "top-2.5 right-2.5 size-10"}`}
          aria-label={isFavorite ? `Quitar ${product.name} de favoritos` : `Añadir ${product.name} a favoritos`}
          aria-pressed={isFavorite}
        >
          <Heart className={compactOnMobile ? "size-4 sm:size-5" : "size-5"} fill={isFavorite ? "currentColor" : "none"} aria-hidden />
        </button>
        <button type="button" onClick={() => onSelectProduct(product)} className="block w-full focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-ink" aria-label={`Ver detalle de ${product.name}`}>
          <ProductImage product={product} className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.035]" />
        </button>
      </div>
      <div className={`flex flex-1 flex-col ${compactOnMobile ? "px-1 pt-3 pb-1 sm:px-2 sm:pt-5 sm:pb-2" : "px-2 pt-5 pb-2"}`}>
        <button type="button" onClick={() => onSelectProduct(product)} className="text-left focus-visible:outline-2 focus-visible:outline-ink">
          <h3 className={`font-bold tracking-[-0.02em] text-ink ${compactOnMobile ? "text-[0.78rem] leading-tight sm:text-base" : ""}`}>
            {product.name}
          </h3>
          <p className={`mt-1 text-muted ${compactOnMobile ? "line-clamp-2 text-[0.67rem] leading-snug sm:text-sm sm:leading-relaxed" : "text-sm leading-relaxed"}`}>
            {product.description}
          </p>
        </button>
        <div className={`mt-auto flex items-center justify-between ${compactOnMobile ? "pt-3 sm:pt-5" : "pt-5"}`}>
          <p className={`font-extrabold tracking-[-0.04em] text-ink ${compactOnMobile ? "text-base sm:text-xl" : "text-xl"}`}>
            {currency.format(product.price)}
          </p>
          <button
            type="button"
            onClick={() => onSelectProduct(product)}
            className={`grid place-items-center rounded-full border border-ink/20 bg-white transition hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink active:scale-95 ${compactOnMobile ? "size-9 sm:size-11" : "size-11"}`}
            aria-label={`Elegir talla de ${product.name}`}
          >
            <ArrowUpRight className="size-4.5" aria-hidden />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

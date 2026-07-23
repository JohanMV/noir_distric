import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ProductImage } from "@/components/ui/ProductImage";
import type { AddToCartInput } from "@/features/cart/types";
import { STORE_CONFIG } from "@/lib/storeConfig";
import type { Product, ProductColor, ProductSize } from "@/types";

export interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (input: AddToCartInput) => void;
}

const currency = new Intl.NumberFormat(STORE_CONFIG.locale, {
  style: "currency",
  currency: STORE_CONFIG.currency,
});

export function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [size, setSize] = useState<ProductSize | null>(null);
  const [color, setColor] = useState<ProductColor>("Negro");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!product) return;
    setSize(null);
    setColor(product.colors[0]);
    setQuantity(1);
    setError("");
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose, product]);

  const handleAdd = () => {
    if (!product) return;
    if (product.sizes.length > 0 && !size) {
      setError("Selecciona una talla antes de continuar.");
      return;
    }
    onAddToCart({ product, size, color, quantity });
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-ink/40 p-3 backdrop-blur-sm md:p-6" onClick={onClose}>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="fixed top-4 right-4 z-[80] inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 text-xs font-extrabold text-white shadow-card transition hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Cerrar detalle del producto"
          >
            <X className="size-4" aria-hidden />
            <span>Cerrar</span>
          </button>
          <motion.div role="dialog" aria-modal="true" aria-labelledby="product-detail-title" initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }} onClick={(event) => event.stopPropagation()} className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-card md:grid-cols-2">
            <div className="bg-card p-5 md:p-8">
              <ProductImage product={product} className="aspect-square size-full rounded-[1.5rem] bg-white" />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <span className="w-fit rounded-full bg-sand px-3 py-1.5 text-[0.65rem] font-extrabold">{product.badge}</span>
              <h2 id="product-detail-title" className="mt-5 text-3xl font-extrabold tracking-[-0.045em] uppercase md:text-4xl">{product.name}</h2>
              <p className="mt-3 leading-relaxed text-muted">{product.longDescription}</p>
              <p className="mt-5 text-3xl font-extrabold tracking-[-0.05em]">{currency.format(product.price)}</p>

              <fieldset className="mt-7">
                <legend className="text-xs font-extrabold uppercase">Talla *</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.sizes.map((value) => (
                    <button key={value} type="button" onClick={() => { setSize(value); setError(""); }} aria-pressed={size === value} className="grid size-11 place-items-center rounded-full border border-ink/20 text-sm font-bold transition aria-pressed:bg-ink aria-pressed:text-white">
                      {value}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset className="mt-5">
                <legend className="text-xs font-extrabold uppercase">Color</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.colors.map((value) => (
                    <button key={value} type="button" onClick={() => setColor(value)} aria-pressed={color === value} className="rounded-full border border-ink/15 px-4 py-2 text-xs font-bold transition aria-pressed:bg-ink aria-pressed:text-white">
                      {value}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase">Cantidad</span>
                <div className="flex items-center rounded-full border border-ink/15">
                  <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="grid size-10 place-items-center" aria-label="Reducir cantidad"><Minus className="size-4" aria-hidden /></button>
                  <span className="min-w-8 text-center font-extrabold">{quantity}</span>
                  <button type="button" onClick={() => setQuantity((value) => Math.min(10, value + 1))} className="grid size-10 place-items-center" aria-label="Aumentar cantidad"><Plus className="size-4" aria-hidden /></button>
                </div>
              </div>
              {error && <p className="mt-4 text-sm font-bold text-red-700" role="alert">{error}</p>}
              <button type="button" onClick={handleAdd} className="mt-5 flex min-h-13 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-extrabold text-white transition hover:bg-charcoal">
                <ShoppingBag className="size-4" aria-hidden /> Agregar al carrito
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

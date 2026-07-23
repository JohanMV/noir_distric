import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ProductImage } from "@/components/ui/ProductImage";
import { buildWhatsAppCheckoutUrl, getCartTotal } from "@/features/cart/services";
import type { CartItem } from "@/features/cart/types";
import { STORE_CONFIG } from "@/lib/storeConfig";

export interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
  onClear: () => void;
}

const currency = new Intl.NumberFormat(STORE_CONFIG.locale, {
  style: "currency",
  currency: STORE_CONFIG.currency,
});

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemove,
  onClear,
}: CartDrawerProps) {
  const reduceMotion = useReducedMotion();
  const checkoutUrl = buildWhatsAppCheckoutUrl(items);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] bg-ink/35 backdrop-blur-sm"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={reduceMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            onClick={(event) => event.stopPropagation()}
            className="absolute top-0 right-0 flex h-full w-full max-w-lg flex-col bg-white p-5 shadow-card md:p-7"
          >
            <div className="flex items-center justify-between border-b border-ink/10 pb-5">
              <div>
                <p className="text-xs font-extrabold tracking-[0.16em] text-muted uppercase">
                  Tu selección
                </p>
                <h2 id="cart-title" className="mt-1 text-2xl font-extrabold tracking-[-0.04em] uppercase">
                  Carrito ({items.reduce((sum, item) => sum + item.quantity, 0)})
                </h2>
              </div>
              <button type="button" onClick={onClose} className="grid size-11 place-items-center rounded-full border border-ink/15 hover:bg-mist" aria-label="Cerrar carrito">
                <X className="size-5" aria-hidden />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="grid flex-1 place-items-center text-center">
                <div>
                  <span className="mx-auto grid size-16 place-items-center rounded-full bg-mist">
                    <ShoppingBag className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold">Tu carrito está vacío</h3>
                  <p className="mt-2 text-sm text-muted">Explora la tienda y elige tu próxima pieza.</p>
                  <button type="button" onClick={onClose} className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white">Seguir comprando</button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto py-5">
                  {items.map((item) => (
                    <article key={item.id} className="grid grid-cols-[5.5rem_1fr_auto] gap-3 rounded-2xl bg-card p-3">
                      <ProductImage product={item.product} className="aspect-square rounded-xl bg-white" />
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-extrabold">{item.product.name}</h3>
                        <p className="mt-1 text-xs text-muted">Talla {item.size ?? "Única"} · {item.color}</p>
                        <p className="mt-2 text-sm font-bold">{currency.format(item.product.price)}</p>
                        <div className="mt-3 flex w-fit items-center rounded-full border border-ink/15 bg-white">
                          <button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="grid size-8 place-items-center" aria-label={`Reducir cantidad de ${item.product.name}`}><Minus className="size-3.5" aria-hidden /></button>
                          <span className="min-w-7 text-center text-xs font-extrabold">{item.quantity}</span>
                          <button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="grid size-8 place-items-center" aria-label={`Aumentar cantidad de ${item.product.name}`}><Plus className="size-3.5" aria-hidden /></button>
                        </div>
                      </div>
                      <button type="button" onClick={() => onRemove(item.id)} className="grid size-9 place-items-center rounded-full text-muted hover:bg-white hover:text-red-700" aria-label={`Quitar ${item.product.name}`}>
                        <Trash2 className="size-4" aria-hidden />
                      </button>
                    </article>
                  ))}
                </div>
                <div className="border-t border-ink/10 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Total</span>
                    <strong className="text-2xl tracking-[-0.04em]">{currency.format(getCartTotal(items))}</strong>
                  </div>
                  <a href={checkoutUrl} target="_blank" rel="noreferrer" className="mt-5 flex min-h-13 items-center justify-center rounded-full bg-ink px-6 text-sm font-extrabold text-white transition hover:bg-charcoal">
                    Finalizar pedido por WhatsApp
                  </a>
                  <button type="button" onClick={onClear} className="mt-3 w-full py-2 text-xs font-bold text-muted underline underline-offset-4 hover:text-ink">
                    Vaciar carrito
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

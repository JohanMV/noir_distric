import { STORE_CONFIG } from "@/lib/storeConfig";
import type { CartItem } from "@/features/cart/types";

const currency = new Intl.NumberFormat(STORE_CONFIG.locale, {
  style: "currency",
  currency: STORE_CONFIG.currency,
});

export function getCartTotal(items: CartItem[]): number {
  return items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
}

export function buildWhatsAppCheckoutUrl(items: CartItem[]): string {
  const lines = items.flatMap((item, index) => {
    const subtotal = item.product.price * item.quantity;
    return [
      `${index + 1}. *${item.product.name}*`,
      `   Talla: ${item.size ?? "Única"} · Color: ${item.color}`,
      `   Cantidad: ${item.quantity} × ${currency.format(item.product.price)}`,
      `   Subtotal: ${currency.format(subtotal)}`,
      "",
    ];
  });
  const message = [
    `Hola ${STORE_CONFIG.name}, quiero realizar este pedido:`,
    "",
    ...lines,
    `*TOTAL: ${currency.format(getCartTotal(items))}*`,
    "",
    "¿Podrían confirmarme disponibilidad y entrega?",
  ].join("\n");

  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

import { CreditCard, Headphones, RotateCcw, Truck } from "lucide-react";

const items = [
  [Truck, "Envío nacional", "Gratis desde S/ 250"],
  [RotateCcw, "Cambios fáciles", "Hasta 14 días"],
  [CreditCard, "Pago seguro", "Protección en cada compra"],
  [Headphones, "Soporte real", "Te ayudamos por WhatsApp"],
];

export function TrustStrip() {
  return (
    <section className="content-shell py-4" aria-label="Beneficios de compra">
      <div className="grid overflow-hidden rounded-[1.8rem] bg-mist sm:grid-cols-2 xl:grid-cols-4">
        {items.map(([Icon, title, text], index) => {
          const ItemIcon = Icon as typeof Truck;
          return (
            <div key={title as string} className={`flex items-center gap-3 px-5 py-5 ${index > 0 ? "border-t border-ink/8 sm:border-t-0 sm:border-l" : ""}`}>
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white">
                <ItemIcon className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className="text-sm font-extrabold">{title as string}</h3>
                <p className="mt-0.5 text-xs text-muted">{text as string}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

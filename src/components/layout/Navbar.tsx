import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";

export interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
  variant?: "hero" | "shop";
}

const links = [
  { label: "Tienda", href: "#/tienda" },
  { label: "Colecciones", href: "/#categories" },
  { label: "Novedades", href: "/#products" },
  { label: "Nosotros", href: "/#contact" },
];

export function Navbar({
  cartCount,
  onCartOpen,
  variant = "hero",
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isShop = variant === "shop";

  return (
    <nav className={`relative z-40 flex min-h-20 items-center justify-between gap-4 px-5 md:px-8 xl:px-10 ${isShop ? "border-b border-ink/10 bg-white" : ""}`} aria-label="Navegación principal">
      <a href="#/" className="flex shrink-0 items-center gap-2.5 font-extrabold tracking-[-0.04em]" aria-label="NOIR DISTRICT, inicio">
        <span className="grid size-9 place-items-center rounded-full bg-ink text-xs text-white">ND</span>
        <span className="leading-[0.85]">NOIR<br />DISTRICT</span>
      </a>

      <div className={`hidden items-center gap-7 lg:flex ${isShop ? "lg:absolute lg:left-1/2 lg:-translate-x-1/2" : ""}`}>
        {links.map((link) => (
          <a key={link.label} href={link.href} className="text-xs font-bold text-ink transition hover:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
            {link.label.toUpperCase()}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button type="button" onClick={onCartOpen} className="flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 text-xs font-bold text-white transition hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" aria-label={`Abrir carrito con ${cartCount} artículos`}>
          <ShoppingBag className="size-4" aria-hidden />
          <span className="hidden sm:inline">CARRITO</span> ({cartCount})
        </button>
        {!isShop && (
          <button type="button" onClick={() => setIsOpen((value) => !value)} className="grid size-11 place-items-center rounded-full border border-ink/20 text-ink lg:hidden" aria-expanded={isOpen} aria-controls="mobile-menu" aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}>
            {isOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        )}
      </div>

      {!isShop && isOpen && (
        <div id="mobile-menu" className="absolute top-[4.5rem] right-4 left-4 rounded-3xl bg-white p-4 shadow-card lg:hidden">
          {links.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setIsOpen(false)} className="block rounded-2xl px-4 py-3 text-sm font-bold hover:bg-mist">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

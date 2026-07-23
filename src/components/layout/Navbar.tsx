import { useState } from "react";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";

export interface NavbarProps {
  cartCount: number;
}

const links = [
  { label: "Tienda", href: "#/tienda" },
  { label: "Colecciones", href: "/#categories" },
  { label: "Novedades", href: "/#products" },
  { label: "Nosotros", href: "/#contact" },
];

export function Navbar({ cartCount }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative z-40 flex min-h-20 items-center justify-between gap-4 px-5 md:px-8 xl:px-10" aria-label="Navegación principal">
      <a href="#/" className="flex shrink-0 items-center gap-2.5 font-extrabold tracking-[-0.04em]" aria-label="NOIR DISTRICT, inicio">
        <span className="grid size-9 place-items-center rounded-full bg-ink text-xs text-white">ND</span>
        <span className="leading-[0.85]">NOIR<br />DISTRICT</span>
      </a>

      <div className="hidden items-center gap-6 lg:flex">
        {links.map((link) => (
          <a key={link.label} href={link.href} className="text-xs font-bold text-ink transition hover:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
            {link.label.toUpperCase()}
          </a>
        ))}
      </div>

      <div className="hidden items-center gap-2 md:flex">
        <button type="button" className="grid size-11 place-items-center rounded-full border border-ink/20 transition hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-ink" aria-label="Buscar">
          <Search className="size-4.5" aria-hidden />
        </button>
        <button type="button" className="flex min-h-11 items-center gap-2 rounded-full border border-ink/20 px-4 text-xs font-bold transition hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-ink">
          <UserRound className="size-4" aria-hidden /> INICIAR SESIÓN
        </button>
        <button type="button" className="flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 text-xs font-bold text-white transition hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" aria-label={`Carrito con ${cartCount} artículos`}>
          <ShoppingBag className="size-4" aria-hidden /> CARRITO ({cartCount})
        </button>
      </div>

      <button type="button" onClick={() => setIsOpen((value) => !value)} className="grid size-11 place-items-center rounded-full bg-ink text-white md:hidden" aria-expanded={isOpen} aria-controls="mobile-menu" aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}>
        {isOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
      </button>

      {isOpen && (
        <div id="mobile-menu" className="absolute top-[4.5rem] right-4 left-4 rounded-3xl bg-white p-4 shadow-card md:hidden">
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

import { Instagram, MessageCircle, Music2 } from "lucide-react";

const columns = [
  { title: "Empresa", links: ["Nosotros", "Tiendas", "Trabaja con nosotros", "Prensa"] },
  { title: "Ayuda", links: ["Preguntas frecuentes", "Cambios y devoluciones", "Guía de tallas", "Seguimiento"] },
  { title: "Soporte", links: ["Contacto", "Términos y condiciones", "Privacidad", "Libro de reclamaciones"] },
];

export function Footer() {
  return (
    <footer className="content-shell pb-5 pt-12">
      <div className="rounded-[2rem] bg-mist px-6 py-10 md:px-10">
        <div className="grid gap-10 border-b border-ink/10 pb-9 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <a href="#/" className="inline-flex items-center gap-3 font-extrabold tracking-[-0.04em]" aria-label="NOIR DISTRICT, inicio">
              <span className="grid size-10 place-items-center rounded-full bg-ink text-xs text-white">ND</span>
              NOIR DISTRICT
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Ropa urbana creada en Lima para quienes convierten la calle en su propio código.
            </p>
            <div className="mt-5 flex gap-2">
              {[Instagram, MessageCircle, Music2].map((Icon, index) => (
                <a key={index} href="#" className="grid size-10 place-items-center rounded-full bg-white transition hover:bg-ink hover:text-white" aria-label={["Instagram", "WhatsApp", "TikTok"][index]}>
                  <Icon className="size-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>
          <div className="grid gap-7 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-extrabold uppercase">{column.title}</h3>
                <ul className="mt-4 space-y-2">
                  {column.links.map((link) => (
                    <li key={link}><a href="#" className="text-sm text-muted transition hover:text-ink">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 NOIR DISTRICT. Todos los derechos reservados.</p>
          <p>Visa · Mastercard · Yape · Plin</p>
        </div>
      </div>
    </footer>
  );
}

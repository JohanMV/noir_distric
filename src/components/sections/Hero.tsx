import { useState, type FormEvent } from "react";
import { ArrowRight, Award, RotateCcw, Search, ShieldCheck, Truck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { heroImage } from "@/assets";
import { Navbar } from "@/components/layout";

export interface HeroProps {
  cartCount: number;
  onSearch: (query: string) => void;
}

const chips = ["oversize", "denim", "cargos", "básicos"];

export function Hero({ cartCount, onSearch }: HeroProps) {
  const [query, setQuery] = useState("");
  const reduceMotion = useReducedMotion();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query.trim());
  };

  return (
    <section className="page-shell pt-4 md:pt-6" aria-labelledby="hero-title">
      <div className="relative min-h-[760px] overflow-hidden rounded-[2rem] bg-hero md:rounded-[2.75rem] xl:min-h-[820px]">
        <Navbar cartCount={cartCount} />
        <div className="grid min-h-[680px] lg:grid-cols-[1.06fr_0.94fr]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="relative z-10 flex flex-col justify-center px-6 py-10 md:px-10 xl:px-14"
          >
            <p className="mb-4 flex items-center gap-2 text-xs font-extrabold tracking-[0.16em] uppercase">
              <Award className="size-4" aria-hidden /> Nueva colección 2026
            </p>
            <h1 id="hero-title" className="max-w-3xl text-[clamp(3.2rem,6vw,6.6rem)] leading-[0.86] font-extrabold tracking-[-0.065em] text-ink uppercase">
              Viste la ciudad a tu manera
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/66 md:text-lg">
              Prendas urbanas de edición limitada, cortes precisos y actitud sin esfuerzo. Diseñadas para moverse contigo.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#products" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-bold text-white transition hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                Comprar ahora <ArrowRight className="size-4" aria-hidden />
              </a>
              <a href="#/tienda" className="inline-flex min-h-12 items-center rounded-full border border-ink/25 bg-white/30 px-6 text-sm font-bold text-ink transition hover:bg-white/65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                Ver catálogo
              </a>
            </div>

            <form onSubmit={handleSubmit} className="mt-7 flex max-w-xl rounded-full bg-white p-1.5 shadow-soft" role="search">
              <label htmlFor="hero-search" className="sr-only">Buscar prendas</label>
              <input id="hero-search" value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-muted" placeholder="Buscar prendas, colecciones..." />
              <button type="submit" className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-white transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink" aria-label="Buscar">
                <Search className="size-4.5" aria-hidden />
              </button>
            </form>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-bold">Popular:</span>
              {chips.map((chip) => (
                <button key={chip} type="button" onClick={() => onSearch(chip)} className="rounded-full bg-white/55 px-3 py-1.5 text-xs text-ink transition hover:bg-white focus-visible:outline-2 focus-visible:outline-ink">
                  {chip}
                </button>
              ))}
            </div>

            <div className="mt-9 flex w-fit items-center gap-4 rounded-3xl bg-white/88 p-4 shadow-soft backdrop-blur md:p-5">
              <div className="flex -space-x-3" aria-label="Comunidad de clientes">
                {["A", "M", "L", "J"].map((initial, index) => (
                  <span key={initial} className={`grid size-10 place-items-center rounded-full border-2 border-white text-xs font-extrabold ${["bg-sand","bg-blue-soft","bg-stone-300","bg-stone-700 text-white"][index]}`}>{initial}</span>
                ))}
              </div>
              <div>
                <p className="text-sm font-extrabold">4.9 ★★★★★</p>
                <p className="text-xs text-muted">+2,000 clientes satisfechos</p>
              </div>
            </div>
          </motion.div>

          <div className="relative min-h-[560px] overflow-hidden lg:min-h-0">
            <img src={heroImage} alt="Modelo vistiendo una chaqueta denim y pantalón cargo de NOIR DISTRICT" className="absolute inset-0 size-full object-cover object-[62%_center]" />
            <div className="absolute inset-0 bg-linear-to-r from-hero via-transparent to-transparent lg:from-hero/60" aria-hidden />
            <div className="absolute top-8 right-6 grid size-28 rotate-6 place-items-center rounded-full border border-ink/10 bg-white/88 text-center shadow-soft backdrop-blur md:right-10">
              <p className="text-[0.65rem] leading-tight font-extrabold tracking-[0.15em] uppercase">Tu calle<br /><span className="text-xl">ND</span><br />Tus reglas</p>
            </div>
            <div className="absolute right-5 bottom-6 left-5 rounded-[1.6rem] bg-white/92 p-5 shadow-card backdrop-blur md:right-8 md:bottom-8 md:left-auto md:w-72">
              {[ [ShieldCheck, "Calidad garantizada"], [Truck, "Envío rápido a todo Perú"], [RotateCcw, "Cambios simples por 14 días"] ].map(([Icon, text]) => {
                const BenefitIcon = Icon as typeof ShieldCheck;
                return <div key={text as string} className="flex items-center gap-3 py-2.5"><span className="grid size-9 place-items-center rounded-full bg-mist"><BenefitIcon className="size-4" aria-hidden /></span><span className="text-xs font-bold">{text as string}</span></div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

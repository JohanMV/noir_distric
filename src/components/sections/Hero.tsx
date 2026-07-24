import { useState, type FormEvent } from "react";
import { ArrowRight, Award, RotateCcw, Search, Truck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { heroImage } from "@/assets";
import { Navbar } from "@/components/layout";

export interface HeroProps {
  cartCount: number;
  onSearch: (query: string) => void;
  onCartOpen: () => void;
}

const chips = ["oversize", "denim", "cargos", "básicos"];

export function Hero({ cartCount, onSearch, onCartOpen }: HeroProps) {
  const [query, setQuery] = useState("");
  const reduceMotion = useReducedMotion();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query.trim());
  };

  return (
    <section className="page-shell page-shell--top" aria-labelledby="hero-title">
      <div className="relative overflow-hidden rounded-[2rem] bg-hero md:rounded-[2.75rem] xl:min-h-[820px]">
        <Navbar cartCount={cartCount} onCartOpen={onCartOpen} />
        <div className="lg:hidden">
          <div className="relative h-[calc(100svh-5rem-var(--page-gutter))] overflow-hidden">
            <img src={heroImage} alt="Modelo vistiendo una chaqueta denim y pantalon cargo de NOIR DISTRICT" className="absolute inset-0 size-full object-cover object-[77%_bottom]" />
            <div className="absolute inset-0 bg-linear-to-r from-hero/90 via-hero/30 to-transparent" aria-hidden />
            <div className="absolute inset-x-0 top-0 z-10 px-6 pt-9">
              <p className="mb-4 flex items-center gap-2 text-[0.68rem] font-extrabold tracking-[0.16em] uppercase">
                <Award className="size-4" aria-hidden /> {"Nueva colecci\u00f3n 2026"}
              </p>
              <h1 id="hero-title-mobile" className="max-w-[19rem] text-[clamp(3.2rem,14vw,4.25rem)] leading-[0.86] font-extrabold tracking-[-0.065em] text-ink uppercase">
                Viste la ciudad a tu manera
              </h1>
              <p className="mt-5 max-w-[18rem] text-sm leading-relaxed text-ink/70">
                {"Prendas urbanas de edici\u00f3n limitada, cortes precisos y actitud sin esfuerzo."}
              </p>
              <div className="mt-5 flex flex-col items-start gap-2.5">
                <a href="#products" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-bold text-white transition hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                  Comprar ahora <ArrowRight className="size-4" aria-hidden />
                </a>
                <a href="#/tienda" className="inline-flex min-h-10 items-center px-3 text-sm font-extrabold tracking-[0.08em] text-ink uppercase underline decoration-1 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                  {"Ver cat\u00e1logo"}
                </a>
              </div>
            </div>
            <div className="hidden">
              <p className="text-[0.58rem] leading-tight font-extrabold tracking-[0.15em] uppercase">Tu calle<br /><span className="text-lg">ND</span><br />Tus reglas</p>
            </div>
            <div className="absolute right-4 bottom-5 left-4 z-10 grid grid-cols-2 divide-x divide-ink/10 rounded-2xl bg-white/94 p-3.5 shadow-card backdrop-blur">
              {[[Truck, "Env\u00edos a todo el Per\u00fa"], [RotateCcw, "Cambios en 14 d\u00edas"]].map(([Icon, text]) => {
                const BenefitIcon = Icon as typeof Truck;
                return <div key={text as string} className="flex items-center justify-center gap-2 px-2 text-center"><BenefitIcon className="size-5 shrink-0" aria-hidden /><span className="text-[0.63rem] font-extrabold leading-tight uppercase">{text as string}</span></div>;
              })}
            </div>
          </div>
          <div className="hidden">
            <form onSubmit={handleSubmit} className="flex rounded-full bg-white p-1.5 shadow-soft" role="search">
              <label htmlFor="hero-search-mobile" className="sr-only">Buscar prendas</label>
              <input id="hero-search-mobile" value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-muted" placeholder="Buscar prendas, colecciones..." />
              <button type="submit" className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink" aria-label="Buscar">
                <Search className="size-4.5" aria-hidden />
              </button>
            </form>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-bold">Popular:</span>
              {chips.map((chip) => (
                <button key={chip} type="button" onClick={() => onSearch(chip)} className="rounded-full bg-white/55 px-3 py-1.5 text-xs text-ink focus-visible:outline-2 focus-visible:outline-ink">
                  {chip}
                </button>
              ))}
            </div>
            <div className="mt-4 flex w-full items-center gap-3 rounded-3xl bg-white/88 p-3.5 shadow-soft backdrop-blur">
              <div className="flex -space-x-3" aria-label="Comunidad de clientes">
                {["A", "M", "L", "J"].map((initial, index) => (
                  <span key={initial} className={`grid size-8 place-items-center rounded-full border-2 border-white text-[0.65rem] font-extrabold ${["bg-sand","bg-blue-soft","bg-stone-300","bg-stone-700 text-white"][index]}`}>{initial}</span>
                ))}
              </div>
              <div><p className="text-sm font-extrabold">4.9 ★★★★★</p><p className="text-xs text-muted">+2,000 clientes satisfechos</p></div>
            </div>
          </div>
        </div>
        <div className="hidden lg:grid lg:min-h-[680px] lg:grid-cols-[1.06fr_0.94fr]">
          <motion.div initial={reduceMotion ? false : { opacity: 0, x: -24 }} animate={reduceMotion ? undefined : { opacity: 1, x: 0 }} transition={{ duration: 0.65, ease: "easeOut" }} className="relative z-10 flex flex-col px-6 pt-8 pb-6 md:px-10 md:py-10 lg:justify-center xl:px-14">
            <p className="mb-3 flex items-center gap-2 text-[0.68rem] font-extrabold tracking-[0.16em] uppercase md:mb-4 md:text-xs">
              <Award className="size-4" aria-hidden /> Nueva colección 2026
            </p>
            <h1 id="hero-title" className="max-w-3xl text-[clamp(3rem,13vw,6.6rem)] leading-[0.86] font-extrabold tracking-[-0.065em] text-ink uppercase">
              Viste la ciudad a tu manera
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink/66 md:mt-6 md:text-lg">
              Prendas urbanas de edición limitada, cortes precisos y actitud sin esfuerzo. Diseñadas para moverse contigo.
            </p>
            <div className="mt-5 flex flex-col items-start gap-3 md:mt-7 md:flex-row md:flex-wrap">
              <a href="#products" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-bold text-white transition hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                Comprar ahora <ArrowRight className="size-4" aria-hidden />
              </a>
              <a href="#/tienda" className="inline-flex min-h-10 items-center px-3 text-sm font-bold text-ink underline decoration-1 underline-offset-4 transition hover:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:min-h-12 md:rounded-full md:border md:border-ink/25 md:bg-white/30 md:px-6 md:no-underline md:hover:bg-white/65">
                Ver catálogo
              </a>
            </div>
            <form onSubmit={handleSubmit} className="mt-5 flex max-w-xl rounded-full bg-white p-1.5 shadow-soft md:mt-7" role="search">
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
            <div className="mt-5 flex w-full items-center gap-3 rounded-3xl bg-white/88 p-3.5 shadow-soft backdrop-blur md:mt-9 md:w-fit md:gap-4 md:p-5">
              <div className="flex -space-x-3" aria-label="Comunidad de clientes">
                {["A", "M", "L", "J"].map((initial, index) => (
                  <span key={initial} className={`grid size-8 place-items-center rounded-full border-2 border-white text-[0.65rem] font-extrabold md:size-10 md:text-xs ${["bg-sand","bg-blue-soft","bg-stone-300","bg-stone-700 text-white"][index]}`}>{initial}</span>
                ))}
              </div>
              <div><p className="text-sm font-extrabold">4.9 ★★★★★</p><p className="text-xs text-muted">+2,000 clientes satisfechos</p></div>
            </div>
          </motion.div>
          <div className="relative min-h-[470px] overflow-hidden sm:min-h-[540px] lg:min-h-0">
            <img src={heroImage} alt="Modelo vistiendo una chaqueta denim y pantalón cargo de NOIR DISTRICT" className="absolute inset-0 size-full object-cover object-right-bottom" />
            <div className="absolute inset-0 bg-linear-to-r from-hero via-transparent to-transparent lg:from-hero/60" aria-hidden />
            <div className="absolute top-5 right-5 grid size-23 rotate-6 place-items-center rounded-full border border-ink/10 bg-white/88 text-center shadow-soft backdrop-blur md:top-8 md:right-10 md:size-28">
              <p className="text-[0.58rem] leading-tight font-extrabold tracking-[0.15em] uppercase md:text-[0.65rem]">Tu calle<br /><span className="text-lg md:text-xl">ND</span><br />Tus reglas</p>
            </div>
            <div className="absolute right-4 bottom-4 left-4 grid grid-cols-2 divide-x divide-ink/10 rounded-2xl bg-white/92 p-3 shadow-card backdrop-blur md:hidden">
              {[[Truck, "Envíos a todo el Perú"], [RotateCcw, "Cambios en 14 días"]].map(([Icon, text]) => {
                const BenefitIcon = Icon as typeof Truck;
                return <div key={text as string} className="flex items-center justify-center gap-2 px-2 text-center"><BenefitIcon className="size-4 shrink-0" aria-hidden /><span className="text-[0.63rem] font-extrabold leading-tight uppercase">{text as string}</span></div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

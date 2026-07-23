import { ArrowUpRight, Clock3 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export function OfferBanner() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="page-shell section-space" aria-labelledby="offer-title">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-12 text-white md:px-12 md:py-16"
      >
        <div className="absolute -top-36 -right-16 size-96 rounded-full border-[60px] border-white/5" aria-hidden />
        <div className="relative grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-4 flex items-center gap-2 text-xs font-extrabold tracking-[0.16em] text-white/60 uppercase">
              <Clock3 className="size-4" aria-hidden /> Drop 02 · 72 horas
            </p>
            <h2 id="offer-title" className="max-w-4xl text-4xl leading-[0.92] font-extrabold tracking-[-0.055em] uppercase md:text-6xl">
              Segunda prenda con 30% menos
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
              Arma tu uniforme completo. El descuento se aplica automáticamente a la prenda de menor valor.
            </p>
          </div>
          <a href="#/tienda" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-extrabold text-ink transition hover:bg-hero focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            Elegir mi combo <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

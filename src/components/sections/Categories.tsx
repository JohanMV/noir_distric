import { useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Layers3, Shirt, Sparkles, Wind } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { categoriesSprite } from "@/assets";
import { SectionHeading } from "@/components/ui";

const categories = [
  {
    name: "Essential Oversize",
    description: "Básicos amplios para todos los días.",
    position: "0% center",
    icon: Shirt,
  },
  {
    name: "Core Neutrals",
    description: "Capas limpias en tonos que combinan.",
    position: "33.333% center",
    icon: Layers3,
  },
  {
    name: "Denim & Cargo",
    description: "Texturas durables con silueta relajada.",
    position: "66.667% center",
    icon: Wind,
  },
  {
    name: "After Dark",
    description: "Piezas oscuras para cerrar el look.",
    position: "100% center",
    icon: Sparkles,
  },
];

export function Categories() {
  const reduceMotion = useReducedMotion();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToCategory = (index: number) => {
    const nextIndex = (index + categories.length) % categories.length;
    const card = carouselRef.current?.children[nextIndex] as HTMLElement | undefined;

    card?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest", inline: "start" });
    setActiveIndex(nextIndex);
  };

  const handleCarouselScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cards = Array.from(carousel.children) as HTMLElement[];
    const closestIndex = cards.reduce((currentClosest, card, index) => {
      const closestCard = cards[currentClosest];
      return Math.abs(card.offsetLeft - carousel.scrollLeft) < Math.abs(closestCard.offsetLeft - carousel.scrollLeft)
        ? index
        : currentClosest;
    }, 0);

    setActiveIndex(closestIndex);
  };

  return (
    <section id="categories" className="content-shell section-space scroll-mt-6" aria-labelledby="categories-title">
      <SectionHeading
        eyebrow="Encuentra tu uniforme"
        title="Colecciones urbanas"
        description="Cuatro formas de vestir la ciudad. Combínalas, hazlas tuyas y repítelas sin reglas."
      />

      <div className="mb-5 flex items-center justify-between lg:hidden">
        <p className="text-sm font-extrabold tracking-[0.12em] text-ink">
          {activeIndex + 1} / {categories.length}
        </p>
        <p className="inline-flex items-center gap-2 text-sm font-extrabold tracking-[0.12em] text-muted">
          DESLIZA <ArrowRight className="size-4 text-ink" aria-hidden />
        </p>
      </div>

      <div
        ref={carouselRef}
        onScroll={handleCarouselScroll}
        className="-mr-[var(--page-gutter)] flex snap-x snap-mandatory gap-4 overflow-x-auto pr-[var(--page-gutter)] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden"
        aria-label="Carrusel de colecciones urbanas"
      >
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <article
              key={category.name}
              className="w-[calc(100%-3rem)] shrink-0 snap-start overflow-hidden rounded-[1.8rem] bg-category"
            >
              <div
                role="img"
                aria-label={`Editorial de la colección ${category.name}`}
                className="relative aspect-[1.08/1] bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url(${categoriesSprite})`,
                  backgroundPosition: category.position,
                  backgroundSize: "400% auto",
                }}
              />
              <div className="relative min-h-52 px-5 pt-10 pb-5">
                <span className="absolute -top-7 left-5 grid size-14 place-items-center rounded-full border border-ink/10 bg-white shadow-soft">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="text-lg font-extrabold tracking-[-0.03em] uppercase">{category.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{category.description}</p>
                <a href="#/tienda" className="mt-8 inline-flex items-center gap-1 text-sm font-bold underline underline-offset-4 transition hover:opacity-55">
                  Ver <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between lg:hidden">
        <div className="flex items-center gap-3" aria-label="Paginación de colecciones">
          {categories.map((category, index) => (
            <button
              key={category.name}
              type="button"
              onClick={() => scrollToCategory(index)}
              className={`h-2.5 rounded-full transition-all ${activeIndex === index ? "w-5 bg-ink" : "w-2.5 bg-ink/15"}`}
              aria-label={`Ver colección ${index + 1}: ${category.name}`}
              aria-current={activeIndex === index ? "true" : undefined}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => scrollToCategory(activeIndex + 1)}
          className="grid size-12 place-items-center rounded-full bg-ink text-white transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          aria-label="Ver la siguiente colección"
        >
          <ArrowRight className="size-5" aria-hidden />
        </button>
      </div>

      <div className="hidden gap-4 lg:grid lg:grid-cols-4">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.article
              key={category.name}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true, margin: "-70px" }}
              className="group overflow-hidden rounded-[1.8rem] bg-category"
            >
              <div
                role="img"
                aria-label={`Editorial de la colección ${category.name}`}
                className="relative aspect-[1.45/1] bg-cover bg-no-repeat transition-transform duration-500 group-hover:scale-[1.025]"
                style={{
                  backgroundImage: `url(${categoriesSprite})`,
                  backgroundPosition: category.position,
                  backgroundSize: "400% auto",
                }}
              />
              <div className="relative px-5 pt-10 pb-5">
                <span className="absolute -top-7 left-5 grid size-14 place-items-center rounded-full border border-ink/10 bg-white shadow-soft">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="text-lg font-extrabold tracking-[-0.03em] uppercase">
                  {category.name}
                </h3>
                <p className="mt-1 min-h-10 text-sm leading-relaxed text-muted">
                  {category.description}
                </p>
                <a href="#/tienda" className="mt-3 inline-flex items-center gap-1 text-sm font-bold underline underline-offset-4 transition hover:opacity-55">
                  Ver <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

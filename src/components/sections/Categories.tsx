import { ArrowUpRight, Layers3, Shirt, Sparkles, Wind } from "lucide-react";
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

  return (
    <section id="categories" className="content-shell section-space scroll-mt-6" aria-labelledby="categories-title">
      <SectionHeading
        eyebrow="Encuentra tu uniforme"
        title="Colecciones urbanas"
        description="Cuatro formas de vestir la ciudad. Combínalas, hazlas tuyas y repítelas sin reglas."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

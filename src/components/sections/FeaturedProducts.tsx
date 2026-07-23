import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProductCard, SectionHeading } from "@/components/ui";
import type { Product } from "@/types";

export interface FeaturedProductsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function FeaturedProducts({
  products,
  onAddToCart,
}: FeaturedProductsProps) {
  return (
    <section id="products" className="page-shell section-space scroll-mt-6" aria-labelledby="products-title">
      <SectionHeading
        eyebrow="Selección de la semana"
        title="Más buscados"
        description="Los favoritos de nuestra comunidad: cortes versátiles, materiales honestos y stock limitado."
        action={
          <div className="hidden shrink-0 gap-2 sm:flex" aria-label="Controles del carrusel">
            <button type="button" className="grid size-12 place-items-center rounded-full border border-ink/25 transition hover:bg-mist focus-visible:outline-2 focus-visible:outline-ink" aria-label="Productos anteriores">
              <ArrowLeft className="size-5" aria-hidden />
            </button>
            <button type="button" className="grid size-12 place-items-center rounded-full bg-ink text-white transition hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink" aria-label="Productos siguientes">
              <ArrowRight className="size-5" aria-hidden />
            </button>
          </div>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
      <div className="mt-7 text-center">
        <a href="#/tienda" className="inline-flex min-h-12 items-center rounded-full border border-ink/20 px-7 text-sm font-extrabold transition hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
          Ver los 6 productos
        </a>
      </div>
    </section>
  );
}

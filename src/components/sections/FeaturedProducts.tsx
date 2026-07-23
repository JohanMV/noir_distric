import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProductCard, SectionHeading } from "@/components/ui";
import type { Product } from "@/types";

export interface FeaturedProductsProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export function FeaturedProducts({
  products,
  onSelectProduct,
}: FeaturedProductsProps) {
  return (
    <section id="products" className="content-shell section-space scroll-mt-6" aria-labelledby="products-title">
      <SectionHeading
        eyebrow="SelecciÃ³n de la semana"
        title="MÃ¡s buscados"
        description="Los favoritos de nuestra comunidad: cortes versÃ¡tiles, materiales honestos y stock limitado."
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
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} compactOnMobile onSelectProduct={onSelectProduct} />
        ))}
      </div>
      <div className="mt-7 text-center">
        <a href="#/tienda" className="inline-flex min-h-12 items-center rounded-full bg-ink px-7 text-sm font-extrabold text-white transition hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
          Ver tienda completa
        </a>
      </div>
    </section>
  );
}


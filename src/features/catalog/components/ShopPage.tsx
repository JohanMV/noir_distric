import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { ProductCard, SectionHeading } from "@/components/ui";
import type { Product } from "@/types";

export interface ShopPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ShopPage({ products, onAddToCart }: ShopPageProps) {
  return (
    <main className="page-shell py-5 md:py-8">
      <section className="rounded-[2rem] bg-hero px-5 py-8 md:px-10 md:py-12">
        <a href="#/" className="mb-9 inline-flex items-center gap-2 text-sm font-bold transition hover:opacity-55">
          <ArrowLeft className="size-4" aria-hidden /> Volver al inicio
        </a>
        <SectionHeading
          eyebrow="Catálogo completo"
          title="La tienda"
          description="Seis piezas, combinaciones infinitas. Elige tu talla y arma tu rotación."
          action={
            <button type="button" className="hidden min-h-12 items-center gap-2 rounded-full border border-ink/20 bg-white/45 px-5 text-sm font-bold sm:flex">
              <SlidersHorizontal className="size-4" aria-hidden /> Filtros
            </button>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>
    </main>
  );
}

import { ArrowLeft } from "lucide-react";
import { ProductCard, SectionHeading } from "@/components/ui";
import { CatalogFilters } from "@/features/catalog/components/CatalogFilters";
import { useCatalogFilters } from "@/features/catalog/hooks";
import type { Product } from "@/types";

export interface ShopPageProps {
  products: Product[];
  searchQuery?: string;
  onSelectProduct: (product: Product) => void;
}

export function ShopPage({
  products,
  searchQuery = "",
  onSelectProduct,
}: ShopPageProps) {
  const catalog = useCatalogFilters(products, searchQuery);

  return (
    <main className="page-shell page-shell--top pb-8">
      <section className="rounded-[2rem] bg-hero px-5 py-8 md:px-10 md:py-12">
        <a href="#/" className="mb-9 inline-flex items-center gap-2 text-sm font-bold transition hover:opacity-55">
          <ArrowLeft className="size-4" aria-hidden /> Volver al inicio
        </a>
        <SectionHeading
          eyebrow="Catálogo completo"
          title="La tienda"
          description="Seis piezas, combinaciones infinitas. Elige tu talla y arma tu rotación."
        />
        {searchQuery && (
          <p className="mb-5 rounded-full bg-white/60 px-4 py-2 text-sm">
            Resultados para <strong>“{searchQuery}”</strong>
          </p>
        )}
        <div className="grid gap-5 lg:grid-cols-[17rem_1fr]">
          <CatalogFilters
            filters={catalog.filters}
            hasActiveFilters={catalog.hasActiveFilters}
            onChange={catalog.setFilter}
            onReset={catalog.resetFilters}
          />
          <div>
            <p className="mb-4 text-sm font-bold text-muted">
              {catalog.filteredProducts.length} productos encontrados
            </p>
            {catalog.filteredProducts.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {catalog.filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} />
                ))}
              </div>
            ) : (
              <div className="grid min-h-72 place-items-center rounded-[1.75rem] bg-white/55 p-8 text-center">
                <div>
                  <h2 className="text-xl font-extrabold">No encontramos coincidencias</h2>
                  <p className="mt-2 text-sm text-muted">Prueba otra combinación o limpia los filtros.</p>
                  <button type="button" onClick={catalog.resetFilters} className="mt-5 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white">Limpiar filtros</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/layout";
import { ProductCard } from "@/components/ui";
import {
  CatalogFilters,
  type CatalogSortValue,
} from "@/features/catalog/components/CatalogFilters";
import { useCatalogFilters } from "@/features/catalog/hooks";
import type { Product } from "@/types";

export interface ShopPageProps {
  products: Product[];
  searchQuery?: string;
  cartCount: number;
  onCartOpen: () => void;
  onSelectProduct: (product: Product) => void;
}

export function ShopPage({
  products,
  searchQuery = "",
  cartCount,
  onCartOpen,
  onSelectProduct,
}: ShopPageProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [sortValue, setSortValue] = useState<CatalogSortValue>("recent");
  const catalog = useCatalogFilters(products, localSearch);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const sortedProducts = useMemo(() => {
    if (sortValue === "recent") return catalog.filteredProducts;
    return [...catalog.filteredProducts].sort((a, b) =>
      sortValue === "price-asc" ? a.price - b.price : b.price - a.price,
    );
  }, [catalog.filteredProducts, sortValue]);

  const resetCatalog = () => {
    catalog.resetFilters();
    setLocalSearch("");
  };

  return (
    <>
      <Navbar cartCount={cartCount} onCartOpen={onCartOpen} variant="shop" />
      <main className="page-shell page-shell--top pb-8">
        <section className="rounded-[2rem] bg-hero px-3 py-7 sm:px-5 md:px-8 md:py-10 xl:px-10">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 text-xs font-extrabold tracking-[0.18em] text-muted uppercase">
                Catálogo completo
              </p>
              <h1 className="text-4xl leading-none font-extrabold tracking-[-0.055em] text-ink uppercase md:text-6xl">
                La tienda
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                Seis piezas, combinaciones infinitas. Elige tu talla y arma tu rotación.
              </p>
            </div>
            <p className="shrink-0 text-xs font-extrabold tracking-[0.14em] uppercase sm:pb-1">
              {catalog.filteredProducts.length} productos
            </p>
          </div>

          <CatalogFilters
            filters={catalog.filters}
            hasActiveFilters={catalog.hasActiveFilters}
            searchValue={localSearch}
            sortValue={sortValue}
            onChange={catalog.setFilter}
            onSearchChange={setLocalSearch}
            onSortChange={setSortValue}
            onReset={resetCatalog}
          />

          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-3">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  compactOnMobile
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          ) : (
            <div className="grid min-h-72 place-items-center rounded-[1.75rem] bg-white/55 p-8 text-center">
              <div>
                <h2 className="text-xl font-extrabold">No encontramos coincidencias</h2>
                <p className="mt-2 text-sm text-muted">Prueba otra combinación o limpia los filtros.</p>
                <button type="button" onClick={resetCatalog} className="mt-5 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white">
                  Limpiar filtros
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

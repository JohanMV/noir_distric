import { useState } from "react";
import {
  ChevronDown,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import type {
  ProductBadge,
  ProductCategory,
  ProductSize,
  ProductType,
} from "@/types";
import type { CatalogFiltersState } from "@/features/catalog/hooks";

export interface CatalogFiltersProps {
  filters: CatalogFiltersState;
  hasActiveFilters: boolean;
  searchValue: string;
  sortValue: CatalogSortValue;
  onChange: <Key extends keyof CatalogFiltersState>(
    key: Key,
    value: CatalogFiltersState[Key],
  ) => void;
  onSearchChange: (value: string) => void;
  onSortChange: (value: CatalogSortValue) => void;
  onReset: () => void;
}

export type CatalogSortValue = "recent" | "price-asc" | "price-desc";

const categories: Array<ProductCategory | "Todas"> = [
  "Todas",
  "Essential Oversize",
  "Core Neutrals",
  "Denim & Cargo",
  "After Dark",
];
const sizes: Array<ProductSize | "Todas"> = ["Todas", "S", "M", "L", "XL"];
const types: Array<ProductType | "Todos"> = [
  "Todos",
  "Polo",
  "Chaqueta",
  "Pantalón",
  "Hoodie",
];
const typeLabels: Record<ProductType | "Todos", string> = {
  Todos: "Todos",
  Polo: "Polos",
  Chaqueta: "Chaquetas",
  Pantalón: "Pantalones",
  Hoodie: "Hoodies",
};
const badges: Array<ProductBadge | "Todos"> = [
  "Todos",
  "NUEVO",
  "MÁS VENDIDO",
  "ÚLTIMAS UNIDADES",
];

export function CatalogFilters({
  filters,
  hasActiveFilters,
  searchValue,
  sortValue,
  onChange,
  onSearchChange,
  onSortChange,
  onReset,
}: CatalogFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mb-5" aria-label="Filtros del catálogo">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <label className="relative block xl:w-[22rem] xl:shrink-0">
          <span className="sr-only">Buscar prendas</span>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" aria-hidden />
          <input
            type="search"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar prendas..."
            className="h-12 w-full rounded-full border border-white/80 bg-white px-5 pl-12 text-sm outline-none transition focus:border-ink focus:ring-3 focus:ring-ink/8"
          />
        </label>

        <div className="-mx-1 flex min-w-0 gap-2 overflow-x-auto px-1 pb-1 xl:flex-1 xl:justify-center xl:pb-0">
          {types.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onChange("type", type)}
              aria-pressed={filters.type === type}
              className="h-12 shrink-0 rounded-full border border-ink/15 bg-white px-5 text-xs font-extrabold uppercase transition hover:border-ink/40 aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-white"
            >
              {typeLabels[type]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 xl:shrink-0">
          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            aria-expanded={isOpen}
            aria-controls="catalog-filter-panel"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink bg-transparent px-4 text-xs font-extrabold uppercase transition hover:bg-white"
          >
            <SlidersHorizontal className="size-4" aria-hidden />
            Filtrar
          </button>
          <label className="relative">
            <span className="sr-only">Ordenar productos</span>
            <select
              value={sortValue}
              onChange={(event) => onSortChange(event.target.value as CatalogSortValue)}
              className="h-12 w-full appearance-none rounded-full border border-ink/15 bg-white pr-10 pl-4 text-xs font-extrabold uppercase outline-none transition focus:border-ink"
            >
              <option value="recent">Más recientes</option>
              <option value="price-asc">Menor precio</option>
              <option value="price-desc">Mayor precio</option>
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2" aria-hidden />
          </label>
        </div>
      </div>

      {isOpen && (
        <aside id="catalog-filter-panel" className="mt-3 rounded-[1.6rem] border border-white/80 bg-white/80 p-5 shadow-soft">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-extrabold uppercase">Más filtros</h2>
            <button type="button" onClick={onReset} disabled={!hasActiveFilters} className="inline-flex items-center gap-1.5 text-xs font-bold text-muted underline underline-offset-4 disabled:opacity-35">
              <RotateCcw className="size-3.5" aria-hidden /> Limpiar
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-[1fr_1.2fr_1fr_1.3fr]">
            <label className="flex min-w-0 flex-col gap-3 text-xs font-extrabold uppercase">
              <span className="leading-4">Colección</span>
              <select value={filters.category} onChange={(event) => onChange("category", event.target.value as ProductCategory | "Todas")} className="h-12 w-full rounded-[1.1rem] border border-ink/12 bg-white px-4 text-sm font-medium normal-case outline-none transition focus:border-ink focus:ring-3 focus:ring-ink/8">
                {categories.map((value) => <option key={value}>{value}</option>)}
              </select>
            </label>

            <fieldset className="flex min-w-0 flex-col gap-3">
              <legend className="text-xs leading-4 font-extrabold uppercase">Talla</legend>
              <div className="flex h-12 items-center gap-2 overflow-x-auto">
                {sizes.map((size) => (
                  <button key={size} type="button" onClick={() => onChange("size", size)} aria-pressed={filters.size === size} className="h-12 min-w-12 shrink-0 rounded-full border border-ink/15 bg-white px-3 text-xs font-bold transition aria-pressed:bg-ink aria-pressed:text-white">
                    {size}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="flex min-w-0 flex-col gap-3 text-xs font-extrabold uppercase">
              <span className="leading-4">Estado</span>
              <select value={filters.badge} onChange={(event) => onChange("badge", event.target.value as ProductBadge | "Todos")} className="h-12 w-full rounded-[1.1rem] border border-ink/12 bg-white px-4 text-sm font-medium normal-case outline-none transition focus:border-ink focus:ring-3 focus:ring-ink/8">
                {badges.map((value) => <option key={value}>{value}</option>)}
              </select>
            </label>

            <label className="flex min-w-0 flex-col gap-3 text-xs font-extrabold uppercase">
              <span className="flex h-4 justify-between leading-4"><span>Precio máximo</span><strong>S/ {filters.maxPrice}</strong></span>
              <span className="flex h-12 items-center">
                <input type="range" min="90" max="300" step="10" value={filters.maxPrice} onChange={(event) => onChange("maxPrice", Number(event.target.value))} className="w-full accent-ink" />
              </span>
            </label>
          </div>
        </aside>
      )}
    </div>
  );
}

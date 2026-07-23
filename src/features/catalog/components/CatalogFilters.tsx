import { RotateCcw } from "lucide-react";
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
  onChange: <Key extends keyof CatalogFiltersState>(
    key: Key,
    value: CatalogFiltersState[Key],
  ) => void;
  onReset: () => void;
}

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
const badges: Array<ProductBadge | "Todos"> = [
  "Todos",
  "NUEVO",
  "MÁS VENDIDO",
  "ÚLTIMAS UNIDADES",
];

export function CatalogFilters({
  filters,
  hasActiveFilters,
  onChange,
  onReset,
}: CatalogFiltersProps) {
  return (
    <aside className="rounded-[1.6rem] bg-white/65 p-5 lg:sticky lg:top-5 lg:self-start" aria-label="Filtros del catálogo">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-extrabold uppercase">Filtrar por</h2>
        <button type="button" onClick={onReset} disabled={!hasActiveFilters} className="inline-flex items-center gap-1.5 text-xs font-bold text-muted underline underline-offset-4 disabled:opacity-35">
          <RotateCcw className="size-3.5" aria-hidden /> Limpiar
        </button>
      </div>

      <label className="filter-field">
        <span>Colección</span>
        <select value={filters.category} onChange={(event) => onChange("category", event.target.value as ProductCategory | "Todas")}>
          {categories.map((value) => <option key={value}>{value}</option>)}
        </select>
      </label>
      <label className="filter-field">
        <span>Tipo de prenda</span>
        <select value={filters.type} onChange={(event) => onChange("type", event.target.value as ProductType | "Todos")}>
          {types.map((value) => <option key={value}>{value}</option>)}
        </select>
      </label>
      <fieldset className="mt-5">
        <legend className="text-xs font-extrabold uppercase">Talla</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button key={size} type="button" onClick={() => onChange("size", size)} aria-pressed={filters.size === size} className="min-w-10 rounded-full border border-ink/15 bg-white px-3 py-2 text-xs font-bold transition aria-pressed:bg-ink aria-pressed:text-white">
              {size}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="filter-field">
        <span>Estado</span>
        <select value={filters.badge} onChange={(event) => onChange("badge", event.target.value as ProductBadge | "Todos")}>
          {badges.map((value) => <option key={value}>{value}</option>)}
        </select>
      </label>
      <label className="mt-5 block text-xs font-extrabold uppercase">
        <span className="flex justify-between"><span>Precio máximo</span><strong>S/ {filters.maxPrice}</strong></span>
        <input type="range" min="90" max="300" step="10" value={filters.maxPrice} onChange={(event) => onChange("maxPrice", Number(event.target.value))} className="mt-3 w-full accent-ink" />
      </label>
    </aside>
  );
}

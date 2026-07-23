import { useMemo, useState } from "react";
import type {
  Product,
  ProductBadge,
  ProductCategory,
  ProductSize,
  ProductType,
} from "@/types";

export interface CatalogFiltersState {
  category: ProductCategory | "Todas";
  size: ProductSize | "Todas";
  type: ProductType | "Todos";
  badge: ProductBadge | "Todos";
  maxPrice: number;
}

const initialFilters: CatalogFiltersState = {
  category: "Todas",
  size: "Todas",
  type: "Todos",
  badge: "Todos",
  maxPrice: 300,
};

export function useCatalogFilters(products: Product[], searchQuery = "") {
  const [filters, setFilters] = useState<CatalogFiltersState>(initialFilters);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase("es");
    return products.filter((product) => {
      const matchesSearch =
        !normalizedQuery ||
        [product.name, product.description, product.category, product.type]
          .join(" ")
          .toLocaleLowerCase("es")
          .includes(normalizedQuery);
      return (
        matchesSearch &&
        (filters.category === "Todas" || product.category === filters.category) &&
        (filters.size === "Todas" || product.sizes.includes(filters.size)) &&
        (filters.type === "Todos" || product.type === filters.type) &&
        (filters.badge === "Todos" || product.badge === filters.badge) &&
        product.price <= filters.maxPrice
      );
    });
  }, [filters, products, searchQuery]);

  const setFilter = <Key extends keyof CatalogFiltersState>(
    key: Key,
    value: CatalogFiltersState[Key],
  ) => setFilters((current) => ({ ...current, [key]: value }));

  const hasActiveFilters =
    JSON.stringify(filters) !== JSON.stringify(initialFilters) ||
    Boolean(searchQuery.trim());

  return {
    filters,
    filteredProducts,
    hasActiveFilters,
    setFilter,
    resetFilters: () => setFilters(initialFilters),
  };
}

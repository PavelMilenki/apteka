"use client";

import { useMemo, useState } from "react";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
} from "nuqs";
import { ActiveFilters } from "@/components/catalog/active-filters";
import { CatalogPagination } from "@/components/catalog/catalog-pagination";
import { FilterSidebar } from "@/components/catalog/filter-sidebar";
import { ProductGrid } from "@/components/catalog/product-grid";
import { ProductList } from "@/components/catalog/product-list";
import { SortSelect } from "@/components/catalog/sort-select";
import { ViewToggle } from "@/components/catalog/view-toggle";
import {
  CHARACTERISTIC_LABELS,
  buildFacets,
  filterProducts,
  paginateProducts,
  sortProducts,
} from "@/lib/catalog";
import type {
  CatalogViewMode,
  Product,
  SelectedFilters,
  SortOption,
} from "@/lib/types";

const SORT_VALUES = ["relevance", "cheap", "expensive"] as const;
const VIEW_VALUES = ["grid", "list"] as const;

const catalogParsers = {
  sort: parseAsStringLiteral(SORT_VALUES).withDefault("relevance"),
  view: parseAsStringLiteral(VIEW_VALUES).withDefault("grid"),
  page: parseAsInteger.withDefault(1),
  ...Object.fromEntries(
    Object.keys(CHARACTERISTIC_LABELS).map((key) => [
      key,
      parseAsArrayOf(parseAsString).withDefault([]),
    ]),
  ),
};

interface CatalogViewProps {
  products: Product[];
}

function getSelectedFilters(
  query: Record<string, string[] | number | SortOption | CatalogViewMode>,
): SelectedFilters {
  const selected: SelectedFilters = {};

  for (const key of Object.keys(CHARACTERISTIC_LABELS)) {
    const values = query[key];
    if (Array.isArray(values) && values.length > 0) selected[key] = values;
  }

  return selected;
}

export function CatalogView({ products }: CatalogViewProps) {
  const [query, setQuery] = useQueryStates(catalogParsers, {
    history: "push",
  });
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [cart, setCart] = useState<Set<number>>(new Set());

  const facets = useMemo(() => buildFacets(products), [products]);
  const selected = useMemo(() => getSelectedFilters(query), [query]);

  const pageItems = useMemo(() => {
    const filtered = filterProducts(products, selected);
    const sorted = sortProducts(filtered, query.sort);
    return paginateProducts(sorted, query.page);
  }, [products, query.page, query.sort, selected]);

  function handleToggle(key: string, value: string) {
    const current = selected[key] ?? [];
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    void setQuery({
      [key]: next.length ? next : null,
      page: 1,
    });
  }

  function handleRemove(key: string, value: string) {
    const next = (selected[key] ?? []).filter((item) => item !== value);
    void setQuery({
      [key]: next.length ? next : null,
      page: 1,
    });
  }

  function handleClearFilters() {
    const reset = Object.fromEntries(
      Object.keys(CHARACTERISTIC_LABELS).map((key) => [key, null]),
    );
    void setQuery({ ...reset, page: 1 });
  }

  function handleSortChange(sort: SortOption) {
    void setQuery({ sort, page: 1 });
  }

  function handleViewChange(view: CatalogViewMode) {
    void setQuery({ view });
  }

  function handlePageChange(page: number) {
    void setQuery({ page });
  }

  function handleToggleFavorite(id: number) {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleAddToCart(id: number) {
    setCart((current) => {
      const next = new Set(current);
      next.add(id);
      return next;
    });
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <ActiveFilters
          selected={selected}
          onRemove={handleRemove}
          onClear={handleClearFilters}
        />
        <div className="ml-auto flex shrink-0 gap-2">
          <SortSelect value={query.sort} onChange={handleSortChange} />
          <ViewToggle value={query.view} onChange={handleViewChange} />
        </div>
      </div>
      <div className="flex items-start gap-4">
        <FilterSidebar
          facets={facets}
          selected={selected}
          onToggle={handleToggle}
          onReset={handleClearFilters}
        />
        <section className="min-w-0 flex-1">
          {query.view === "list" ? (
            <ProductList
              products={pageItems.items}
              favorites={favorites}
              cart={cart}
              onToggleFavorite={handleToggleFavorite}
              onAddToCart={handleAddToCart}
            />
          ) : (
            <ProductGrid
              products={pageItems.items}
              favorites={favorites}
              cart={cart}
              onToggleFavorite={handleToggleFavorite}
              onAddToCart={handleAddToCart}
            />
          )}
          <CatalogPagination
            page={pageItems.page}
            totalPages={pageItems.totalPages}
            onPageChange={handlePageChange}
          />
        </section>
      </div>
    </div>
  );
}

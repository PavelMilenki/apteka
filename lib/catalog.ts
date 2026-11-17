import type {
  Facet,
  PaginationItem,
  Product,
  SelectedFilters,
  SortOption,
} from "@/lib/types";

export const PAGE_SIZE = 12;

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "По релевантности" },
  { value: "cheap", label: "Сначала дешевые" },
  { value: "expensive", label: "Сначала дорогие" },
];

export const CHARACTERISTIC_LABELS: Record<string, string> = {
  brand: "Бренд",
  releaseForm: "Форма выпуска",
  dossage: "Дозировка",
  quantityPerPackage: "Количество в упаковке",
  isByPrescription: "Рецептурный отпуск",
  manufacturer: "Производитель",
  country: "Страна производства",
  storageTemperature: "Температура хранения",
  expirationDate: "Срок годности",
};

const FACET_ORDER = Object.keys(CHARACTERISTIC_LABELS);

function parseLeadingNumber(value: string) {
  const match = value.match(/\d+(?:[.,]\d+)?/);
  if (!match) return null;
  return Number(match[0].replace(",", "."));
}

function compareFacetValues(a: string, b: string) {
  const aNumber = parseLeadingNumber(a);
  const bNumber = parseLeadingNumber(b);

  if (aNumber !== null && bNumber !== null && aNumber !== bNumber)
    return aNumber - bNumber;

  return a.localeCompare(b, "ru");
}

export function buildFacets(products: Product[]): Facet[] {
  const keys = new Set<string>();

  for (const product of products) {
    for (const key of Object.keys(product.characteristics)) {
      keys.add(key);
    }
  }

  return Array.from(keys)
    .sort((a, b) => {
      const aIndex = FACET_ORDER.indexOf(a);
      const bIndex = FACET_ORDER.indexOf(b);
      return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
    })
    .map((key) => {
      const values = new Set<string>();

      for (const product of products) {
        const value = product.characteristics[key];
        if (value) values.add(value);
      }

      return {
        key,
        label: CHARACTERISTIC_LABELS[key] ?? key,
        values: Array.from(values).sort(compareFacetValues),
      };
    });
}

export function filterProducts(
  products: Product[],
  selected: SelectedFilters,
) {
  return products.filter((product) =>
    Object.entries(selected).every(([key, values]) => {
      if (!values.length) return true;
      return values.includes(product.characteristics[key]);
    }),
  );
}

export function sortProducts(products: Product[], sort: SortOption) {
  if (sort === "relevance") return products;

  return [...products].sort((a, b) =>
    sort === "cheap" ? a.price - b.price : b.price - a.price,
  );
}

export function paginateProducts(products: Product[], page: number) {
  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * PAGE_SIZE;

  return {
    items: products.slice(start, start + PAGE_SIZE),
    page: safePage,
    totalPages,
    total: products.length,
  };
}

export function getPaginationItems(
  current: number,
  total: number,
): PaginationItem[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const items: PaginationItem[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) items.push("ellipsis");
  for (let page = start; page <= end; page += 1) items.push(page);
  if (end < total - 1) items.push("ellipsis");
  items.push(total);

  return items;
}

export function formatPrice(price: number) {
  return `${price.toFixed(2)} р.`;
}

export function isPrescription(product: Product) {
  return product.characteristics.isByPrescription === "По рецепту";
}

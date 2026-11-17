export interface ProductCharacteristics {
  country: string;
  brand: string;
  dossage: string;
  releaseForm: string;
  storageTemperature: string;
  quantityPerPackage: string;
  expirationDate: string;
  isByPrescription: string;
  manufacturer: string;
  [key: string]: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  characteristics: ProductCharacteristics;
}

export type SortOption = "relevance" | "cheap" | "expensive";

export type CatalogViewMode = "grid" | "list";

export interface Facet {
  key: string;
  label: string;
  values: string[];
}

export interface SelectedFilters {
  [key: string]: string[];
}

export type PaginationItem = number | "ellipsis";

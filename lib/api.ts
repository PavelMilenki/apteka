import type { Product } from "@/lib/types";

const DEFAULT_API_URL = "https://front-test-beryl.vercel.app/api/products";

export type ProductsResult =
  | { ok: true; products: Product[] }
  | { ok: false; error: string };

function getApiUrl() {
  return process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;
}

function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== "object") return false;

  const product = value as Partial<Product>;
  return (
    typeof product.id === "number" &&
    typeof product.title === "string" &&
    typeof product.price === "number" &&
    typeof product.image === "string" &&
    typeof product.characteristics === "object" &&
    product.characteristics !== null
  );
}

export async function getProducts(): Promise<ProductsResult> {
  try {
    const response = await fetch(getApiUrl(), {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return {
        ok: false,
        error: `Не удалось загрузить товары (${response.status})`,
      };
    }

    const data: unknown = await response.json();
    if (!Array.isArray(data) || !data.every(isProduct)) {
      return { ok: false, error: "Бэкенд вернул некорректный список товаров" };
    }

    return { ok: true, products: data };
  } catch {
    return { ok: false, error: "Не удалось загрузить товары. Попробуйте позже." };
  }
}

import { ProductCard } from "@/components/catalog/product-card";
import type { Product } from "@/lib/types";

interface ProductGridProps {
  products: Product[];
  favorites: Set<number>;
  cart: Set<number>;
  onToggleFavorite: (id: number) => void;
  onAddToCart: (id: number) => void;
}

export function ProductGrid({
  products,
  favorites,
  cart,
  onToggleFavorite,
  onAddToCart,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="rounded-2xl bg-white px-6 py-16 text-center text-slate-500 shadow-[0_4px_24px_rgba(15,23,42,0.04)]">
        Товары не найдены. Измените фильтры.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favorites.has(product.id)}
          isInCart={cart.has(product.id)}
          onToggleFavorite={() => onToggleFavorite(product.id)}
          onAddToCart={() => onAddToCart(product.id)}
        />
      ))}
    </div>
  );
}

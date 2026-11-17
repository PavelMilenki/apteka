import { CartButton } from "@/components/catalog/cart-button";
import { FavoriteButton } from "@/components/catalog/favorite-button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, isPrescription } from "@/lib/catalog";
import type { Product } from "@/lib/types";

interface ProductListProps {
  products: Product[];
  favorites: Set<number>;
  cart: Set<number>;
  onToggleFavorite: (id: number) => void;
  onAddToCart: (id: number) => void;
}

export function ProductList({
  products,
  favorites,
  cart,
  onToggleFavorite,
  onAddToCart,
}: ProductListProps) {
  if (products.length === 0) {
    return (
      <p className="rounded-2xl bg-white px-6 py-16 text-center text-slate-500 shadow-[0_4px_24px_rgba(15,23,42,0.04)]">
        Товары не найдены. Измените фильтры.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {products.map((product) => (
        <article
          key={product.id}
          className="grid cursor-pointer grid-cols-[168px_1fr_auto] items-stretch rounded-2xl bg-white shadow-[0_4px_24px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_8px_32px_rgba(15,23,42,0.12)]"
        >
          <div className="flex items-center justify-center py-6 pl-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.title}
              width={160}
              height={120}
              className="max-h-[112px] object-contain"
            />
          </div>
          <div className="min-w-0 py-6 pr-8">
            <h2 className="text-[16px] leading-6 font-semibold text-[#111827]">
              {product.title}
            </h2>
            {isPrescription(product) ? (
              <Badge className="mt-1 rounded-md bg-[#FFF1EC] px-1.5 py-0.5 text-[11px] font-normal text-[#FF6A3D]">
                По рецепту
              </Badge>
            ) : null}
            <div className="mt-3 space-y-0.5 text-[13px] leading-5 text-[#94A3B8]">
              <p>
                Производитель:{" "}
                <span className="text-[#334155]">
                  {product.characteristics.manufacturer}, {product.characteristics.country}
                </span>
              </p>
              <p>
                Форма выпуска:{" "}
                <span className="text-[#334155]">{product.characteristics.releaseForm}</span>
              </p>
              <p>
                Дозировка:{" "}
                <span className="text-[#334155]">{product.characteristics.dossage}</span>
              </p>
            </div>
          </div>
          <div className="flex w-[236px]">
            <div className="my-5 w-px shrink-0 bg-[#E8EEF4]" />
            <div className="flex flex-1 flex-col justify-start px-6 py-6">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-[16px] font-bold text-[#111827]">
                  {formatPrice(product.price)}
                </p>
                <FavoriteButton
                  isFavorite={favorites.has(product.id)}
                  onToggle={() => onToggleFavorite(product.id)}
                />
              </div>
              <CartButton
                isAdded={cart.has(product.id)}
                onAdd={() => onAddToCart(product.id)}
              />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

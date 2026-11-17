import { CartButton } from "@/components/catalog/cart-button";
import { FavoriteButton } from "@/components/catalog/favorite-button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, isPrescription } from "@/lib/catalog";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  isInCart: boolean;
  onToggleFavorite: () => void;
  onAddToCart: () => void;
}

export function ProductCard({
  product,
  isFavorite,
  isInCart,
  onToggleFavorite,
  onAddToCart,
}: ProductCardProps) {
  return (
    <article className="relative flex min-h-[440px] cursor-pointer flex-col rounded-2xl bg-white px-5 pt-4 pb-5 shadow-[0_4px_24px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_8px_32px_rgba(15,23,42,0.12)]">
      <div className="absolute top-3 right-3 z-10">
        <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
      </div>
      <div className="flex h-[184px] items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.title}
          width={215}
          height={215}
          className="max-h-[176px] object-contain"
        />
      </div>
      <div className="mt-2 min-h-5">
        {isPrescription(product) ? (
          <Badge className="rounded-md bg-[#FFF1EC] px-1.5 py-0.5 text-[11px] font-normal text-[#FF6A3D]">
            По рецепту
          </Badge>
        ) : null}
      </div>
      <p className="mt-1.5 text-[16px] leading-6 font-bold text-[#111827]">
        {formatPrice(product.price)}
      </p>
      <h2 className="mt-1.5 line-clamp-3 text-[13px] leading-5 font-normal text-[#111827]">
        {product.title}
      </h2>
      <div className="mt-auto">
        <p className="mb-3 line-clamp-2 text-[13px] leading-4 text-[#94A3B8]">
          {product.characteristics.manufacturer}, {product.characteristics.country}
        </p>
        <CartButton isAdded={isInCart} onAdd={onAddToCart} />
      </div>
    </article>
  );
}

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  const label = isFavorite ? "Убрать из избранного" : "В избранное";

  return (
    <button
      type="button"
      className="group relative flex size-8 cursor-pointer items-center justify-center text-[#94A3B8] hover:text-[#3B82F6] [&_svg]:pointer-events-none"
      aria-label={label}
      aria-pressed={isFavorite}
      onClick={onToggle}
    >
      <span
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 hidden -translate-x-1/2 rounded-lg bg-[#1F2937] px-3.5 py-2 text-[12px] leading-none whitespace-nowrap text-white shadow-md group-hover:block group-focus-visible:block"
        role="tooltip"
      >
        {label}
        <span className="absolute top-full left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#1F2937]" />
      </span>
      <Heart
        className={cn("size-6", isFavorite && "fill-[#3B82F6] text-[#3B82F6]")}
        strokeWidth={1.75}
      />
    </button>
  );
}

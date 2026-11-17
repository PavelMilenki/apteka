import { cn } from "@/lib/utils";

interface CartButtonProps {
  isAdded: boolean;
  onAdd: () => void;
  className?: string;
}

export function CartButton({ isAdded, onAdd, className }: CartButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "h-9 w-full cursor-pointer rounded-[10px] px-3 text-sm font-medium",
        isAdded
          ? "bg-[#EAF1FB] text-[#3B82F6]"
          : "bg-[#3B82F6] text-white hover:bg-blue-600",
        className,
      )}
      onClick={onAdd}
    >
      {isAdded ? "В корзине" : "В корзину"}
    </button>
  );
}

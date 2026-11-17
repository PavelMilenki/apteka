import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CatalogViewMode } from "@/lib/types";

interface ViewToggleProps {
  value: CatalogViewMode;
  onChange: (value: CatalogViewMode) => void;
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="flex gap-1">
      <button
        type="button"
        className={cn(
          "flex size-10 cursor-pointer items-center justify-center rounded-xl bg-white text-slate-400",
          value === "grid" && "bg-[#3B82F6] text-white",
        )}
        aria-label="Сетка"
        aria-pressed={value === "grid"}
        onClick={() => onChange("grid")}
      >
        <LayoutGrid className="size-4" />
      </button>
      <button
        type="button"
        className={cn(
          "flex size-10 cursor-pointer items-center justify-center rounded-xl bg-white text-slate-400",
          value === "list" && "bg-[#3B82F6] text-white",
        )}
        aria-label="Список"
        aria-pressed={value === "list"}
        onClick={() => onChange("list")}
      >
        <List className="size-4" />
      </button>
    </div>
  );
}

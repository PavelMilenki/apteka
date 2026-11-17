import { X } from "lucide-react";
import type { SelectedFilters } from "@/lib/types";

interface ActiveChip {
  key: string;
  value: string;
}

interface ActiveFiltersProps {
  selected: SelectedFilters;
  onRemove: (key: string, value: string) => void;
  onClear: () => void;
}

function getActiveChips(selected: SelectedFilters): ActiveChip[] {
  return Object.entries(selected).flatMap(([key, values]) =>
    values.map((value) => ({ key, value })),
  );
}

export function ActiveFilters({
  selected,
  onRemove,
  onClear,
}: ActiveFiltersProps) {
  const chips = getActiveChips(selected);
  if (chips.length === 0) return null;

  return (
    <div className="flex min-w-0 flex-1 flex-wrap gap-2">
      <button
        type="button"
        className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-xl bg-[#EAF1FB] px-3 text-sm text-slate-600 hover:bg-[#dce7f6]"
        onClick={onClear}
      >
        Очистить
        <X className="size-3.5" />
      </button>
      {chips.map((chip) => (
        <button
          key={`${chip.key}-${chip.value}`}
          type="button"
          className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-xl bg-[#EAF1FB] px-3 text-sm text-slate-700 hover:bg-[#dce7f6]"
          onClick={() => onRemove(chip.key, chip.value)}
        >
          {chip.value}
          <X className="size-3.5" />
        </button>
      ))}
    </div>
  );
}

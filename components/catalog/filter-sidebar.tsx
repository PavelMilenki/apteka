import { ChevronLeft, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import type { Facet, SelectedFilters } from "@/lib/types";

interface FilterSidebarProps {
  facets: Facet[];
  selected: SelectedFilters;
  onToggle: (key: string, value: string) => void;
  onReset: () => void;
}

export function FilterSidebar({
  facets,
  selected,
  onToggle,
  onReset,
}: FilterSidebarProps) {
  return (
    <aside className="sticky top-5 w-[280px] shrink-0 self-start rounded-2xl bg-white px-4 py-4 shadow-[0_4px_24px_rgba(15,23,42,0.04)]">
      <div className="mb-3 flex h-10 items-center gap-1 rounded-xl bg-[#F4F7FB] px-3 text-[13px] font-medium whitespace-nowrap text-slate-800">
        <ChevronLeft className="size-4 shrink-0 text-slate-400" />
        Антибактериальные средства
      </div>
      {facets.map((facet) => (
        <details
          key={facet.key}
          className="group border-b border-slate-100 last:border-b-0"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-[14px] font-medium text-slate-800 [&::-webkit-details-marker]:hidden">
            {facet.label}
            <ChevronDown className="size-4 text-slate-400 transition-transform group-open:rotate-180" />
          </summary>
          <ul className="max-h-44 space-y-2 overflow-y-auto pb-3">
            {facet.values.map((value) => {
              const isChecked = selected[facet.key]?.includes(value) ?? false;

              return (
                <li key={value}>
                  <label className="flex cursor-pointer items-center gap-2 text-[13px] text-slate-500">
                    <Checkbox
                      name={facet.key}
                      value={value}
                      checked={isChecked}
                      onCheckedChange={() => onToggle(facet.key, value)}
                    />
                    <span>{value}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </details>
      ))}
      <button
        type="button"
        className="mt-4 h-11 w-full cursor-pointer rounded-xl bg-[#EAF1FB] text-sm font-medium text-slate-500 hover:bg-[#dce7f6]"
        onClick={onReset}
      >
        Сбросить все
      </button>
    </aside>
  );
}

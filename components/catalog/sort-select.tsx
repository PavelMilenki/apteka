"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { SORT_OPTIONS } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import type { SortOption } from "@/lib/types";

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const currentLabel =
    SORT_OPTIONS.find((option) => option.value === value)?.label ??
    "По релевантности";

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    }

    const timeoutId = window.setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[#EAF1FB] px-4 text-sm text-slate-600"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Сортировка товаров"
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen((open) => !open);
        }}
      >
        {currentLabel}
        <ChevronDown
          className={cn("size-4 text-slate-500 transition-transform", isOpen && "rotate-180")}
        />
      </button>
      {isOpen ? (
        <ul
          className="absolute top-12 right-0 z-50 min-w-[220px] rounded-2xl bg-white py-2 shadow-[0_12px_40px_rgba(15,23,42,0.12)]"
          role="listbox"
        >
          {SORT_OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                role="option"
                aria-selected={option.value === value}
                className={cn(
                  "w-full cursor-pointer px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50",
                  option.value === value && "text-slate-900",
                )}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

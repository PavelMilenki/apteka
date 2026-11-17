import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPaginationItems } from "@/lib/catalog";
import { cn } from "@/lib/utils";

interface CatalogPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function CatalogPagination({
  page,
  totalPages,
  onPageChange,
}: CatalogPaginationProps) {
  if (totalPages <= 1) return null;

  const items = getPaginationItems(page, totalPages);

  return (
    <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Пагинация">
      {items.map((item, index) => {
        if (item === "ellipsis") {
          return (
            <span key={`ellipsis-${index}`} className="px-1 text-slate-400">
              ...
            </span>
          );
        }

        const isActive = item === page;

        return (
          <button
            key={item}
            type="button"
            className={cn(
              "flex size-10 items-center justify-center rounded-full text-sm",
              isActive
                ? "!cursor-default bg-[#3B82F6] font-medium text-white"
                : "cursor-pointer text-slate-600 hover:bg-white",
            )}
            aria-current={isActive ? "page" : undefined}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        );
      })}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="bg-white shadow-[0_4px_24px_rgba(15,23,42,0.04)]"
        aria-label="Следующая страница"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight className="size-5" />
      </Button>
    </nav>
  );
}

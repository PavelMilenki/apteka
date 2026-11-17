import { Suspense } from "react";
import { CatalogView } from "@/components/catalog/catalog-view";
import { getProducts } from "@/lib/api";

function CatalogFallback() {
  return (
    <div className="flex gap-5">
      <div className="h-[640px] w-[280px] rounded-2xl bg-white shadow-sm" />
      <div className="grid min-h-[480px] flex-1 grid-cols-4 gap-4">
        {Array.from({ length: 12 }, (_, index) => (
          <div key={index} className="rounded-2xl bg-white shadow-sm" />
        ))}
      </div>
    </div>
  );
}

export default async function HomePage() {
  const result = await getProducts();

  if (!result.ok) {
    return (
      <div className="rounded-2xl bg-white px-6 py-16 text-center text-slate-600 shadow-sm">
        {result.error}
      </div>
    );
  }

  return (
    <Suspense fallback={<CatalogFallback />}>
      <CatalogView products={result.products} />
    </Suspense>
  );
}

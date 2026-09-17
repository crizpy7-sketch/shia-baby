import { createFileRoute, Link } from "@tanstack/react-router";
import { FilterBar } from "@/components/filter-bar";
import { ProductGrid } from "@/components/product-card";
import { PRIMARY_SIZES, ROOMS, SIZE_LABEL, filterProducts } from "@/lib/catalog";
import { useLocale, UI } from "@/lib/locale";
import { parseShopSearch } from "@/lib/shop-search";

export const Route = createFileRoute("/shop/")({
  validateSearch: parseShopSearch,
  component: ShopPage,
});

function ShopPage() {
  const search = Route.useSearch();
  const { t, locale } = useLocale();
  const products = filterProducts(search);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t(UI.shop)}</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">
        {locale === "es" ? "Todo lo que hay sobre la mesa." : "Everything on the table."}
      </h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        {locale === "es"
          ? "Enterizos, tejidos y ropa primero — baño y piel más adelante en el estante."
          : "Sleepers, knits, and clothes first — bath & skin further along the shelf."}
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          to="/coming-home"
          className="rounded-full border border-navy/30 bg-navy px-4 py-2 text-sm text-cream"
        >
          {t(UI.comingHome)}
        </Link>
        {ROOMS.map((r) => (
          <Link
            key={r.id}
            to="/shop/$room"
            params={{ room: r.id }}
            className="rounded-full border border-line px-4 py-2 text-sm hover:border-navy/40"
          >
            {t(r.name)}
          </Link>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {PRIMARY_SIZES.map((s) => (
          <Link
            key={s}
            to="/shop"
            search={{ size: s }}
            className="rounded-full border border-line px-4 py-2 text-sm hover:border-navy/40"
          >
            {SIZE_LABEL[s][locale]}
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <FilterBar search={search} count={products.length} />
      </div>
      <div className="mt-10">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

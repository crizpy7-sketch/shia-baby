import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/catalog";
import { asset } from "@/lib/assets";
import { useLocale, UI } from "@/lib/locale";
import { formatMoney } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { t, locale } = useLocale();
  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-lg bg-paper-deep">
        <img
          src={asset(product.image)}
          alt={t(product.name)}
          className={
            product.image.includes("teddy.png")
              ? "aspect-[3/4] w-full object-contain p-8"
              : "aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          }
        />
        {product.isNew ? (
          <span className="absolute left-3 top-3 rounded-sm bg-navy px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-cream">
            {locale === "es" ? "Nuevo" : "New"}
          </span>
        ) : null}
      </div>
      <div className="mt-3 space-y-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[1.05rem] leading-snug text-ink">{t(product.name)}</h3>
          <p className="shrink-0 text-sm tabular-nums text-ink-soft">{formatMoney(product.price)}</p>
        </div>
        <p className="text-xs tracking-wide text-muted">
          {product.sizes.join(" · ")}
        </p>
      </div>
    </Link>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  const { t } = useLocale();
  if (products.length === 0) {
    return (
      <p className="py-20 text-center text-muted">{t(UI.noResults)}</p>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 md:gap-x-6">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}

import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { getProduct, ROOMS } from "@/lib/catalog";
import { asset } from "@/lib/assets";
import { useCart } from "@/lib/cart";
import { useLocale, UI } from "@/lib/locale";
import { formatMoney } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = getProduct(slug);
  if (!product) throw notFound();

  const { t, locale } = useLocale();
  const add = useCart((s) => s.add);
  const setWrap = useCart((s) => s.setWrap);
  const [size, setSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);
  const [wrapThis, setWrapThis] = useState(false);
  const room = ROOMS.find((r) => r.id === product.room)!;
  const related = product.related.map((s) => getProduct(s)).filter(Boolean);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <nav className="mb-8 text-sm text-muted">
        <Link to="/shop" className="hover:text-ink">
          {t(UI.shop)}
        </Link>
        <span className="mx-2">/</span>
        <Link to="/shop/$room" params={{ room: product.room }} className="hover:text-ink">
          {t(room.name)}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{t(product.name)}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl bg-paper-deep">
          <img src={asset(product.image)} alt={t(product.name)} className="aspect-[3/4] w-full object-cover" />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t(room.name)}</p>
          <h1 className="mt-2 font-display text-3xl md:text-4xl">{t(product.name)}</h1>
          <p className="mt-3 text-lg tabular-nums">{formatMoney(product.price)}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{t(product.blurb)}</p>

          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium">{t(UI.size)}</p>
              <Link to="/size-guide" className="text-sm text-navy">
                {t(UI.sizeGuide)}
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={
                    size === s
                      ? "h-11 min-w-16 rounded-md bg-navy px-3 text-sm text-cream"
                      : "h-11 min-w-16 rounded-md border border-line px-3 text-sm"
                  }
                >
                  {s}
                </button>
              ))}
            </div>
            {size === "NB" || size === "0-3M" ? (
              <p className="mt-3 text-xs text-muted">
                {locale === "es"
                  ? "Si no sabes la talla, 0–3M es el regalo más seguro."
                  : "If you don’t know the size, 0–3M is the safest gift."}
              </p>
            ) : null}
          </div>

          <label className="mt-6 flex cursor-pointer gap-3 rounded-lg border border-line p-4">
            <input type="checkbox" checked={wrapThis} onChange={(e) => setWrapThis(e.target.checked)} className="mt-1" />
            <span>
              <span className="block text-sm font-medium">
                {t(UI.addWrap)}
              </span>
              <span className="text-sm text-muted">{t(UI.wrapNote)}</span>
            </span>
          </label>

          <Button
            size="lg"
            className="mt-6 w-full"
            onClick={() => {
              add(product.slug, size);
              if (wrapThis) setWrap(true);
              setAdded(true);
              window.setTimeout(() => setAdded(false), 1800);
            }}
          >
            {added ? t(UI.added) : t(UI.addToBag)}
          </Button>

          <dl className="mt-10 space-y-4 border-t border-line pt-8 text-sm">
            <div>
              <dt className="font-medium">{locale === "es" ? "La pieza" : "The piece"}</dt>
              <dd className="mt-1 text-ink-soft">{t(product.story)}</dd>
            </div>
            <div>
              <dt className="font-medium">{locale === "es" ? "Tela y cuidado" : "Fabric & care"}</dt>
              <dd className="mt-1 text-ink-soft">
                {t(product.fabric)} · {t(product.care)}
              </dd>
            </div>
            <div>
              <dt className="font-medium">{locale === "es" ? "Envío" : "Shipping"}</dt>
              <dd className="mt-1 text-ink-soft">
                {locale === "es"
                  ? "Envío gratis cuando la ropa llega a $75; el envoltorio no cuenta. Si no, $8 a todo el país."
                  : "Free shipping when clothing subtotal reaches $75; gift wrap excluded. Otherwise $8 nationwide."}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-20">
          <h2 className="font-display text-2xl">{t(UI.completeLook)}</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
            {related.map((p) => (p ? <ProductCard key={p.slug} product={p} /> : null))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard, ProductGrid } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { COMING_HOME_OUTFITS, filterProducts, getProduct } from "@/lib/catalog";
import { useLocale, UI } from "@/lib/locale";

export const Route = createFileRoute("/coming-home")({
  component: ComingHome,
});

function ComingHome() {
  const { locale } = useLocale();
  const products = filterProducts({ occasion: "coming-home" });
  const outfitSlugs = new Set(COMING_HOME_OUTFITS.flatMap((o) => o.slugs));
  const rest = products.filter((p) => !outfitSlugs.has(p.slug));
  const hero =
    getProduct("sibling-announcement-romper-little-sister-peony-rf7eak") ??
    products.find((p) => p.image && !p.image.includes("teddy.png")) ??
    products[0];

  return (
    <div>
      <section className="relative overflow-hidden bg-navy">
        <img
          src={hero?.image ?? "/images/hero-teddy-poster.jpg"}
          alt=""
          className="h-80 w-full object-cover opacity-50 md:h-96"
        />
        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col justify-end px-4 pb-12">
          <p className="text-[11px] uppercase tracking-[0.18em] text-cream/70">
            {locale === "es" ? "La primera noche" : "The first night"}
          </p>
          <h1 className="mt-2 font-display text-4xl text-cream md:text-5xl">
            {locale === "es" ? "Bienvenida a casa." : "Coming home."}
          </h1>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">
          {locale === "es"
            ? "Tres outfits que empacaríamos para la primera noche. Si no sabes talla, empieza en Recién nacido o 0–3M. Lo envolvemos."
            : "Three outfits we would pack for the first night home. If you don’t know size, start with Newborn or 0–3M. We’ll wrap it."}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/shop" search={{ size: "NB" }}>
              {locale === "es" ? "Empezar en recién nacido" : "Start with newborn"}
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/gift-wrap">{UI.giftWrap[locale]}</Link>
          </Button>
        </div>

        <div className="mt-16 space-y-16">
          {COMING_HOME_OUTFITS.map((outfit) => {
            const pieces = outfit.slugs.map((s) => getProduct(s)).filter(Boolean);
            if (pieces.length === 0) return null;
            return (
              <section key={outfit.id}>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                  {locale === "es" ? "Un outfit" : "An outfit"}
                </p>
                <h2 className="mt-2 font-display text-2xl md:text-3xl">{outfit.name[locale]}</h2>
                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6">
                  {pieces.map((p) => (
                    <ProductCard key={p!.slug} product={p!} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {rest.length > 0 ? (
          <div className="mt-16 border-t border-line pt-14">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
              {locale === "es" ? "También para la bienvenida" : "Also for coming home"}
            </p>
            <h2 className="mt-2 font-display text-2xl md:text-3xl">
              {locale === "es" ? "Más sobre la mesa." : "More on the table."}
            </h2>
            <div className="mt-8">
              <ProductGrid products={rest} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { HeroBear } from "@/components/hero-bear";
import { ProductGrid } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { PRODUCTS, PRIMARY_ROOMS, PRIMARY_SIZES, SIZE_LABEL } from "@/lib/catalog";
import { useLocale, UI } from "@/lib/locale";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { t, locale } = useLocale();
  const featured = PRODUCTS.filter((p) => p.featured);

  return (
    <div>
      <HeroBear />

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t(UI.theRooms)}</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">
              {locale === "es" ? "Cuatro salas. Una casa." : "Four rooms. One house."}
            </h2>
          </div>
          <Link to="/shop" className="hidden items-center gap-1 text-sm text-navy md:flex">
            {t(UI.shopAll)} <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRIMARY_ROOMS.map((r) => (
            <Link key={r.id} to="/shop/$room" params={{ room: r.id }} className="group block">
              <div className="overflow-hidden rounded-lg bg-paper-deep">
                <img
                  src={r.image}
                  alt=""
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <h3 className="mt-3 font-display text-xl">{t(r.name)}</h3>
              <p className="text-sm text-muted">{t(r.line)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-paper-deep/60">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <p className="mb-4 text-[11px] uppercase tracking-[0.18em] text-muted">{t(UI.bySize)}</p>
          <div className="flex flex-wrap gap-2">
            {PRIMARY_SIZES.map((s) => (
              <Link
                key={s}
                to="/shop"
                search={{ size: s }}
                className="rounded-full border border-line bg-paper px-4 py-2.5 text-sm hover:border-navy/40"
              >
                {SIZE_LABEL[s][locale]}
              </Link>
            ))}
            <Link to="/size-guide" className="rounded-full px-4 py-2.5 text-sm text-navy">
              {t(UI.sizeGuide)} →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t(UI.onTheTable)}</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">
              {locale === "es" ? "La edición de ahora." : "The edit, right now."}
            </h2>
          </div>
          <Link to="/shop" className="hidden text-sm text-navy md:block">
            {t(UI.shopAll)} →
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      <section className="grid md:grid-cols-2">
        <img src="/images/wrap.jpg" alt="" className="h-72 w-full object-cover md:h-full" />
        <div className="flex flex-col justify-center bg-navy px-8 py-16 text-cream md:px-16">
          <p className="text-[11px] uppercase tracking-[0.18em] text-cream/50">{t(UI.giftWrap)}</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">
            {locale === "es" ? "Lo envolvemos." : "We’ll wrap it."}
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-cream/75">
            {locale === "es"
              ? "Empaque de firma: caja navy, listón, etiqueta a mano. Se agrega al pagar; la ropa dentro es el regalo."
              : "Signature wrap: navy box, ribbon, a handwritten tag. Add it at checkout; the clothes inside are the gift."}
          </p>
          <div className="mt-8">
            <Button asChild variant="cream">
              <Link to="/gift-wrap">{t(UI.ourWrap)}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t(UI.theHouse)}</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">
            {locale === "es" ? "Una boutique familiar, empacada a mano." : "A family boutique, packed by hand."}
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
            {locale === "es"
              ? "No es un almacén. Es el mostrador — English & Español, cambios de talla a medida que crecen, y ropa pensada para quedarse."
              : "Not a warehouse. The counter — English & Español, size exchanges as they grow, and clothes meant to stay."}
          </p>
          <Link to="/the-house" className="mt-6 inline-flex items-center gap-1 text-navy">
            {t(UI.theHouse)} <ArrowRight className="size-4" />
          </Link>
        </div>
        <img src="/images/house.jpg" alt="" className="aspect-[16/10] w-full rounded-xl object-cover" />
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
          {[
            {
              t: { en: "Ships nationwide", es: "Envío a todo el país" },
              d: {
                en: "$8 flat. Free over $75 of clothes — wrap does not count.",
                es: "$8 fijo. Gratis desde $75 en ropa — el envoltorio no cuenta.",
              },
            },
            {
              t: { en: "Size exchanges", es: "Cambio de talla" },
              d: {
                en: "As they grow. Write us within about two weeks.",
                es: "A medida que crecen. Escríbenos en unas dos semanas.",
              },
            },
            {
              t: { en: "English & Español", es: "English & Español" },
              d: {
                en: "We answer in the language you write in.",
                es: "Respondemos en el idioma en que nos escribes.",
              },
            },
          ].map((item) => (
            <div key={item.t.en}>
              <h3 className="font-display text-xl">{t(item.t)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(item.d)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

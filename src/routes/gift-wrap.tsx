import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { WRAP_PRICE } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { useLocale, UI } from "@/lib/locale";
import { formatMoney } from "@/lib/utils";

export const Route = createFileRoute("/gift-wrap")({
  component: GiftWrap,
});

function GiftWrap() {
  const { locale } = useLocale();
  const setWrap = useCart((s) => s.setWrap);

  return (
    <div>
      <section className="grid md:grid-cols-2">
        <img src="/images/wrap.jpg" alt="" className="h-80 w-full object-cover md:h-[32rem]" />
        <div className="flex flex-col justify-center px-6 py-12 md:px-14">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
            {locale === "es" ? "El mostrador" : "The counter"}
          </p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">
            {locale === "es" ? "Envoltorio de la casa." : "Signature gift wrap."}
          </h1>
          <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
            {locale === "es"
              ? "Empaque de firma: caja navy, listón, etiqueta a mano. Se agrega al pagar; la ropa dentro es el regalo."
              : "Signature wrap: navy box, ribbon, a handwritten tag. Add it at checkout; the clothes inside are the gift."}
          </p>
          <p className="mt-4 font-display text-2xl">{formatMoney(WRAP_PRICE)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              onClick={() => {
                setWrap(true);
              }}
            >
              {locale === "es" ? "Agregar envoltorio a la bolsa" : "Add wrap to bag"}
            </Button>
            <Button asChild variant="outline">
              <Link to="/shop/$room" params={{ room: "gifts" }}>
                {UI.gifts[locale]}
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-3">
        {[
          {
            t: { en: "Navy magnetic box", es: "Caja marina magnética" },
            d: { en: "A lid that clicks shut. The same box we use at the counter.", es: "Una tapa que cierra con clic. La misma caja del mostrador." },
          },
          {
            t: { en: "Teddy tissue", es: "Papel de seda del osito" },
            d: { en: "Cream paper, the sitting bear, SHIA BABY in navy. The first thing they see.", es: "Papel crema, el osito sentado, SHIA BABY en marino. Lo primero que ven." },
          },
          {
            t: { en: "Ribbon and tag", es: "Listón y etiqueta" },
            d: { en: "Hand-tied satin, a written tag. The bear still goes in every box.", es: "Satén atado a mano, etiqueta escrita. El osito igual va en cada caja." },
          },
        ].map((b) => (
          <div key={b.t.en} className="rounded-xl border border-line p-6">
            <h2 className="font-display text-2xl">{b.t[locale]}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{b.d[locale]}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

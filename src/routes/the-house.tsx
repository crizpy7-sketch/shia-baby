import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useLocale, UI } from "@/lib/locale";

export const Route = createFileRoute("/the-house")({
  component: TheHouse,
});

function TheHouse() {
  const { locale } = useLocale();
  const steps = [
    {
      n: "01",
      t: { en: "Pick", es: "Elegir" },
      d: { en: "The edit on the table — not the warehouse.", es: "La edición sobre la mesa — no el almacén." },
    },
    {
      n: "02",
      t: { en: "Wrap", es: "Envolver" },
      d: { en: "Navy box, ribbon, the bear tag.", es: "Caja marina, listón, la etiqueta del osito." },
    },
    {
      n: "03",
      t: { en: "Pack", es: "Empacar" },
      d: { en: "Packed by hand, as if from the counter.", es: "Empacado a mano, como desde el mostrador." },
    },
    {
      n: "04",
      t: { en: "Keep", es: "Guardar" },
      d: { en: "Clothes for the first year, and after.", es: "Ropa para el primer año, y después." },
    },
  ];

  return (
    <div>
      <section className="relative">
        <img src="/images/house.jpg" alt="" className="h-80 w-full object-cover md:h-[28rem]" />
        <div className="absolute inset-0 bg-navy/35" />
        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col justify-end px-4 pb-12">
          <p className="text-[11px] uppercase tracking-[0.18em] text-cream/70">
            {locale === "es" ? "Empacado a mano · Envío a todo el país" : "Packed by hand · Ships nationwide"}
          </p>
          <h1 className="mt-2 font-display text-4xl text-cream md:text-5xl">
            {locale === "es" ? "La casa." : "The house."}
          </h1>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4 py-16">
        <p className="font-display text-2xl leading-snug md:text-3xl">
          {locale === "es"
            ? "Una boutique familiar. English & Español. Piezas elegidas una a una, no por tarima."
            : "A family boutique. English & Español. Pieces chosen one at a time, not by the pallet."}
        </p>
        <p className="mt-6 leading-relaxed text-ink-soft">
          {locale === "es"
            ? "Shia Baby es el mostrador, no el depósito. Vendemos ropa del primer año que se ve bien ahora y se guarda después — bambú para dormir, lino y jersey para el día, tejidos para heredar. Cada pedido se empaca a mano, con el mismo envoltorio que usaríamos si estuvieras enfrente, y sale hacia todo el país."
            : "Shia Baby is the counter, not the warehouse. We sell first-year clothes that look right now and keep after — bamboo for sleep, linen and jersey for day, knits to inherit. Every order is packed by hand, in the same wrap we would use if you were standing in front of us, and ships nationwide."}
        </p>
        <p className="mt-6 text-sm leading-relaxed text-muted">
          {locale === "es"
            ? "La casa empezó en McAllen, Texas. El mostrador sigue ahí — para quien pueda pasar. El resto del país recibe la misma caja."
            : "The house began in McAllen, Texas. The counter is still there — if you can stop in. The rest of the country gets the same box."}
        </p>
      </div>
      <section className="bg-paper-deep/70">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n}>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{s.n}</p>
              <h2 className="mt-2 font-display text-2xl">{s.t[locale]}</h2>
              <p className="mt-2 text-sm text-ink-soft">{s.d[locale]}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
        <img src="/images/bear.jpg" alt="" className="rounded-xl object-cover" />
        <div>
          <h2 className="font-display text-3xl">
            {locale === "es" ? "El osito va en cada caja." : "The bear goes in every box."}
          </h2>
          <p className="mt-4 leading-relaxed text-ink-soft">
            {locale === "es"
              ? "No es un personaje. Es la compañía de la tapa. Si quieres uno de más, está en la sala de regalos."
              : "Not a character. Company for the lid. If you want a spare, it lives in the gift room."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/shop">{UI.shopAll[locale]}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/gift-wrap">{UI.giftWrap[locale]}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

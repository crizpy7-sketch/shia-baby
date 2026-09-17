import { createFileRoute } from "@tanstack/react-router";
import { useLocale } from "@/lib/locale";

export const Route = createFileRoute("/shipping")({
  component: Shipping,
});

function Shipping() {
  const { locale } = useLocale();
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-display text-4xl md:text-5xl">
        {locale === "es" ? "Envíos y cambios." : "Shipping & returns."}
      </h1>
      <div className="mt-10 space-y-8 leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-2xl text-ink">
            {locale === "es" ? "Envío" : "Shipping"}
          </h2>
          <p className="mt-3">
            {locale === "es"
              ? "$8 a todo el país. Envío gratis cuando la ropa llega a $75; el envoltorio no cuenta. Recogida en la casa en McAllen, Texas, si estás cerca."
              : "Free shipping when clothing subtotal reaches $75; gift wrap excluded. Otherwise $8 nationwide. Free pickup at the house in McAllen, Texas, if you’re nearby."}
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl text-ink">
            {locale === "es" ? "Cambios de talla" : "Size exchanges"}
          </h2>
          <p className="mt-3">
            {locale === "es"
              ? "Cambio suave de talla en unas dos semanas — escríbenos. A medida que crecen. Las piezas deben estar sin uso, con etiquetas."
              : "A soft size exchange within about two weeks — write us. As they grow. Pieces should be unworn, tags on."}
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl text-ink">
            {locale === "es" ? "Envoltorio" : "Gift wrap"}
          </h2>
          <p className="mt-3">
            {locale === "es"
              ? "El envoltorio de la casa es $12. El osito va en cada caja, se pida envoltorio o no."
              : "Signature wrap is $12. The bear goes in every box, wrap or not."}
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl text-ink">{locale === "es" ? "Escribirnos" : "Write us"}</h2>
          <p className="mt-3">
            <a href="mailto:hello@shiababyshop.com" className="text-navy">
              hello@shiababyshop.com
            </a>
            {" · "}
            English & Español
          </p>
        </section>
      </div>
    </div>
  );
}

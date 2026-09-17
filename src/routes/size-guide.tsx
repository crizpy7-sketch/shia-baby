import { createFileRoute, Link } from "@tanstack/react-router";
import { SIZE_LABEL, SIZES } from "@/lib/catalog";
import { useLocale } from "@/lib/locale";

export const Route = createFileRoute("/size-guide")({
  component: SizeGuide,
});

const ROWS: { size: string; lb: string; kg: string; height: string }[] = [
  { size: "NB", lb: "Up to 8 lb", kg: "Hasta 3.6 kg", height: "Up to 21 in / 53 cm" },
  { size: "0-3M", lb: "8–12 lb", kg: "3.6–5.4 kg", height: "21–24 in / 53–61 cm" },
  { size: "0-6M", lb: "8–16 lb", kg: "3.6–7.3 kg", height: "21–27 in / 53–69 cm" },
  { size: "3-6M", lb: "12–16 lb", kg: "5.4–7.3 kg", height: "24–27 in / 61–69 cm" },
  { size: "6M", lb: "16–18 lb", kg: "7.3–8.2 kg", height: "27–28 in / 69–71 cm" },
  { size: "6-9M", lb: "16–20 lb", kg: "7.3–9 kg", height: "27–29 in / 69–74 cm" },
  { size: "6-12M", lb: "16–22 lb", kg: "7.3–10 kg", height: "27–31 in / 69–79 cm" },
  { size: "12M", lb: "20–22 lb", kg: "9–10 kg", height: "30–32 in / 76–81 cm" },
  { size: "12-18M", lb: "22–26 lb", kg: "10–12 kg", height: "30–32.5 in / 76–83 cm" },
  { size: "18-24M", lb: "26–30 lb", kg: "12–14 kg", height: "32.5–35.5 in / 83–90 cm" },
];

function SizeGuide() {
  const { locale } = useLocale();
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
        {locale === "es" ? "El primer año" : "The first year"}
      </p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">
        {locale === "es" ? "Guía de tallas." : "Size guide."}
      </h1>
      <p className="mt-4 leading-relaxed text-ink-soft">
        {locale === "es"
          ? "La mayoría de las familias suben una talla. Si es un regalo y no sabes, elige 0–3M. Los tejidos (mantas, patucos) suelen ser talla única."
          : "Most families size up one. If it is a gift and you don’t know, choose 0–3M. Knits (blankets, booties) are usually one size."}
      </p>
      <div className="mt-10 overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead className="bg-paper-deep text-[11px] uppercase tracking-[0.14em] text-muted">
            <tr>
              <th className="px-4 py-3">{locale === "es" ? "Talla" : "Size"}</th>
              <th className="px-4 py-3">{locale === "es" ? "Peso" : "Weight"}</th>
              <th className="px-4 py-3">{locale === "es" ? "Altura" : "Height"}</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.size} className="border-t border-line">
                <td className="px-4 py-3 font-medium">
                  {row.size}
                  <span className="mt-0.5 block text-xs font-normal text-muted">{SIZE_LABEL[row.size][locale]}</span>
                </td>
                <td className="px-4 py-3 text-ink-soft">{locale === "es" ? row.kg : row.lb}</td>
                <td className="px-4 py-3 text-ink-soft">{row.height}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-8 text-sm text-muted">
        {locale === "es" ? "¿Quieres cambiar una talla? Escríbenos — lo hacemos a medida que crecen." : "Need a size exchange? Write us — we do it as they grow."}{" "}
        <Link to="/shipping" className="text-navy">
          {locale === "es" ? "Envíos y cambios" : "Shipping & returns"}
        </Link>
      </p>
    </div>
  );
}

import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/lib/catalog";
import { totals, useCart } from "@/lib/cart";
import { useLocale, UI } from "@/lib/locale";
import { formatMoney } from "@/lib/utils";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const { t, locale } = useLocale();
  const lines = useCart((s) => s.lines).filter((l) => getProduct(l.slug));
  const wrap = useCart((s) => s.wrap);
  const note = useCart((s) => s.note);
  const setQty = useCart((s) => s.setQty);
  const setWrap = useCart((s) => s.setWrap);
  const setNote = useCart((s) => s.setNote);
  const clear = useCart((s) => s.clear);
  const tts = totals(lines, wrap);
  const [placed, setPlaced] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (placed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
          {locale === "es" ? "La casa" : "The house"}
        </p>
        <h1 className="mt-3 font-display text-4xl">
          {locale === "es" ? "Lo empacamos." : "We’ll pack it."}
        </h1>
        <p className="mt-4 text-ink-soft">
          {locale === "es"
            ? "Este es el mostrador en línea — un pedido de demostración. En shiababyshop.com te escribimos para confirmar."
            : "This is the online counter — a demonstration order. On shiababyshop.com we write you to confirm."}
        </p>
        <Button asChild className="mt-8">
          <Link to="/shop">{t(UI.startShopping)}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 lg:grid-cols-[1.2fr_0.8fr]">
      <div>
        <h1 className="font-display text-4xl">{t(UI.bag)}</h1>
        {lines.length === 0 ? (
          <div className="mt-10">
            <p className="text-muted">{t(UI.emptyBag)}</p>
            <Button asChild className="mt-6">
              <Link to="/shop">{t(UI.startShopping)}</Link>
            </Button>
          </div>
        ) : (
          <ul className="mt-8 divide-y divide-line">
            {lines.map((line) => {
              const p = getProduct(line.slug);
              if (!p) return null;
              return (
                <li key={line.id} className="flex gap-4 py-5">
                  <img src={p.image} alt="" className="size-24 rounded-md object-cover" />
                  <div className="flex-1">
                    <Link to="/product/$slug" params={{ slug: p.slug }} className="font-display text-lg">
                      {p.name[locale]}
                    </Link>
                    <p className="text-sm text-muted">{line.size}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <button className="size-8 rounded-md border border-line" onClick={() => setQty(line.id, line.qty - 1)}>
                        −
                      </button>
                      <span className="w-6 text-center tabular-nums">{line.qty}</span>
                      <button className="size-8 rounded-md border border-line" onClick={() => setQty(line.id, line.qty + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <p className="tabular-nums">{formatMoney(p.price * line.qty)}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <aside className="h-fit rounded-xl border border-line bg-white p-6">
        <h2 className="font-display text-2xl">{locale === "es" ? "Pedido" : "Order"}</h2>
        <label className="mt-5 flex cursor-pointer gap-3 text-sm">
          <input type="checkbox" checked={wrap} onChange={(e) => setWrap(e.target.checked)} className="mt-0.5" />
          <span>
            {t(UI.addWrap)}
            <span className="block text-muted">{t(UI.wrapNote)}</span>
          </span>
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={locale === "es" ? "Nota para el tag (opcional)" : "Note for the tag (optional)"}
          className="mt-4 h-24 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-navy/40"
        />
        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt>{t(UI.subtotal)}</dt>
            <dd className="tabular-nums">{formatMoney(tts.clothes)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>{t(UI.wrap)}</dt>
            <dd className="tabular-nums">{wrap ? formatMoney(tts.wrapCost) : "—"}</dd>
          </div>
          <div className="flex justify-between">
            <dt>{t(UI.shipping)}</dt>
            <dd className="tabular-nums">{tts.shipping === 0 ? t(UI.free) : formatMoney(tts.shipping)}</dd>
          </div>
          <div className="flex justify-between border-t border-line pt-2 font-medium">
            <dt>{t(UI.total)}</dt>
            <dd className="tabular-nums">{formatMoney(tts.total)}</dd>
          </div>
        </dl>
        {lines.length > 0 && tts.remainingForFree > 0 ? (
          <p className="mt-3 text-xs text-muted">
            {locale === "es"
              ? `Añade ${formatMoney(tts.remainingForFree)} en ropa para envío gratis. El envoltorio no cuenta.`
              : `Add ${formatMoney(tts.remainingForFree)} in clothes for free shipping. Gift wrap excluded.`}
          </p>
        ) : null}
        {lines.length > 0 ? (
          <form
            className="mt-6 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              clear();
              setPlaced(true);
            }}
          >
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={locale === "es" ? "Nombre" : "Name"}
              className="h-12 w-full rounded-md border border-line px-3 text-sm outline-none focus:border-navy/40"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="h-12 w-full rounded-md border border-line px-3 text-sm outline-none focus:border-navy/40"
            />
            <Button type="submit" className="w-full" size="lg">
              {t(UI.checkout)}
            </Button>
            <p className="text-xs text-muted">
              {locale === "es"
                ? "Demostración del mostrador. No se cobra en esta vista previa."
                : "A demonstration of the counter. Nothing is charged in this preview."}
            </p>
          </form>
        ) : null}
      </aside>
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { getProduct } from "@/lib/catalog";
import { asset } from "@/lib/assets";
import { cartCount, totals, useCart } from "@/lib/cart";
import { useLocale, UI } from "@/lib/locale";
import { formatMoney } from "@/lib/utils";
import { Button } from "./ui/button";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, locale } = useLocale();
  const lines = useCart((s) => s.lines);
  const wrap = useCart((s) => s.wrap);
  const setQty = useCart((s) => s.setQty);
  const setWrap = useCart((s) => s.setWrap);
  const visible = lines.filter((l) => getProduct(l.slug));
  const count = cartCount(visible);
  const tts = totals(visible, wrap);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-navy/40" />
      <aside
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-xl">
            {t(UI.bag)} <span className="text-muted">({count})</span>
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label={t(UI.close)}>
            <X className="size-4" />
          </Button>
        </header>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {visible.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-muted">{t(UI.emptyBag)}</p>
              <Button asChild className="mt-6">
                <Link to="/shop" onClick={onClose}>
                  {t(UI.startShopping)}
                </Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-5">
              {visible.map((line) => {
                const p = getProduct(line.slug);
                if (!p) return null;
                return (
                  <li key={line.id} className="flex gap-3">
                    <img src={asset(p.image)} alt="" className="size-20 rounded-md object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="font-display leading-snug">{p.name[locale]}</p>
                      <p className="text-xs text-muted">{line.size}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <button className="size-8 rounded-md border border-line" onClick={() => setQty(line.id, line.qty - 1)}>
                            −
                          </button>
                          <span className="tabular-nums w-4 text-center">{line.qty}</span>
                          <button className="size-8 rounded-md border border-line" onClick={() => setQty(line.id, line.qty + 1)}>
                            +
                          </button>
                        </div>
                        <p className="text-sm tabular-nums">{formatMoney(p.price * line.qty)}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          {visible.length > 0 ? (
            <label className="mt-8 flex cursor-pointer gap-3 rounded-lg border border-line p-4">
              <input type="checkbox" checked={wrap} onChange={(e) => setWrap(e.target.checked)} className="mt-1" />
              <span>
                <span className="block font-medium">{t(UI.addWrap)}</span>
                <span className="text-sm text-muted">{t(UI.wrapNote)}</span>
              </span>
            </label>
          ) : null}
        </div>
        {lines.length > 0 ? (
          <footer className="border-t border-line px-5 py-4 space-y-2">
            {tts.remainingForFree > 0 ? (
              <p className="text-xs text-muted">
                {locale === "es"
                  ? `Añade ${formatMoney(tts.remainingForFree)} en ropa para envío gratis. El envoltorio no cuenta.`
                  : `Add ${formatMoney(tts.remainingForFree)} in clothes for free shipping. Gift wrap excluded.`}
              </p>
            ) : (
              <p className="text-xs text-muted">{locale === "es" ? "Envío gratis." : "Free shipping."}</p>
            )}
            <div className="flex justify-between text-sm">
              <span>{t(UI.total)}</span>
              <span className="tabular-nums font-medium">{formatMoney(tts.total)}</span>
            </div>
            <Button asChild className="w-full" size="lg">
              <Link to="/cart" search={{}} onClick={onClose}>
                {t(UI.viewBag)}
              </Link>
            </Button>
          </footer>
        ) : null}
      </aside>
    </div>
  );
}

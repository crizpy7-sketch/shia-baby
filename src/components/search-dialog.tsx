import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { filterProducts } from "@/lib/catalog";
import { useLocale, UI } from "@/lib/locale";
import { formatMoney } from "@/lib/utils";
import { Button } from "./ui/button";

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, locale } = useLocale();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => (q.trim().length < 1 ? [] : filterProducts({ q }).slice(0, 8)), [q]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-navy/40 p-4 pt-20" onClick={onClose}>
      <div
        className="w-full max-w-xl overflow-hidden rounded-xl bg-paper shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          className="flex items-center gap-3 border-b border-line px-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!q.trim()) return;
            navigate({ to: "/shop", search: { q: q.trim() } });
            onClose();
          }}
        >
          <Search className="size-4 text-muted" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t(UI.searchPlaceholder)}
            className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted"
          />
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label={t(UI.close)}>
            <X className="size-4" />
          </Button>
        </form>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {q.trim() && results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted">{t(UI.noResults)}</p>
          ) : null}
          {results.map((p) => (
            <Link
              key={p.slug}
              to="/product/$slug"
              params={{ slug: p.slug }}
              onClick={onClose}
              className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-paper-deep"
            >
              <img src={p.image} alt="" className="size-14 rounded-sm object-cover" />
              <div className="min-w-0">
                <p className="truncate font-display text-[15px]">{p.name[locale]}</p>
                <p className="text-xs text-muted">
                  {formatMoney(p.price)} · {p.sizes.join(" · ")}
                </p>
              </div>
            </Link>
          ))}
          <div className="grid grid-cols-2 gap-2 p-3">
            {["coming-home", "gift", "sleep"].map((occ) => (
              <Link
                key={occ}
                to="/shop"
                search={{ occasion: occ }}
                onClick={onClose}
                className="rounded-md border border-line px-3 py-2 text-sm hover:border-navy/40"
              >
                {occ === "coming-home"
                  ? locale === "es"
                    ? "Bienvenida"
                    : "Coming home"
                  : occ === "gift"
                    ? locale === "es"
                      ? "Regalos"
                      : "Gifts"
                    : locale === "es"
                      ? "Dormir"
                      : "Sleep"}
              </Link>
            ))}
            {["NB", "0-3M", "3-6M", "6-12M"].map((size) => (
              <Link
                key={size}
                to="/shop"
                search={{ size }}
                onClick={onClose}
                className="rounded-md border border-line px-3 py-2 text-sm hover:border-navy/40"
              >
                {size}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

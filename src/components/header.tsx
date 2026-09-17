import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { OCCASIONS, PRIMARY_ROOMS, PRIMARY_SIZES, ROOMS, SIZE_LABEL } from "@/lib/catalog";
import { cartCount, useCart } from "@/lib/cart";
import { useLocale, UI } from "@/lib/locale";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { SearchDialog } from "./search-dialog";
import { CartDrawer } from "./cart-drawer";

export function Header() {
  const { t, locale, setLocale } = useLocale();
  const count = useCart((s) => cartCount(s.lines));
  const [shopOpen, setShopOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const [bag, setBag] = useState(false);

  return (
    <>
      <div className="overflow-hidden bg-navy text-cream">
        <div className="marquee-track flex w-max gap-10 py-2.5 pr-10">
          {[0, 1].flatMap((copy) =>
            [
              { en: "Ships nationwide", es: "Envío a todo el país" },
              { en: "Free over $75 of clothes", es: "Gratis desde $75 en ropa" },
              { en: "The bear goes in every box", es: "El osito va en cada caja" },
            ].map((item, i) => (
              <span
                key={`${copy}-${i}`}
                className="whitespace-nowrap font-display text-[11px] uppercase tracking-[0.28em] sm:text-sm"
              >
                {item[locale]}
                <span className="mx-10 text-gold" aria-hidden>
                  ·
                </span>
              </span>
            )),
          )}
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 md:h-[4.5rem]">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={t(UI.menu)}
            onClick={() => setMobile(true)}
          >
            <Menu className="size-5" />
          </Button>

          <Link to="/" className="font-display text-[1.35rem] tracking-tight text-navy md:text-2xl">
            Shia Baby
          </Link>

          <nav className="ml-8 hidden items-center gap-6 text-[13px] font-medium tracking-wide lg:flex">
            <div
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <Link to="/shop" className={cn("py-6", shopOpen && "text-navy")}>
                {t(UI.shop)}
              </Link>
              {shopOpen ? (
                <div className="absolute left-0 top-full w-[640px] rounded-b-xl border border-t-0 border-line bg-paper p-8 shadow-xl">
                  <div className="grid grid-cols-3 gap-8 text-sm">
                    <div>
                      <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-muted">{t(UI.theRooms)}</p>
                      <ul className="space-y-2">
                        {PRIMARY_ROOMS.map((r) => (
                          <li key={r.id}>
                            <Link to="/shop/$room" params={{ room: r.id }} className="hover:text-navy">
                              {t(r.name)}
                            </Link>
                            <p className="text-xs text-muted">{t(r.line)}</p>
                          </li>
                        ))}
                        <li className="pt-2">
                          <Link to="/coming-home" className="hover:text-navy">
                            {t(UI.comingHome)}
                          </Link>
                          <p className="text-xs text-muted">
                            {locale === "es" ? "La primera noche. Recién nacido y 0–3M." : "The first night. Newborn and 0–3M."}
                          </p>
                        </li>
                        <li className="pt-2">
                          <Link to="/shop" className="text-navy">
                            {t(UI.shopAll)} →
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-muted">{t(UI.bySize)}</p>
                      <ul className="space-y-2">
                        {PRIMARY_SIZES.map((s) => (
                          <li key={s}>
                            <Link to="/shop" search={{ size: s }} className="hover:text-navy">
                              {SIZE_LABEL[s][locale]}
                            </Link>
                          </li>
                        ))}
                        <li className="pt-2">
                          <Link to="/size-guide" className="text-navy">
                            {t(UI.sizeGuide)} →
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-muted">{t(UI.for)}</p>
                      <ul className="space-y-2">
                        {OCCASIONS.map((o) => (
                          <li key={o.id}>
                            {o.id === "coming-home" ? (
                              <Link to="/coming-home" className="hover:text-navy">
                                {t(o.name)}
                              </Link>
                            ) : (
                              <Link to="/shop" search={{ occasion: o.id }} className="hover:text-navy">
                                {t(o.name)}
                              </Link>
                            )}
                          </li>
                        ))}
                        <li className="pt-2">
                          <Link to="/gift-wrap" className="hover:text-navy">
                            {t(UI.giftWrap)}
                          </Link>
                          <p className="text-xs text-muted">
                            {locale === "es" ? "El servicio: caja, listón, etiqueta." : "The service: box, ribbon, tag."}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <Link to="/coming-home">{t(UI.comingHome)}</Link>
            <Link to="/gift-wrap">{t(UI.giftWrap)}</Link>
            <Link to="/the-house">{t(UI.theHouse)}</Link>
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <button
              className="px-2 py-1 text-xs tracking-wider text-muted"
              onClick={() => setLocale(locale === "en" ? "es" : "en")}
              aria-label={locale === "en" ? "Español" : "English"}
            >
              {locale === "en" ? "ES" : "EN"}
            </button>
            <Button variant="ghost" size="icon" onClick={() => setSearch(true)} aria-label={t(UI.search)}>
              <Search className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" onClick={() => setBag(true)} aria-label={t(UI.bag)}>
              <ShoppingBag className="size-5" />
              {count > 0 ? (
                <span className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-navy text-[9px] text-cream">
                  {count}
                </span>
              ) : null}
            </Button>
          </div>
        </div>
      </header>

      {mobile ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy/40" onClick={() => setMobile(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-paper">
            <div className="flex items-center justify-between px-4 py-4">
              <p className="font-display text-xl text-navy">Shia Baby</p>
              <Button variant="ghost" size="icon" onClick={() => setMobile(false)} aria-label={t(UI.close)}>
                <X className="size-5" />
              </Button>
            </div>
            <nav className="flex-1 overflow-y-auto px-5 pb-10 text-[15px]">
              <div className="mb-6 space-y-3">
                <Link to="/shop" onClick={() => setMobile(false)} className="block font-medium">
                  {t(UI.shop)}
                </Link>
                <Link to="/coming-home" onClick={() => setMobile(false)} className="block font-medium">
                  {t(UI.comingHome)}
                </Link>
                <Link to="/gift-wrap" onClick={() => setMobile(false)} className="block font-medium">
                  {t(UI.giftWrap)}
                </Link>
                <Link to="/the-house" onClick={() => setMobile(false)} className="block font-medium">
                  {t(UI.theHouse)}
                </Link>
              </div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-muted">{t(UI.theRooms)}</p>
              <div className="mb-6 space-y-3">
                {ROOMS.map((r) => (
                  <Link
                    key={r.id}
                    to="/shop/$room"
                    params={{ room: r.id }}
                    onClick={() => setMobile(false)}
                    className="block"
                  >
                    {t(r.name)}
                  </Link>
                ))}
              </div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-muted">{t(UI.bySize)}</p>
              <div className="mb-6 flex flex-wrap gap-2">
                {PRIMARY_SIZES.map((s) => (
                  <Link
                    key={s}
                    to="/shop"
                    search={{ size: s }}
                    onClick={() => setMobile(false)}
                    className="rounded-full border border-line px-3 py-2 text-sm"
                  >
                    {s}
                  </Link>
                ))}
                <Link to="/size-guide" onClick={() => setMobile(false)} className="px-3 py-2 text-sm text-navy">
                  {t(UI.sizeGuide)} →
                </Link>
              </div>
              <button
                className="mt-4 text-sm tracking-wider text-muted"
                onClick={() => setLocale(locale === "en" ? "es" : "en")}
              >
                {locale === "en" ? "Español" : "English"}
              </button>
            </nav>
          </aside>
        </div>
      ) : null}

      <SearchDialog open={search} onClose={() => setSearch(false)} />
      <CartDrawer open={bag} onClose={() => setBag(false)} />
    </>
  );
}

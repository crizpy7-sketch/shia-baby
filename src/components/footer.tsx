import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ROOMS } from "@/lib/catalog";
import { useLocale, UI } from "@/lib/locale";
import { Button } from "./ui/button";

export function Footer() {
  const { t, locale } = useLocale();
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <footer className="mt-auto border-t border-line bg-navy text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl">Shia Baby</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/70">
            {locale === "es"
              ? "Una casa familiar. Ropa del primer año, elegida una pieza a la vez, envuelta como si tuvieras toda la tarde. Envío a todo el país."
              : "A family house. First-year clothes, picked one piece at a time, packed as if you had all afternoon. Ships nationwide."}
          </p>
          <form
            className="mt-6 flex max-w-md gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) setJoined(true);
            }}
          >
            {joined ? (
              <p className="text-sm text-cream/80">
                {locale === "es" ? "Bienvenida a la familia." : "Welcome to the family."}
              </p>
            ) : (
              <>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={locale === "es" ? "Correo para el Milestone Club" : "Email for the Milestone Club"}
                  className="h-12 flex-1 rounded-md border border-cream/20 bg-navy-deep px-3 text-sm text-cream placeholder:text-cream/40 outline-none focus:border-cream/50"
                />
                <Button variant="cream" type="submit">
                  {locale === "es" ? "Unirme" : "Join"}
                </Button>
              </>
            )}
          </form>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-cream/50">{t(UI.shop)}</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            {ROOMS.map((r) => (
              <li key={r.id}>
                <Link to="/shop/$room" params={{ room: r.id }}>
                  {t(r.name)}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/coming-home">{t(UI.comingHome)}</Link>
            </li>
            <li>
              <Link to="/shop">{t(UI.shopAll)}</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-cream/50">{t(UI.theHouse)}</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>
              <Link to="/the-house">{t(UI.theHouse)}</Link>
            </li>
            <li>
              <Link to="/gift-wrap">{t(UI.giftWrap)}</Link>
            </li>
            <li>
              <Link to="/size-guide">{t(UI.sizeGuide)}</Link>
            </li>
            <li>
              <Link to="/shipping">{t(UI.shippingReturns)}</Link>
            </li>
            <li>
              <a href="mailto:hello@shiababyshop.com">{t(UI.contact)}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-[11px] uppercase tracking-[0.14em] text-cream/45 sm:flex-row sm:justify-between">
          <p>{t(UI.spoken)} · {locale === "es" ? "Hecho a mano en Texas" : "Packed by hand in Texas"}</p>
          <p>© {new Date().getFullYear()} Shia Baby</p>
        </div>
      </div>
    </footer>
  );
}

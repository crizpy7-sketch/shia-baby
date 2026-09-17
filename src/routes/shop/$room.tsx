import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { FilterBar } from "@/components/filter-bar";
import { ProductGrid } from "@/components/product-card";
import { ROOM_COPY, ROOMS, filterProducts, isRoom } from "@/lib/catalog";
import { useLocale, UI } from "@/lib/locale";
import { parseShopSearch } from "@/lib/shop-search";

export const Route = createFileRoute("/shop/$room")({
  validateSearch: parseShopSearch,
  component: RoomPage,
});

function RoomPage() {
  const { room } = Route.useParams();
  const search = Route.useSearch();
  const { t, locale } = useLocale();
  if (!isRoom(room)) throw notFound();

  const meta = ROOMS.find((r) => r.id === room)!;
  const copy = ROOM_COPY[room];
  const products = filterProducts({ ...search, room });

  return (
    <div>
      <section className="relative h-72 overflow-hidden bg-navy md:h-80">
        <img src={meta.image} alt="" className="h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-navy/40" />
        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col justify-end px-4 pb-10">
          <p className="text-[11px] uppercase tracking-[0.18em] text-cream/70">{t(copy.kicker)}</p>
          <h1 className="mt-2 font-display text-4xl text-cream md:text-5xl">{t(copy.title)}</h1>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="max-w-2xl text-ink-soft">{t(copy.body)}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/coming-home"
            className="rounded-full border border-line px-4 py-2 text-sm"
          >
            {UI.comingHome[locale]}
          </Link>
          {ROOMS.map((r) => (
            <Link
              key={r.id}
              to="/shop/$room"
              params={{ room: r.id }}
              className={
                r.id === room
                  ? "rounded-full bg-navy px-4 py-2 text-sm text-cream"
                  : "rounded-full border border-line px-4 py-2 text-sm"
              }
            >
              {r.name[locale]}
            </Link>
          ))}
        </div>
        {room === "gifts" ? (
          <p className="mt-6 text-sm text-ink-soft">
            {locale === "es"
              ? "Esto es ropa para regalar. El envoltorio — caja, listón, etiqueta — es un servicio aparte."
              : "These are clothes to give. Wrap — box, ribbon, tag — is a separate service."}{" "}
            <Link to="/gift-wrap" className="text-navy">
              {UI.giftWrap[locale]} →
            </Link>
          </p>
        ) : null}
        <div className="mt-8">
          <FilterBar room={room} search={search} count={products.length} />
        </div>
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}

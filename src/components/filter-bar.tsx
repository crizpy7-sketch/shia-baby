import { Link } from "@tanstack/react-router";
import { OCCASIONS, PRIMARY_SIZES, ROOMS, type RoomId } from "@/lib/catalog";
import { useLocale, UI } from "@/lib/locale";
import { cn } from "@/lib/utils";

type ShopSearch = {
  size?: string;
  occasion?: string;
  q?: string;
};

export function FilterBar({
  room,
  search,
  count,
}: {
  room?: RoomId;
  search: ShopSearch;
  count: number;
}) {
  const { t, locale } = useLocale();
  const sizes = PRIMARY_SIZES;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          {count} {t(UI.pieces)}
          {search.q ? ` · “${search.q}”` : ""}
        </p>
        {search.size || search.occasion || search.q ? (
          <Link to={room ? "/shop/$room" : "/shop"} params={room ? { room } : undefined} className="text-sm text-navy">
            {t(UI.clearFilters)}
          </Link>
        ) : null}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {sizes.map((s) => {
          const active = search.size === s;
          return (
            <Link
              key={s}
              to={room ? "/shop/$room" : "/shop"}
              params={room ? { room } : undefined}
              search={{ ...search, size: active ? undefined : s }}
              className={cn(
                "shrink-0 rounded-full border px-3 py-2 text-sm",
                active ? "border-navy bg-navy text-cream" : "border-line hover:border-navy/40",
              )}
            >
              {s}
            </Link>
          );
        })}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {OCCASIONS.map((o) => {
          const active = search.occasion === o.id;
          return (
            <Link
              key={o.id}
              to={room ? "/shop/$room" : "/shop"}
              params={room ? { room } : undefined}
              search={{ ...search, occasion: active ? undefined : o.id }}
              className={cn(
                "shrink-0 rounded-full border px-3 py-2 text-sm",
                active ? "border-navy bg-navy text-cream" : "border-line hover:border-navy/40",
              )}
            >
              {t(o.name)}
            </Link>
          );
        })}
      </div>
      {!room ? (
        <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {ROOMS.map((r) => (
            <Link
              key={r.id}
              to="/shop/$room"
              params={{ room: r.id }}
              className="shrink-0 rounded-full border border-line px-3 py-2 text-sm"
            >
              {r.name[locale]}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

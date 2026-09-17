import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Locale } from "./catalog";

type LocaleCtx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (pair: { en: string; es: string }) => string;
};

const Ctx = createContext<LocaleCtx | null>(null);
const KEY = "shia-baby-locale";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved === "es" || saved === "en") setLocaleState(saved);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(KEY, l);
  };

  const value = useMemo<LocaleCtx>(
    () => ({
      locale,
      setLocale,
      t: (pair) => pair[locale],
    }),
    [locale],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLocale() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export const UI = {
  shop: { en: "Shop", es: "Tienda" },
  comingHome: { en: "Coming Home", es: "Bienvenida" },
  gifts: { en: "Gifts", es: "Regalos" },
  theHouse: { en: "The House", es: "La casa" },
  sizeGuide: { en: "Size guide", es: "Guía de tallas" },
  giftWrap: { en: "Gift wrap", es: "Envoltorio" },
  bag: { en: "Bag", es: "Bolsa" },
  search: { en: "Search", es: "Buscar" },
  searchPlaceholder: { en: "Search clothes, sizes, gifts…", es: "Buscar ropa, tallas, regalos…" },
  addToBag: { en: "Add to bag", es: "Agregar a la bolsa" },
  added: { en: "Added to bag", es: "Agregado a la bolsa" },
  shopAll: { en: "Shop all", es: "Ver todo" },
  onTheTable: { en: "New on the table", es: "Nuevo en la mesa" },
  theRooms: { en: "The rooms", es: "Las salas" },
  bySize: { en: "By size", es: "Por talla" },
  for: { en: "For", es: "Para" },
  shippingReturns: { en: "Shipping & returns", es: "Envíos y cambios" },
  contact: { en: "Write us", es: "Escríbenos" },
  spoken: { en: "English & Español", es: "English & Español" },
  ships: { en: "Ships nationwide · Free over $75 of clothes", es: "Envío a todo el país · Gratis desde $75 en ropa" },
  bear: { en: "The bear goes in every box", es: "El osito va en cada caja" },
  viewBag: { en: "View bag", es: "Ver bolsa" },
  checkout: { en: "Checkout", es: "Pagar" },
  emptyBag: { en: "The bag is empty.", es: "La bolsa está vacía." },
  startShopping: { en: "Start with a piece", es: "Empieza con una pieza" },
  filters: { en: "Filter", es: "Filtrar" },
  sortFeatured: { en: "Featured", es: "Destacados" },
  sortNewest: { en: "Newest", es: "Lo nuevo" },
  sortPrice: { en: "Price", es: "Precio" },
  noResults: { en: "Nothing on the table for that.", es: "Nada sobre la mesa con eso." },
  clearFilters: { en: "Clear filters", es: "Quitar filtros" },
  size: { en: "Size", es: "Talla" },
  addWrap: { en: "Add gift wrap for $12", es: "Agregar envoltorio por $12" },
  wrapNote: { en: "Navy box, ribbon, a handwritten tag. The clothes inside are the gift.", es: "Caja navy, listón, etiqueta a mano. La ropa dentro es el regalo." },
  subtotal: { en: "Clothes", es: "Ropa" },
  wrap: { en: "Gift wrap", es: "Envoltorio" },
  shipping: { en: "Shipping", es: "Envío" },
  free: { en: "Free", es: "Gratis" },
  total: { en: "Total", es: "Total" },
  menu: { en: "Menu", es: "Menú" },
  close: { en: "Close", es: "Cerrar" },
  completeLook: { en: "Wear with", es: "Llevar con" },
  inStock: { en: "On the table now", es: "Sobre la mesa ahora" },
  pieces: { en: "pieces", es: "piezas" },
  explore: { en: "Explore", es: "Explorar" },
  ourWrap: { en: "Our wrap", es: "Nuestro envoltorio" },
};

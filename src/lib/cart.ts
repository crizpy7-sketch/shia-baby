import { create } from "zustand";
import { WRAP_PRICE, SHIP_FLAT, SHIP_FREE_AT, getProduct } from "./catalog";

export type Line = {
  id: string;
  slug: string;
  size: string;
  qty: number;
};

type CartState = {
  lines: Line[];
  wrap: boolean;
  note: string;
  add: (slug: string, size: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  setWrap: (on: boolean) => void;
  setNote: (note: string) => void;
  clear: () => void;
};

const STORAGE = "shia-baby-cart-v2";

function sanitizeLines(lines: Line[]): Line[] {
  return lines.filter((l) => l.qty > 0 && Boolean(getProduct(l.slug)));
}

function load(): Pick<CartState, "lines" | "wrap" | "note"> {
  if (typeof window === "undefined") return { lines: [], wrap: false, note: "" };
  try {
    const raw = localStorage.getItem(STORAGE) ?? localStorage.getItem("shia-baby-cart-v1");
    if (!raw) return { lines: [], wrap: false, note: "" };
    const parsed = JSON.parse(raw) as Partial<Pick<CartState, "lines" | "wrap" | "note">>;
    return {
      lines: sanitizeLines(Array.isArray(parsed.lines) ? parsed.lines : []),
      wrap: Boolean(parsed.wrap),
      note: typeof parsed.note === "string" ? parsed.note : "",
    };
  } catch {
    return { lines: [], wrap: false, note: "" };
  }
}

function persist(state: Pick<CartState, "lines" | "wrap" | "note">) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE, JSON.stringify(state));
}

export const useCart = create<CartState>((set, get) => ({
  lines: [],
  wrap: false,
  note: "",
  add: (slug, size, qty = 1) => {
    const lines = [...get().lines];
    const id = `${slug}::${size}`;
    const existing = lines.find((l) => l.id === id);
    if (existing) existing.qty += qty;
    else lines.push({ id, slug, size, qty });
    const next = { lines, wrap: get().wrap, note: get().note };
    persist(next);
    set(next);
  },
  setQty: (id, qty) => {
    const lines = get()
      .lines.map((l) => (l.id === id ? { ...l, qty } : l))
      .filter((l) => l.qty > 0);
    const next = { lines, wrap: get().wrap, note: get().note };
    persist(next);
    set(next);
  },
  remove: (id) => {
    const lines = get().lines.filter((l) => l.id !== id);
    const next = { lines, wrap: get().wrap, note: get().note };
    persist(next);
    set(next);
  },
  setWrap: (wrap) => {
    const next = { lines: get().lines, wrap, note: get().note };
    persist(next);
    set(next);
  },
  setNote: (note) => {
    const next = { lines: get().lines, wrap: get().wrap, note };
    persist(next);
    set(next);
  },
  clear: () => {
    const next = { lines: [], wrap: false, note: "" };
    persist(next);
    set(next);
  },
}));

export function hydrateCart() {
  if (typeof window === "undefined") return;
  const next = load();
  persist(next);
  useCart.setState(next);
}

export function cartCount(lines: Line[]) {
  return sanitizeLines(lines).reduce((n, l) => n + l.qty, 0);
}

export function clothesSubtotal(lines: Line[]) {
  return lines.reduce((n, l) => {
    const p = getProduct(l.slug);
    return n + (p ? p.price * l.qty : 0);
  }, 0);
}

export function totals(lines: Line[], wrap: boolean) {
  const clothes = clothesSubtotal(lines);
  const wrapCost = wrap ? WRAP_PRICE : 0;
  const shipping = clothes === 0 ? 0 : clothes >= SHIP_FREE_AT ? 0 : SHIP_FLAT;
  return {
    clothes,
    wrapCost,
    shipping,
    total: clothes + wrapCost + shipping,
    freeShipAt: SHIP_FREE_AT,
    remainingForFree: Math.max(0, SHIP_FREE_AT - clothes),
  };
}

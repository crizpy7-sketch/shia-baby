export type ShopSearch = {
  size?: string;
  occasion?: string;
  q?: string;
};

export function parseShopSearch(s: Record<string, unknown>): ShopSearch {
  return {
    size: typeof s.size === "string" ? s.size : undefined,
    occasion: typeof s.occasion === "string" ? s.occasion : undefined,
    q: typeof s.q === "string" ? s.q : undefined,
  };
}

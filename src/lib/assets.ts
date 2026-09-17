const CDN = "https://cdn.jsdelivr.net/gh/crizpy7-sketch/shia-baby@main/public";

/** Local in preview; GitHub CDN in production so the deploy can stay source-sized. */
export function asset(path: string) {
  if (!path || path.startsWith("http://") || path.startsWith("https://")) return path;
  if (import.meta.env.PROD) {
    return `${CDN}${path.startsWith("/") ? path : `/${path}`}`;
  }
  return path;
}

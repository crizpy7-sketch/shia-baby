import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { NotFound } from "@/components/not-found";
import { LocaleProvider } from "@/lib/locale";
import { SiteShell } from "@/components/site-shell";
import appCss from "../styles.css?url";

const APP_NAME = "Shia Baby";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content: "Timeless style for the first year. A family house, packed by hand. Ships nationwide.",
      },
      { name: "theme-color", content: "#1B365D" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preload", as: "image", href: "/images/hero-teddy-poster.jpg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Outfit:wght@400;500;600&display=swap",
      },
    ],
  }),
  notFoundComponent: NotFound,
  component: Root,
});

function Root() {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <LocaleProvider>
            <SiteShell>
              <Outlet />
            </SiteShell>
          </LocaleProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

import { useEffect, type ReactNode } from "react";
import { hydrateCart } from "@/lib/cart";
import { Header } from "./header";
import { Footer } from "./footer";

export function SiteShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    hydrateCart();
  }, []);

  return (
    <div className="flex min-h-dvh flex-col bg-paper text-ink">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

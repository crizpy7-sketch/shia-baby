import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

export function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Shia Baby</p>
      <h1 className="mt-3 font-display text-4xl">Not on the table.</h1>
      <p className="mt-3 text-muted">That page isn’t in the house.</p>
      <Button asChild className="mt-8">
        <Link to="/shop">Shop the edit</Link>
      </Button>
    </div>
  );
}

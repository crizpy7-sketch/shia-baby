import { WRAP_PRICE, SHIP_FLAT, SHIP_FREE_AT, getProduct } from "./catalog";
import { squareVariation } from "./square-map";

const VERSION = "2025-10-16";

function baseUrl() {
  const env = process.env.SQUARE_ENV === "sandbox" ? "sandbox" : "production";
  return env === "sandbox" ? "https://connect.squareupsandbox.com" : "https://connect.squareup.com";
}

function token() {
  return process.env.SQUARE_ACCESS_TOKEN?.trim() ?? "";
}

export function squareReady() {
  return Boolean(token());
}

async function squareFetch(path: string, init?: RequestInit) {
  const t = token();
  if (!t) throw new Error("Square is not connected.");
  const res = await fetch(`${baseUrl()}${path}`, {
    ...init,
    headers: {
      "Square-Version": VERSION,
      Authorization: `Bearer ${t}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  const body = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) {
    const errors = body.errors as { detail?: string }[] | undefined;
    throw new Error(errors?.[0]?.detail || `Square ${res.status}`);
  }
  return body;
}

async function locationId() {
  if (process.env.SQUARE_LOCATION_ID?.trim()) return process.env.SQUARE_LOCATION_ID.trim();
  const body = (await squareFetch("/v2/locations")) as {
    locations?: { id: string; status?: string }[];
  };
  const active = body.locations?.find((l) => l.status === "ACTIVE") ?? body.locations?.[0];
  if (!active?.id) throw new Error("No Square location found.");
  return active.id;
}

export type CheckoutLine = { slug: string; size: string; qty: number };

export async function createSquarePaymentLink(input: {
  lines: CheckoutLine[];
  wrap: boolean;
  note: string;
  email: string;
  origin: string;
}) {
  const loc = await locationId();
  const lineItems: Record<string, unknown>[] = [];
  let clothes = 0;

  for (const line of input.lines) {
    const product = getProduct(line.slug);
    if (!product || line.qty < 1) continue;
    clothes += product.price * line.qty;
    const variation = squareVariation(line.slug, line.size);
    const note = line.size && line.size !== "One size" ? line.size : undefined;
    if (variation?.variationId) {
      lineItems.push({
        quantity: String(line.qty),
        catalog_object_id: variation.variationId,
        ...(note ? { note } : {}),
      });
    } else {
      lineItems.push({
        name: product.name.en,
        quantity: String(line.qty),
        base_price_money: { amount: product.price, currency: "USD" },
        ...(note ? { note } : {}),
      });
    }
  }

  if (lineItems.length === 0) throw new Error("The bag is empty.");

  if (input.wrap) {
    lineItems.push({
      name: "Signature gift wrap",
      quantity: "1",
      base_price_money: { amount: WRAP_PRICE, currency: "USD" },
      note: "Navy box, ribbon, handwritten tag.",
    });
  }

  const shipping = clothes >= SHIP_FREE_AT ? 0 : SHIP_FLAT;
  const origin = input.origin.replace(/\/$/, "");

  const payload = {
    idempotency_key: crypto.randomUUID(),
    order: {
      location_id: loc,
      reference_id: `shia-${Date.now()}`,
      line_items: lineItems,
      ...(input.note.trim()
        ? { fulfillments: [{ type: "SHIPMENT", state: "PROPOSED", shipment_details: { shipping_note: input.note.trim() } }] }
        : {}),
    },
    checkout_options: {
      ask_for_shipping_address: true,
      redirect_url: `${origin}/cart?paid=1`,
      merchant_support_email: "hello@shiababyshop.com",
      accepted_payment_methods: {
        apple_pay: true,
        google_pay: true,
        cash_app_pay: true,
      },
      ...(shipping > 0
        ? {
            shipping_fee: {
              name: "USPS — nationwide",
              charge: { amount: shipping, currency: "USD" },
            },
          }
        : {}),
    },
    ...(input.email ? { pre_populated_data: { buyer_email: input.email } } : {}),
    ...(input.note.trim() ? { payment_note: input.note.trim() } : {}),
  };

  const body = (await squareFetch("/v2/online-checkout/payment-links", {
    method: "POST",
    body: JSON.stringify(payload),
  })) as { payment_link?: { url?: string } };

  const url = body.payment_link?.url;
  if (!url) throw new Error("Square did not return a checkout link.");
  return url;
}

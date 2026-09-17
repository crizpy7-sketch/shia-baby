import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  lines: z.array(
    z.object({
      slug: z.string().min(1),
      size: z.string().min(1),
      qty: z.number().int().positive(),
    }),
  ),
  wrap: z.boolean(),
  note: z.string().max(280),
  email: z.string().email(),
  origin: z.string().url(),
});

export const squareCheckoutReady = createServerFn({ method: "POST" }).handler(async () => {
  const { squareReady } = await import("./square.server");
  return { ready: squareReady() };
});

export const startSquareCheckout = createServerFn({ method: "POST" })
  .validator(Input)
  .handler(async ({ data }) => {
    const { createSquarePaymentLink } = await import("./square.server");
    const url = await createSquarePaymentLink(data);
    return { url };
  });

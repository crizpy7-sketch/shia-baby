import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40",
  {
    variants: {
      variant: {
        primary: "bg-navy text-cream hover:bg-navy-deep",
        cream: "bg-cream text-navy hover:bg-white",
        ghost: "bg-transparent text-ink hover:bg-paper-deep",
        outline: "border border-line bg-transparent text-ink hover:border-ink/40 hover:bg-white",
        inverse: "bg-cream text-navy hover:bg-white",
      },
      size: {
        sm: "h-10 px-4 text-sm rounded-md",
        md: "h-12 px-5 text-sm rounded-md",
        lg: "h-14 px-7 text-[15px] rounded-lg",
        icon: "size-11 rounded-md",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

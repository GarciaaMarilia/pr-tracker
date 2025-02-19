import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = tv({
 base:
  "rounded-lg px-5 sm:h-12 sm:py-0 py-4 font-medium flex items-center justify-center gap-2",

 variants: {
  variant: {
   primary: "bg-orange-400 text-zinc-900 hover:bg-yellow-700",
   secondary: "bg-zinc-800 text-zinc-200 hover:bg-zinc-700",
   list:
    "sm:h-16 rounded-xl flex shadow-shape justify-center border border-width-1",
   danger:
    "bg-rose-800 hover:bg-rose-900 rounded-xl flex shadow-shape gap-3 justify-center",
   disabled: "bg-zinc-800 text-zinc-200",
  },
  active: {
   true: "bg-orange-400 text-zinc-900",
   false: "",
  },
 },

 defaultVariants: {
  variant: "primary",
  size: "default",
 },
});

interface ButtonProps
 extends ComponentProps<"button">,
  VariantProps<typeof buttonVariants> {
 children: ReactNode;
 active?: boolean;
}

export function Button({
 children,
 variant,
 active = false,
 ...rest
}: ButtonProps) {
 return (
  <button {...rest} className={buttonVariants({ variant, active })}>
   {children}
  </button>
 );
}

import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = tv({
 base:
  "rounded-lg px-5 sm:h-12 sm:py-0 py-4 font-medium flex items-center justify-center gap-2",

 variants: {
  variant: {
   primary: "bg-yellow-600 text-zinc-900 hover:bg-yellow-700",
   secondary: "bg-zinc-800 text-zinc-200 hover:bg-zinc-700",
   list:
    "bg-zinc-900 sm:h-16 rounded-xl flex shadow-shape gap-3 justify-center hover:border hover:border-width-1 focus:bg-yellow-600 focus:text-zinc-900",
   danger:
    "bg-rose-800 hover:bg-rose-900 rounded-xl flex shadow-shape gap-3 justify-center",
   disabled: "bg-zinc-800 text-zinc-200",
  },

  size: {
   default: "sm:w-[240px] w-[160px]",
   full: "w-full",
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
}

export function Button({ children, variant, size, ...rest }: ButtonProps) {
 return (
  <button {...rest} className={buttonVariants({ variant, size })}>
   {children}
  </button>
 );
}

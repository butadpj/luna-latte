import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const variant = {
  DARK: "bg-DARK text-neutral-50 hover:bg-DARK/90 dark:bg-DARK dark:text-neutral-50 dark:hover:bg-DARK/90",
  BEIGE:
    "bg-BEIGE text-neutral-50 hover:bg-BEIGE/90 dark:bg-BEIGE dark:text-neutral-50 dark:hover:bg-BEIGE/90",
  ORANGE:
    "bg-ORANGE text-black hover:bg-ORANGE/90 dark:bg-ORANGE dark:hover:bg-ORANGE/90",
  GREEN:
    "bg-GREEN text-neutral-50 hover:bg-GREEN/90 dark:bg-GREEN dark:text-neutral-50 dark:hover:bg-GREEN/90",
  SWEET:
    "bg-SWEET text-black hover:bg-SWEET/90 dark:bg-SWEET dark:hover:bg-SWEET/90",
  DARK_BROWN:
    "bg-DARK_BROWN text-neutral-50 hover:bg-DARK_BROWN/90 dark:bg-DARK_BROWN dark:text-neutral-50 dark:hover:bg-DARK_BROWN/90",
  LIGHT_BROWN:
    "bg-LIGHT_BROWN text-neutral-50 hover:bg-LIGHT_BROWN/90 dark:bg-LIGHT_BROWN dark:text-neutral-50 dark:hover:bg-LIGHT_BROWN/90",
  LIGHT:
    "bg-LIGHT text-black hover:bg-LIGHT/60 dark:bg-LIGHT dark:hover:bg-LIGHT/60",
  default:
    "bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90",
  destructive:
    "bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
  outline:
    "border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
  secondary:
    "bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80",
  ghost:
    "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
  link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",
} as const;

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
  {
    variants: {
      variant,
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

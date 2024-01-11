import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
  {
    variants: {
      variant: {
        dark: "bg-dark text-neutral-50 hover:bg-dark/90 dark:bg-dark dark:text-neutral-50 dark:hover:bg-dark/90",
        beige:
          "bg-beige text-neutral-50 hover:bg-beige/90 dark:bg-beige dark:text-neutral-50 dark:hover:bg-beige/90",
        orange:
          "bg-orange text-black hover:bg-orange/90 dark:bg-orange dark:hover:bg-orange/90",
        green:
          "bg-green text-neutral-50 hover:bg-green/90 dark:bg-green dark:text-neutral-50 dark:hover:bg-green/90",
        sweet:
          "bg-sweet text-black hover:bg-sweet/90 dark:bg-sweet dark:hover:bg-sweet/90",
        "dark-brown":
          "bg-dark-brown text-neutral-50 hover:bg-dark-brown/90 dark:bg-dark-brown dark:text-neutral-50 dark:hover:bg-dark-brown/90",
        "light-brown":
          "bg-light-brown text-neutral-50 hover:bg-light-brown/90 dark:bg-light-brown dark:text-neutral-50 dark:hover:bg-light-brown/90",
        light:
          "bg-light text-black hover:bg-light/60 dark:bg-light dark:hover:bg-light/60",
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
      },
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

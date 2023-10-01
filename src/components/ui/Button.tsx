import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-cta text-cta-foreground hover:bg-cta-light active:bg-cta-lighter default-ring-cta dark:bg-_cta-light dark:text-_cta-foreground dark:hover:bg-_cta dark:active:bg-_cta-dark",
        secondary:
          "text-cta-dark border-2 border-cta hover:bg-cta/5 active:bg-cta/10 default-ring-cta dark:border-_cta dark:text-_cta dark:hover:bg-_cta/10 dark:active:bg-_cta/20",
        tonal:
          "text-cta-dark bg-cta/10 hover:bg-cta/15 active:bg-cta/20 default-ring-cta dark:text-cta-foreground dark:bg-_cta/10 dark:hover:bg-_cta/15 dark:active:bg-_cta/20",
        quiet:
          "text-cta-dark hover:bg-cta/15 active:bg-cta/20 default-ring-cta dark:text-cta-foreground dark:hover:bg-_cta/15 dark:active:bg-_cta/20",
        text: "text-cta-dark hover:text-cta-dark/80 active:text-cta/70 default-ring-cta dark:text-_cta dark:hover:text-_cta/80 dark:active:text-_cta/70",
        "primary-inverse":
          "bg-cta-foreground hover:bg-cta-foreground/90 active:bg-cta-foreground/80 default-ring-cta-inverse dark:bg-_cta-light dark:text-_cta-foreground dark:hover:bg-_cta dark:active:bg-_cta-dark",
        "secondary-inverse":
          "text-cta-foreground border-2 border-cta-foreground hover:bg-cta-foreground/10 active:bg-cta-foreground/20 default-ring-cta-inverse dark:border-_cta dark:text-_cta dark:hover:bg-_cta/10 dark:active:bg-_cta/20",
        "tonal-inverse":
          "text-cta-foreground bg-cta-foreground/10 hover:bg-cta-foreground/15 active:bg-cta-foreground/20 default-ring-cta-inverse dark:text-cta-foreground dark:bg-_cta/10 dark:hover:bg-_cta/15 dark:active:bg-_cta/20",
        "quiet-inverse":
          "text-cta-foreground hover:bg-cta-foreground/15 active:bg-cta-foreground/20 default-ring-cta-inverse dark:text-cta-foreground dark:hover:bg-_cta/15 dark:active:bg-_cta/20",
        "text-inverse":
          "text-cta-foreground hover:text-cta-foreground/90 active:text-cta-foreground/80 default-ring-cta-inverse dark:text-_cta dark:hover:text-_cta/80 dark:active:text-_cta/70",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
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
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

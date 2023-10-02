import { cn } from "@/lib/utils";
import {
  Button as NextUIButton,
  ButtonProps as NextUIButtonProps,
} from "@nextui-org/react";
import { Slot } from "@radix-ui/react-slot";
import React, { forwardRef } from "react";

export type ButtonProps = {
  variant?:
    | "primary"
    | "secondary"
    | "tonal"
    | "quiet"
    | "text"
    | "primary-inverse"
    | "secondary-inverse"
    | "tonal-inverse"
    | "quiet-inverse"
    | "text-inverse";
  icon?: boolean;
} & Omit<NextUIButtonProps, "variant">;

const variantMapper: Record<
  NonNullable<ButtonProps["variant"]>,
  { variant: NextUIButtonProps["variant"]; className: string }
> = {
  primary: {
    variant: "solid",
    className:
      "bg-cta hover:bg-cta-light text-cta-foreground dark:bg-_cta data-[focus-visible=true]:outline-cta hover:[focus-visible=true]:outline-cta-light dark:hover:bg-_cta-dark dark:text-_cta-foreground dark:data-[focus-visible=true]:outline-_cta dark:hover:[focus-visible=true]:outline-_cta-light",
  },
  secondary: {
    variant: "bordered",
    className:
      "border-cta hover:bg-cta/10 text-cta-dark dark:border-_cta dark:hover:bg-_cta/10 dark:text-_cta",
  },
  tonal: {
    variant: "flat",
    className:
      "bg-cta/10 hover:bg-cta/20 text-cta-dark dark:bg-_cta/10 dark:hover:bg-_cta/20 dark:text-_cta",
  },
  quiet: {
    variant: "flat",
    className:
      "bg-transparent hover:bg-cta/20 text-cta-dark dark:hover:bg-_cta/20 dark:text-_cta",
  },
  text: {
    variant: "flat",
    className: "bg-transparent text-cta-dark dark:text-_cta",
  },
  "primary-inverse": {
    variant: "solid",
    className:
      "bg-cta-foreground hover:bg-cta-foreground text-cta-dark dark:bg-_cta dark:hover:bg-_cta-dark dark:text-_cta-foreground",
  },
  "secondary-inverse": {
    variant: "bordered",
    className:
      "border-cta-foreground hover:bg-cta-foreground/10 text-cta-foreground dark:border-_cta dark:hover:bg-_cta/10 dark:text-_cta",
  },
  "tonal-inverse": {
    variant: "flat",
    className:
      "bg-cta-foreground/10 hover:bg-cta-foreground/20 text-cta-foreground dark:bg-_cta/10 dark:hover:bg-_cta/20 dark:text-_cta",
  },
  "quiet-inverse": {
    variant: "flat",
    className:
      "bg-transparent hover:bg-cta-foreground/20 text-cta-foreground dark:hover:bg-_cta/20 dark:text-_cta",
  },
  "text-inverse": {
    variant: "flat",
    className: "bg-transparent text-cta-foreground dark:text-_cta",
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", icon = false, ...props }, ref) => {
    const { className: variantClassName, variant: mappedVariant } =
      variantMapper[variant];

    return (
      <NextUIButton
        ref={ref}
        variant={mappedVariant}
        className={cn(
          "data-[focus-visible=true]:outline data-[focus-visible=true]:outline-2",
          variantClassName,
          className,
          icon && "min-w-0"
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

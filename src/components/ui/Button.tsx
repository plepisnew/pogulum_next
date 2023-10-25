import {
  Button as NextUIButton,
  ButtonProps as NextUIButtonProps,
  cn,
} from "@nextui-org/react";
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
    className: "bg-cta hover:bg-cta-dark text-cta-foreground",
  },
  secondary: {
    variant: "bordered",
    className: "border-cta hover:bg-cta/10 text-cta-dark",
  },
  tonal: {
    variant: "flat",
    className: "bg-cta/10 hover:bg-cta/20 text-cta-dark",
  },
  quiet: {
    variant: "flat",
    className: "bg-transparent hover:bg-cta/20 text-cta-dark",
  },
  text: {
    variant: "flat",
    className: "bg-transparent text-cta-dark",
  },
  "primary-inverse": {
    variant: "solid",
    className:
      "bg-cta-foreground hover:bg-cta-foreground-dark text-cta-dark dark:bg-cta dark:hover:bg-cta-dark dark:text-cta-foreground",
  },
  "secondary-inverse": {
    variant: "bordered",
    className:
      "border-cta-foreground hover:bg-cta-foreground/10 text-cta-foreground dark:border-cta dark:hover:bg-cta/10 dark:text-cta-dark",
  },
  "tonal-inverse": {
    variant: "flat",
    className:
      "bg-cta-foreground/15 hover:bg-cta-foreground/20 text-cta-foreground dark:bg-cta/10 dark:hover:bg-cta/20 dark:text-cta-dark",
  },
  "quiet-inverse": {
    variant: "flat",
    className:
      "bg-transparent hover:bg-cta-foreground/20 text-cta-foreground dark:hover:bg-cta/20 dark:text-cta-dark",
  },
  "text-inverse": {
    variant: "flat",
    className: "bg-transparent text-cta-foreground dark:text-cta-dark",
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
          "data-[focus-visible=true]:outline-cta hover:[focus-visible=true]:outline-cta-dark data-[focus-visible=true]:outline data-[focus-visible=true]:outline-2 font-medium",
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

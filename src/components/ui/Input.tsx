import {
  Input as NextInput,
  InputProps as NextInputProps,
} from "@nextui-org/input";
import { cn } from "@nextui-org/react";
import React, { ReactNode, forwardRef } from "react";

export type InputProps = {
  variant?: "primary" | "secondary" | "primary-inverse" | "secondary-inverse";
} & (
  | {
      isClearable: true;
    }
  | {
      isClearable?: false | undefined;
      endContent?: ReactNode;
    }
) &
  Omit<NextInputProps, "variant" | "classNames" | "endContent">;

// * `base`: Input wrapper, it handles alignment, placement, and general appearance.
// * `label`: Label of the input, it is the one that is displayed above, inside or left of the input.
// * `mainWrapper`: Wraps the inputWrapper when position is outside / outside-left.
// * `inputWrapper`: Wraps the label (when it is inside) and the innerWrapper.
// * `innerWrapper`: Wraps the input, the startContent and the endContent.
// * `input`: The input element.
// * `clearButton`: The clear button, it is at the end of the input.
// * `helperWrapper`: Wraps the description and the errorMessage.
// * `description`: The description of the input.
// * `errorMessage`: The error message of the input.

// * `data-invalid`: When the input is invalid. Based on isInvalid prop.
// * `data-required`: When the input is required. Based on isRequired prop.
// * `data-readonly`: When the input is readonly. Based on isReadOnly prop.
// * `data-hover`: When the input is being hovered. Based on useHover
// * `data-focus`: When the input is being focused. Based on useFocusRing
// * `data-focus-within`: When the input is being focused or any of its children. Based on useFocusWithin
// * `data-focus-visible`: When the input is being focused with the keyboard. Based on useFocusRing
// * `data-disabled`: When the input is disabled. Based on isDisabled prop.

const className = "font-";

const propMapper: Record<
  NonNullable<InputProps["variant"]>,
  {
    variant: NextInputProps["variant"];
    classNames: NextInputProps["classNames"];
  }
> = {
  primary: {
    variant: "flat",
    classNames: {
      base: "group text-cta-foreground",
      label:
        "!text-cta-foreground font-semibold group-data-[invalid=true]:text-white text-white",
      inputWrapper:
        "bg-cta group-data-[hover=true]:bg-cta-dark group-data-[focus=true]:bg-cta-dark",
      input: "placeholder:text-cta-foreground/50",
      clearButton: "text-cta-foreground",
      description: "",
      errorMessage: "font-medium",
    },
  },
  secondary: {
    variant: "bordered",
    classNames: {
      base: "group text-cta-dark",
      label:
        "text-cta-dark font-semibold group-data-[hover=true]:text-cta-dark group-data-[focus=true]:text-cta-dark",
      inputWrapper:
        "bg-transparent border-cta group-data-[hover=true]:border-cta-dark group-data-[focus=true]:border-cta-dark dark:border-primary-boundary dark:group-data-[hover=true]:border-primary-boundary-light dark:group-data-[focus=true]:border-primary-boundary-light group-data-[hover=true]:bg-cta/5 group-data-[focus=true]:bg-cta/5",
      input: "placeholder:text-cta-dark/50",
      clearButton: "text-cta-dark",
      description: "",
      errorMessage: "font-medium",
    },
  },
  "primary-inverse": {
    variant: "flat",
    classNames: {
      base: "group text-cta",
      label: "text-cta font-semibold dark:text-cta-foreground",
      inputWrapper:
        "bg-cta-foreground group-data-[hover=true]:bg-cta-foreground-dark group-data-[focus=true]:bg-cta-foreground-dark dark:bg-cta dark:group-data-[hover=true]:bg-cta-dark dark:group-data-[focus=true]:bg-cta-dark dark:text-cta-foreground",
      input: "placeholder:text-cta/50 dark:placeholder:text-cta-foreground/50",
      clearButton: "text-cta dark:text-cta-foreground",
      description: "",
      errorMessage: "font-medium",
    },
  },
  "secondary-inverse": {
    variant: "bordered",
    classNames: {
      base: "group text-cta-foreground-dark",
      label:
        "text-cta-foreground font-semibold group-data-[hover=true]:text-cta-foreground group-data-[focus=true]:text-cta-foreground dark:text-cta dark:group-data-[hover=true]:text-cta dark:group-data-[focus=true]:text-cta",
      inputWrapper:
        "bg-transparent border-cta-foreground group-data-[hover=true]:bg-cta-foreground/5 group-data-[focus=true]:bg-cta-foreground/5 group-data-[hover=true]:border-cta-foreground group-data-[focus=true]:border-cta-foreground dark:border-primary-boundary dark:text-cta dark:group-data-[focus=true]:bg-cta/5 dark:group-data-[hover=true]:border-primary-boundary-light dark:group-data-[focus=true]:border-primary-boundary dark:group-data-[hover=true]:bg-cta/5 dark:group-data-[focus=true]:bg-cta/5",
      input:
        "placeholder:text-cta-foreground-dark/50 dark:placeholder:text-cta/50",
      clearButton: "text-cta-foreground-dark dark:text-cta",
      description: "",
      errorMessage: "font-medium",
    },
  },
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "primary", ...props }, ref) => {
    const { classNames, variant: mappedVariant } = propMapper[variant];

    return (
      <NextInput
        ref={ref}
        variant={mappedVariant}
        classNames={classNames}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

import { cn } from "@/utils/cn";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ForwardRefRenderFunction,
  forwardRef,
} from "react";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "tonal" | "text";
} & {
  inverse?: boolean;
  small?: boolean;
  loading?: boolean;
} & DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;

export const buttonVariants: Record<
  NonNullable<ButtonProps["variant"]>,
  Record<"default" | "inverse", string>
> = {
  // TODO set height same as input
  primary: {
    default:
      "bg-twitch-800 outline-twitch-800 text-twitch-100 enabled:hover:bg-twitch-700 enabled:hover:outline-twitch-700 enabled:active:bg-twitch-600 enabled:active:outline-twitch-600 border-twitch-800 enabled:hover:border-twitch-700 enabled:active:border-twitch-600",
    inverse:
      "bg-twitch-100 outline-twitch-100 text-twitch-900 enabled:hover:bg-twitch-200 enabled:hover:outline-twitch-200 enabled:active:bg-twitch-300 enabled:active:outline-twitch-300 border-twitch-100 enabled:hover:border-twitch-200 enabled:active:border-twitch-300",
  },
  secondary: {
    default:
      "bg-twitch-800/10 outline-twitch-800 text-twitch-900 enabled:hover:bg-twitch-800/20 enabled:active:bg-twitch-800/30 border-twitch-800",
    inverse:
      "bg-twitch-100/5 outline-twitch-100 text-twitch-100 enabled:hover:bg-twitch-100/10 enabled:active:bg-twitch-100/20 border-twitch-100",
  },
  tonal: {
    default:
      "bg-twitch-800/10 outline-twitch-800 text-twitch-900 enabled:hover:bg-twitch-800/20 enabled:active:bg-twitch-800/30 border-twitch-800/10 bg-clip-padding enabled:hover:border-twitch-800/20 enabled:active:border-twitch-800/30",
    inverse:
      "bg-twitch-100/10 outline-twitch-100 text-twitch-100 enabled:hover:bg-twitch-100/20 enabled:active:bg-twitch-100/30 border-twitch-100/10 bg-clip-padding enabled:hover:border-twitch-100/20 enabled:active:border-twitch-100/30",
  },
  text: {
    default:
      "outline-twitch-800 text-twitch-900 enabled:hover:text-twitch-900/80 enabled:active:text-twitch-900/60",
    inverse:
      "outline-twitch-100 text-twitch-100 enabled:hover:text-twitch-100/80 enabled:active:text-twitch-100/60",
  },
};

const ReflessButton: ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonProps
> = (
  {
    variant = "primary",
    className,
    inverse,
    small,
    disabled,
    loading,
    ...buttonProps
  },
  ref
) => {
  return (
    <button
      className={cn(
        buttonVariants[variant][inverse ? "inverse" : "default"],
        "rounded-md transition-colors font-semibold",
        "focus-visible:outline-2 focus-visible:outline focus-visible:outline-offset-1 border-2",
        disabled && "opacity-70 cursor-not-allowed",
        loading && "cursor-wait",
        small ? "py-1" : "py-2",
        className
      )}
      disabled={disabled}
      ref={ref}
      {...buttonProps}
    />
  );
};

export const Button = forwardRef(ReflessButton);

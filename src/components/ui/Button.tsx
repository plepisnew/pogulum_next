import { cn } from "@/utils/cn";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ForwardRefRenderFunction,
  forwardRef,
} from "react";

export type ButtonProps = (
  | {
      variant?: "primary" | "secondary" | "tonal" | "text";
    }
  | {
      variant?: "link";
      href: string;
    }
) & {
  inverse?: boolean;
  small?: boolean;
} & DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;

export const buttonVariants: Record<
  NonNullable<ButtonProps["variant"]>,
  Record<"default" | "inverse", string>
> = {
  // TODO change white to twitch color
  // TODO set height same as input
  primary: {
    default:
      "bg-twitch-800 outline-twitch-800 text-white hover:bg-twitch-700 hover:outline-twitch-700 active:bg-twitch-600 active:outline-twitch-600 border-2 border-twitch-800 hover:border-twitch-700 active:border-twitch-600",
    inverse:
      "bg-twitch-100 outline-twitch-100 text-twitch-900 hover:bg-twitch-200 hover:outline-twitch-200 active:bg-twitch-300 active:outline-twitch-300 border-2 border-twitch-100 hover:border-twitch-200 active:border-twitch-300",
  },
  secondary: {
    default:
      "bg-twitch-800/10 outline-twitch-800 text-twitch-900 hover:bg-twitch-800/20 active:bg-twitch-800/30 border-2 border-twitch-800",
    inverse:
      "bg-twitch-100/5 outline-twitch-100 text-twitch-100 hover:bg-twitch-100/10 active:bg-twitch-100/20 border-2 border-twitch-100",
  },
  tonal: {
    default:
      "bg-twitch-800/10 outline-twitch-800 text-twitch-900 hover:bg-twitch-800/20 active:bg-twitch-800/30 border-2 border-twitch-800/10 bg-clip-padding hover:border-twitch-800/20 active:border-twitch-800/30",
    inverse:
      "bg-twitch-100/10 outline-twitch-100 text-twitch-100 hover:bg-twitch-100/20 active:bg-twitch-100/30 border-2 border-twitch-100/10 bg-clip-padding hover:border-twitch-100/20 active:border-twitch-100/30",
  },
  link: {
    default:
      "bg-twitch-800/10 outline-twitch-800 text-twitch-900 hover:bg-twitch-800/20 active:bg-twitch-800/30 border-2 border-twitch-800/10 bg-clip-padding hover:border-twitch-800/20 active:border-twitch-800/30",
    inverse:
      "bg-twitch-100/10 outline-twitch-100 text-twitch-100 hover:bg-twitch-100/20 active:bg-twitch-100/30 border-2 border-twitch-100/10 bg-clip-padding hover:border-twitch-100/20 active:border-twitch-100/30",
  },
  text: {
    default: "outline-twitch-800 text-twitch-900",
    inverse: "outline-twitch-100 text-twitch-100",
  },
};
const className =
  "bg-twitch-800/10 outline-twitch-800 text-twitch-900 hover:bg-twitch-800/20 active:bg-twitch-800/30 border-2 border-twitch-800/10 border-opacity-50 bg-clip-padding";

const ReflessButton: ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonProps
> = (
  { variant = "primary", className, inverse, small, ...buttonProps },
  ref
) => {
  return (
    <button
      className={cn(
        buttonVariants[variant][inverse ? "inverse" : "default"],
        "rounded-md transition-colors font-semibold",
        "focus-visible:outline-2 focus-visible:outline focus-visible:outline-offset-1",
        small ? "py-1" : "py-2",
        className
      )}
      {...buttonProps}
      ref={ref}
    />
  );
};

export const Button = forwardRef(ReflessButton);

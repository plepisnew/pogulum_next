import { cn } from "@/utils/cn";
import {
  DetailedHTMLProps,
  ForwardRefRenderFunction,
  HTMLAttributes,
  ReactNode,
  forwardRef,
} from "react";

export type PopoverProps = {
  origin?: "top" | "right" | "bottom" | "left";
  align?: "top" | "right" | "bottom" | "left" | "center";
  // TODO type this properly
  offset?: string;
  render: ReactNode;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ReflessPopover: ForwardRefRenderFunction<HTMLDivElement, PopoverProps> = (
  {
    className,
    children,
    render,
    origin = "top",
    align = "center",
    offset = "10px",
    ...divProps
  },
  ref
) => {
  return (
    <div className={cn("popover-container", "relative bg-red-400")}>
      <div className={cn("popover-trigger", "peer")}>{children}</div>
      <div
        className={cn(
          "popover",
          "transition-all absolute opacity-0",
          "peer-hover:opacity-100 peer-hover:translate-x-2"
        )}
        style={getLocationStyles({ origin, align, offset })}
        ref={ref}
      >
        {render}
      </div>
    </div>
  );
};

const getLocationStyles = ({
  origin,
  align,
  offset,
}: Required<
  Pick<PopoverProps, "origin" | "align" | "offset">
>): HTMLAttributes<HTMLElement>["style"] => {
  const horizontalCenterAlign: HTMLAttributes<HTMLElement>["style"] = {
    left: "50%",
    transform: "translateX(-50%)",
  };

  const verticalCenterAlign: HTMLAttributes<HTMLElement>["style"] = {
    top: "50%",
    transform: "translateY(-50%)",
  };

  const originStyles: HTMLAttributes<HTMLElement>["style"] =
    origin === "top"
      ? { top: 0, transform: `translateY(calc(-100% - ${offset}))` }
      : origin === "right"
      ? { right: 0, transform: `translateX(calc(100% + ${offset}))` }
      : origin === "bottom"
      ? { bottom: 0, transform: `translateY(calc(100% + ${offset}))` }
      : origin === "left"
      ? { left: 0, transform: `translateX(calc(-100% - ${offset}))` }
      : {};

  const alignStyles: HTMLAttributes<HTMLElement>["style"] =
    align === "top"
      ? { top: 0 }
      : align === "right"
      ? { right: 0 }
      : align === "bottom"
      ? { bottom: 0 }
      : align === "left"
      ? { left: 0 }
      : {
          ...((origin === "top" || origin === "bottom") &&
            horizontalCenterAlign),
          ...((origin === "left" || origin === "right") && verticalCenterAlign),
        };

  /* prettier-ignore */
  const transform = [originStyles.transform, alignStyles.transform].filter(_ => _).join(" ");

  return {
    ...originStyles,
    ...alignStyles,
    transform,
  };
};

export const Popover = forwardRef(ReflessPopover);

import { cn } from "@/utils/cn";
import {
  DetailedHTMLProps,
  ForwardRefRenderFunction,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
  forwardRef,
  useMemo,
  useState,
} from "react";

export type PopoverProps = {
  origin?: "top" | "right" | "bottom" | "left";
  align?: "top" | "right" | "bottom" | "left" | "center";
  offset?: string;
  render: ReactNode;
  clickable?: boolean;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ReflessPopover: ForwardRefRenderFunction<HTMLDivElement, PopoverProps> = (
  {
    className,
    children,
    render,
    origin = "top",
    align = "center",
    offset = "8px",
    clickable = false,
    style,
    ...divProps
  },
  ref
) => {
  const [open, setOpen] = useState(false);

  const handleToggleOpen: MouseEventHandler<HTMLDivElement> = () =>
    setOpen(!open);

  const { locationClasses, locationStyles } = useMemo(
    () => getLocationProps({ origin, align, offset, clickable, open }),
    [origin, align, offset, clickable, open]
  );

  return (
    <div className={cn("popover-container", "relative")}>
      <div className={cn("popover-trigger", "peer")} onClick={handleToggleOpen}>
        {children}
      </div>
      <div
        ref={ref}
        className={cn(
          "popover",
          "transition-all absolute opacity-0 invisible",
          clickable
            ? `${open && "opacity-100 visible"}`
            : "peer-hover:opacity-100 peer-hover:visible",
          locationClasses
        )}
        style={{ ...locationStyles, ...style }}
        {...divProps}
      >
        {render}
      </div>
    </div>
  );
};

const getLocationProps = ({
  origin,
  align,
  offset,
  clickable,
  open,
}: Required<Pick<PopoverProps, "origin" | "align" | "offset" | "clickable">> & {
  open: boolean;
}): {
  locationStyles: HTMLAttributes<HTMLElement>["style"];
  locationClasses: string;
} => {
  const originStyles: HTMLAttributes<HTMLElement>["style"] =
    origin === "top"
      ? { bottom: `calc(100% + ${offset})` }
      : origin === "right"
      ? { left: `calc(100% + ${offset})` }
      : origin === "bottom"
      ? { top: `calc(100% + ${offset})` }
      : origin === "left"
      ? { right: `calc(100% + ${offset})` }
      : { animation: ":gt; " };

  const alignClasses =
    align === "top"
      ? "top-0"
      : align === "right"
      ? "right-0"
      : align === "bottom"
      ? "bottom-0"
      : align === "left"
      ? "left-0"
      : origin === "top" || origin === "bottom"
      ? "left-1/2 -translate-x-1/2"
      : origin === "left" || origin === "right"
      ? "top-1/2 -translate-y-1/2"
      : ":gt;";

  const clickableTransitionClasses =
    origin === "top"
      ? `-translate-y-1 ${open && "translate-y-0"}`
      : origin === "right"
      ? `translate-x-1 ${open && "translate-x-0"}`
      : origin === "bottom"
      ? `translate-y-1 ${open && "translate-y-0"}`
      : origin === "left"
      ? `-translate-x-1 ${open && "translate-x-0"}`
      : ":&gt;";

  const normalTransitionClasses =
    origin === "top"
      ? "-translate-y-1 peer-hover:translate-y-0"
      : origin === "right"
      ? "translate-x-1 peer-hover:translate-x-0"
      : origin === "bottom"
      ? "translate-y-1 peer-hover:translate-y-0"
      : origin === "left"
      ? "-translate-x-1 peer-hover:translate-x-0"
      : ":&gt;";

  const transitionClasses = clickable
    ? clickableTransitionClasses
    : normalTransitionClasses;

  return {
    locationClasses: `${transitionClasses} ${alignClasses}`,
    locationStyles: originStyles,
  };
};

export const Popover = forwardRef(ReflessPopover);

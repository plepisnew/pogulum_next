import { useClickAway } from "@/hooks/useClickAway";
import { cn } from "@/utils/cn";
import {
  DetailedHTMLProps,
  ForwardRefRenderFunction,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
  forwardRef,
  useMemo,
  useRef,
  useState,
} from "react";

export type PopoverProps = {
  origin?: "top" | "right" | "bottom" | "left";
  align?: "top" | "right" | "bottom" | "left" | "center";
  offset?: string;
  render: ReactNode;
  clickable?: boolean;
  closeOnClickAway?: boolean;
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

  const popoverRef = useRef<HTMLDivElement>(null);

  useClickAway({ refs: [popoverRef], handler: () => setOpen(false) });

  return (
    <div className={cn("popover-container", "relative inline")} ref={ref}>
      <div
        className={cn("popover-trigger", "peer inline")}
        onClick={handleToggleOpen}
      >
        {children}
      </div>
      <div
        ref={popoverRef}
        className={cn(
          "popover",
          "transition-all absolute opacity-0 invisible",
          clickable
            ? `${open && "opacity-100 visible"}`
            : "peer-hover:opacity-100 peer-hover:visible",
          locationClasses,
          className
        )}
        style={{ ...locationStyles, ...style }}
        {...divProps}
      >
        {render}
      </div>
    </div>
  );
};

type Origin = NonNullable<PopoverProps["origin"]>;

type Align = NonNullable<PopoverProps["align"]>;

const originStyles: Record<
  Origin,
  (offset: PopoverProps["offset"]) => HTMLAttributes<HTMLElement>["style"]
> = {
  top: (offset) => ({ bottom: `calc(100% + ${offset})` }),
  right: (offset) => ({ left: `calc(100% + ${offset})` }),
  bottom: (offset) => ({ top: `calc(100% + ${offset})` }),
  left: (offset) => ({ right: `calc(100% + ${offset})` }),
};

const alignClasses: Record<Align, (origin: Origin) => string> = {
  top: (_) => "top-0",
  right: (_) => "right-0",
  bottom: (_) => "bottom-0",
  left: (_) => "left-0",
  center: (origin) =>
    ["top", "bottom"].includes(origin)
      ? "left-1/2 -translate-x-1/2"
      : "top-1/2 -translate-y-1/2",
};

const clickableTransitionClasses: Record<Origin, (open: boolean) => string> = {
  top: (open) => (open ? "translate-y-0" : "-translate-y-1"),
  right: (open) => (open ? "translate-x-0" : "translate-x-1"),
  bottom: (open) => (open ? "translate-y-0" : "translate-y-1"),
  left: (open) => (open ? "translate-x-0" : "-translate-x-1"),
};

const normalTransitionClasses: Record<Origin, string> = {
  top: "-translate-y-1 peer-hover:translate-y-0",
  right: "translate-x-1 peer-hover:translate-x-0",
  bottom: "translate-y-1 peer-hover:translate-y-0",
  left: "-translate-x-1 peer-hover:translate-x-0",
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
  const transitionClasses = clickable
    ? clickableTransitionClasses[origin](open)
    : normalTransitionClasses[origin];

  return {
    locationClasses: `${transitionClasses} ${alignClasses[align](origin)}`,
    locationStyles: originStyles[origin](offset),
  };
};

export const Popover = forwardRef(ReflessPopover);

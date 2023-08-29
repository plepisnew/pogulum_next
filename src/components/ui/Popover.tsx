import { cn } from "@/utils/cn";
import {
  DetailedHTMLProps,
  ForwardRefRenderFunction,
  HTMLAttributes,
  forwardRef,
} from "react";

export type PopoverProps = {
  position?: "top" | "right" | "down" | "left";
  alignment?: "top" | "right" | "down" | "left";
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ReflessPopover: ForwardRefRenderFunction<HTMLDivElement, PopoverProps> = (
  { className, ...divProps },
  ref
) => {
  return <div className={cn("", className)} {...divProps} ref={ref} />;
};

export const Popover = forwardRef(ReflessPopover);

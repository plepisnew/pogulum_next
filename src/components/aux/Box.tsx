import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export type BoxPropsUnique = {
  filled?: boolean;
  bordered?: boolean;
};

export type BoxProps = BoxPropsUnique & HTMLAttributes<HTMLDivElement>;

export const Box: React.FC<BoxProps> = ({
  className,
  filled = false,
  bordered = false,
  ...props
}) => (
  <div
    {...props}
    className={cn(
      "p-4 rounded-md",
      filled && "bg-primary dark:bg-_primary",
      bordered && "border border-primary dark:border-_primary-foreground/30",
      className
    )}
  />
);

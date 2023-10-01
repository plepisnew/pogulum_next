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
      filled && "bg-primary dark:bg-_primary-foreground/15",
      bordered && "border-2 border-primary dark:border-_primary-foreground/15",
      className
    )}
  />
);

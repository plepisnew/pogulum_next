import { cn } from "@nextui-org/react";
import { PropsWithChildren } from "react";

export type SkeletonProps = {
  width?: string | number;
  height?: string | number;
  className?: string;
} & PropsWithChildren;

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  width,
  height,
  ...props
}) => (
  <div
    className={cn(
      "bg-primary-foreground/15 animate-pulse rounded-md",
      className
    )}
    style={{
      width,
      height,
    }}
    {...props}
  />
);

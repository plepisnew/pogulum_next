import { cn } from "@nextui-org/react";
import _ from "lodash";
import { CSSProperties, HTMLAttributes } from "react";

export type BoxPropsUnique = {
  filled?: boolean;
  contained?: boolean;
  row?: boolean;
  column?: boolean;
  gap?: string | number;
  justifyCenter?: boolean;
  itemsCenter?: boolean;
  center?: boolean;
  rounded?: boolean;
};

export type BoxProps = BoxPropsUnique & HTMLAttributes<HTMLDivElement>;

export const Box: React.FC<BoxProps> = ({
  className,
  filled = false,
  contained = false,
  row = false,
  column = false,
  justifyCenter = false,
  itemsCenter = false,
  center = false,
  rounded = false,
  gap = 0,
  style,
  ...props
}) => {
  const boxStyles: Partial<CSSProperties> = {
    ...(gap && { gap }),
  };

  return (
    <div
      {...props}
      style={{
        ...boxStyles,
        ...style,
      }}
      className={cn(
        "p-4",
        filled && "bg-primary text-primary-foreground",
        contained &&
          "shadow-md shadow-primary/30 dark:border dark:border-primary-boundary",
        _.some([row, column, justifyCenter, itemsCenter, center, gap]) &&
          "flex",
        row && "flex-row",
        column && "flex-col",
        (center || justifyCenter) && "justify-center",
        (center || itemsCenter) && "items-center",
        rounded && "rounded-md",
        className
      )}
    />
  );
};

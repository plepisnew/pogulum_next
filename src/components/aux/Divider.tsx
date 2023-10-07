import { cn } from "@nextui-org/react";
import { PropsWithClassName } from "@/utils/types";
import { CSSProperties, HTMLAttributes } from "react";

export type DividerProps = (
  | {
      height: CSSProperties["height"];
    }
  | {
      width: CSSProperties["width"];
    }
) &
  Partial<PropsWithClassName>;

export const Divider: React.FC<DividerProps> = ({ className, ...props }) => {
  const style: HTMLAttributes<HTMLElement>["style"] =
    "width" in props
      ? { width: props.width, height: "100%" }
      : { height: props.height, width: "100%" };

  return (
    <div
      style={style}
      className={cn(
        "bg-_primary-foreground dark:bg-_primary-foreground/30",
        className
      )}
    />
  );
};

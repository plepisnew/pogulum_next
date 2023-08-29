import { cn } from "@/utils/cn";
import { PropsWithClassName } from "@/utils/types";
import { PropsWithChildren } from "react";

export type PlatformProps = {
  bordered?: boolean;
};

export const Platform: React.FC<
  PlatformProps & PropsWithChildren & PropsWithClassName
> = ({ children, className, bordered }) => (
  <div
    className={cn(
      "bg-twitch-500 text-white rounded-md p-3",
      bordered && "border-2 border-zinc-700",
      className
    )}
  >
    {children}
  </div>
);

import React from "react";
import { PropsWithChildren } from "react";
import { headerOptions } from "./constants";
import { cn } from "@nextui-org/react";
import { PropsWithClassName } from "@/utils/types";

export const PageContainer: React.FC<
  PropsWithChildren & Partial<PropsWithClassName> & { fixed?: boolean }
> = ({ children, className, fixed = false }) => {
  return (
    <main
      className={cn(
        "container py-8",
        fixed ? "h-screen" : "min-h-screen",
        className
      )}
      style={{ paddingTop: `calc(2rem + ${headerOptions.height}px)` }}
    >
      {children}
    </main>
  );
};

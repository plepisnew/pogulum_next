import React from "react";
import { PropsWithChildren } from "react";
import { headerOptions } from "./constants";
import { cn } from "@nextui-org/react";

export const PageContainer: React.FC<
  PropsWithChildren & { fixed?: boolean }
> = ({ children, fixed = false }) => {
  return (
    <main
      className={cn("container py-8", fixed ? "h-screen" : "min-h-screen")}
      style={{ paddingTop: `calc(2rem + ${headerOptions.height}px)` }}
    >
      {children}
    </main>
  );
};

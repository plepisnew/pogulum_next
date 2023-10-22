import React from "react";
import { PropsWithChildren } from "react";
import { headerOptions } from "./constants";
import { cn } from "@nextui-org/react";

export const PageContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main
      className={cn("container py-8 min-h-screen")}
      style={{ paddingTop: `calc(2rem + ${headerOptions.height}px)` }}
    >
      {children}
    </main>
  );
};

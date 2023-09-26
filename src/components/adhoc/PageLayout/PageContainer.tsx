import React from "react";
import { PropsWithChildren } from "react";
import { Header } from "./Header";
import { cn } from "@/lib/utils";
import { headerOptions } from "./constants";

export const PageContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main
      className={cn("min-h-screen", "bg-background")}
      style={{ paddingTop: headerOptions.height }}
    >
      <div className="container py-8">{children}</div>
    </main>
  );
};

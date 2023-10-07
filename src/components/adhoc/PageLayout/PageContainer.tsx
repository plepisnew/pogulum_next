import React from "react";
import { PropsWithChildren } from "react";
import { headerOptions } from "./constants";
import { cn } from "@nextui-org/react";

export const PageContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main
      className={cn("container h-screen")}
      style={{ paddingTop: headerOptions.height }}
    >
      <div className="py-8 h-full">{children}</div>
    </main>
  );
};

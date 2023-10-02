import React from "react";
import { PropsWithChildren } from "react";
import { Header } from "./Header";
import { cn } from "@/lib/utils";
import { headerOptions } from "./constants";

export const PageContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main
      className={cn(
        // "container py-8",
        "h-max lg:h-full",
        "bg-background text-foreground ",
        "dark:bg-_background dark:text-_foreground"
      )}
      style={{ paddingTop: headerOptions.height }}
    >
      {/* {children} */}
      <div className="container py-8 h-max lg:h-full">{children}</div>
    </main>
  );
};

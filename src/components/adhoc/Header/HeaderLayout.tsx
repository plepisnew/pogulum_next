import { PropsWithChildren } from "react";
import { HeaderConstants } from "./constants";

export const HeaderLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <main
    className="light text-foreground bg-background h-full"
    style={{ paddingTop: HeaderConstants.HEADER_HEIGHT }}
  >
    <div className="container mx-auto py-6 h-full">{children}</div>
  </main>
);

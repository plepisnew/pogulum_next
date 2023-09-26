import { cn } from "@/lib/utils";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer
      className={cn(
        "from-primary to-primary-darker bg-gradient-to-br text-secondary"
      )}
    >
      <div className="container py-5">footer</div>
    </footer>
  );
};

import { cn } from "@/lib/utils";
import React from "react";
import { footerNavItems as navItems } from "./constants";
import { FaTwitch } from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <footer
      className={cn(
        "bg-gradient-to-br",
        "from-primary to-primary-darker text-secondary",
        "dark:from-_primary dark:to-_primary-darker text-_secondary"
      )}
    >
      <div className="flex container py-7 items-center">
        <nav>
          <ul className="flex flex-col gap-2 items-start">
            {navItems.map(({ Icon, label, path }) => (
              <li key={label}>
                <a
                  href={path}
                  target="_blank"
                  className={cn(
                    "flex items-center gap-2 px-2",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 rounded-md",
                    "focus-visible:ring-secondary focus-visible:ring-offset-primary",
                    "dark:focus-visible:ring-_secondary dark:focus-visible:ring-offset-_primary"
                  )}
                >
                  {label} <Icon />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex-1" />
        <div className="flex flex-col">
          <a
            href="https://twitch.tv"
            target="_blank"
            className={cn(
              "flex items-center gap-2 px-2 py-1",
              "border rounded-md transition-colors",
              "hover:bg-secondary/10 dark:hover:bg-_secondary/10",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1",
              "focus-visible:ring-secondary focus-visible:ring-offset-primary",
              "dark:focus-visible:ring-_secondary dark:focus-visible:ring-offset-_primary"
            )}
          >
            Powered by Twitch <FaTwitch />
          </a>
        </div>
      </div>
    </footer>
  );
};

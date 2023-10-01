import { cn } from "@/lib/utils";
import React from "react";
import { footerNavItems as navItems } from "./constants";
import { FaTwitch } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer
      className={cn(
        "bg-gradient-to-br",
        "from-primary to-primary-darker text-primary-foreground",
        "dark:from-_primary dark:to-_primary-darker dark:text-_primary-foreground dark:border-t dark:border-t-_primary-foreground/30"
      )}
    >
      <div className="flex container py-7 items-center">
        <nav>
          <ul className="flex flex-col gap-2 items-start">
            {navItems.map(({ Icon, path, ...options }, navIndex) => (
              <li key={navIndex}>
                <a
                  href={path}
                  target="_blank"
                  className={cn(
                    "flex items-center gap-2 px-2",
                    "rounded-md default-ring-primary"
                  )}
                >
                  {"label" in options ? options.label : t(options.labelKey)}{" "}
                  <Icon />
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
              "hover:bg-primary-foreground/10 dark:hover:bg-_primary-foreground/10",
              "default-ring-primary"
            )}
          >
            Powered by Twitch <FaTwitch />
          </a>
        </div>
      </div>
    </footer>
  );
};

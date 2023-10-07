import React from "react";
import { footerNavItems as navItems } from "./constants";
import { FaTwitch } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { cn } from "@nextui-org/react";

export const Footer: React.FC = () => {
  const t = useTranslations();

  return (
    <footer
      className={cn(
        "from-primary-dark to-primary-dark text-primary-foreground bg-gradient-to-br",
        "dark:border-t dark:border-t-primary-boundary"
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
              "hover:bg-primary-foreground/10 dark:hover:bg-_primary-foreground/5"
            )}
          >
            Powered by Twitch <FaTwitch />
          </a>
        </div>
      </div>
    </footer>
  );
};

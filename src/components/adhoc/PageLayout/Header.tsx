"use client";

import React, { useEffect, useRef, useState } from "react";
import { headerOptions, headerNavItems as navItems } from "./constants";
import Link from "next/link";
import { ThemeSwitch } from "./ThemeSwitch";
import { LanguageDropdown } from "./LanguageDropdown";
import { useStrippedPathname } from "@/i18n/utils";
import { useTranslations } from "next-intl";
import { cn } from "@nextui-org/react";

export const Header: React.FC = () => {
  const pathname = useStrippedPathname();

  const ulRef = useRef<HTMLUListElement>(null);
  const [navItemRects, setNavItemRects] = useState<DOMRect[]>();

  const t = useTranslations();

  useEffect(() => {
    const navItemNodes = ulRef.current?.children;
    if (!navItemNodes) return;

    setNavItemRects(
      [...navItemNodes].map((node) => node.getBoundingClientRect())
    );
    // Consider adding scroll animations (like blurring background on scroll)
  }, []);

  const selectedNavItemIndex = navItems.findIndex(
    (navItem) => navItem.path === pathname
  );

  const Slider = navItemRects && (
    <div
      className={cn(
        "absolute top-1/2 -translate-y-1/2",
        "border border-b-[3px] rounded-md transition-all pointer-events-none",
        "border-primary-foreground"
      )}
      style={{
        left: navItemRects
          .slice(0, selectedNavItemIndex)
          .reduce(
            (prev, curr) => prev + curr.width + headerOptions.navItemGap,
            0
          ),
        width: navItemRects[selectedNavItemIndex].width,
        height: navItemRects[selectedNavItemIndex].height,
      }}
    />
  );

  const Navigation = (
    <nav className="relative">
      {Slider}
      <ul
        ref={ulRef}
        className="flex"
        style={{ gap: headerOptions.navItemGap }}
      >
        {navItems.map(({ path, Icon, ...options }, navIndex) => (
          <li key={navIndex}>
            <Link
              draggable={false}
              href={path}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 select-none",
                "border rounded-md transition-all",
                selectedNavItemIndex === navIndex
                  ? "opacity-100"
                  : "opacity-60 hover:opacity-80",
                "border-primary-foreground hover:bg-primary-foreground/5"
              )}
            >
              <Icon className="inline" />{" "}
              {"label" in options ? options.label : t(options.labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <header
      className={cn(
        "fixed w-full flex items-center z-10",
        "from-primary to-primary-dark bg-gradient-to-br text-primary-foreground",
        "shadow-md shadow-primary/20",
        "dark:shadow-none dark:border-b dark:border-b-primary-boundary"
      )}
      style={{ height: headerOptions.height }}
    >
      <div className="flex container items-center gap-3">
        {Navigation}
        <div className="flex-1" />
        <LanguageDropdown />
        <ThemeSwitch />
      </div>
    </header>
  );
};

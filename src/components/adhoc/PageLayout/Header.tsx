"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { headerOptions, headerNavItems as navItems } from "./constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitch } from "./ThemeSwitch";
import { LanguageDropdown } from "./LanguageDropdown";
import { useTranslation } from "react-i18next";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const ulRef = useRef<HTMLUListElement>(null);
  const [navItemRects, setNavItemRects] = useState<DOMRect[]>();

  const { t, i18n } = useTranslation();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  console.log("????????");
  useEffect(() => {
    const navItemNodes = ulRef.current?.children;
    if (!navItemNodes) return;

    setNavItemRects(
      [...navItemNodes].map((node) => node.getBoundingClientRect())
    );
    console.log(mounted);
    // Consider adding scroll animations (like blurring background on scroll)
  }, [i18n.language, mounted]);

  const selectedNavItemIndex = navItems.findIndex(
    (navItem) => navItem.path === pathname
  );

  const Slider = navItemRects && (
    <div
      className={cn(
        "absolute top-1/2 -translate-y-1/2",
        "border border-b-[3px] rounded-md transition-all pointer-events-none",
        "border-white"
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
              href={path}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5",
                "border rounded-md transition-all",
                selectedNavItemIndex === navIndex
                  ? "opacity-100"
                  : "opacity-60 hover:opacity-80",
                "border-white hover:bg-secondary/5",
                "default-ring"
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
        "fixed w-full flex items-center",
        "shadow-md",
        "from-primary to-primary-darker bg-gradient-to-br text-secondary shadow-primary/30",
        "dark:from-_primary dark:to-_primary-darker dark:text-_secondary dark:shadow-_primary/30"
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

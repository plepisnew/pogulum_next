"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

export type NavItem = {
  path: string;
  label: string;
};

export const HeaderConstants = {
  NAV_ITEMS: [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/clips",
      label: "Clips",
    },
    {
      path: "/scraper",
      label: "Scraper",
    },
  ] as NavItem[],
  NAV_ITEM_CLASS: "nav-item",
  HEADER_HEIGHT: 70,
};

export const Header: React.FC = () => {
  const navItems = HeaderConstants.NAV_ITEMS;

  const pathname = usePathname();

  const listRef = useRef<HTMLUListElement>(null);

  const [rectangles, setRectangles] = useState<DOMRect[]>([]);

  const selectedIndex = navItems.findIndex(
    (navItem) => navItem.path === pathname
  );

  useEffect(() => {
    const navItemNodes = listRef.current?.children!;

    const rectangles = [...navItemNodes]
      .filter((node) => node.classList.contains(HeaderConstants.NAV_ITEM_CLASS))
      .map((node) => node.getBoundingClientRect());

    setRectangles(rectangles);
  }, []);

  // ! 16px hardcoded (gap-4)
  const sliderLeft = rectangles
    .slice(0, selectedIndex)
    .reduce((prev, curr) => prev + curr.width + 16, 0);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 flex items-center z-40",
        "from-twitch to-twitch-dark bg-gradient-to-br text-white shadow-md"
      )}
      style={{ height: HeaderConstants.HEADER_HEIGHT }}
    >
      <div className={cn("flex items-center container mx-auto")}>
        <nav className={cn("text-lg")}>
          <ul className={cn("flex gap-4 relative")} ref={listRef}>
            {navItems.map(({ label, path }, navIndex) => (
              <li
                key={label}
                className={cn(HeaderConstants.NAV_ITEM_CLASS, "flex")}
              >
                <Link
                  href={path}
                  className={cn(
                    "px-4 py-0.5",
                    "border border-white/40 rounded-md transition-colors",
                    navIndex === selectedIndex
                      ? "text-white"
                      : "text-white/60 hover:text-white/80"
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
            <div
              className={cn(
                "absolute top-1/2 -translate-y-1/2",
                "border border-white rounded-md pointer-events-none transition-all",
                rectangles.length === 0 && "opacity-0"
              )}
              style={{
                height: rectangles.at(0)?.height,
                width: rectangles.at(selectedIndex)?.width,
                left: sliderLeft,
              }}
            ></div>
          </ul>
        </nav>
        <div className="ml-auto">Profile</div>
      </div>
    </header>
  );
};

export const HeaderLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <main
    className="bg-twitch-100 h-full"
    style={{ paddingTop: HeaderConstants.HEADER_HEIGHT }}
  >
    <div className="container mx-auto py-6 h-full">{children}</div>
  </main>
);

"use client";

import { FaChevronDown } from "react-icons/fa";
import { cn } from "@/utils/cn";
import { ArrayMap } from "@/utils/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HeaderConstants } from "./constants";
import { NavItem } from "./types";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement>(null);
  const [rectangles, setRectangles] = useState<DOMRect[]>([]);

  const navItems = HeaderConstants.NAV_ITEMS;
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

  const navItemRenderer: ArrayMap<NavItem, JSX.Element> = (
    { label, path },
    navIndex
  ) => (
    <li
      key={label}
      className={cn(HeaderConstants.NAV_ITEM_CLASS, "flex")}
      onDragStart={(e) => e.preventDefault()}
    >
      <Link
        href={path}
        className={cn(
          "px-4 py-0.5",
          "border border-white/40 rounded-md transition-colors select-none",
          navIndex === selectedIndex
            ? "text-white"
            : "text-white/60 hover:text-white/80",
          "hover:bg-white/5"
        )}
      >
        {label}
      </Link>
    </li>
  );

  const Slider = (
    <div
      className={cn(
        "absolute top-1/2 -translate-y-1/2",
        "border border-white rounded-md pointer-events-none transition-all",
        "from-white/5 to-white/10 bg-gradient-to-br",
        rectangles.length === 0 && "opacity-0"
      )}
      style={{
        height: rectangles.at(0)?.height,
        width: rectangles.at(selectedIndex)?.width,
        // ! 16px hardcoded (gap-4)
        left: rectangles
          .slice(0, selectedIndex)
          .reduce((prev, curr) => prev + curr.width + 16, 0),
      }}
    ></div>
  );

  const Profile = (
    <div className={cn("flex items-baseline gap-4")}>
      <span>EN</span>
      <span>dark mode</span>
      <p className="flex items-center">Signed in</p>
    </div>
  );

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
            {navItems.map(navItemRenderer)}
            {Slider}
          </ul>
        </nav>
        <div className="ml-auto">{Profile}</div>
      </div>
    </header>
  );
};

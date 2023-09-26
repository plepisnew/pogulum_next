import { NavItem } from "./types";

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

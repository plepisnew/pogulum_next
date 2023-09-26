import { IconType } from "react-icons";
import { FaHome, FaVideo, FaSearch } from "react-icons/fa";

export type NavItem = {
  label: string;
  path: `/${string}`;
  Icon: IconType;
};

export const headerNavItems: NavItem[] = [
  {
    label: "Home",
    path: "/",
    Icon: FaHome,
  },
  {
    label: "Scraper",
    path: "/scraper",
    Icon: FaSearch,
  },
  {
    label: "Clips",
    path: "/clips",
    Icon: FaVideo,
  },
];

export const footerNavItems: NavItem[] = [];

export const headerOptions = {
  height: 70,
  navItemGap: 16,
};

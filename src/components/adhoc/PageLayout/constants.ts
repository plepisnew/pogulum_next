import { TransKey } from "@/i18n/utils";
import { IconType } from "react-icons";
import { FaHome, FaVideo, FaSearch, FaExternalLinkAlt } from "react-icons/fa";

export type NavItem = {
  path: string;
  Icon: IconType;
} & (
  | {
      label: string;
    }
  | { labelKey: TransKey }
);

export const headerNavItems: NavItem[] = [
  {
    labelKey: "Header.home",
    path: "/",
    Icon: FaHome,
  },
  {
    labelKey: "Header.scraper",
    path: "/scraper",
    Icon: FaSearch,
  },
  {
    labelKey: "Header.clips",
    path: "/clips",
    Icon: FaVideo,
  },
];

export const footerNavItems: NavItem[] = [
  {
    label: "Github",
    path: "https://github.com/plepisnew/pogulum_next",
    Icon: FaExternalLinkAlt,
  },
  {
    labelKey: "Footer.developer",
    path: "https://plepis.me",
    Icon: FaExternalLinkAlt,
  },
  {
    labelKey: "Footer.reference",
    path: "https://dev.twitch.tv/docs/api/reference/",
    Icon: FaExternalLinkAlt,
  },
];

export const headerOptions = {
  height: 70,
  navItemGap: 16,
};

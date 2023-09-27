import { TransKey } from "@/i18n";
import { Resources } from "i18next";
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
    labelKey: "header.home",
    path: "/",
    Icon: FaHome,
  },
  {
    labelKey: "header.scraper",
    path: "/scraper",
    Icon: FaSearch,
  },
  {
    labelKey: "header.clips",
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
    labelKey: "footer.developer",
    path: "https://plepis.me",
    Icon: FaExternalLinkAlt,
  },
  {
    labelKey: "footer.reference",
    path: "https://dev.twitch.tv/docs/api/reference/",
    Icon: FaExternalLinkAlt,
  },
];

export const headerOptions = {
  height: 70,
  navItemGap: 16,
};

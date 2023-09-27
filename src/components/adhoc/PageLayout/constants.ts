import { IconType } from "react-icons";
import {
  FaHome,
  FaVideo,
  FaSearch,
  FaGithub,
  FaUserAstronaut,
  FaRegFileCode,
  FaExternalLinkAlt,
} from "react-icons/fa";

export type NavItem = {
  label: string;
  path: string;
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

export const footerNavItems: NavItem[] = [
  {
    label: "Github",
    path: "https://github.com/plepisnew/pogulum_next",
    Icon: FaExternalLinkAlt,
  },
  {
    label: "Developer",
    path: "https://plepis.me",
    Icon: FaExternalLinkAlt,
  },
  {
    label: "Twitch API Reference",
    path: "https://dev.twitch.tv/docs/api/reference/",
    Icon: FaExternalLinkAlt,
  },
];

export const headerOptions = {
  height: 70,
  navItemGap: 16,
};

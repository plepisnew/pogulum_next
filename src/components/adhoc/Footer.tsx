import { cn } from "@/utils/cn";
import {
  FaGithub,
  FaTwitch,
  FaFileCode,
  FaUserAstronaut,
} from "react-icons/fa";
import { IconType } from "react-icons";

type NavItem = { label: string; Icon: IconType; path: string };

const navItems: NavItem[] = [
  {
    label: "Github",
    Icon: FaGithub,
    path: "https://github.com/plepisnew/pogulum_next/",
  },
  {
    label: "Twitch API Reference",
    Icon: FaFileCode,
    path: "https://dev.twitch.tv/docs/api/",
  },
  {
    label: "Developer",
    Icon: FaUserAstronaut,
    path: "https://plepis.me/",
  },
];

export const Footer: React.FC = () => {
  return (
    <footer
      className={cn(
        "from-twitch to-twitch-dark bg-gradient-to-br text-white text-lg"
      )}
    >
      <div className="container mx-auto py-8 flex justify-between items-center">
        <a
          href="https://twitch.tv"
          target="_blank"
          className="flex items-center gap-1 border border-white px-3 py-1 rounded-md hover:bg-white/5 transition-colors"
        >
          <span>
            Powered by <span className="font-semibold">Twitch</span>
          </span>
          <FaTwitch className="inline" />
        </a>
        <nav>
          <ul className="flex flex-col items-end gap-1">
            {navItems.map(({ label, path, Icon }) => (
              <li key={label}>
                <a
                  href={path}
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  {label} <Icon />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

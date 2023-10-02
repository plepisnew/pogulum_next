"use client";

import * as React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import _ from "lodash";

export const ThemeSwitch: React.FC = () => {
  const { theme, setTheme, themes } = useTheme();

  return (
    <Dropdown
      value={theme}
      items={themes.map((theme) => ({
        render: _.upperFirst(theme),
        value: theme,
        props: { onClick: () => setTheme(theme) },
      }))}
    >
      <Button variant="tonal-inverse" icon>
        <FaMoon className="hidden dark:inline" />
        <FaSun className="dark:hidden" />
      </Button>
    </Dropdown>
  );
};

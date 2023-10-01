"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { FaMoon, FaSun } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import { Sun, Moon } from "lucide-react";
import _ from "lodash";

const ThemeSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  const { theme, setTheme, themes } = useTheme();

  const getThemeClickHandler = (themeName: string) => () => setTheme(themeName);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="default-ring-primary rounded-md">
        <Button
          variant="tonal"
          size="icon"
          tabIndex={-1}
          className={cn(
            "text-primary-foreground bg-primary-foreground/5 hover:bg-primary-foreground/10",
            "dark:text-_primary-foreground dark:bg-_primary-foreground/5 dark:hover:bg-_primary-foreground/10"
          )}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={theme} className="flex flex-col gap-1">
          {themes.map((themeName) => (
            <DropdownMenuRadioItem
              key={themeName}
              value={themeName}
              onClick={getThemeClickHandler(themeName)}
            >
              {_.upperFirst(themeName)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

ThemeSwitch.displayName = "ThemeSwitch";

export { ThemeSwitch };

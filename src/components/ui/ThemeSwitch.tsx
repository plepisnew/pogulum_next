"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/stores/themeStore";

const ThemeSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  const { isLightMode, setTheme } = useThemeStore();

  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-[24px] w-[44px] shrink-0 items-center",
        "cursor-pointer rounded-full border-2 border-transparent transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-2",
        "focus-visible:ring-secondary focus-visible:ring-offset-primary bg-secondary",
        "dark:focus-visible:ring-zinc-300 dark:focus-visible:ring-offset-zinc-950 dark:data-[state=checked]:bg-zinc-50 dark:data-[state=unchecked]:bg-zinc-800",
        className
      )}
      {...props}
      defaultChecked={isLightMode}
      onCheckedChange={setTheme}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "flex items-center justify-center h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
          "rounded-full shadow-lg pointer-events-none ring-0 transition-transform",
          "bg-primary",
          "dark:bg-zinc-950"
        )}
      >
        {isLightMode ? (
          <FaSun className="text-yellow-400" />
        ) : (
          <FaMoon className="text-white" />
        )}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
});

ThemeSwitch.displayName = "ThemeSwitch";

export { ThemeSwitch };

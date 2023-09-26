import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type ThemeStore = {
  isLightMode: boolean;
  setTheme: (lightMode: boolean) => void;
};

const lightModeKey = "lightMode";

export const useThemeStore = create<ThemeStore>()(
  devtools(
    persist(
      (set) => ({
        isLightMode: localStorage.getItem(lightModeKey) === "true",
        setTheme: (theme) => {
          localStorage.setItem(lightModeKey, theme ? "true" : "false");
          return set({ isLightMode: theme });
        },
      }),
      {
        name: "theme-storage",
      }
    )
  )
);

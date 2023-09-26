import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./locales/en.json";
import svTranslation from "./locales/sv.json";
import lvTranslation from "./locales/lv.json";

export type Translation = typeof enTranslation;

export type Language = Record<
  string,
  { translation: Translation; label: string }
>;

export const supportedLanguages = [
  { translation: enTranslation, label: "English", code: "en", emoji: "🇬🇧" },
  { translation: svTranslation, label: "Svenska", code: "sv", emoji: "🇸🇪" },
  { translation: lvTranslation, label: "Latviski", code: "lv", emoji: "🇱🇻" },
];

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    resources: {
      en: enTranslation,
      sv: svTranslation,
      lv: lvTranslation,
    },
  });

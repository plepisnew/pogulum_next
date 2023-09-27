import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./locales/en.json";
import svTranslation from "./locales/sv.json";
import lvTranslation from "./locales/lv.json";

import ukFlag from "@/assets/images/flags/uk.png";
import seFlag from "@/assets/images/flags/se.png";
import lvFlag from "@/assets/images/flags/lv.png";

export type Translation = typeof enTranslation;

export type Language = Record<
  string,
  { translation: Translation; label: string }
>;

// prettier-ignore
export const supportedLanguages = [
  { translation: enTranslation, label: "English", code: "en", imageSrc: ukFlag },
  { translation: svTranslation, label: "Svenska", code: "sv", imageSrc: seFlag },
  { translation: lvTranslation, label: "Latviski", code: "lv", imageSrc: lvFlag },
];

const resources = Object.fromEntries(
  supportedLanguages.map(({ code, translation }) => [code, translation])
);

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    resources,
    detection: {
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "htmlTag",
        "path",
      ],
    },
  });

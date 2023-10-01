import ukFlag from "@/assets/images/flags/uk.png";
import seFlag from "@/assets/images/flags/se.png";
import lvFlag from "@/assets/images/flags/lv.png";
import { InitOptions } from "i18next";
import { objectKeys } from "@/utils/objects";

export const fallbackLng = "en";

export const defaultNS = "custom";

export const cookieName = "i18next";

export const languages = {
  en: { label: "English", imageSrc: ukFlag },
  sv: { label: "Svenska", imageSrc: seFlag },
  lv: { label: "Latviski", imageSrc: lvFlag },
};

export const languageCodes = objectKeys(languages);

export type Language = (typeof languageCodes)[number];

export const getOptions = (
  lng: Language = fallbackLng
): InitOptions<unknown> => {
  return {
    // debug: true,
    supportedLngs: Object.keys(languages),
    fallbackLng,
    lng,
    defaultNS,
  };
};

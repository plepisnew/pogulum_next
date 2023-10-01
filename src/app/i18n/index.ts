import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";
import { Language, defaultNS, getOptions } from "./settings";

const initI18next = async (lng: Language) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}.json`)
      )
    )
    .init(getOptions(lng));

  return i18nInstance;
};

// https://locize.com/blog/next-13-app-dir-i18n/
export const useTranslation = async (lng: Language) => {
  const i18nInstance = await initI18next(lng);

  return {
    t: i18nInstance.getFixedT(lng, defaultNS, undefined),
    i18n: i18nInstance,
  };
};

import "i18next";

import enTranslation from "./locales/en.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "custom";
    resources: {
      custom: typeof enTranslation;
    };
  }
}

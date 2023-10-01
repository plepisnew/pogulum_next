import { languageCodes } from "./settings";

export const stripLanguage = (pathname: string) => {
  const languageCode = languageCodes.find(
    (code) => pathname === `/${code}` || pathname.startsWith(`/${code}/`)
  );

  if (languageCode) {
    if (pathname === `/${languageCode}`) return "/";

    return pathname.slice(languageCode.length + 1);
  }

  return pathname;
};

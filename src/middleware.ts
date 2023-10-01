import createMiddleware from "next-intl/middleware";
import { languages } from "./i18n/utils";
export default createMiddleware({
  // A list of all locales that are supported
  locales: languages.map((language) => language.locale),

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: languages[0].locale,
});

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

import ukFlag from "@/assets/images/flags/uk.png";
import seFlag from "@/assets/images/flags/se.png";
import lvFlag from "@/assets/images/flags/lv.png";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

export const useStrippedPathname = () => {
  const pathname = usePathname();
  const locale = useLocale();

  // We're at /{locale}/*
  if (pathname.startsWith(`/${locale}/`))
    return pathname.slice(locale.length + 1);

  // We're at /{locale}
  if (pathname === `/${locale}`) return "/";

  // We're at /
  return pathname;
};

export const languages = [
  { label: "English", imageSrc: ukFlag, locale: "en" },
  { label: "Latviski", imageSrc: lvFlag, locale: "lv" },
  { label: "Svenska", imageSrc: seFlag, locale: "sv" },
];

// * https://stackoverflow.com/questions/77070151/need-help-in-typing-reusable-component-for-next-intl <3

type Paths<Schema, Path extends string = ""> = Schema extends string
  ? Path
  : Schema extends object
  ? {
      [K in keyof Schema & string]: Paths<
        Schema[K],
        `${Path}${Path extends "" ? "" : "."}${K}`
      >;
    }[keyof Schema & string]
  : never;

export type TransKey = Paths<IntlMessages>;

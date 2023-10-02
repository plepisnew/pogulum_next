"use client";

import { Dropdown } from "@/components/ui/Dropdown";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import Link from "next-intl/link";
import { languages, useStrippedPathname } from "@/i18n/utils";

export const LanguageDropdown: React.FC = () => {
  const locale = useLocale();
  const pathname = useStrippedPathname();

  return (
    <Dropdown
      value={locale}
      items={languages.map((language) => ({
        render: (
          <Link href={pathname} locale={language.locale} className="block p-2">
            {language.label}
          </Link>
        ),
        value: language.label,
        props: { className: "p-0" },
      }))}
    >
      <Button variant="tonal-inverse" icon>
        {locale.toUpperCase()}
      </Button>
    </Dropdown>
  );
};

"use client";

import { Dropdown } from "@/components/ui/Dropdown";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useLocale } from "next-intl";
import Link from "next-intl/link";
import { languages, useStrippedPathname } from "@/i18n/utils";
import React from "react";

export const LanguageDropdown: React.FC = () => {
  const locale = useLocale();
  const pathname = useStrippedPathname();

  return (
    <Dropdown
      value={locale}
      items={languages.map((language) => ({
        render: (
          <Link
            href={pathname}
            locale={language.locale}
            className="flex items-center gap-2 px-2 py-1.5"
          >
            <Image
              alt={language.locale}
              src={language.imageSrc}
              height={20}
              className="rounded-full"
            />
            {language.label}
          </Link>
        ),
        value: language.locale,
        props: { className: "p-0" },
      }))}
    >
      <Button variant="tonal-inverse" icon>
        {locale.toUpperCase()}
      </Button>
    </Dropdown>
  );
};

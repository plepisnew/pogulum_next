"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import Link from "next-intl/link";
import { languages, useStrippedPathname } from "@/i18n/utils";
import { Button } from "@/components/ui/Button";

export const LanguageDropdown: React.FC = () => {
  const locale = useLocale();
  const pathname = useStrippedPathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn("px-2", "default-ring-primary rounded-md")}
        asChild
      >
        <Button variant="tonal-inverse" size="icon">
          {locale.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        sideOffset={10}
        alignOffset={-10}
      >
        <DropdownMenuRadioGroup className="flex flex-col gap-1" value={locale}>
          {languages.map(({ locale, label, imageSrc }) => (
            <DropdownMenuRadioItem
              value={locale}
              key={label}
              className="flex gap-2 text-md"
            >
              <Link
                href={pathname}
                locale={locale}
                className="flex items-center gap-2"
              >
                <Image
                  src={imageSrc}
                  alt={label}
                  height={18}
                  className="rounded-[3px] border border-primary-foreground/50"
                />
                {label}
              </Link>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

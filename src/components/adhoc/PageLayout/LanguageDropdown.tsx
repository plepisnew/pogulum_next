"use client";

import {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import Image from "next/image";
import { supportedLanguages } from "@/i18n";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export const LanguageDropdown: React.FC = () => {
  const { i18n, t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        tabIndex={0}
        className={cn("px-2", "default-ring rounded-md")}
      >
        {i18n.language.toUpperCase()}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        sideOffset={10}
        alignOffset={-10}
      >
        <DropdownMenuRadioGroup
          className="flex flex-col gap-1"
          value={i18n.language}
          onValueChange={(value) => i18n.changeLanguage(value)}
        >
          {supportedLanguages.map(({ code, label, imageSrc }) => (
            <DropdownMenuRadioItem
              value={code}
              key={label}
              className="flex gap-2 text-md"
            >
              <Image
                src={imageSrc}
                alt={label}
                height={20}
                className="rounded-md"
                // className="border border-white"
              />
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

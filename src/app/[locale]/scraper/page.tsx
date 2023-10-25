"use client";
/* eslint-disable react/display-name */

import { useInput } from "@/hooks/useInput";
import { TransKey } from "@/i18n/utils";
import { Popover, PopoverContent, PopoverTrigger, cn } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { FaSearch } from "react-icons/fa";
import _ from "lodash";
import { PageContainer } from "@/components/adhoc/PageLayout";
import { useQuerySection } from "./_sections/query/useQuerySection";
import { useClipSection } from "./_sections/clips/useClipSection";
import { useBagSection } from "./_sections/bag/useBagSection";

// TODO fix skeleton
// TODO fix error handling
// TODO create shifting about pivot on right-most section click (when navigating to next page)
// TODO create dragging

const ScraperPage: React.FC = () => {
  const t = useTranslations();

  const [querySection, { clipData }] = useQuerySection();
  const [clipSection] = useClipSection({ clipData });
  const [bagSection] = useBagSection();

  const sections = [querySection, clipSection, bagSection];

  return (
    <PageContainer fixed>
      <div className={cn("flex gap-4 flex-col lg:flex-row h-full")}>
        {sections.map(({ Content, span, titleKey }) => (
          <div
            key={titleKey}
            className={cn(
              "text-primary-foreground rounded-md dark:border dark:border-primary-boundary",
              "shadow-md shadow-primary/60 dark:shadow-none",
              "flex flex-col"
            )}
            style={{ flex: span }}
          >
            <h1 className="bg-primary-darker px-3 py-2 font-medium dark:border-b dark:border-b-primary-boundary rounded-t-md">
              {t(titleKey)}
            </h1>
            <div className="bg-primary-dark p-3 rounded-b-md flex-1">
              {Content}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default ScraperPage;

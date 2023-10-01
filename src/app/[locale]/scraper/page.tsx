"use client";

import { Box } from "@/components/aux/Box";
import { TransKey } from "@/i18n/utils";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import React, { ReactNode, useState } from "react";
import { ClipSection } from "./ClipSection";
import { BagSection } from "./BagSection";
import { TwitchClip, unwrapClips } from "@/utils/twitch";
import { trpc } from "@/utils/trpc";
import { useInput } from "@/hooks/useInput";
import { Divider } from "@/components/aux/Divider";
import { Button } from "@/components/ui/Button";

const ScraperPage: React.FC = () => {
  const t = useTranslations();

  const { value: user, Input: UserInput } = useInput(
    { placeholder: "Anomaly" },
    { id: "user", label: t("Scraper.querySection.user") }
  );

  const { value: game, Input: GameInput } = useInput(
    { placeholder: "Counter-Strike: Global Offensive" },
    { id: "game", label: t("Scraper.querySection.game") }
  );

  const { value: clipId, Input: ClipIdInput } = useInput(
    {
      placeholder: "ResourcefulArborealNikudonCoolStoryBob-I-JFdgj170AfdrGU",
      disabled: !!user || !!game,
    },
    { id: "clipId", label: t("Scraper.querySection.clipId") }
  );

  // const { data, refetch, isLoading, status } = trpc.twitch.clips.list.useQuery(
  //   { user, game, clipId },
  //   {
  //     enabled: false,
  //   }
  // );

  const { data, refetch, isLoading, status } = trpc.twitch.clips.list.useQuery(
    { user: "Anomaly" },
    { enabled: false }
  );
  console.log({ status, isLoading });
  const QuerySectionContent = (
    <React.Fragment>
      <h2>{t("Scraper.querySection.primary")}</h2>
      {UserInput}
      {GameInput}
      {ClipIdInput}
      <Divider height={1} />
      <h2>{t("Scraper.querySection.secondary")}</h2>
      <Button
        onClick={() => refetch()}
        // disabled={isLoading}
      >
        {t("Scraper.querySection.fetch")}
      </Button>
    </React.Fragment>
  );

  // prettier-ignore
  const Sections: { title: TransKey; Content: ReactNode; span: number }[] = [
    { title: "Scraper.querySection.title", span: 1, Content: QuerySectionContent },
    { title: "Scraper.clipSection.title", span: 2, Content: <ClipSection clips={data?.clips} /> },
    { title: "Scraper.bagSection.title", span: 1, Content: <BagSection /> },
  ];

  return (
    <div className={cn("flex flex-col lg:flex-row gap-4 h-max lg:h-full")}>
      {Sections.map(({ Content, span, title }) => (
        <Box
          key={title}
          bordered
          filled
          className="h-[500px] lg:h-full p-0 overflow-hidden flex flex-col"
          style={{ flex: span }}
        >
          <h1
            className={cn(
              "px-4 py-3 font-medium",
              "lmode",
              "dark:border-b dark:border-_primary-foreground/30 dark:bg-_primary-foreground/5"
            )}
          >
            {t(title)}
          </h1>
          <div className="p-3 flex flex-col gap-3 h-full overflow-y-scroll">
            {Content}
          </div>
        </Box>
      ))}
    </div>
  );
};

export default ScraperPage;

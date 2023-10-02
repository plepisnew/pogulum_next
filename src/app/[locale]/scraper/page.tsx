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
import { FaGamepad, FaUser } from "react-icons/fa";
import { Button } from "@/components/ui/Button";

const ScraperPage: React.FC = () => {
  const t = useTranslations();

  const { value: user, Input: UserInput } = useInput({
    placeholder: "Anomaly",
    id: "user",
    label: t("Scraper.querySection.user"),
    startContent: <FaUser size={12} />,
    isClearable: true,
    variant: "faded",
  });

  const { value: game, Input: GameInput } = useInput({
    placeholder: "Counter-Strike: Global Offensive",
    id: "game",
    label: t("Scraper.querySection.game"),
    startContent: <FaGamepad size={16} />,
    variant: "faded",
    isClearable: true,
  });

  const { value: clipId, Input: ClipIdInput } = useInput({
    placeholder: "ResourcefulArborealNikudonCoolStoryBob-I-JFdgj170AfdrGU",
    id: "clipId",
    label: t("Scraper.querySection.clipId"),
    disabled: !!user || !!game,
    variant: "bordered",
    isClearable: true,
  });

  const { refetch, data, isError, isFetching, fetchNextPage } =
    trpc.twitch.clips.list.useInfiniteQuery(
      { game, user, clipId },
      {
        enabled: false,
        getNextPageParam: ({ clips, cursor }) => cursor,
      }
    );

  const QuerySectionContent = (
    <React.Fragment>
      <h2>{t("Scraper.querySection.primary")}</h2>
      {UserInput}
      {GameInput}
      {ClipIdInput}
      <Divider height={1} />
      <h2>{t("Scraper.querySection.secondary")}</h2>
      <Button onClick={() => refetch()} disabled={isFetching}>
        {t("Scraper.querySection.fetch")}
      </Button>
    </React.Fragment>
  );

  const clips = data?.pages.reduce((prev, curr) => {
    return [...prev, ...curr.clips];
  }, [] as TwitchClip[]);

  // prettier-ignore
  const Sections: { title: TransKey; Content: ReactNode; span: number }[] = [
    { title: "Scraper.querySection.title", span: 1, Content: QuerySectionContent },
    { title: "Scraper.clipSection.title", span: 2, Content: <ClipSection clips={clips} /> },
    { title: "Scraper.bagSection.title", span: 1, Content: <BagSection /> },
  ];

  return (
    <div className={cn("flex flex-col lg:flex-row gap-4 h-max lg:h-full")}>
      {Sections.map(({ Content, span, title }) => (
        <Box
          key={title}
          bordered
          filled
          className={cn(
            "h-[500px] lg:h-full p-0 overflow-hidden flex flex-col",
            "shadow-primary/50 shadow-lg dark:shadow-none"
          )}
          style={{ flex: span }}
        >
          <h1
            className={cn(
              "px-4 py-3 font-medium",
              "bg-primary-darker",
              "dark:border-b dark:border-_primary-foreground/30 dark:bg-_primary-foreground/5"
            )}
          >
            {t(title)}
          </h1>
          <div className="p-3 flex flex-col gap-3 flex-1 overflow-y-scroll">
            {Content}
          </div>
        </Box>
      ))}
    </div>
  );
};

export default ScraperPage;

"use client";

import { Divider } from "@/components/aux/Divider";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useInput } from "@/hooks/useInput";
import { TransKey } from "@/i18n/utils";
import { trpc } from "@/utils/trpc";
import { cn } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { ReactNode, useEffect, useRef } from "react";
import { FaCamera, FaGamepad, FaSearch, FaUser } from "react-icons/fa";
import { ClipCard } from "./ClipCard";

const ScraperPage: React.FC = () => {
  const t = useTranslations();

  // TODO create shifting about pivot on right-most section click
  // TODO create dragging
  // TODO create autocomplete and dynamic searching for twitch users/games
  const { value: user, Input: UserInput } = useInput({
    label: t("Scraper.querySection.user"),
    placeholder: "Anomaly",
    variant: "primary-inverse",
    startContent: <FaUser />,
  });

  const { value: game, Input: GameInput } = useInput({
    label: t("Scraper.querySection.game"),
    placeholder: "Counter-Strike: Global Offensive",
    variant: "primary-inverse",
    startContent: <FaGamepad />,
  });

  const { value: clipId, Input: ClipIdInput } = useInput({
    label: t("Scraper.querySection.clipId"),
    placeholder: "Anomaly",
    variant: "secondary-inverse",
    startContent: <FaCamera />,
  });

  const {
    data: clipData,
    isFetching: isFetchingClips,
    refetch,
  } = trpc.twitch.clips.list.useQuery(
    {
      user,
      game,
      clipId,
    },
    {
      enabled: false,
    }
  );

  const QuerySection = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2>{t("Scraper.querySection.primary")}</h2>
        {UserInput}
        {GameInput}
        {ClipIdInput}
      </div>
      <div className="flex flex-col gap-2">
        <h2>{t("Scraper.querySection.secondary")}</h2>
      </div>
      <div className="flex flex-col gap-2"></div>
      <Button
        isLoading={isFetchingClips}
        variant="primary-inverse"
        onClick={() => refetch()}
      >
        {isFetchingClips
          ? t("Scraper.querySection.fetching")
          : t("Scraper.querySection.fetch")}
      </Button>
    </div>
  );

  const { value: titleFilter, Input: TitleFilterInput } = useInput({
    // label: t("Scraper.clipSection.searchPlaceholder"),
    placeholder: "Search by title",
    variant: "secondary-inverse",
    startContent: <FaSearch />,
  });

  const ClipSection = (
    <div className="flex flex-col gap-2 h-full">
      {TitleFilterInput}
      <div
        className={cn(
          "p-2 flex-1 grid grid-cols-3 gap-x-2 gap-y-2 items-start",
          "border-2 dark:border border-primary-foreground dark:border-primary-boundary rounded-lg overflow-y-scroll scrollbar-none"
        )}
      >
        {clipData?.clips.map((clip) => (
          <ClipCard key={clip.id} clip={clip} />
        ))}
        {/* <div className="relative dark:border dark:border-primary-boundary rounded-md">
          <span className="bg-primary-dark px-2 py-1 block overflow-x-scroll break-words whitespace-nowrap scrollbar-none rounded-t-md">
            title
          </span>
          <a
            href={"/scraper"}
            target="_blank"
            className="aspect-video animate-pulse bg-zinc-800"
            style={{ display: "block" }}
          >
            t
          </a>
          <span
            className={cn(
              "absolute bottom-1 right-1 px-1 py-0.5",
              "bg-black/70 rounded-md",
              "text-sm"
            )}
          >
            00:00
          </span>
        </div> */}
      </div>
    </div>
  );

  const BagSection = <div>Bag</div>;

  const Sections: { titleKey: TransKey; Content: ReactNode; span: number }[] = [
    {
      titleKey: "Scraper.querySection.title",
      Content: QuerySection,
      span: 1,
    },
    {
      titleKey: "Scraper.clipSection.title",
      Content: ClipSection,
      span: 2,
    },
    {
      titleKey: "Scraper.bagSection.title",
      Content: BagSection,
      span: 1,
    },
  ];

  return (
    <div className={cn("h-full", "flex gap-4 flex-col lg:flex-row")}>
      {Sections.map(({ Content, span, titleKey }) => (
        <div
          key={titleKey}
          className={cn(
            "text-primary-foreground rounded-md overflow-hidden dark:border dark:border-primary-boundary",
            "flex flex-col h-full"
          )}
          style={{ flex: span }}
        >
          <h1 className="bg-primary-dark px-3 py-2 font-medium dark:border-b dark:border-b-primary-boundary">
            {t(titleKey)}
          </h1>
          <div className="bg-primary p-3 h-full">{Content}</div>
        </div>
      ))}
    </div>
  );
};

export default ScraperPage;

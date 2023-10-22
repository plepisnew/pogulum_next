"use client";
/* eslint-disable react/display-name */

import { Button } from "@/components/ui/Button";
import { useInput } from "@/hooks/useInput";
import { TransKey } from "@/i18n/utils";
import { trpc } from "@/utils/trpc";
import { cn } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { FaCamera, FaSearch } from "react-icons/fa";
import { ClipCard } from "./ClipCard";
import _ from "lodash";
import { useGameHandler } from "./useGameHandler";
import { useUserHandler } from "./useUserHandler";

// TODO fix skeleton
// TODO fix error handling
// TODO clean up code + autocomplete

const ScraperPage: React.FC = () => {
  const t = useTranslations();

  // TODO create shifting about pivot on right-most section click
  // TODO create dragging
  // TODO create autocomplete and dynamic searching for twitch users/games

  // const { value: user, Autocomplete: UserAutocomplete } = useAutocomplete({
  //   inputProps: {
  //     label: t("Scraper.querySection.user"),
  //     placeholder: "Anomaly",
  //     variant: "secondary-inverse",
  //     className: "text-white",
  //     startContent: <FaUser />,
  //   },
  // });

  const { game, GameAutocomplete } = useGameHandler();
  const { user, UserAutocomplete } = useUserHandler();

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
    { enabled: false }
  );

  const QuerySection = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2>{t("Scraper.querySection.primary")}</h2>
        {UserAutocomplete}
        {GameAutocomplete}
        {/* {ClipIdInput} */}
      </div>
      <div className="flex flex-col gap-2">
        <h2>{t("Scraper.querySection.secondary")}</h2>
      </div>
      <div className="flex flex-col gap-2"></div>
      <Button
        isLoading={isFetchingClips}
        variant="tonal-inverse"
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
          "border-2 dark:border border-primary-foreground dark:border-primary-boundary rounded-lg overflow-y-scroll scrollbar-hide"
        )}
      >
        {clipData?.clips.map((clip) => (
          <ClipCard key={clip.id} clip={clip} />
        ))}
        {/* TODO add skeleton */}
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
    <div className={cn("flex gap-4 flex-col lg:flex-row")}>
      {Sections.map(({ Content, span, titleKey }) => (
        <div
          key={titleKey}
          className={cn(
            "text-primary-foreground rounded-md dark:border dark:border-primary-boundary",
            "flex flex-col"
          )}
          style={{ flex: span }}
        >
          <h1 className="bg-primary-dark px-3 py-2 font-medium dark:border-b dark:border-b-primary-boundary rounded-t-md">
            {t(titleKey)}
          </h1>
          <div className="bg-primary p-3 h-full rounded-b-md">{Content}</div>
        </div>
      ))}
    </div>
  );
};

export default ScraperPage;

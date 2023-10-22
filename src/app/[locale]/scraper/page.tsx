"use client";
/* eslint-disable react/display-name */

import { Divider } from "@/components/aux/Divider";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useInput } from "@/hooks/useInput";
import { TransKey } from "@/i18n/utils";
import { trpc } from "@/utils/trpc";
import { cn } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { MouseEventHandler, ReactNode, useState } from "react";
import {
  FaCamera,
  FaGamepad,
  FaQuestionCircle,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import { ClipCard } from "./ClipCard";
import {
  EntityAutocompleteProps,
  filterItems,
  useAutocomplete,
} from "./EntityAutocomplete";
import { TwitchGame, concreteDimensions } from "@/utils/twitch";
import _ from "lodash";
import { Skeleton } from "@/components/ui/Skeleton";
import { DbTwitchGame } from "@prisma/client";

type GetAutocompleteItemRenderer = (renderable: {
  label: string;
  imageSrc: string;
}) => Exclude<EntityAutocompleteProps["items"][number]["Render"], ReactNode>;

// TODO fix skeleton
// TODO fix error handling
// TODO clean up code + autocomplete

const ScraperPage: React.FC = () => {
  const t = useTranslations();

  // TODO create shifting about pivot on right-most section click
  // TODO create dragging
  // TODO create autocomplete and dynamic searching for twitch users/games

  const { data: topGames } = trpc.twitch.games.getTop.useQuery(50, {
    refetchInterval: undefined,
    initialData: [],
  });
  const [newGames, setNewGames] = useState<DbTwitchGame[]>([]);
  const allGames = [...topGames, ...newGames];

  const autocompleteIconSize = 32;

  const getAutocompleteItemRenderer: GetAutocompleteItemRenderer =
    ({ imageSrc, label }) =>
    ({ value, setValue }) => {
      const handleSelectItem: MouseEventHandler = (e) => setValue(label);

      const highlightOccurrence = (options: {
        searchable: string;
        filter: string;
      }): ReactNode[] => {
        const { searchable, filter } = options;

        const nodes: ReactNode[] = [];
        let undesirableWord = "";
        let desirableWord = "";

        for (let i = 0; i < searchable.length; i++) {
          const char = searchable.at(i)!;

          if (
            char.toLowerCase() ===
            filter.charAt(desirableWord.length).toLowerCase()
          ) {
            desirableWord += char;

            if (desirableWord.toLowerCase() === filter.toLowerCase()) {
              nodes.push(undesirableWord);
              nodes.push(
                <span className="font-bold" key={i}>
                  {desirableWord}
                </span>
              );
              undesirableWord = "";
              desirableWord = "";
            }
          } else {
            undesirableWord += desirableWord + char;
            desirableWord = "";
          }
        }
        nodes.push(undesirableWord);
        nodes.push(desirableWord);

        return nodes;
      };

      return (
        <div
          key={label}
          className={cn(
            "flex items-center gap-2 p-1",
            "bg-primary-foreground/5 hover:bg-primary-foreground/10 data-[selected=true]:bg-primary-foreground/20 rounded-md cursor-pointer"
          )}
          onClick={handleSelectItem}
          data-selected={value === label}
        >
          <Skeleton>
            <Image
              width={autocompleteIconSize}
              height={autocompleteIconSize}
              alt={label}
              src={concreteDimensions({
                url: imageSrc,
                width: autocompleteIconSize,
                height: autocompleteIconSize,
              })}
              className="rounded-md"
            />
          </Skeleton>
          <span className="whitespace-nowrap overflow-x-scroll scrollbar-hide">
            {highlightOccurrence({ searchable: label, filter: value })}
          </span>
        </div>
      );
    };

  const { mutateAsync: fetchExistingGames, isLoading: isLoadingExistingGames } =
    trpc.twitch.games.list.useMutation({
      onSuccess: (data) => {
        const brandNewGames = _.differenceBy(data, allGames, (game) => game.id);
        setNewGames([...newGames, ...brandNewGames]);
      },
      retry: false,
    });

  const { mutateAsync: fetchNewGame, isLoading: isLoadingNewGame } =
    trpc.twitch.games.get.useMutation({
      onSuccess: (data) => {
        const brandNewGames = _.differenceBy(
          [data],
          allGames,
          (game) => game.id
        );
        setNewGames([...newGames, ...brandNewGames]);
      },
      retry: false,
    });

  const { value: game, Autocomplete: GameAutocomplete } = useAutocomplete({
    inputProps: {
      label: t("Scraper.querySection.game"),
      placeholder: "Counter-Strike: Global Offensive",
      variant: "secondary-inverse",
      startContent: <FaGamepad />,
    },
    items: allGames.map((game) => ({
      value: game.name,
      Render: getAutocompleteItemRenderer({
        label: game.name,
        imageSrc: game.boxArtUrl,
      }),
    })),
    Loader: (
      <div
        className={cn(
          "flex items-center gap-2 p-1",
          "bg-primary-foreground/5 rounded-md"
        )}
      >
        <Skeleton width={autocompleteIconSize} height={autocompleteIconSize} />
        <Skeleton className="w-1/2 h-4" />
      </div>
    ),
    onChange: async (value) => {
      const count = filterItems(
        allGames.map((game) => ({ value: game.name })),
        value
      ).length;

      if (count === 0) {
        return await fetchNewGame({ name: value });
      }
      if (count < 5) {
        return await fetchExistingGames(value);
      }
    },
    isLoading: isLoadingNewGame,
    debounceMillis: 1000,
  });

  // const { value: user, Autocomplete: UserAutocomplete } = useAutocomplete({
  //   inputProps: {
  //     label: t("Scraper.querySection.user"),
  //     placeholder: "Anomaly",
  //     variant: "secondary-inverse",
  //     className: "text-white",
  //     startContent: <FaUser />,
  //   },
  // });

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
      // user,
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
        {/* {UserAutocomplete} */}
        {GameAutocomplete}
        {/* {ClipIdInput} */}
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

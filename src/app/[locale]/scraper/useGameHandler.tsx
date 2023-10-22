import { trpc } from "@/utils/trpc";
import { cn } from "@nextui-org/react";
import { DbTwitchGame } from "@prisma/client";
import _ from "lodash";
import { useState } from "react";
import { FaGamepad } from "react-icons/fa";
import { useAutocomplete } from "./EntityAutocomplete";
import {
  getAutocompleteItemRenderer,
  autocompleteIconSize,
  filterItems,
} from "./shared";
import { Skeleton } from "@/components/ui/Skeleton";
import { useTranslations } from "next-intl";

export const useGameHandler = () => {
  const t = useTranslations();

  const { data: topGames } = trpc.twitch.games.getTop.useQuery(50, {
    initialData: [],
  });
  const [newGames, setNewGames] = useState<DbTwitchGame[]>([]);
  const allGames = [...topGames, ...newGames];

  const { mutateAsync: fetchExistingGames } =
    trpc.twitch.games.list.useMutation({
      onSuccess: (data) => {
        const brandNewGames = _.differenceBy(data, allGames, (game) => game.id);
        setNewGames([...newGames, ...brandNewGames]);
      },
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

  return { game, GameAutocomplete };
};

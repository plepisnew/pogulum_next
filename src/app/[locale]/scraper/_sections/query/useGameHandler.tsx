import { trpc } from "@/utils/trpc";
import { DbTwitchGame } from "@prisma/client";
import _ from "lodash";
import { useState } from "react";
import { useAutocomplete } from "./EntityAutocomplete";

export const useGameHandler = () => {
  const { data: topGames } = trpc.twitch.games.getTop.useQuery(50, {
    initialData: [],
    cacheTime: 0,
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
    triggerPlaceholder: "Scraper.querySection.gamePlaceholder",
    items: allGames.map((game) => ({
      value: game.name,
      display: game.name,
      iconSrc: game.boxArtUrl,
    })),
    inputProps: {
      placeholder: "Counter-Strike: Global Offensive",
      variant: "secondary-inverse",
    },
    onChange: async ({ value, count }) => {
      if (count === 0) {
        return await fetchNewGame({ name: value });
      }
      if (count < 5) {
        return await fetchExistingGames(value);
      }
    },
    isLoading: isLoadingNewGame,
  });

  return { game, GameAutocomplete };
};

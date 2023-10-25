import { trpc } from "@/utils/trpc";
import { DbTwitchUser } from "@prisma/client";
import _ from "lodash";
import { useState } from "react";
import { useAutocomplete } from "./EntityAutocomplete";

export const useUserHandler = () => {
  const { data: topUsers } = trpc.twitch.users.getTop.useQuery(50, {
    initialData: [],
    cacheTime: 0,
  });

  const [newUsers, setNewUsers] = useState<DbTwitchUser[]>([]);
  const allUsers = [...topUsers, ...newUsers];

  const { mutateAsync: fetchExistingUsers } =
    trpc.twitch.users.list.useMutation({
      onSuccess: (data) => {
        const brandNewUsers = _.differenceBy(data, allUsers, (user) => user.id);
        setNewUsers([...newUsers, ...brandNewUsers]);
      },
    });

  const { mutateAsync: fetchNewUser, isLoading: isLoadingNewUser } =
    trpc.twitch.users.get.useMutation({
      onSuccess: (data) => {
        const brandNewUsers = _.differenceBy(
          [data],
          allUsers,
          (user) => user.id
        );
        setNewUsers([...newUsers, ...brandNewUsers]);
      },
    });

  const { value: user, Autocomplete: UserAutocomplete } = useAutocomplete({
    triggerPlaceholder: "Scraper.querySection.userPlaceholder",
    items: allUsers.map((user) => ({
      display: user.displayName,
      value: user.login,
      iconSrc: user.profileImageUrl,
    })),
    inputProps: { placeholder: "Anomaly", variant: "secondary-inverse" },
    onChange: async ({ count, value }) => {
      if (count === 0) {
        return await fetchNewUser({ login: value });
      }
      if (count < 5) {
        return await fetchExistingUsers(value);
      }
    },
    isLoading: isLoadingNewUser,
  });

  return { user, UserAutocomplete };
};

import { trpc } from "@/utils/trpc";
import { cn } from "@nextui-org/react";
import { Skeleton } from "@/components/ui/Skeleton";
import { DbTwitchUser } from "@prisma/client";
import _ from "lodash";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useAutocomplete } from "./EntityAutocomplete";
import {
  getAutocompleteItemRenderer,
  autocompleteIconSize,
  filterItems,
} from "./shared";

export const useUserHandler = () => {
  const t = useTranslations();

  const { data: topUsers } = trpc.twitch.users.getTop.useQuery(50, {
    initialData: [],
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
    inputProps: {
      label: t("Scraper.querySection.user"),
      placeholder: "Anomaly",
      variant: "secondary-inverse",
      startContent: <FaUser />,
    },
    items: allUsers.map((user) => ({
      value: user.login,
      Render: getAutocompleteItemRenderer({
        label: user.displayName,
        imageSrc: user.profileImageUrl,
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
        allUsers.map((user) => ({ value: user.login })),
        value
      ).length;

      if (count === 0) {
        return await fetchNewUser({ login: value });
      }
      if (count < 5) {
        return await fetchExistingUsers(value);
      }
    },
    isLoading: isLoadingNewUser,
    debounceMillis: 1000,
    // popoverClassName: "z-30",
    // inputContainerClassName: "z-30",
    baseClassName: "z-30",
  });

  return { user, UserAutocomplete };
};

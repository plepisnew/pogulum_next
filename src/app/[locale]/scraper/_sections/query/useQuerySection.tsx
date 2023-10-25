import { trpc } from "@/utils/trpc";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { FaCamera } from "react-icons/fa";
import { useGameHandler } from "./useGameHandler";
import { useUserHandler } from "./useUserHandler";
import { useInput } from "@/hooks/useInput";
import { UseSection } from "../Section";
import { RouterOutput } from "@/server/_app";

export const useQuerySection = (): UseSection<{
  clipData: RouterOutput["twitch"]["clips"]["list"] | undefined;
}> => {
  const t = useTranslations();

  const { game, GameAutocomplete } = useGameHandler();
  const { user, UserAutocomplete } = useUserHandler();

  const { value: clipId, Input: ClipIdInput } = useInput({
    label: t("Scraper.querySection.clipId"),
    placeholder: "FaithfulLaconicPotHoneyBadger-7YGA...",
    variant: "secondary-inverse",
    startContent: <FaCamera />,
    disabled: Boolean(user) || Boolean(game),
  });

  const {
    data: clipData,
    isFetching: isFetchingClips,
    refetch,
  } = trpc.twitch.clips.list.useQuery(
    { user, game, clipId },
    { enabled: false, keepPreviousData: true }
  );

  const QuerySectionContent = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2>{t("Scraper.querySection.primary")}</h2>
        {UserAutocomplete}
        {GameAutocomplete}
      </div>
      <div className="flex flex-col gap-2">
        <h2>{t("Scraper.querySection.secondary")}</h2>
        {ClipIdInput}
      </div>
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

  return [
    {
      Content: QuerySectionContent,
      titleKey: "Scraper.querySection.title",
      span: 1,
    },
    {
      clipData,
    },
  ];
};

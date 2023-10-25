import { useInput } from "@/hooks/useInput";
import { UseSection } from "../Section";
import { cn } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { RouterOutput } from "@/server/_app";

export const useClipSection = (options: {
  clipData: RouterOutput["twitch"]["clips"]["list"] | undefined;
}): UseSection => {
  const { clipData } = options;

  const { value: titleFilter, Input: TitleFilterInput } = useInput({
    // label: t("Scraper.clipSection.searchPlaceholder"),
    placeholder: "Search by title",
    variant: "secondary-inverse",
    startContent: <FaSearch />,
  });

  const ClipSectionContent = (
    <div className="flex flex-col gap-2 h-full">
      {TitleFilterInput}
      {/* TODO should probably figure out how flex works especially basis */}
      <div
        className={cn("flex-grow basis-0", "bg-red-500/10 overflow-y-scroll")}
      >
        {/* {clipData?.clips.map()} */}
      </div>
    </div>
  );

  return [
    {
      Content: ClipSectionContent,
      titleKey: "Scraper.clipSection.title",
      span: 2,
    },
  ];
};

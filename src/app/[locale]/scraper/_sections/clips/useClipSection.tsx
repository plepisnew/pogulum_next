import { useInput } from "@/hooks/useInput";
import { UseSection } from "../Section";
import { ScrollShadow, cn } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { RouterOutput } from "@/server/_app";
import { ArrayMap } from "@/utils/types";
import { TwitchClip } from "@/utils/twitch";
import { ReactNode, useEffect, useRef } from "react";
import { secondsToTimestamp } from "@/utils/time";
import Image from "next/image";

const ClipSectionDefaults = {
  SCROLL_BOUNDARY: 500,
};

export const useClipSection = (options: {
  clipData: RouterOutput["twitch"]["clips"]["list"] | undefined;
  fetchClips: () => Promise<void>;
  isFetchingClips: boolean;
}): UseSection => {
  const { clipData, fetchClips, isFetchingClips } = options;

  const clipContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clipContainer = clipContainerRef.current!;

    let _isFetchingClipsLocal = false;

    const scrollEventListener = async (e: Event) => {
      const { scrollHeight, scrollTop, clientHeight } = e.target as HTMLElement;

      if (
        scrollHeight - scrollTop - clientHeight <=
          ClipSectionDefaults.SCROLL_BOUNDARY &&
        !_isFetchingClipsLocal
      ) {
        _isFetchingClipsLocal = true;

        await fetchClips();

        _isFetchingClipsLocal = false;
      }
    };

    clipContainer.addEventListener("scroll", scrollEventListener);

    return () =>
      clipContainer.removeEventListener("scroll", scrollEventListener);
  }, [isFetchingClips, fetchClips]);

  const { value: titleFilter, Input: TitleFilterInput } = useInput({
    // label: t("Scraper.clipSection.searchPlaceholder"),
    placeholder: "Search by title",
    variant: "secondary-inverse",
    startContent: <FaSearch />,
  });

  const clipRenderer: ArrayMap<TwitchClip, ReactNode> = ({
    title,
    thumbnailUrl,
    duration,
    url,
    id,
  }) => (
    <div
      key={id}
      className={cn(
        "relative",
        "dark:border dark:border-primary-boundary rounded-md"
      )}
    >
      {/* TODO add context menu for liking clip/user/game and navigating to user/game */}
      <h3 className="px-2 py-1 font-medium whitespace-nowrap overflow-x-scroll scrollbar-hide">
        {title}
      </h3>
      <a href={url} target="_blank">
        <Image alt={title} src={thumbnailUrl} width={480} height={270} />
      </a>
      <span className="absolute text-sm bottom-1 right-1 bg-black/70 px-1.5 py-0.5 rounded-md">
        {secondsToTimestamp(duration)}
      </span>
    </div>
  );

  const ClipSectionContent = (
    <div className="flex flex-col gap-2 h-full">
      {TitleFilterInput}
      {/* TODO should probably figure out how flex works especially basis */}
      <ScrollShadow
        ref={clipContainerRef}
        className={cn(
          "flex-grow basis-0 overflow-y-scroll scrollbar-hide",
          "grid md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-2"
        )}
      >
        {clipData?.clips.map(clipRenderer)}
      </ScrollShadow>
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

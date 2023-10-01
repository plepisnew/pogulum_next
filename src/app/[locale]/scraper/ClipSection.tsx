import { Box } from "@/components/aux/Box";
import { useInput } from "@/hooks/useInput";
import { TwitchClip, concreteDimensions } from "@/utils/twitch";
import { ArrayFilter, ArrayMap } from "@/utils/types";
import { useTranslations } from "next-intl";
import React, { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { secondsToTimestamp } from "@/utils/time";

export type ClipSectionProps = {
  clips?: TwitchClip[];
};

const thumbnailWidth = 320;
const thumbnailHeight = 180;

export const ClipSection: React.FC<ClipSectionProps> = ({ clips }) => {
  const t = useTranslations();
  const { value: titleFilter, Input: TitleFilterInput } = useInput({
    placeholder: t("Scraper.clipSection.searchPlaceholder"),
  });

  const clipFilterer: ArrayFilter<TwitchClip> = ({ title }) =>
    titleFilter.length === 0 ||
    title.toLowerCase().includes(titleFilter.toLowerCase());

  const clipRenderer: ArrayMap<TwitchClip, ReactNode> = ({
    id,
    title,
    url,
    thumbnailUrl,
    duration,
  }) => (
    <div
      key={id}
      className={cn(
        "relative rounded-md border overflow-visible",
        "dark:border-_primary-foreground/30 h-fit"
      )}
    >
      <span
        className={cn(
          "block px-2 py-1 whitespace-nowrap overflow-x-scroll scroll-none",
          "rounded-t-md",
          "dark:bg-_primary-darker dark:text-_primary-foreground"
        )}
      >
        {title}
      </span>
      <a href={url} target="_blank">
        <Image
          width={thumbnailWidth}
          height={thumbnailHeight}
          alt={title}
          src={concreteDimensions({
            url: thumbnailUrl,
            width: thumbnailWidth,
            height: thumbnailHeight,
          })}
          className="w-full"
        />
      </a>
      <span className="absolute bottom-1 right-1 bg-black/80 rounded-md px-1">
        {secondsToTimestamp(duration)}
      </span>
    </div>
  );

  return (
    <React.Fragment>
      {TitleFilterInput}
      <Box
        bordered
        className={cn(
          "p-2 grid gap-x-2 gap-y-2 grid-cols-3 grid-flow-row-dense h-full",
          "scroll-none overflow-y-scroll"
        )}
      >
        {clips === undefined
          ? "click fetch clips"
          : clips.length === 0
          ? "unable to find clips :("
          : clips.filter(clipFilterer).map(clipRenderer)}
      </Box>
    </React.Fragment>
  );
};

"use client";

import { Popover } from "@/components/ui/Popover";
import { FaQuestionCircle } from "react-icons/fa";

export type PageTitleProps = {
  highlight: "twitch" | "clip" | "scraper";
  helperText?: string;
};

export const PageTitle: React.FC<PageTitleProps> = ({
  highlight,
  helperText,
}) => {
  const wrap = (text: string) => <span className="font-semibold">{text}</span>;

  const RenderedTitle =
    highlight === "twitch" ? (
      <>{wrap("Twitch")} Clip Scraper</>
    ) : highlight === "clip" ? (
      <>Twitch {wrap("Clip")} Scraper</>
    ) : (
      <>Twitch Clip {wrap("Scraper")}</>
    );

  const PopoverContent = (
    <p className="bg-black/70 backdrop-blur-md text-white p-2 rounded-md shadow-md w-[300px]">
      {helperText}
    </p>
  );

  return (
    <div className="flex items-baseline gap-2">
      <h1 className="font-light text-4xl text-zinc-950">{RenderedTitle}</h1>
      {helperText && (
        <Popover
          render={PopoverContent}
          clickable
          origin="bottom"
          align="center"
        >
          <FaQuestionCircle size={24} className="cursor-pointer" />
        </Popover>
      )}
    </div>
  );
};

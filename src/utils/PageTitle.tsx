"use client";

export type PageTitleProps = {
  highlight: "twitch" | "clip" | "scraper";
};

export const PageTitle: React.FC<PageTitleProps> = ({ highlight }) => {
  const wrap = (text: string) => <span className="font-semibold">{text}</span>;

  const RenderedTitle =
    highlight === "twitch" ? (
      <>{wrap("Twitch")} Clip Scraper</>
    ) : highlight === "clip" ? (
      <>Twitch {wrap("Clip")} Scraper</>
    ) : (
      <>Twitch Clip {wrap("Scraper")}</>
    );

  return <h1 className="font-light text-4xl text-zinc-950">{RenderedTitle}</h1>;
};

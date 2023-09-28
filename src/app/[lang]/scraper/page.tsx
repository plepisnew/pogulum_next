"use client";

import { cn } from "@/lib/utils";
import { trpc } from "@/utils/trpc";
import React from "react";

const ScraperPage: React.FC = () => {
  const VerticalDivider = (
    <div className="bg-twitch-950 h-full w-[2px] rounded-full"></div>
  );

  const { data: topGames } = trpc.twitch.games.getTop.useQuery(100);

  return <div className={cn("flex flex-col gap-4 h-full")}>scraper</div>;
};

export default ScraperPage;

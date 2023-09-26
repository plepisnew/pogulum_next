"use client";

import { cn } from "@/utils/cn";
import { trpc } from "@/utils/trpc";
import React from "react";

const ScraperPage: React.FC = () => {
  const VerticalDivider = (
    <div className="bg-twitch-950 h-full w-[2px] rounded-full"></div>
  );

  const { data: topGames } = trpc.twitch.games.getTop.useQuery(100);

  return (
    <div className={cn("flex flex-col gap-4 h-full")}>
      <div
        className={cn(
          "flex h-full p-4 gap-4",
          "from-twitch-600 to-twitch-700 bg-gradient-to-br backdrop-blur-lg rounded-2xl",
          "border-2 border-twitch-800 text-white"
        )}
      >
        <div className="flex-1">
          <h3>Primary filters</h3>
          <div>streamer (autocomplete)</div>
          <div>game (autocomplete)</div>
          <div>clip id</div>
          <h3>Secondary filters</h3>
          <div>From date</div>
          <div>To date</div>
        </div>
        {VerticalDivider}
        <div className="flex-[2] flex flex-col gap-2">
          {/* <div>name filter</div>
          <div>sort by user</div>
          <div>sort by game</div>
          <div>sort by creation date</div>
          <div>sort by view count</div>
          <div>sort by duration</div> */}
        </div>
        {VerticalDivider}
        <div className="flex-1">editor</div>
      </div>
    </div>
  );
};

export default ScraperPage;

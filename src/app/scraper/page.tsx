"use client";

import { TextInput } from "@/components/ui/TextInput";
import { cn } from "@/utils/cn";
import { PageTitle } from "@/components/adhoc/PageTitle";
import { Button } from "@/components/ui/Button";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { Autocomplete, boldenMatcher } from "@/components/ui/Autocomplete";
import Image from "next/image";
import { trpc } from "@/utils/trpc";
import { concreteDimensions } from "@/utils/twitch";
import React from "react";

const ScraperPage: React.FC = () => {
  const VerticalDivider = (
    <div className="bg-twitch-950 h-full w-[2px] rounded-full"></div>
  );

  const { data: topGames } = trpc.twitch.games.getTop.useQuery(100);

  const gameOptions =
    topGames?.map((game) => ({
      value: game.name,
      render: (value: string) => (
        <React.Fragment>
          <Image
            width={36}
            height={36}
            src={concreteDimensions({
              url: game.boxArtUrl,
              width: 36,
              height: 36,
            })}
            alt={game.name}
            className="border border-black rounded-md inline mr-2"
          />
          {boldenMatcher(game.name, value)}
        </React.Fragment>
      ),
    })) ?? [];

  return (
    <div className={cn("flex flex-col gap-4 h-full")}>
      <PageTitle
        highlight="scraper"
        helperText="This is where you can find clips based on different criteria and edit them into a single downloadable video"
      />
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
          <div className="flex gap-2">
            <TextInput
              wrapperClassName="flex-1"
              containerClassName="rounded-full"
              start={<FaSearch className="ml-1" />}
            />
            <Button className="w-[100px] rounded-full" inverse>
              Submit
            </Button>
          </div>
          <div>
            <Autocomplete options={gameOptions} />
          </div>
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

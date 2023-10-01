"use client";

import { Box } from "@/components/aux/Box";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { trpc } from "@/utils/trpc";
import React from "react";

const ScraperPage: React.FC = () => {
  const VerticalDivider = (
    <div className="bg-twitch-950 h-full w-[2px] rounded-full"></div>
  );

  const { data: topGames } = trpc.twitch.games.getTop.useQuery(100);

  return (
    <div className={cn("flex flex-col gap-4 h-full")}>
      <div className="flex gap-4 w-[500px]">
        <Box bordered className=" flex flex-col gap-4 p-4 flex-1 rounded-md">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tonal">Tonal</Button>
          <Button variant="quiet">Quiet</Button>
          <Button variant="text">Text</Button>
        </Box>
        <Box filled className="flex flex-col gap-4 p-4 flex-1 rounded-md">
          <Button variant="primary-inverse">Primary Inverse</Button>
          <Button variant="secondary-inverse">Secondary Inverse</Button>
          <Button variant="tonal-inverse">Tonal Inverse</Button>
          <Button variant="quiet-inverse">Quiet Inverse</Button>
          <Button variant="text-inverse">Text Inverse</Button>
        </Box>
      </div>
    </div>
  );
};

export default ScraperPage;

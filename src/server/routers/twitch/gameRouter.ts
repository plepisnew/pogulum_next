import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { twitchProcedure, router } from "@/server/trpc";
import { getGame } from "./shared";
import { gameInputSchema } from "./schemas";

export const gameRouter = router({
  get: twitchProcedure
    .input(gameInputSchema)
    .mutation(async ({ ctx: { accessToken, prisma }, input }) => {
      const game = await getGame({ accessToken, prisma, ...input });

      if (!game) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Unable to find specified game",
        });
      }

      return game;
    }),
  list: twitchProcedure
    .input(z.string())
    .mutation(async ({ ctx: { prisma }, input: name }) => {
      const games = await prisma.dbTwitchGame.findMany({
        where: { name: { contains: name } },
      });

      return games;
    }),
  getTop: twitchProcedure
    .input(z.number())
    .query(async ({ ctx: { prisma }, input: count }) => {
      const games = await prisma.dbTwitchGame.findMany({
        take: count,
        orderBy: { popularity: "desc" },
      });

      return games;
    }),
});

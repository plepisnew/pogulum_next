import {
  TwitchApiGame,
  TwitchEndpoints,
  didFail,
  unwrapGames,
} from "@/utils/twitch";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { twitchProcedure, router } from "../../trpc";
import { twitchAxios } from "@/utils/twitch";
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
    .mutation(async ({ ctx: { accessToken, prisma }, input: name }) => {
      const games = await prisma.dbTwitchGame.findMany({
        where: { name: { contains: name } },
      });

      return games;
    }),
  getTop: twitchProcedure
    .input(z.number())
    .query(async ({ ctx: { accessToken, prisma }, input: topCount }) => {
      // const response = await twitchAxios<TwitchApiGame>({
      //   endpoint: TwitchEndpoints.TOP_GAMES,
      //   accessToken,
      //   params: { first: topCount },
      // });

      // if (didFail(response)) {
      //   throw new TRPCError({
      //     code: "BAD_REQUEST",
      //     message: response.message,
      //     cause: response.error,
      //   });
      // }

      // return unwrapGames(response).games;

      const games = await prisma.dbTwitchGame.findMany({
        take: topCount,
        orderBy: { popularity: "desc" },
      });

      return games;
    }),
});

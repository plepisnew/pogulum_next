import {
  TwitchApiGame,
  TwitchEndpoints,
  didFail,
  unwrapGames,
} from "@/utils/twitch";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { partialProcedure, router } from "../trpc";
import { twitchAxios } from "@/utils/twitch";

export const getGameByName = async ({
  name,
  accessToken,
}: {
  name: string;
  accessToken: string;
}) => {
  const response = await twitchAxios<TwitchApiGame>({
    endpoint: TwitchEndpoints.GAMES,
    accessToken,
    params: { name },
  });

  if (didFail(response)) {
    const { message, error } = response;
    throw new TRPCError({ code: "BAD_REQUEST", message, cause: error });
  }

  const game = unwrapGames(response).games.at(0);

  if (!game) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Unable to find game with name=${name}`,
    });
  }

  return game;
};

export const gameRouter = router({
  getByName: partialProcedure
    .input(z.string())
    .query(async ({ ctx: { accessToken }, input: name }) => {
      return await getGameByName({ name, accessToken });
    }),
  getById: partialProcedure
    .input(z.string())
    .query(async ({ ctx: { accessToken }, input: id }) => {
      const response = await twitchAxios<TwitchApiGame>({
        endpoint: TwitchEndpoints.GAMES,
        accessToken,
        params: { id },
      });

      if (didFail(response)) {
        const { message, error } = response;
        throw new TRPCError({ code: "BAD_REQUEST", message, cause: error });
      }

      const game = unwrapGames(response).games.at(0);

      if (!game) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Unable to find game with id=${id}`,
        });
      }

      return game;
    }),
  getTop: partialProcedure
    .input(z.number())
    .query(async ({ ctx: { accessToken }, input: topCount }) => {
      const response = await twitchAxios<TwitchApiGame>({
        endpoint: TwitchEndpoints.TOP_GAMES,
        accessToken,
        params: { first: topCount },
      });

      if (didFail(response)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: response.message,
          cause: response.error,
        });
      }

      return unwrapGames(response).games;
    }),
});

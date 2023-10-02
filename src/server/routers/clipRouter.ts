import { z } from "zod";
import { partialProcedure, router } from "../trpc";
import { getUserByLogin } from "./userRouter";
import {
  TwitchApiClip,
  TwitchClip,
  TwitchConstants,
  TwitchEndpoints,
  didFail,
  twitchAxios,
  unwrapClips,
} from "@/utils/twitch";
import { TRPCError } from "@trpc/server";
import { getGameByName } from "./gameRouter";

const cursorSchema = z.object({ cursor: z.string().optional() });

const userInputSchema = z
  .object({ id: z.string() })
  .or(z.object({ login: z.string() }));

const gameInputSchema = z
  .object({ id: z.string() })
  .or(z.object({ name: z.string() }));

const clipInputSchema = z
  .object({ game: z.string().optional() })
  .and(z.object({ user: z.string().optional() }))
  .and(z.object({ clipId: z.string().optional() }));

const clipIdInputSchema = z.object({
  id: z.string(),
});

type CursorInput = z.infer<typeof cursorSchema>;

type AccessTokenInput = { accessToken: string };

type UserInput = z.infer<typeof userInputSchema>;

type GameInput = z.infer<typeof gameInputSchema>;

type ClipIdInput = z.infer<typeof clipIdInputSchema>;

export const getClipsByUser = async ({
  accessToken,
  cursor,
  ...input
}: UserInput & CursorInput & AccessTokenInput) => {
  const userId =
    "id" in input
      ? input.id
      : (await getUserByLogin({ login: input.login, accessToken })).id;

  const response = await twitchAxios<TwitchApiClip>({
    endpoint: TwitchEndpoints.CLIPS,
    accessToken,
    params: { broadcaster_id: userId, after: cursor },
  });

  if (didFail(response)) {
    const { message, error } = response;
    throw new TRPCError({
      code: "BAD_REQUEST",
      message,
      cause: error,
    });
  }

  return unwrapClips(response);
};

export const getClipsByGame = async ({
  accessToken,
  cursor,
  ...input
}: GameInput & CursorInput & AccessTokenInput) => {
  const gameId =
    "id" in input
      ? input.id
      : (await getGameByName({ name: input.name, accessToken })).id;

  const response = await twitchAxios<TwitchApiClip>({
    endpoint: TwitchEndpoints.CLIPS,
    accessToken,
    params: { game_id: gameId, after: cursor },
  });

  if (didFail(response)) {
    const { message, error } = response;
    throw new TRPCError({
      code: "BAD_REQUEST",
      message,
      cause: error,
    });
  }

  return unwrapClips(response);
};

export const getClipsById = async ({
  id,
  accessToken,
}: ClipIdInput & AccessTokenInput) => {
  const response = await twitchAxios<TwitchApiClip>({
    endpoint: TwitchEndpoints.CLIPS,
    accessToken,
    params: { clip_id: id },
  });

  if (didFail(response)) {
    const { message, error } = response;
    throw new TRPCError({
      code: "BAD_REQUEST",
      message,
      cause: error,
    });
  }

  return unwrapClips(response);
};

export const clipRouter = router({
  list: partialProcedure
    .input(clipInputSchema.and(cursorSchema))
    .query(async ({ ctx: { accessToken }, input }) => {
      const clipId = input.clipId;

      if (clipId) {
        return await getClipsById({
          id: clipId,
          accessToken,
        });
      }

      const gameId = Number(input.game)
        ? input.game
        : input.game &&
          (await getGameByName({ name: input.game, accessToken })).id;

      const userId = Number(input.user)
        ? input.user
        : input.user &&
          (await getUserByLogin({ login: input.user, accessToken })).id;

      if (!gameId && !userId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Neither specified game or user exist",
        });
      }

      if (gameId && !userId) {
        return await getClipsByGame({
          id: gameId,
          accessToken,
          cursor: input.cursor,
        });
      }

      if (!gameId && userId) {
        return await getClipsByUser({
          id: userId,
          accessToken,
          cursor: input.cursor,
        });
      }

      const compoundClips: TwitchClip[] = [];
      let cursor: string | undefined;
      let requestCount = 0;

      do {
        const { clips: userClips, cursor: newCursor } = await getClipsByUser({
          accessToken,
          cursor: cursor || input.cursor,
          id: userId!,
        });

        const filteredClips = userClips.filter(
          (clip) => clip.gameId === gameId
        );

        compoundClips.push(...filteredClips);
        requestCount++;
        cursor = newCursor;
      } while (
        compoundClips.length < TwitchConstants.MAX_CLIPS &&
        requestCount < TwitchConstants.MAX_REQUESTS &&
        cursor != undefined
      );

      return { clips: compoundClips, cursor };
    }),
});

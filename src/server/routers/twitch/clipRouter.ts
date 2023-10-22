import { twitchProcedure, router } from "../../trpc";
import { TwitchClip, TwitchConstants } from "@/utils/twitch";
import { TRPCError } from "@trpc/server";
import { clipInputSchema, cursorSchema } from "./schemas";
import {
  getClipsById,
  getClipsByGame,
  getClipsByUser,
  getGame,
  getUser,
} from "./shared";

export const clipRouter = router({
  list: twitchProcedure
    .input(clipInputSchema.and(cursorSchema))
    .query(async ({ ctx: { accessToken, prisma }, input }) => {
      // If Clip ID specified, just use that
      if (input.clipId) {
        return await getClipsById({
          id: input.clipId,
          accessToken,
        });
      }

      // If Game ID specified, use that. If not, find it by name
      const gameId = input.game
        ? Number(input.game)
          ? input.game
          : (await getGame({ accessToken, prisma, name: input.game }))?.twitchId
        : undefined;

      const userId = input.user
        ? Number(input.user)
          ? input.user
          : (await getUser({ accessToken, prisma, login: input.user }))
              ?.twitchId
        : undefined;

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

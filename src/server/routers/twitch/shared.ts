import {
  twitchAxios,
  TwitchApiClip,
  TwitchEndpoints,
  didFail,
  unwrapClips,
  TwitchApiUser,
  unwrapUsers,
  TwitchApiGame,
  unwrapGames,
} from "@/utils/twitch";
import { TRPCError } from "@trpc/server";
import {
  UserInput,
  CursorInput,
  AccessToken,
  GameInput,
  ClipIdInput,
  Prisma,
} from "./schemas";
import { DbTwitchGame, DbTwitchUser, Prisma as _Prisma } from "@prisma/client";
import { LogEvents, log } from "@/logging";

// prettier-ignore
export const getUser = async (
  { prisma, accessToken, popularize = true, ...idOrLogin }: Prisma & AccessToken & UserInput & { popularize?: boolean }
) => {
  // First, check DB
  const dbFilter: _Prisma.DbTwitchUserWhereUniqueInput = "id" in idOrLogin ? { twitchId: idOrLogin.id } : { login: idOrLogin.login };
  const searchParams: Partial<DbTwitchUser> = "id" in idOrLogin ? { id: idOrLogin.id } : { login: idOrLogin.login };

  log(LogEvents.entitySearchInitiated({ entityName: "user", location: "db", data: dbFilter, }));
  const dbUser = await prisma.dbTwitchUser.findUnique({ where: dbFilter });

  // If found, increase its popularity and return it
  if (dbUser) {
    if(popularize) {
      await prisma.dbTwitchUser.update({ where: dbFilter, data: { popularity: dbUser.popularity + 1 }, });
    }

    return dbUser;
  }

  // If not found, check Twitch API
  log(LogEvents.entitySearchInitiated({ entityName: "user", location: "twitch", data: dbFilter, }));
  const response = await twitchAxios<TwitchApiUser>({ endpoint: TwitchEndpoints.USERS, accessToken, params: searchParams, });

  if (didFail(response)) {
    return log(LogEvents.entitySearchFailed({ entityName: "user", data: dbFilter })) as undefined;
  }

  const user = unwrapUsers(response).users.at(0);
  
  if (!user) {
    return log(LogEvents.entitySearchFailed({ entityName: "user", data: dbFilter })) as undefined;
  }

  // If found, persist to database
  const { id: twitchId, ...userWithoutId } = user;
  const createdUser = await prisma.dbTwitchUser.create({ data: { ...userWithoutId, twitchId } })
  
  return createdUser;
};

// prettier-ignore
export const getGame = async (
  { prisma, accessToken, popularize = true, ...idOrName }: Prisma & AccessToken & GameInput & { popularize?: boolean }
) => {
  const dbFilter: _Prisma.DbTwitchGameWhereUniqueInput = "id" in idOrName ? { twitchId: idOrName.id } : { name: idOrName.name };
  const searchParams: Partial<DbTwitchGame> = "id" in idOrName ? { id: idOrName.id } : { name: idOrName.name };
  log(LogEvents.entitySearchInitiated({ entityName: "game", location: "db", data: dbFilter, }));
  const dbGame = await prisma.dbTwitchGame.findUnique({ where: dbFilter });

  // If found, increase its popularity and return it
  if (dbGame) {
    if(popularize) {
      await prisma.dbTwitchGame.update({ where: dbFilter, data: { popularity: dbGame.popularity + 1 }, });
    }

    return dbGame;
  }

  // If not found, check Twitch API
  log(LogEvents.entitySearchInitiated({ entityName: "game", location: "twitch", data: dbFilter, }));
  const response = await twitchAxios<TwitchApiGame>({ endpoint: TwitchEndpoints.GAMES, accessToken, params: searchParams, });

  if (didFail(response)) {
    return log(LogEvents.entitySearchFailed({ entityName: "game", data: dbFilter })) as undefined;
  }

  const game = unwrapGames(response).games.at(0);

  if (!game) {
    return log(LogEvents.entitySearchFailed({ entityName: "game", data: dbFilter })) as undefined;
  }

  // If found, persist to database
  const { id: twitchId, ...gameWithoutId } = game;
  const createdGame = await prisma.dbTwitchGame.create({ data: { ...gameWithoutId, twitchId } })
  
  return createdGame;
};

export const getClipsByUser = async ({
  accessToken,
  cursor,
  id,
}: { id: string } & CursorInput & AccessToken) => {
  const response = await twitchAxios<TwitchApiClip>({
    endpoint: TwitchEndpoints.CLIPS,
    accessToken,
    params: { broadcaster_id: id, after: cursor },
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
  id,
}: { id: string } & CursorInput & AccessToken) => {
  const response = await twitchAxios<TwitchApiClip>({
    endpoint: TwitchEndpoints.CLIPS,
    accessToken,
    params: { game_id: id, after: cursor },
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
}: ClipIdInput & AccessToken) => {
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

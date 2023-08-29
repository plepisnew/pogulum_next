import axios, { AxiosRequestConfig } from "axios";
import { env } from "./env.mjs";

const BASE_URL = "https://api.twitch.tv/helix";

export const TwitchEndpoints = {
  BASE: BASE_URL,
  USERS: `${BASE_URL}/users`,
  GAMES: `${BASE_URL}/games`,
  CLIPS: `${BASE_URL}/clips`,
};

export const TwitchConstants = {
  CLIPS_PER_BATCH: 100,
  MAX_REQUESTS: 10,
  MAX_CLIPS: 50,
};

export type TwitchApiGame = {
  id: string;
  name: string;
  box_art_url: string;
  igdb_id: string;
};

export type TwitchGame = {
  id: string;
  name: string;
  boxArtUrl: string;
  igdbId: string;
};

export type TwitchApiUser = {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  created_at: string;
};

export type TwitchUser = {
  id: string;
  login: string;
  displayName: string;
  type: string;
  broadcasterType: string;
  description: string;
  profileImageUrl: string;
  offlineImageUrl: string;
  viewCount: number;
  createdAt: string;
};

export type TwitchApiClip = {
  id: string;
  url: string;
  embed_url: string;
  broadcaster_id: string;
  broadcaster_name: string;
  creator_id: string;
  creator_name: string;
  video_id: string;
  game_id: string;
  language: string;
  title: string;
  view_count: number;
  created_at: string;
  thumbnail_url: string;
  duration: number;
  vod_offset: number;
};

export type TwitchClip = {
  id: string;
  url: string;
  embedUrl: string;
  broadcasterId: string;
  broadcasterName: string;
  creatorId: string;
  creatorName: string;
  videoId: string;
  gameId: string;
  language: string;
  title: string;
  viewCount: number;
  createdAt: string;
  thumbnailUrl: string;
  duration: number;
  vodOffset: number;
};

export type TwitchApiEntity = TwitchApiGame | TwitchApiUser | TwitchApiClip;

export type TwitchEntity = TwitchGame | TwitchUser | TwitchClip;

export type TwitchResponseSuccess<TEntity extends TwitchApiEntity> = {
  data: TEntity[];
  pagination?: {
    cursor: string;
  };
};

export type TwitchResponseError = {
  error: string;
  status: number;
  message: string;
};

export type TwitchResponse<TEntity extends TwitchApiEntity = TwitchApiEntity> =
  | TwitchResponseError
  | TwitchResponseSuccess<TEntity>;

export const adaptUser = (twitchApiUser: TwitchApiUser): TwitchUser => ({
  id: twitchApiUser.id,
  login: twitchApiUser.login,
  displayName: twitchApiUser.display_name,
  type: twitchApiUser.type,
  broadcasterType: twitchApiUser.broadcaster_type,
  description: twitchApiUser.description,
  profileImageUrl: twitchApiUser.profile_image_url,
  offlineImageUrl: twitchApiUser.offline_image_url,
  viewCount: twitchApiUser.view_count,
  createdAt: twitchApiUser.created_at,
});

export const adaptGame = (twitchApiGame: TwitchApiGame): TwitchGame => ({
  id: twitchApiGame.id,
  name: twitchApiGame.name,
  boxArtUrl: twitchApiGame.box_art_url,
  igdbId: twitchApiGame.igdb_id,
});

export const adaptClip = (twitchApiClip: TwitchApiClip): TwitchClip => ({
  id: twitchApiClip.id,
  url: twitchApiClip.url,
  embedUrl: twitchApiClip.embed_url,
  broadcasterId: twitchApiClip.broadcaster_id,
  broadcasterName: twitchApiClip.broadcaster_name,
  creatorId: twitchApiClip.creator_id,
  creatorName: twitchApiClip.creator_name,
  videoId: twitchApiClip.video_id,
  gameId: twitchApiClip.game_id,
  language: twitchApiClip.language,
  title: twitchApiClip.title,
  viewCount: twitchApiClip.view_count,
  createdAt: twitchApiClip.created_at,
  thumbnailUrl: twitchApiClip.thumbnail_url,
  duration: twitchApiClip.duration,
  vodOffset: twitchApiClip.vod_offset,
});

export const unwrapUsers = ({
  data: twitchUsers,
  pagination,
}: TwitchResponseSuccess<TwitchApiUser>): {
  users: TwitchUser[];
  cursor?: string;
} => ({
  users: twitchUsers.map(adaptUser),
  ...(pagination && { cursor: pagination.cursor }),
});

export const unwrapGames = ({
  data: twitchGames,
  pagination,
}: TwitchResponseSuccess<TwitchApiGame>): {
  games: TwitchGame[];
  cursor?: string;
} => ({
  games: twitchGames.map(adaptGame),
  ...(pagination && { cursor: pagination.cursor }),
});

export const unwrapClips = ({
  data: twitchClips,
  pagination,
}: TwitchResponseSuccess<TwitchApiClip>): {
  clips: TwitchClip[];
  cursor?: string;
} => ({
  clips: twitchClips.map(adaptClip),
  ...(pagination && { cursor: pagination.cursor }),
});

export const didFail = (
  response: TwitchResponse
): response is TwitchResponseError => "error" in response;

export const twitchAxios = async <TEntity extends TwitchApiEntity>({
  endpoint,
  accessToken,
  ...config
}: {
  endpoint: string;
  accessToken: string;
} & AxiosRequestConfig<any>): Promise<TwitchResponse<TEntity>> => {
  const response = await axios.get(endpoint, {
    ...config,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Client-Id": env.CLIENT_ID,
      ...config.headers,
    },
    params: {
      first: TwitchConstants.CLIPS_PER_BATCH,
      ...config.params,
    },
  });

  return response.data;
};

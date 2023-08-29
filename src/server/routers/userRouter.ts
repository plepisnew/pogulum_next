import {
  TwitchApiUser,
  TwitchEndpoints,
  didFail,
  unwrapUsers,
} from "@/utils/twitch";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { partialProcedure, router } from "../trpc";
import { twitchAxios } from "@/utils/twitch";

export const getUserByLogin = async ({
  login,
  accessToken,
}: {
  login: string;
  accessToken: string;
}) => {
  const response = await twitchAxios<TwitchApiUser>({
    endpoint: TwitchEndpoints.USERS,
    accessToken,
    params: { login },
  });

  if (didFail(response)) {
    const { message, error } = response;
    throw new TRPCError({ code: "BAD_REQUEST", message, cause: error });
  }

  const user = unwrapUsers(response).users.at(0);

  if (!user) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Unable to find user with login=${login}`,
    });
  }

  return user;
};

// TODO get by popularity
export const userRouter = router({
  getByLogin: partialProcedure
    .input(z.string())
    .query(async ({ ctx: { accessToken }, input: login }) => {
      return await getUserByLogin({ login, accessToken });
    }),
  getById: partialProcedure
    .input(z.string())
    .query(async ({ ctx: { accessToken }, input: id }) => {
      const response = await twitchAxios<TwitchApiUser>({
        endpoint: TwitchEndpoints.USERS,
        accessToken,
        params: { id },
      });

      if (didFail(response)) {
        const { message, error } = response;
        throw new TRPCError({ code: "BAD_REQUEST", message, cause: error });
      }

      const user = unwrapUsers(response).users.at(0);

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Unable to find user with id=${id}`,
        });
      }

      return user;
    }),
});

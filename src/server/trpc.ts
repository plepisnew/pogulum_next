import { TRPCError, initTRPC, inferAsyncReturnType } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { env } from "@/utils/env.mjs";
import prisma from "@/prisma/instance";
import { getToken } from "./getToken";

export const createContext = async ({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) => ({
  req,
  resHeaders,
  prisma,
});

export type TRPCContext = inferAsyncReturnType<typeof createContext>;

export type TRPCContextProtected = TRPCContext & { accessToken: string };

const t = initTRPC.context<typeof createContext>().create();

const appendAccessTokenMiddleware = t.middleware(async ({ next, ctx }) => {
  return next({
    ctx: {
      ...ctx,
      accessToken: await getToken(),
    },
  });
});

export const router = t.router;

export const middleware = t.middleware;

export const publicProcedure = t.procedure;

export const twitchProcedure = t.procedure.use(appendAccessTokenMiddleware);

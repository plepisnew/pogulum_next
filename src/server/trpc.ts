import { TRPCError, initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { env } from "@/utils/env.mjs";

export const createContext = async ({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) => ({
  req,
  resHeaders,
});

const t = initTRPC.context<typeof createContext>().create();

const authenticationMiddleware = t.middleware(({ next, ctx }) => {
  const cookies = ctx.req.headers.get("cookie")?.split("; ");
  const accessToken = cookies
    ?.map((cookie) => {
      const [name, value] = cookie.split("=");
      return { name, value };
    })
    .find(({ name }) => name === "at")?.value;

  if (accessToken === undefined) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  ctx.resHeaders.append("Authorization", `Bearer ${accessToken}`);

  return next({
    ctx: {
      ...ctx,
      accessToken,
    },
  });
});

const appendPublicTokenMiddleware = t.middleware(({ next, ctx }) => {
  const cookies = ctx.req.headers.get("cookie")?.split("; ");
  const accessToken =
    cookies
      ?.map((cookie) => {
        const [name, value] = cookie.split("=");
        return { name, value };
      })
      .find(({ name }) => name === "at")?.value || env.ACCESS_TOKEN;

  ctx.resHeaders.append("Authorization", `Bearer ${accessToken}`);

  return next({
    ctx: {
      ...ctx,
      accessToken,
    },
  });
});

export const router = t.router;

export const middleware = t.middleware;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(authenticationMiddleware);

export const partialProcedure = t.procedure.use(appendPublicTokenMiddleware);

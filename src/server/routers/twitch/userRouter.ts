import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { twitchProcedure, router } from "../../trpc";
import { getUser } from "./shared";
import { userInputSchema } from "./schemas";

export const userRouter = router({
  get: twitchProcedure
    .input(userInputSchema)
    .mutation(async ({ ctx: { prisma, accessToken }, input }) => {
      const user = await getUser({ prisma, accessToken, ...input });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Unable to find specified user",
        });
      }

      return user;
    }),
  list: twitchProcedure
    .input(z.string())
    .query(async ({ ctx: { accessToken, prisma }, input: login }) => {
      const users = await prisma.dbTwitchUser.findMany({
        where: { login: { contains: login } },
      });

      return users;
    }),
});

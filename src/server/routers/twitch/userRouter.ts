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
    .mutation(async ({ ctx: { prisma }, input: login }) => {
      const users = await prisma.dbTwitchUser.findMany({
        where: { login: { contains: login } },
      });

      return users;
    }),
  getTop: twitchProcedure
    .input(z.number())
    .query(async ({ ctx: { prisma }, input: count }) => {
      const topUsers = await prisma.dbTwitchUser.findMany({
        take: count,
        orderBy: { popularity: "desc" },
      });
      console.log("fetching top users");
      return topUsers;
    }),
});

import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { twitchRouter } from "./routers/twitch";
import { router } from "./trpc";

export const appRouter = router({
  twitch: twitchRouter,
});

export type AppRouter = typeof appRouter;

export type RouterInput = inferRouterInputs<AppRouter>;

export type RouterOutput = inferRouterOutputs<AppRouter>;

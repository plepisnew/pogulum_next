import { twitchRouter } from "./routers/twitch";
import { router } from "./trpc";

export const appRouter = router({
  twitch: twitchRouter,
});

export type AppRouter = typeof appRouter;

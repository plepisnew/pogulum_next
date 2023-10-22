import { router } from "../../trpc";
import { clipRouter } from "./clipRouter";
import { gameRouter } from "./gameRouter";
import { userRouter } from "./userRouter";

export const twitchRouter = router({
  users: userRouter,
  games: gameRouter,
  clips: clipRouter,
});

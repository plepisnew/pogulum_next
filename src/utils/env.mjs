import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    CLIENT_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_CLIENT_ID: z.string(),
    NEXT_PUBLIC_TOKEN_ENDPOINT: z.string(),
    NEXT_PUBLIC_API_ENDPOINT: z.string(),
    NEXT_PUBLIC_GAMES_PATH: z.string(),
    NEXT_PUBLIC_USERS_PATH: z.string(),
    NEXT_PUBLIC_CLIPS_PATH: z.string(),
  },
  runtimeEnv: {
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    NEXT_PUBLIC_CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
    NEXT_PUBLIC_TOKEN_ENDPOINT: process.env.NEXT_PUBLIC_TOKEN_ENDPOINT,
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
    NEXT_PUBLIC_GAMES_PATH: process.env.NEXT_PUBLIC_GAMES_PATH,
    NEXT_PUBLIC_USERS_PATH: process.env.NEXT_PUBLIC_USERS_PATH,
    NEXT_PUBLIC_CLIPS_PATH: process.env.NEXT_PUBLIC_CLIPS_PATH,
  },
});

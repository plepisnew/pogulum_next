import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    CLIENT_ID: z.string(),
    CLIENT_SECRET: z.string(),
    ACCESS_TOKEN: z.string(),
  },
  client: {},
  runtimeEnv: {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  },
});

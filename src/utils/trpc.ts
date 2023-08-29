import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { AppRouter } from "../server/_app";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";

  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  if (process.env.RENDER_INITIAL_HOSTNAME)
    return `http://${process.env.RENDER_INITIAL_HOSTNAME}:${process.env.PORT}`;

  return `http://localhost:${process.env.PORT ?? 3000}`;
};

// TODO make sure to handle loading states in prod
export const trpc = createTRPCNext<AppRouter>({
  config: (options) => ({
    queryClientConfig: {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: process.env.NODE_ENV !== "development",
        },
      },
    },
    links: [
      httpBatchLink({
        url: `${getBaseUrl()}/api/trpc`,
      }),
    ],
  }),
  ssr: false,
});

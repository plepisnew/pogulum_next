import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/_app";
import { createContext } from "@/server/trpc";
import { log } from "next-axiom";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
    onError: ({ error: { code, message, name }, path }) => {
      log.warn(message, { code, path });
    },
  });

export { handler as GET, handler as POST };

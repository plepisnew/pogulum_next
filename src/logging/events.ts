import { LogLevel } from "next-axiom/dist/logger";

export const LogEvents = {
  clientCredentialsInitiated: () => ({
    message: "Obtaining access token from Twitch API",
    level: LogLevel.info,
    data: { flow: "client_credentials" },
  }),
  clientCredentialsCompleted: ({ token }: { token: string }) => ({
    message: "Obtained access token from Twitch API",
    level: LogLevel.info,
    data: { flow: "client_credentials", token },
  }),
  clientCredentialsFailed: ({ err }: { err: unknown }) => ({
    message: "Failed to obtain access token from Twitch API",
    level: LogLevel.info,
    data: { flow: "client_credentials", err },
  }),
  entitySearchInitiated: ({
    entityName,
    location,
    data,
  }: {
    entityName: "user" | "game" | "clip";
    location: "db" | "twitch";
    data?: Record<string, any>;
  }) => ({
    message: `Searching for ${entityName} in ${location}`,
    level: LogLevel.info,
    data,
  }),
  entitySearchFailed: ({
    entityName,
    data,
  }: {
    entityName: "user" | "game" | "clip";
    data?: Record<string, any>;
  }) => ({
    message: `Failed to find ${entityName}`,
    level: LogLevel.warn,
    data,
  }),
};

export type Loggable = ReturnType<(typeof LogEvents)[keyof typeof LogEvents]>;

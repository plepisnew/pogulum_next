import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const cursorSchema = z.object({ cursor: z.string().optional() });

export const userInputSchema = z
  .object({ id: z.string() })
  .or(z.object({ login: z.string() }));

export const gameInputSchema = z
  .object({ id: z.string() })
  .or(z.object({ name: z.string() }));

export const clipInputSchema = z.object({
  clipId: z.string().optional(),
  game: z.string().optional(),
  user: z.string().optional(),
});

export const clipIdInputSchema = z.object({
  id: z.string(),
});

export type CursorInput = z.infer<typeof cursorSchema>;

export type AccessToken = { accessToken: string };

export type Prisma = { prisma: PrismaClient };

export type UserInput = z.infer<typeof userInputSchema>;

export type GameInput = z.infer<typeof gameInputSchema>;

export type ClipIdInput = z.infer<typeof clipIdInputSchema>;

import { LogEvents, log } from "@/logging";
import { env } from "@/utils/env.mjs";
import { revalidatePath } from "next/cache";

export const getToken = async () => {
  log(LogEvents.clientCredentialsInitiated());

  try {
    const authResponse = await fetch(env.NEXT_PUBLIC_TOKEN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: env.CLIENT_SECRET,
        grant_type: "client_credentials",
      }),
      next: { revalidate: 86400 * 7 },
    });
    const authPayload = await authResponse.json();
    const accessToken = authPayload.access_token as string;

    log(LogEvents.clientCredentialsCompleted({ token: accessToken }));
    return accessToken;
  } catch (err) {
    revalidatePath(env.NEXT_PUBLIC_TOKEN_ENDPOINT);
    log(LogEvents.clientCredentialsFailed({ err }));
    return "";
  }
};

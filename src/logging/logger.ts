import { log as axiomLog } from "next-axiom";
import { LogLevel } from "next-axiom/dist/logger";

import { Loggable } from "./events";

export const log = (loggable: Loggable) => {
  if (process.env.NODE_ENV === "development") {
    return console.log(loggable);
  }

  switch (loggable.level) {
    case LogLevel.info:
      return axiomLog.info(loggable.message, loggable.data);
    case LogLevel.warn:
      return axiomLog.warn(loggable.message, loggable.data);
    case LogLevel.error:
      return axiomLog.error(loggable.message, loggable.data);
    default:
      throw new Error("Invalid log level");
  }
};

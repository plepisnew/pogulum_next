export enum TimestampSpecificity {
  SECONDS,
  MINUTES,
  HOURS,
}

export const secondsToTimestamp = (
  _seconds: number,
  specificity = TimestampSpecificity.MINUTES
) => {
  let seconds: number = Math.floor(_seconds);
  let minutes: number;
  let hours: number;

  switch (specificity) {
    case TimestampSpecificity.SECONDS:
      return pad(seconds);
    case TimestampSpecificity.MINUTES:
      minutes = Math.floor(seconds / 60);
      seconds -= minutes * 60;
      return `${pad(minutes)}:${pad(seconds)}`;
    case TimestampSpecificity.HOURS:
      hours = Math.floor(_seconds / 3600);
      seconds -= hours * 3600;
      minutes = Math.floor(seconds / 60);
      seconds -= minutes * 60;
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
};

const pad = (timeUnit: number) => timeUnit.toString().padStart(2, "0");

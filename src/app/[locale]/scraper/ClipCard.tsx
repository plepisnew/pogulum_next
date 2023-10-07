import { secondsToTimestamp } from "@/utils/time";
import { TwitchClip, concreteDimensions } from "@/utils/twitch";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@nextui-org/react";
import Image from "next/image";

export type ClipCardProps = {
  clip: TwitchClip;
};

const width = 240;
const height = width * (9 / 16);

export const ClipCard: React.FC<ClipCardProps> = ({ clip }) => {
  // TODO add favorite feature for logged in users
  // TODO add skeleton

  const { setNodeRef, attributes, listeners, transform } = useDraggable({
    id: clip.id,
  });
  console.log({ transform });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: `translate3d(${transform?.x}, ${transform?.y}, 0)`,
        opacity: transform ? 0.6 : 1,
        zIndex: 50,
      }}
      className="relative dark:border dark:border-primary-boundary rounded-md"
    >
      <span className="bg-primary-dark px-2 py-1 block overflow-x-scroll break-words whitespace-nowrap scrollbar-none rounded-t-md">
        {clip.title}
      </span>
      <a
        href={clip.url}
        target="_blank"
        // className="aspect-video animate-pulse bg-zinc-800"
      >
        <Image
          width={width}
          height={height}
          alt={clip.title}
          className="rounded-b-md"
          src={concreteDimensions({
            url: clip.thumbnailUrl,
            width,
            height,
          })}
        />
      </a>
      <span
        className={cn(
          "absolute bottom-1 right-1 px-1 py-0.5",
          "bg-black/70 rounded-md",
          "text-sm"
        )}
      >
        {secondsToTimestamp(clip.duration)}
      </span>
    </div>
  );
};

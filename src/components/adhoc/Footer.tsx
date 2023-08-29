import { cn } from "@/utils/cn";

export const Footer: React.FC = () => {
  return (
    <footer
      className={cn("from-twitch to-twitch-dark bg-gradient-to-br text-white")}
    >
      <div className="container mx-auto py-8 flex justify-between">
        <div>Powered by twitch</div>
        <div>Links</div>
      </div>
    </footer>
  );
};

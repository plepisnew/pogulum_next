"use client";
import { Button as NextButton } from "@nextui-org/react";
import { Button } from "@/components/ui/Button";

const ClipsPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 w-[300px] bg-twitch p-4 rounded-lg">
          <Button inverse variant="primary">
            Primary Inverse
          </Button>
          <Button inverse variant="secondary">
            Secondary Inverse
          </Button>
          <Button inverse variant="tonal">
            Tonal Inverse
          </Button>
          <Button inverse variant="ghost">
            Ghost Inverse
          </Button>
          <Button inverse variant="text">
            Text Inverse
          </Button>
          <div className="flex flex-col gap-4 bg-twitch-100 p-4 rounded-lg">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tonal">Tonal</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="text">Text</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClipsPage;

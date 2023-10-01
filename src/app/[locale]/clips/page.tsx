"use client";

import { Button } from "@/components/ui/Button";
import { Box } from "@/components/aux/Box";

const ClipsPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 w-[500px]">
        <Box bordered className=" flex flex-col gap-4 p-4 flex-1 rounded-md">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tonal">Tonal</Button>
          <Button variant="quiet">Quiet</Button>
          <Button variant="text">Text</Button>
        </Box>
        <Box filled className="flex flex-col gap-4 p-4 flex-1 rounded-md">
          <Button variant="primary-inverse">Primary Inverse</Button>
          <Button variant="secondary-inverse">Secondary Inverse</Button>
          <Button variant="tonal-inverse">Tonal Inverse</Button>
          <Button variant="quiet-inverse">Quiet Inverse</Button>
          <Button variant="text-inverse">Text Inverse</Button>
        </Box>
      </div>
    </div>
  );
};

export default ClipsPage;

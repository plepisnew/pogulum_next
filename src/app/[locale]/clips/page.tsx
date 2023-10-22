"use client";

import { Button } from "@/components/ui/Button";
import { Box } from "@/components/aux/Box";
import { Input } from "@/components/ui/Input";
import { FaUser } from "react-icons/fa";
import { PageContainer } from "@/components/adhoc/PageLayout";

const ClipsPage: React.FC = () => {
  return (
    <PageContainer>
      <div className="flex flex-col gap-4 h-full">
        <div className="flex gap-4 w-[700px]">
          <Box
            column
            contained
            className="flex flex-col gap-4 p-4 flex-1 rounded-md"
          >
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tonal">Tonal</Button>
            <Button variant="quiet">Quiet</Button>
            <Button variant="text">Text</Button>
          </Box>
          <Box
            column
            contained
            filled
            className="flex flex-col gap-4 p-4 flex-1 rounded-md"
          >
            <Button variant="primary-inverse">Primary Inverse</Button>
            <Button variant="secondary-inverse">Secondary Inverse</Button>
            <Button variant="tonal-inverse">Tonal Inverse</Button>
            <Button variant="quiet-inverse">Quiet Inverse</Button>
            <Button variant="text-inverse">Text Inverse</Button>
          </Box>
        </div>
        <div className="flex gap-4 w-[700px]">
          <Box contained className="flex flex-col gap-4 p-4 flex-1 rounded-md">
            <Input
              isClearable
              startContent={<FaUser />}
              label="Primary"
              placeholder="Example"
              variant="primary"
            />
            <Input
              isClearable
              startContent={<FaUser />}
              label="Secondary"
              placeholder="Example"
              variant="secondary"
            />

            <Input label="Secondary" variant="secondary" />
            <Input label="Primary" variant="primary" />
            <Input
              isClearable
              startContent={<FaUser />}
              errorMessage="Error"
              label="Primary"
              placeholder="Example"
              variant="primary"
            />
            <Input
              isClearable
              startContent={<FaUser />}
              errorMessage="Error"
              label="Secondary"
              placeholder="Example"
              variant="secondary"
            />
            <Input errorMessage="Error" label="Primary" variant="primary" />
            <Input errorMessage="Error" label="Secondary" variant="secondary" />
          </Box>
          <Box filled className="flex flex-col gap-4 p-4 flex-1 rounded-md">
            <Input
              isClearable
              startContent={<FaUser />}
              label="Primary"
              placeholder="Example"
              variant="primary-inverse"
            />
            <Input
              isClearable
              startContent={<FaUser />}
              label="Secondary"
              placeholder="Example"
              variant="secondary-inverse"
            />

            <Input label="Secondary" variant="secondary-inverse" />
            <Input label="Primary" variant="primary-inverse" />
            <Input
              isClearable
              startContent={<FaUser />}
              errorMessage="Error"
              label="Primary"
              placeholder="Example"
              variant="primary-inverse"
            />
            <Input
              isClearable
              startContent={<FaUser />}
              errorMessage="Error"
              label="Secondary"
              placeholder="Example"
              variant="secondary-inverse"
            />
            <Input
              errorMessage="Error"
              label="Primary"
              variant="primary-inverse"
            />
            <Input
              errorMessage="Error"
              label="Secondary"
              variant="secondary-inverse"
            />
          </Box>
        </div>
      </div>
    </PageContainer>
  );
};

export default ClipsPage;

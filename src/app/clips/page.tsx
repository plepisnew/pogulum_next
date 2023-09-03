"use client";

import { TextInput } from "@/components/ui/TextInput";
import { PageTitle } from "@/components/adhoc/PageTitle";
import { FaDollarSign, FaUser, FaVideo } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { useInput } from "@/hooks/useInput";

const ClipsPage: React.FC = () => {
  const { InputField: NormalInputField } = useInput({
    placeholder: "Normal",
    label: "Normal",
  });

  return (
    <div className="flex flex-col gap-4">
      <PageTitle
        highlight="clip"
        helperText="This is where you can see trending streamers, games, clips and view clips that you have saved"
      />
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 w-[300px] bg-twitch p-4 rounded-lg">
          {NormalInputField}
          <TextInput placeholder="Disabled" label="Disabled" disabled />
          <TextInput
            placeholder="4192385912"
            label="Clip ID"
            helperText="Useful text"
            start={<FaVideo />}
          />
          <TextInput
            placeholder="4192385912"
            label="Clip ID"
            helperText="Useful text"
            start={<FaVideo />}
            popoverProps={{ clickable: true }}
          />
          <TextInput
            placeholder="Username"
            label="With start"
            start={<FaUser />}
          />
          <TextInput
            placeholder="Money"
            label="With end"
            end={<FaDollarSign />}
          />
          <TextInput
            placeholder="Money"
            label="With both"
            start={<FaUser />}
            end={<FaDollarSign />}
          />
          <TextInput placeholder="Error" label="Error" error />
        </div>
        <div className="flex flex-col gap-4 w-[300px] bg-twitch p-4 rounded-lg">
          <Button variant="primary" inverse>
            Inverse Primary
          </Button>
          <Button variant="secondary" inverse>
            Inverse Secondary
          </Button>
          <Button variant="tonal" inverse>
            Inverse Tonal
          </Button>
          <Button variant="text" inverse>
            Inverse Text
          </Button>
          <div className="flex flex-col p-4 gap-4 rounded-lg bg-twitch-100">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tonal">Tonal</Button>
            <Button variant="text">Text</Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-[300px] bg-twitch p-4 rounded-lg">
          <Button disabled variant="primary" inverse>
            Inverse Primary
          </Button>
          <Button disabled variant="secondary" inverse>
            Inverse Secondary
          </Button>
          <Button disabled variant="tonal" inverse>
            Inverse Tonal
          </Button>

          <Button disabled variant="text" inverse>
            Inverse Text
          </Button>
          <div className="flex flex-col p-4 gap-4 rounded-lg bg-twitch-100">
            <Button disabled variant="primary">
              Primary
            </Button>
            <Button disabled variant="secondary">
              Secondary
            </Button>
            <Button disabled variant="tonal">
              Tonal
            </Button>
            <Button disabled variant="text">
              Text
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClipsPage;

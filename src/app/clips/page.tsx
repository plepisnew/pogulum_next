import { TextInput } from "@/components/ui/TextInput";
import { PageTitle } from "@/utils/PageTitle";
import { FaDollarSign, FaUser, FaVideo } from "react-icons/fa";

const ClipsPage: React.FC = () => {
  return (
    <div>
      <PageTitle highlight="clip" />
      <div>Clips page</div>
      <div className="flex flex-col gap-4 w-[300px] bg-twitch p-4">
        <TextInput placeholder="Normal" label="Normal" />
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
    </div>
  );
};

export default ClipsPage;

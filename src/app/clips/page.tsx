import { TextInput } from "@/components/ui/TextInput";
import { PageTitle } from "@/utils/PageTitle";

const ClipsPage: React.FC = () => {
  return (
    <div>
      <PageTitle highlight="clip" />
      <div>Clips page</div>
      <div className="flex flex-col gap-4 w-[300px] bg-twitch p-4">
        <TextInput placeholder="Normal" label="Normal" />
        <TextInput placeholder="Focused" label="Focused" />
        <TextInput placeholder="Disabled" label="Disabled" disabled />
        <TextInput
          placeholder="Helper Text"
          label="Helper Text"
          helperText="This is some really informative text!"
        />
      </div>
    </div>
  );
};

export default ClipsPage;

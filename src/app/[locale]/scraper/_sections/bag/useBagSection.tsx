import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { UseSection } from "../Section";

export const useBagSection = (): UseSection => {
  const BagSectionContent = (
    <div>
      <Popover triggerScaleOnOpen={false}>
        <PopoverTrigger>
          {/* <Button>Click me</Button> */}
          <button>Click me</button>
        </PopoverTrigger>
        <PopoverContent>Some content</PopoverContent>
      </Popover>
    </div>
  );

  return [
    {
      Content: BagSectionContent,
      titleKey: "Scraper.bagSection.title",
      span: 1,
    },
  ];
};

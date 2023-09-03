import { RxCross1 } from "react-icons/rx";
import { TextInput, TextInputProps } from "./TextInput";
import {
  ChangeEventHandler,
  MouseEventHandler,
  ReactNode,
  useRef,
  useState,
} from "react";
import { useClickAway } from "@/hooks/useClickAway";
import { cn } from "@/utils/cn";
import _ from "lodash";

export type AutocompleteOption = {
  value: string;
  render?: ReactNode | ((value: string) => ReactNode);
};

export type AutocompleteProps = {
  inputProps?: Omit<TextInputProps, "ref">;
  options: AutocompleteOption[];
  optionsContainerClassName?: string;
  wrapperClassName?: string;
};

export const boldenMatcher = (text: string, matcher: string): ReactNode[] => {
  if (matcher.length === 0) return [text];

  let textLeft = text;
  let matcherIndex: number;
  const Parts: ReactNode[] = [];

  matcherIndex = textLeft.toLowerCase().indexOf(matcher.toLowerCase());

  while (matcherIndex !== -1) {
    const matcherEndIndex = matcherIndex + matcher.length;
    const BoldContent = textLeft.substring(matcherIndex, matcherEndIndex);

    Parts.push(textLeft.substring(0, matcherIndex));
    Parts.push(<span className="font-bold">{BoldContent}</span>);

    textLeft = textLeft.substring(matcherEndIndex, textLeft.length);
    matcherIndex = textLeft.toLowerCase().indexOf(matcher.toLowerCase());
  }

  Parts.push(textLeft);

  return Parts;
};

export const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  inputProps,
  wrapperClassName,
  optionsContainerClassName,
}) => {
  const [value, setValue] = useState("");

  const [optionsOpen, setOptionsOpen] = useState(false);

  const inputContainerRef = useRef<HTMLInputElement>(null);
  const optionsContainerRef = useRef<HTMLDivElement>(null);

  useClickAway({
    handler: () => setOptionsOpen(false),
    refs: [inputContainerRef, optionsContainerRef],
  });

  const handleDeleteInput: MouseEventHandler = () => {
    setValue("");
  };

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value);
  };

  const handleClickInput: MouseEventHandler = () => {
    setOptionsOpen(true);
  };

  const handleSelectOption = (optionValue: string) => {
    setValue(optionValue);
    setOptionsOpen(false);
  };

  const optionFilterer = (option: AutocompleteOption, index: number) => {
    return option.value.toLowerCase().includes(value.toLowerCase());
  };

  const FilteredOptions = options.filter(optionFilterer).map((option) => {
    const OptionContent = option.render
      ? typeof option.render === "function"
        ? option.render(value)
        : option.render
      : option.value;

    return (
      <option
        key={option.value}
        onClick={() => handleSelectOption(option.value)}
        className={cn(
          "h-[50px] p-2",
          "bg-zinc-100 hover:bg-zinc-200 transition-colors cursor-pointer rounded-md",
          "shrink-0"
        )}
      >
        {OptionContent}
      </option>
    );
  });

  const EmptyOption = (
    <option className="bg-zinc-100 p-2 rounded-md">No results found</option>
  );

  return (
    <div className={cn("autocomplete-wrapper", "relative", wrapperClassName)}>
      <div onClick={handleClickInput} ref={inputContainerRef}>
        <TextInput
          value={value}
          onChange={handleChangeInput}
          end={
            <RxCross1 className="cursor-pointer" onClick={handleDeleteInput} />
          }
          containerClassName={cn(optionsOpen && "rounded-b-none border-white")}
          onFocus={undefined}
          {...inputProps}
        />
      </div>
      <div
        ref={optionsContainerRef}
        className={cn(
          "flex flex-col absolute max-h-[500px] ",
          "left-0 right-0 p-1 gap-1",
          "overflow-scroll transition-all origin-top",
          "bg-white text-black rounded-b-md",
          optionsOpen ? "scale-y-100" : "scale-y-0 opacity-0",
          optionsContainerClassName
        )}
      >
        {FilteredOptions.length === 0 ? EmptyOption : FilteredOptions}
      </div>
    </div>
  );
};

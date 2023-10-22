"use client";

import { Input, InputProps } from "@/components/ui/Input";
import { trpc } from "@/utils/trpc";
import { ArrayMap, Setter } from "@/utils/types";
import { cn, popover } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import React, {
  ChangeEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type AutocompleteItem = {
  /**
   *  Compared against by the controlled input value
   */
  value: string;
  /**
   * What is rendered. Can be either a node or a function, which accepts the rendering context for more complex rendering
   */
  Render:
    | ReactNode
    | ((renderContext: {
        value: string;
        setValue: Setter<string>;
      }) => ReactNode);
};

export type EntityAutocompleteProps = {
  /**
   * Items that the autocomplete displays
   */
  items: AutocompleteItem[];
  /**
   * Options for populating the autocomplete items
   */
  /**
   * Displayed when `isLoading` is true (after all autocomplete items). This happens while `getItems` is being invoked
   */
  Loader: ReactNode;

  /**
   * Whether new items are being fetched
   */
  isLoading: boolean;
  /**
   * Invoked when `itemThreshold` is reached
   */
  onChange: (value: string) => void;
  /**
   * Number of milliseconds after input, which should trigger `onReachThreshold`
   */
  debounceMillis: number;
  baseClassName?: string;
  inputContainerClassName?: string;
  popoverClassName?: string;
};

export type UseAutocomplete = (
  options: { inputProps: InputProps } & EntityAutocompleteProps
) => {
  value: string;
  Autocomplete: JSX.Element;
};

export const filterItems = <TItem extends { value: AutocompleteItem["value"] }>(
  items: TItem[],
  value: string
) => {
  return (
    items.filter((item) =>
      item.value.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    ) || _.isEmpty(value)
  );
};

export const useAutocomplete: UseAutocomplete = ({
  inputProps,
  items,
  baseClassName,
  inputContainerClassName,
  popoverClassName,
  Loader,
  debounceMillis,
  isLoading,
  onChange,
}) => {
  const [inputFocused, setInputFocused] = useState(false);
  const [value, setValue] = useState("");

  const filteredItems = filterItems(items, value);
  const shownItems = _.sortBy(filteredItems, (item) => item.value);

  const timeoutIdRef = useRef<NodeJS.Timeout>();

  const handleChangeValue: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const newValue = e.currentTarget.value;
    setValue(newValue);

    clearTimeout(timeoutIdRef.current);

    timeoutIdRef.current = setTimeout(() => onChange(newValue), debounceMillis);
  };

  const inputContainerRef = useRef<HTMLDivElement>(null);

  const InputElement = (
    <Input
      value={value}
      onChange={handleChangeValue}
      {...inputProps}
      onFocus={(e) => setInputFocused(true)}
      onBlur={(e) => setInputFocused(false)}
    />
  );

  const inputHalfHeight = `calc(${
    inputContainerRef.current?.clientHeight || 0
  }px / 2)`;

  const itemRenderer: ArrayMap<AutocompleteItem, ReactNode> = (item, index) => (
    <React.Fragment key={item.value}>
      {typeof item.Render === "function"
        ? item.Render({ value, setValue })
        : item.Render}
    </React.Fragment>
  );

  // TODO make this accessible and fix quick-clicking weird behavior (input immediately loses focus_)
  const Autocomplete = (
    <div className={cn("autocomplete-base", "relative h-max", baseClassName)}>
      <div
        ref={inputContainerRef}
        className={cn(
          "input-container",
          "absolute w-full z-20",
          "bg-primary-dark rounded-xl",
          inputContainerClassName
        )}
      >
        {InputElement}
      </div>
      <div
        style={{
          paddingTop: inputHalfHeight,
          opacity: inputFocused ? 1 : 0,
          transform: inputFocused
            ? `translateY(${inputHalfHeight})`
            : undefined,
        }}
        className={cn(
          "absolute w-full z-10",
          "flex flex-col p-2 gap-2",
          "rounded-xl transition-all overflow-y-scroll scrollbar-hide max-h-80",
          "border-2 border-primary-foreground",
          "dark:border dark:border-primary-boundary",
          "bg-primary-dark/80 text-primary-foreground backdrop-blur-md",
          shownItems.length === 0 && !isLoading && "hidden",
          popoverClassName
        )}
      >
        <div className="h-0" key={0} />
        {shownItems.map(itemRenderer)}
        {isLoading && Loader}
      </div>
    </div>
  );

  return { value, Autocomplete };
};

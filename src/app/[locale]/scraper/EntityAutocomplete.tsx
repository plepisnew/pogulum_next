"use client";

import { Input, InputProps } from "@/components/ui/Input";
import { ArrayMap, Setter } from "@/utils/types";
import { cn } from "@nextui-org/react";
import _ from "lodash";
import React, { ChangeEventHandler, ReactNode, useRef, useState } from "react";
import { filterItems } from "./shared";
import { useClickAway } from "@/hooks/useClickAway";

export type AutocompleteItem = {
  value: string;
  Render:
    | ReactNode
    | ((renderContext: {
        value: string;
        setValue: Setter<string>;
        handleClose: () => void;
      }) => ReactNode);
};

export type EntityAutocompleteProps = {
  items: AutocompleteItem[];
  Loader: ReactNode;
  isLoading: boolean;
  onChange: (value: string) => void;
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
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const filteredItems = filterItems(items, value);
  const shownItems = _.sortBy(filteredItems, (item) => item.value);

  const inputContainerRef = useRef<HTMLDivElement>(null);
  const autocompleteContainerRef = useRef<HTMLDivElement>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout>();
  useClickAway({ refs: [autocompleteContainerRef], handler: handleClose });

  const handleChangeValue: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const newValue = e.currentTarget.value;
    setValue(newValue);

    clearTimeout(timeoutIdRef.current);

    timeoutIdRef.current = setTimeout(() => onChange(newValue), debounceMillis);
  };

  const InputElement = (
    <Input
      value={value}
      onChange={handleChangeValue}
      onFocus={(e) => setOpen(true)}
      {...inputProps}
    />
  );

  const inputHalfHeight = `calc(${
    inputContainerRef.current?.clientHeight || 0
  }px / 2)`;

  const itemRenderer: ArrayMap<AutocompleteItem, ReactNode> = (item, index) => (
    <React.Fragment key={item.value}>
      {typeof item.Render === "function"
        ? item.Render({ value, setValue, handleClose })
        : item.Render}
    </React.Fragment>
  );

  // TODO make this accessible and fix quick-clicking weird behavior (input immediately loses focus_)
  const Autocomplete = (
    <div
      className={cn("autocomplete-base", "relative", baseClassName)}
      ref={autocompleteContainerRef}
    >
      <div
        ref={inputContainerRef}
        className={cn(
          "input-container",
          "w-full",
          "bg-primary-dark rounded-xl",
          inputContainerClassName
        )}
      >
        {InputElement}
      </div>
      <div
        style={{
          paddingTop: inputHalfHeight,
          opacity: open ? 1 : 0,
          top: open ? inputHalfHeight : 0,
        }}
        onBlur={(e) => {
          const currentTarget = e.currentTarget;
          requestAnimationFrame(() => {
            if (!currentTarget.contains(document.activeElement)) {
              handleClose();
            }
          });
        }}
        tabIndex={-1}
        className={cn(
          "absolute w-full -z-10",
          "flex flex-col p-2 gap-2",
          "rounded-xl transition-all overflow-y-scroll scrollbar-hide max-h-80",
          "border-1 border-primary-foreground",
          "dark:border dark:border-primary-boundary",
          "bg-primary-dark/80 text-primary-foreground backdrop-blur-md",
          !open && "pointer-events-none",
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

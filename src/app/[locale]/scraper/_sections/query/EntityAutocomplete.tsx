/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-undef */
"use client";

import { Input, InputProps } from "@/components/ui/Input";
import { ArrayMap } from "@/utils/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollShadow,
  cn,
} from "@nextui-org/react";
import _ from "lodash";
import React, {
  ChangeEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/Button";
import { HiChevronUpDown } from "react-icons/hi2";
import { concreteDimensions } from "@/utils/twitch";
import Image from "next/image";
import { Skeleton } from "@/components/ui/Skeleton";
import { TransKey } from "@/i18n/utils";
import { useTranslations } from "next-intl";

const AutocompleteDefaults = {
  DEBOUNCE_MILLIS: 1000,
  ICON_SIZE: 32,
  ICON_SIZE_INPUT: 26,
};

export type AutocompleteItem = {
  value: string;
  display: string;
  iconSrc: string;
};

export type UseAutocomplete = (options: {
  inputProps: InputProps;
  triggerPlaceholder: TransKey;
  items: AutocompleteItem[];
  isLoading: boolean;
  onChange: (changeContext: { value: string; count: number }) => void;
}) => {
  value: string;
  Autocomplete: JSX.Element;
};

export const useAutocomplete: UseAutocomplete = ({
  inputProps,
  triggerPlaceholder,
  items,
  isLoading,
  onChange,
}) => {
  const filterItems = <TItem extends { value: AutocompleteItem["value"] }>(
    items: TItem[],
    value: string
  ) => {
    return (
      items.filter((item) =>
        item.value.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      ) || _.isEmpty(value)
    );
  };

  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const filteredItems = filterItems(items, value);
  const shownItems = _.sortBy(filteredItems, (item) => item.value);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout>();

  const t = useTranslations();

  const [itemsWidth, setItemsWidth] = useState<number>();

  useEffect(() => {
    const resizeListener = () =>
      setItemsWidth(buttonRef.current!.clientWidth - 20);

    resizeListener();

    window.addEventListener("resize", resizeListener);

    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  const handleChangeValue: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const newValue = e.currentTarget.value;
    setValue(newValue);

    clearTimeout(timeoutIdRef.current);

    timeoutIdRef.current = setTimeout(
      () =>
        onChange({
          value: newValue,
          count: filterItems(items, newValue).length,
        }),
      AutocompleteDefaults.DEBOUNCE_MILLIS
    );
  };

  const handleClose = () => setOpen(false);

  const handleSelectItem = (_value: string) => {
    setValue(_value);
    setOpen(false);
  };

  const itemRenderer: ArrayMap<AutocompleteItem, ReactNode> = ({
    display,
    iconSrc,
    value: game,
  }) => {
    const highlightOccurrence = (options: {
      searchable: string;
      filter: string;
    }): ReactNode[] => {
      const { searchable, filter } = options;

      const nodes: ReactNode[] = [];
      let undesirableWord = "";
      let desirableWord = "";

      for (let i = 0; i < searchable.length; i++) {
        const char = searchable.at(i)!;

        if (
          char.toLowerCase() ===
          filter.charAt(desirableWord.length).toLowerCase()
        ) {
          desirableWord += char;

          if (desirableWord.toLowerCase() === filter.toLowerCase()) {
            nodes.push(undesirableWord);
            nodes.push(
              <span className="font-bold" key={i}>
                {desirableWord}
              </span>
            );
            undesirableWord = "";
            desirableWord = "";
          }
        } else {
          undesirableWord += desirableWord + char;
          desirableWord = "";
        }
      }
      nodes.push(undesirableWord);
      nodes.push(desirableWord);

      return nodes;
    };

    return (
      <div
        tabIndex={0}
        key={game}
        onClick={() => handleSelectItem(game)}
        onKeyDown={(e) => e.key === "Enter" && handleSelectItem(game)}
        className={cn(
          "flex items-center gap-2 p-1 w-full",
          "bg-primary-foreground/5 hover:bg-primary-foreground/10 data-[selected=true]:bg-primary-foreground/20 rounded-md cursor-pointer"
        )}
      >
        <Image
          width={AutocompleteDefaults.ICON_SIZE}
          height={AutocompleteDefaults.ICON_SIZE}
          alt={display}
          src={concreteDimensions({
            url: iconSrc,
            width: AutocompleteDefaults.ICON_SIZE,
            height: AutocompleteDefaults.ICON_SIZE,
          })}
          className="rounded-md bg-primary-foreground/30"
        />
        {/* <Skeleton>
      </Skeleton> */}
        <span className="whitespace-nowrap overflow-x-scroll scrollbar-hide">
          {highlightOccurrence({ searchable: display, filter: value })}
        </span>
      </div>
    );
  };

  const Loader = (
    <div
      className={cn(
        "flex items-center gap-2 p-1",
        "bg-primary-foreground/5 rounded-md"
      )}
    >
      <Skeleton
        width={AutocompleteDefaults.ICON_SIZE}
        height={AutocompleteDefaults.ICON_SIZE}
      />
      <Skeleton className="w-1/2 h-4" />
    </div>
  );

  const selectedItem = items.find((item) => item.value === value);

  // prettier-ignore
  const TriggerDisplay = selectedItem ? 
    <React.Fragment>
      <Image
        alt={value}
        className="rounded-full"
        src={concreteDimensions({
          url: selectedItem.iconSrc,
          width: AutocompleteDefaults.ICON_SIZE_INPUT,
          height: AutocompleteDefaults.ICON_SIZE_INPUT,
        })}
        width={AutocompleteDefaults.ICON_SIZE_INPUT}
        height={AutocompleteDefaults.ICON_SIZE_INPUT}
      />
      {selectedItem.display}
    </React.Fragment>
  : value ? value
  : t(triggerPlaceholder);

  const Autocomplete = (
    <Popover
      placement="bottom"
      isOpen={open}
      onOpenChange={setOpen}
      onClose={handleClose}
      triggerScaleOnOpen={false}
    >
      <PopoverTrigger>
        <Button
          role="combobox"
          variant="tonal-inverse"
          className="px-3 justify-start"
          ref={buttonRef}
        >
          {TriggerDisplay} <HiChevronUpDown className="ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "justify-start p-2 gap-1",
          "bg-primary-darker text-primary-foreground",
          "dark:border dark:border-primary-boundary"
        )}
      >
        <Input
          value={value}
          onChange={handleChangeValue}
          variant="secondary-inverse"
          className="rounded-md"
          classNames={{ inputWrapper: "rounded-md" }}
          {...inputProps}
        />
        <ScrollShadow
          className="max-h-[300px] w-full flex flex-col gap-1"
          hideScrollBar
          size={10}
          style={{ width: itemsWidth }}
        >
          {shownItems.map(itemRenderer)}
          {isLoading && Loader}
        </ScrollShadow>
      </PopoverContent>
    </Popover>
  );

  return { value, Autocomplete };
};

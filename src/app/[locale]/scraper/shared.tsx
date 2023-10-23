/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-undef */

import Image from "next/image";
import { KeyboardEventHandler, MouseEventHandler, ReactNode } from "react";
import {
  AutocompleteItem,
  EntityAutocompleteProps,
} from "./EntityAutocomplete";
import { concreteDimensions } from "@/utils/twitch";
import { cn } from "@nextui-org/react";
import _ from "lodash";

export const autocompleteIconSize = 32;

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

export type GetAutocompleteItemRenderer = (renderable: {
  label: string;
  imageSrc: string;
}) => Exclude<EntityAutocompleteProps["items"][number]["Render"], ReactNode>;

export const getAutocompleteItemRenderer: GetAutocompleteItemRenderer =
  ({ imageSrc, label }) =>
  ({ value, setValue, handleClose }) => {
    const handleSelectItem: MouseEventHandler = (e) => {
      setValue(label);
      handleClose();
    };

    const handleSelectItemKeyboard: KeyboardEventHandler = (e) => {
      if (e.key === "Enter") {
        setValue(label);
        handleClose();
      }
    };

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
        key={label}
        className={cn(
          "flex items-center gap-2 p-1",
          "bg-primary-foreground/5 hover:bg-primary-foreground/10 data-[selected=true]:bg-primary-foreground/20 rounded-md cursor-pointer"
        )}
        tabIndex={0}
        onClick={handleSelectItem}
        onKeyDown={handleSelectItemKeyboard}
        data-selected={value === label}
      >
        <Image
          width={autocompleteIconSize}
          height={autocompleteIconSize}
          alt={label}
          src={concreteDimensions({
            url: imageSrc,
            width: autocompleteIconSize,
            height: autocompleteIconSize,
          })}
          className="rounded-md bg-primary-foreground/30"
        />
        {/* <Skeleton>
      </Skeleton> */}
        <span className="whitespace-nowrap overflow-x-scroll scrollbar-hide">
          {highlightOccurrence({ searchable: label, filter: value })}
        </span>
      </div>
    );
  };

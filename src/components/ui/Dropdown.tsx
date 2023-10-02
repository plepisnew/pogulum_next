import React, { PropsWithChildren, ReactNode } from "react";
import {
  Dropdown as NextUIDropdown,
  DropdownMenu as NextUIDropdownMenu,
  DropdownTrigger as NextUIDropdownTrigger,
  DropdownItem as NextUIDropdownItem,
  DropdownItemProps as NextUIDropdownItemProps,
  DropdownProps as NextUIDropdownProps,
} from "@nextui-org/react";
import { cn } from "@/lib/utils";

export type DropdownProps = {
  items: {
    value: string;
    render: ReactNode;
    props?: Partial<NextUIDropdownItemProps>;
  }[];
  value?: string;
} & Omit<NextUIDropdownProps, "children"> &
  PropsWithChildren;

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  children,
  value,
  classNames,
  ...props
}) => {
  return (
    <NextUIDropdown
      onSelect={(e) => console.log(e)}
      classNames={{
        base: "bg-primary text-primary-foreground border border-primary-darker",
        ...classNames,
      }}
      {...props}
    >
      <NextUIDropdownTrigger>{children}</NextUIDropdownTrigger>
      <NextUIDropdownMenu
        itemClasses={{
          selectedIcon: "hidden",
        }}
        className="flex flex-col gap-1.5 p-0.5"
        selectionMode="single"
        selectedKeys={value && [value]}
      >
        {items.map((item) => (
          <NextUIDropdownItem
            key={item.value}
            className={cn(
              "data-[hover=true]:bg-primary-foreground/15 data-[hover=true]:text-primary-foreground",
              "data-[focus=true]:bg-primary-foreground/15 data-[focus=true]:text-primary-foreground",
              "data-[selected=true]:bg-primary-foreground/20",
              item.props?.className
            )}
            {...item.props}
          >
            {item.render}
          </NextUIDropdownItem>
        ))}
      </NextUIDropdownMenu>
    </NextUIDropdown>
  );
};

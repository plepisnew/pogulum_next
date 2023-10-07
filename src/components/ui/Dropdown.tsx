import React, { PropsWithChildren, ReactNode } from "react";
import {
  Dropdown as NextUIDropdown,
  DropdownMenu as NextUIDropdownMenu,
  DropdownTrigger as NextUIDropdownTrigger,
  DropdownItem as NextUIDropdownItem,
  DropdownItemProps as NextUIDropdownItemProps,
  DropdownProps as NextUIDropdownProps,
  cn,
} from "@nextui-org/react";

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
      classNames={{
        base: "bg-primary-dark text-primary-foreground border border-primary-foreground dark:border-primary-boundary",
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
              "data-[hover=true]:bg-primary-foreground/5 data-[hover=true]:text-primary-foreground",
              "data-[focus=true]:bg-primary-foreground/5 data-[focus=true]:text-primary-foreground",
              "data-[selected=true]:!bg-primary-foreground/10",
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

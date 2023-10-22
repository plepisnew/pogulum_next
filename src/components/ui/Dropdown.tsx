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
        // backdrop: "bg-red-500",
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
            {...item.props}
            className={cn(
              "data-[selectable=true]:focus:bg-primary-foreground/10 data-[selectable=true]:focus:text-primary-foreground data-[hover=true]:bg-primary-foreground/10 data-[hover=true]:text-primary-foreground data-[selected=true]:bg-primary-foreground/15 data-[selected=true]:focus:bg-primary-foreground/15",
              item.props?.className
            )}
          >
            {item.render}
          </NextUIDropdownItem>
        ))}
      </NextUIDropdownMenu>
    </NextUIDropdown>
  );
};

export {
  NextUIDropdownMenu as DropdownMenu,
  NextUIDropdownTrigger as DropdownTrigger,
  NextUIDropdownItem as DropdownItem,
};

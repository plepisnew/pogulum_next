import React, { CSSProperties, PropsWithChildren, ReactNode } from "react";
import {
  Dropdown as NextUIDropdown,
  DropdownProps as NextUIDropdownProps,
  DropdownItem as NextUIDropdownItem,
  DropdownItemProps as NextUIDropdownItemProps,
  DropdownTrigger as NextUIDropdownTrigger,
  DropdownMenu as NextUIDropdownMenu,
  DropdownMenuProps as NextUIDropdownMenuProps,
  cn,
} from "@nextui-org/react";

export type DropdownProps = {
  items: {
    value: string;
    Render: ReactNode;
    props?: Partial<NextUIDropdownItemProps>;
  }[];
  value?: string;
  width?: CSSProperties["width"];
} & Omit<NextUIDropdownProps, "children"> &
  PropsWithChildren;

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  children,
  value,
  width,
  classNames,
  ...props
}) => {
  return (
    <NextUIDropdown
      classNames={{
        base: "bg-primary-darker text-primary-foreground dark:border dark:border-primary-boundary",
        ...classNames,
      }}
      triggerScaleOnOpen={false}
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
            {item.Render}
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
export type {
  NextUIDropdownItemProps as DropdownItemProps,
  NextUIDropdownMenuProps as DropdownMenuProps,
};

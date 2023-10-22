import { Input, InputProps } from "@/components/ui/Input";
import { Setter } from "@/utils/types";
import React, { ChangeEventHandler, ReactNode, useState } from "react";

export type UseInput = (props: InputProps) => {
  Input: JSX.Element;
  value: string;
  setValue: Setter<string>;
};

export const useInput: UseInput = (props) => {
  const [value, setValue] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value);
  };

  const isClearable = "isClearable" in props && props.isClearable;

  const clearableProps: Partial<InputProps> = isClearable
    ? {
        isClearable: true,
        onClear: () => setValue(""),
      }
    : {
        endContent: props.endContent,
      };

  const InputElement = (
    <Input
      value={value}
      onChange={handleChange}
      {...clearableProps}
      {...props}
    />
  );

  return { Input: InputElement, value, setValue };
};

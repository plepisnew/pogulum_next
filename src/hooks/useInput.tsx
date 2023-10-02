import { Input, InputProps } from "@/components/ui/Input";
import { Setter } from "@/utils/types";
import React, { ChangeEventHandler, useState } from "react";

export type UseInput = (props: InputProps) => {
  Input: JSX.Element;
  value: string;
  setValue: Setter<string>;
};

export const useInput: UseInput = (inputProps) => {
  const [value, setValue] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value);
  };

  const InputElement = (
    <Input
      value={value}
      onChange={handleChange}
      onClear={() => setValue("")}
      {...inputProps}
    />
  );

  return { Input: InputElement, value, setValue };
};

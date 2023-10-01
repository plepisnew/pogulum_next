import { Input, InputProps } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Setter } from "@/utils/types";
import React, { ChangeEventHandler, useState } from "react";

export type UseInput = (
  props: InputProps,
  formProps?:
    | {
        id: string;
        label: string;
      }
    | {}
) => {
  Input: JSX.Element;
  value: string;
  setValue: Setter<string>;
};

export const useInput: UseInput = (inputProps, formProps = {}) => {
  const [value, setValue] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value);
  };

  const hasId = "id" in formProps;

  const InputElement = hasId ? (
    <React.Fragment>
      <Label htmlFor={formProps.id}>{formProps.label}</Label>
      <Input
        id={formProps.id}
        value={value}
        onChange={handleChange}
        {...inputProps}
      />
    </React.Fragment>
  ) : (
    <Input value={value} onChange={handleChange} {...inputProps} />
  );

  return { Input: InputElement, value, setValue };
};

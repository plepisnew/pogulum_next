import { TextInput, TextInputProps } from "@/components/ui/TextInput";
import { ChangeEventHandler, useState } from "react";

export type UseInput = (props?: Omit<TextInputProps, "ref">) => {
  value: string;
  InputField: JSX.Element;
};

export const useInput: UseInput = (props) => {
  const [value, setValue] = useState("");

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value);
  };

  const InputField = (
    <TextInput value={value} onChange={handleChangeInput} {...props} />
  );

  return { value, InputField };
};

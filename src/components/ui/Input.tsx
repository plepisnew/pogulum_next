import * as React from "react";

import {
  Input as NextInput,
  InputProps as NextInputProps,
} from "@nextui-org/input";
import { cn } from "@/lib/utils";

export type InputProps = {} & NextInputProps;

export const Input: React.FC<InputProps> = (props) => {
  return <NextInput {...props} />;
};

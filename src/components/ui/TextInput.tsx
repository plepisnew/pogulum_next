"use client";

import { FaInfoCircle } from "react-icons/fa";
import { cn } from "@/utils/cn";
import {
  DetailedHTMLProps,
  FocusEventHandler,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  KeyboardEventHandler,
  ReactNode,
  forwardRef,
  useMemo,
  useState,
} from "react";
import { Popover, PopoverProps } from "./Popover";

export type TextInputProps = {
  label?: string;
  helperText?: string;
  start?: ReactNode;
  end?: ReactNode;
  popoverProps?: Omit<Partial<PopoverProps>, "ref">;
  wrapperClassName?: string;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  startClassName?: string;
  endClassName?: string;
  error?: boolean;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const ReflessTextInput: ForwardRefRenderFunction<
  HTMLInputElement,
  TextInputProps
> = (
  {
    label,
    id,
    helperText,
    start,
    end,
    disabled,
    wrapperClassName,
    popoverProps,
    inputClassName,
    labelClassName,
    containerClassName,
    startClassName,
    endClassName,
    error,
    ...props
  },
  ref
) => {
  const [focused, setFocused] = useState(false);

  const handleBlur: FocusEventHandler<HTMLInputElement> = () => {
    setFocused(false);
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(!focused);
  };

  return (
    <div className={cn("input-wrapper", "text-white", wrapperClassName)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "input-label",
            "mb-1 inline-flex items-center gap-[5px]",
            labelClassName
          )}
        >
          {label}
          {helperText && (
            <Popover
              origin="top"
              align="center"
              offset="8px"
              render={
                <div
                  className={cn(
                    "bg-black/50 backdrop-blur-md rounded-md px-2 py-1 w-60"
                  )}
                >
                  {helperText}
                </div>
              }
              {...popoverProps}
            >
              <FaInfoCircle className="cursor-pointer" />
            </Popover>
          )}
        </label>
      )}
      <div
        className={cn(
          "input-container",
          "group flex items-center py-2",
          "border border-zinc-400 rounded-md shadow-md",
          "hover:border-zinc-200 transition-all",
          focused &&
            "outline-1 outline outline-white outline-offset-2 border-white",
          error &&
            "border-red-800 outline-red-800 hover:border-red-600  hover:outline-red-600",
          containerClassName
        )}
      >
        {start && (
          <div
            className={cn(
              "input-start",
              focused
                ? "text-white"
                : "text-zinc-400 group-hover:text-zinc-200 ",
              "ml-2 transition-colors",
              startClassName
            )}
          >
            {start}
          </div>
        )}
        <input
          id={id}
          disabled={disabled}
          className={cn(
            "input",
            "bg-transparent outline-none grow px-2",
            !disabled && "hover:border-white",
            "disabled:cursor-no-drop",
            inputClassName
          )}
          size={1}
          onBlur={handleBlur}
          onFocus={handleFocus}
          ref={ref}
          {...props}
        />
        {end && (
          <div
            className={cn(
              "input-end",
              focused
                ? "text-white"
                : "text-zinc-400 group-hover:text-zinc-200 ",
              "mr-2 transition-colors",
              endClassName
            )}
          >
            {end}
          </div>
        )}
      </div>
    </div>
  );
};

export const TextInput = forwardRef(ReflessTextInput);

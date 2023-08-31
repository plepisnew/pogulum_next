"use client";
import { FaInfoCircle } from "react-icons/fa";
import { cn } from "@/utils/cn";
import {
  DetailedHTMLProps,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useMemo,
} from "react";
import { Popover } from "./Popover";

export type TextInputProps = {
  label?: string;
  helperText?: string;
  forceControls?: {
    hover?: boolean;
    focus?: boolean;
  };
  start?: ReactNode;
  end?: ReactNode;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const defaultForceControls: TextInputProps["forceControls"] = {
  hover: false,
  focus: false,
};

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
    forceControls = defaultForceControls,
    ...props
  },
  ref
) => {
  const elementId = useMemo(() => id || crypto.randomUUID(), [id]);

  // TODO adornments
  // TODO help
  // TODO error

  const hoverClasses = {
    border: "border-zinc-200",
  };

  const focusClasses = {
    outlineWidth: "outline-1",
    outlineColor: "outline-white",
    outlineOffset: "outline-offset-1",
    outlineStyle: "outline-double",
    borderColor: "border-white",
  };

  const disabledClasses = {
    cursor: "cursor-no-drop",
  };

  return (
    <div className={cn("input-wrapper", "text-white ")}>
      {label && (
        <label
          htmlFor={elementId}
          className={cn("input-label", "mb-1 inline-flex items-stretch gap-1")}
        >
          {label}
          {helperText && (
            <Popover
              render={<div className="bg-black h-10 rounded-md p-2">test</div>}
            >
              <FaInfoCircle className="inline cursor-pointer" />
            </Popover>
          )}
        </label>
      )}
      <input
        id={elementId}
        className={cn(
          "input",
          "px-2 py-1",
          "bg-transparent border border-zinc-400 rounded-md shadow-md",
          forceControls.hover
            ? `${hoverClasses.border}`
            : `hover:${hoverClasses.border}`,
          "outline-none transition-all",
          forceControls.focus
            ? `${focusClasses.outlineWidth} ${focusClasses.outlineColor} ${focusClasses.outlineOffset} ${focusClasses.borderColor} ${focusClasses.outlineStyle}`
            : `focus-visible:${focusClasses.outlineWidth} focus-visible:${focusClasses.outlineColor} focus-visible:${focusClasses.outlineOffset} focus-visible:${focusClasses.borderColor} focus-visible:${focusClasses.outlineStyle}`,
          `disabled:${disabledClasses.cursor}`
        )}
        ref={ref}
        onKeyDown={(e) => {
          console.log(e);
        }}
        {...props}
      />
    </div>
  );
};

export const TextInput = forwardRef(ReflessTextInput);

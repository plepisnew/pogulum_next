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

export type TextInputProps = {
  label?: string;
  helperText?: string;
  forceControls?: {
    hover?: true;
    focus?: true;
    active?: true;
  };
  start?: ReactNode;
  end?: ReactNode;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const ReflessTextInput: ForwardRefRenderFunction<
  HTMLInputElement,
  TextInputProps
> = ({ label, id, helperText, start, end, ...props }, ref) => {
  const elementId = useMemo(() => id || crypto.randomUUID(), [id]);

  // TODO adornments
  // TODO help
  // TODO error

  return (
    <div className={cn("input-wrapper", "text-white ")}>
      {label && (
        <label
          htmlFor={elementId}
          className={cn("input-label", "mb-1 inline-flex items-center gap-1")}
        >
          {label}
          {helperText && <FaInfoCircle className="inline cursor-pointer" />}
        </label>
      )}
      <input
        id={elementId}
        className={cn(
          "input",
          "px-2 py-1",
          "bg-transparent border border-zinc-400 rounded-md shadow-md",
          "hover:border-zinc-200",
          "focus-visible:outline-none focus-visible:outline-1 focus-visible:outline-white focus-visible:outline-offset-1 outline-transparent focus-visible:border-white",
          "transition-all",
          "disabled:cursor-no-drop"
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

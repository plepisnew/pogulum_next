import {
  Tooltip as NextUITooltip,
  TooltipProps as NextUITooltipProps,
  cn,
} from "@nextui-org/react";

export type TooltipProps = {
  variant?: "normal" | "inverse" | "blurred";
} & NextUITooltipProps;

const variantClassNames: Record<
  NonNullable<TooltipProps["variant"]>,
  string
> = {
  normal: "bg-primary text-primary-foreground",
  inverse: "bg-foreground text-primary-dark",
  blurred: "bg-black/40 backdrop-blur-md text-white",
};

export const Tooltip: React.FC<TooltipProps> = ({
  className,
  variant = "normal",
  ...props
}) => (
  <NextUITooltip
    delay={0}
    closeDelay={0}
    className={cn("w-48", variantClassNames[variant], className)}
    
    classNames={{
      base: "backdrop-blur-md bg-black/40 text-white",
    }}
    {...props}
  />
);

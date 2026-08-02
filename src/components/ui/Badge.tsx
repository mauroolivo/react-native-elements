import { View, type ViewProps } from "react-native";

import { cn } from "../../lib/cn";
import { Text } from "./Text";

const variantClasses = {
  neutral: "border-border bg-secondary",
  primary: "border-primary bg-primary",
  info: "border-info bg-info",
  success: "border-success bg-success",
  warning: "border-warning bg-warning",
  danger: "border-danger bg-danger",
} as const;

const labelTone = {
  neutral: "secondary",
  primary: "inverse",
  info: "infoForeground",
  success: "successForeground",
  warning: "warningForeground",
  danger: "dangerForeground",
} as const;

const sizeClasses = {
  sm: "px-sm py-xxs",
  md: "px-md py-xs",
} as const;

type BadgeVariant = keyof typeof variantClasses;
type BadgeSize = keyof typeof sizeClasses;

type BadgeProps = ViewProps & {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  textClassName?: string;
};

export function Badge({
  label,
  variant = "neutral",
  size = "sm",
  className,
  textClassName,
  ...props
}: BadgeProps) {
  return (
    <View
      className={cn(
        "self-start rounded-pill border",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      <Text
        variant="labelSm"
        tone={labelTone[variant]}
        className={cn("font-semibold", textClassName)}
      >
        {label}
      </Text>
    </View>
  );
}

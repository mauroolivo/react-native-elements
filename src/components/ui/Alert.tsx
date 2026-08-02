import { type ReactNode } from "react";
import { View, type ViewProps } from "react-native";

import { cn } from "../../lib/cn";
import { Text } from "./Text";

const variantClasses = {
  info: "border-info bg-info/10",
  success: "border-success bg-success/10",
  warning: "border-warning bg-warning/10",
  danger: "border-danger bg-danger/10",
} as const;

const titleTones = {
  info: "info",
  success: "success",
  warning: "warning",
  danger: "danger",
} as const;

type AlertVariant = keyof typeof variantClasses;

type AlertProps = ViewProps & {
  title: string;
  description?: string;
  variant?: AlertVariant;
  action?: ReactNode;
  className?: string;
};

export function Alert({
  title,
  description,
  variant = "info",
  action,
  className,
  ...props
}: AlertProps) {
  return (
    <View
      accessibilityRole="alert"
      className={cn(
        "rounded-card border px-lg py-md",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      <View className="gap-xs">
        <Text variant="titleMd" tone={titleTones[variant]}>
          {title}
        </Text>
        {description ? (
          <Text variant="bodyMd" tone="default">
            {description}
          </Text>
        ) : null}
        {action ? <View className="pt-xs">{action}</View> : null}
      </View>
    </View>
  );
}

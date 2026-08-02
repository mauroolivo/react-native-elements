import { type ReactNode } from "react";
import { View, type ViewProps } from "react-native";

import { cn } from "../../lib/cn";
import { Text } from "./Text";

type FieldProps = ViewProps & {
  label?: string;
  hint?: string;
  error?: string;
  trailing?: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function Field({
  label,
  hint,
  error,
  trailing,
  className,
  contentClassName,
  children,
  ...props
}: FieldProps) {
  return (
    <View className={cn("gap-xs", className)} {...props}>
      {label || trailing ? (
        <View className="flex-row items-center justify-between gap-sm">
          {label ? (
            <Text variant="labelMd" tone="muted">
              {label}
            </Text>
          ) : (
            <View />
          )}
          {trailing ? <View>{trailing}</View> : null}
        </View>
      ) : null}

      {children ? (
        <View className={cn(contentClassName)}>{children}</View>
      ) : null}

      {error ? (
        <Text variant="footnote" tone="danger" accessibilityRole="alert">
          {error}
        </Text>
      ) : null}

      {hint ? (
        <Text variant="footnote" tone="muted">
          {hint}
        </Text>
      ) : null}
    </View>
  );
}

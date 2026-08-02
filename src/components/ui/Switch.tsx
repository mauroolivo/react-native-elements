import {
    Switch as RNSwitch,
    type SwitchProps as RNSwitchProps,
    type ViewProps,
} from "react-native";

import { cn } from "../../lib/cn";
import { useTheme } from "../../theme/ThemeProvider";
import { Field } from "./Field";

type SwitchProps = Omit<RNSwitchProps, "value" | "onValueChange"> &
  ViewProps & {
    value: boolean;
    onValueChange: (value: boolean) => void;
    label?: string;
    hint?: string;
    error?: string;
    className?: string;
  };

export function Switch({
  value,
  onValueChange,
  label,
  hint,
  error,
  disabled,
  className,
  ...props
}: SwitchProps) {
  const { colors } = useTheme();

  return (
    <Field
      label={label}
      hint={hint}
      error={error}
      className={cn("gap-xs", className)}
      trailing={
        <RNSwitch
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          ios_backgroundColor={colors.disabled}
          trackColor={{ false: colors.disabled, true: colors.primary }}
          thumbColor={value ? colors.primaryForeground : colors.surface}
          {...props}
        />
      }
    />
  );
}

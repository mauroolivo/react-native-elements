import { useState } from "react";
import { TextInput, type TextInputProps } from "react-native";

import { cn } from "../../lib/cn";
import { useTheme } from "../../theme/ThemeProvider";
import { Field } from "./Field";

type InputProps = TextInputProps & {
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
  containerClassName?: string;
};

export function Input({
  label,
  hint,
  error,
  className,
  containerClassName,
  onFocus,
  onBlur,
  editable = true,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const { colors } = useTheme();
  const placeholderTextColor = colors.textMuted;

  return (
    <Field
      label={label}
      hint={hint}
      error={error}
      className={containerClassName}
    >
      <TextInput
        accessibilityLabel={label}
        editable={editable}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        placeholderTextColor={placeholderTextColor}
        className={cn(
          "min-h-12 rounded-control border bg-surface px-lg py-sm text-text",
          isFocused ? "border-focus" : "border-border",
          !editable && "opacity-50",
          className,
        )}
        {...props}
      />
    </Field>
  );
}

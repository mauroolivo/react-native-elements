import { View, type ViewProps } from "react-native";

import { cn } from "../../lib/cn";
import { useTheme } from "../../theme/ThemeProvider";
import { getShadowStyle, type ShadowToken } from "../../theme/shadows";

type CardProps = ViewProps & {
  className?: string;
  shadow?: ShadowToken;
};

export function Card({
  className,
  shadow = "card",
  style,
  ...props
}: CardProps) {
  const { scheme } = useTheme();

  return (
    <View
      className={cn(
        "rounded-card border border-border bg-surface p-lg",
        className,
      )}
      style={[getShadowStyle(shadow, scheme), style]}
      {...props}
    />
  );
}

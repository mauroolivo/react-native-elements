import { View, type ViewProps } from "react-native";

import { cn } from "../../lib/cn";

type DividerProps = ViewProps & {
  orientation?: "horizontal" | "vertical";
  className?: string;
};

export function Divider({
  orientation = "horizontal",
  className,
  ...props
}: DividerProps) {
  return (
    <View
      accessibilityRole="separator"
      className={cn(
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        "bg-border",
        className,
      )}
      {...props}
    />
  );
}

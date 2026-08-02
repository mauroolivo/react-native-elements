import { View, type ViewProps } from "react-native";

import { cn } from "../../lib/cn";

type CardProps = ViewProps & {
  className?: string;
};

export function Card({ className, ...props }: CardProps) {
  return (
    <View
      className={cn(
        "rounded-card border border-border bg-surface p-lg shadow-card",
        className,
      )}
      {...props}
    />
  );
}

import { View, type ViewProps, type ViewStyle } from "react-native";

import { cn } from "../../lib/cn";

type SkeletonProps = ViewProps & {
  width?: ViewStyle["width"];
  height?: number;
  className?: string;
};

export function Skeleton({
  width,
  height,
  className,
  style,
  ...props
}: SkeletonProps) {
  return (
    <View
      accessibilityRole="progressbar"
      className={cn("animate-pulse rounded-control bg-secondary/70", className)}
      style={[
        width != null ? { width } : null,
        height != null ? { height } : null,
        style,
      ]}
      {...props}
    />
  );
}

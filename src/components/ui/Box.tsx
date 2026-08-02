import { View, type ViewProps } from "react-native";

import { cn } from "../../lib/cn";

type BoxProps = ViewProps & {
  className?: string;
};

export function Box({ className, ...props }: BoxProps) {
  return <View className={cn(className)} {...props} />;
}

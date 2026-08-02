import { View, type ViewProps } from "react-native";

import { cn } from "../../lib/cn";

type HStackProps = ViewProps & {
  className?: string;
};

export function HStack({ className, ...props }: HStackProps) {
  return (
    <View className={cn("flex flex-row items-center", className)} {...props} />
  );
}

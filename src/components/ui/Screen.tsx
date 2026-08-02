import {
    SafeAreaView,
    type SafeAreaViewProps,
} from "react-native-safe-area-context";

import { cn } from "../../lib/cn";

type ScreenProps = SafeAreaViewProps & {
  className?: string;
};

export function Screen({ className, ...props }: ScreenProps) {
  return (
    <SafeAreaView
      className={cn("flex-1 bg-background", className)}
      {...props}
    />
  );
}

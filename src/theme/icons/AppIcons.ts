import { SymbolView } from "expo-symbols";
import type { ComponentProps } from "react";

type AppSymbolName = ComponentProps<typeof SymbolView>["name"];

export const appIcons = {
  person: {
    ios: "person.crop.circle",
    android: "person",
    web: "person",
  },
} satisfies Record<string, AppSymbolName>;

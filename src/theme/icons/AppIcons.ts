import { SymbolView } from "expo-symbols";
import type { ComponentProps } from "react";

export type AppSymbolName = ComponentProps<typeof SymbolView>["name"];

export const appIcons = {
  person: {
    ios: "person.crop.circle",
    android: "person",
    web: "person",
  },
} satisfies Record<string, AppSymbolName>;

export const buttonShowcaseIcons = {
  favorite: {
    ios: "star.fill",
    android: "star",
    web: "star",
  },
  disclosure: {
    ios: "chevron.right",
    android: "chevron_right",
    web: "chevron_right",
  },
  download: {
    ios: "square.and.arrow.down",
    android: "download",
    web: "download",
  },
  continue: {
    ios: "arrow.right",
    android: "arrow_forward",
    web: "arrow_forward",
  },
  edit: {
    ios: "square.and.pencil",
    android: "edit",
    web: "edit",
  },
} satisfies Record<string, AppSymbolName>;

import { SymbolView } from "expo-symbols";
import { createElement, type ComponentProps } from "react";

export type AppSymbolName = ComponentProps<typeof SymbolView>["name"];
export type AppIconProps = {
  name: AppSymbolName;
  size?: number;
  tintColor?: string;
  color?: string;
};

export const appIcons = {
  home: {
    ios: "house",
    android: "home",
    web: "home",
  },
  settings: {
    ios: "gear",
    android: "settings",
    web: "settings",
  },
  person: {
    ios: "person.crop.circle",
    android: "person",
    web: "person",
  },
  back: {
    ios: "chevron.left",
    android: "arrow_back",
    web: "arrow_back",
  },
  close: {
    ios: "xmark",
    android: "close",
    web: "close",
  },
  language: {
    ios: "globe",
    android: "language",
    web: "language",
  },
  plus: {
    ios: "plus",
    android: "add",
    web: "add",
  },
} satisfies Record<string, AppSymbolName>;

export const buttonIcons = {
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
  delete: {
    ios: "trash",
    android: "delete",
    web: "delete",
  },
} satisfies Record<string, AppSymbolName>;

export const buttonShowcaseIcons = buttonIcons;

export function AppSymbolIcon({
  name,
  size = 16,
  tintColor,
  color,
}: AppIconProps) {
  return createElement(SymbolView, {
    name,
    size,
    tintColor: color ?? tintColor,
    resizeMode: "scaleAspectFit",
  });
}

// we actually use only expo-symbols.

// do not use expo/vector-icons, use react-native-vector-icons/* instead,
// or expo-symbols for native icons

// What expo-symbols actually gives you
// It's a thin native bridge that lets you call SF Symbols (Apple's built-in icon system, thousands of icons,
// supports weights/scales/rendering modes) and Material Symbols (Google's equivalent) directly, instead of
// shipping a custom font.
// You pass platform-specific names and it picks the right one per OS — e.g.
// { ios: 'info.circle', android: 'info', web: 'info' }. If iOS and Android/web have differently-named
// equivalents, you map them yourself.
// Benefits:
// Icons match the OS's native design language exactly (especially valuable on iOS).
// Tradeoff: you need a name mapping between iOS symbol names and Android/web Material Symbol names

// What @expo/vector-icons gives you
// A giant, consistent icon font library (FontAwesome, Ionicons, MaterialIcons, Feather, etc.) that renders
// identically on every platform, because it's literally the same font file everywhere.
// Good for cross-platform visual consistency, bad for "feeling native" on any one platform. As covered earlier,
// this package itself is being deprecated in favor of @react-native-vector-icons/*.

import { SymbolView } from "expo-symbols";
import { createElement, type ComponentProps } from "react";
import type { ColorValue } from "react-native";

export type AppSymbolName = ComponentProps<typeof SymbolView>["name"];
export type AppIconProps = {
  name: AppSymbolName;
  size?: number;
  tintColor?: ColorValue;
  color?: ColorValue;
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
  notifications: {
    ios: "bell",
    android: "notifications",
    web: "notifications",
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

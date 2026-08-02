import type { ViewStyle } from "react-native";
import type { ThemeScheme } from "./colors";

export const shadowThemes = {
  light: {
    none: {
      shadowColor: "transparent",
      shadowOpacity: 0,
      shadowRadius: 0,
      shadowOffset: { width: 0, height: 0 },
      elevation: 0,
    },
    soft: {
      shadowColor: "#0f172a",
      shadowOpacity: 0.06,
      shadowRadius: 3,
      shadowOffset: { width: 0, height: 1 },
      elevation: 2,
    },
    card: {
      shadowColor: "#0f172a",
      shadowOpacity: 0.09,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 6 },
      elevation: 6,
    },
    lift: {
      shadowColor: "#0f172a",
      shadowOpacity: 0.14,
      shadowRadius: 24,
      shadowOffset: { width: 0, height: 12 },
      elevation: 10,
    },
  },
  dark: {
    none: {
      shadowColor: "transparent",
      shadowOpacity: 0,
      shadowRadius: 0,
      shadowOffset: { width: 0, height: 0 },
      elevation: 0,
    },
    soft: {
      shadowColor: "#000000",
      shadowOpacity: 0.34,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 1 },
      elevation: 2,
    },
    card: {
      shadowColor: "#000000",
      shadowOpacity: 0.42,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 7 },
      elevation: 7,
    },
    lift: {
      shadowColor: "#000000",
      shadowOpacity: 0.5,
      shadowRadius: 24,
      shadowOffset: { width: 0, height: 13 },
      elevation: 11,
    },
  },
} as const satisfies Record<ThemeScheme, Record<string, ViewStyle>>;

export const shadows = shadowThemes.light;

export type ShadowToken = keyof typeof shadowThemes.light;

export function getShadowStyle(
  token: ShadowToken,
  scheme: ThemeScheme,
): ViewStyle {
  return shadowThemes[scheme][token];
}

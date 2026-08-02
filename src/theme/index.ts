import { vars } from "nativewind";

import {
    hexToRgbTriplet,
    semanticColors,
    toNativeWindVariables,
    type ThemeScheme,
} from "./colors";
import { appIcons } from "./icons/AppIcons";
import { motion } from "./motion";
import { radius } from "./radius";
import { shadows } from "./shadows";
import { spacing } from "./spacing";
import type { ThemeMode } from "./ThemeProvider";
import { typography } from "./typography";

export type { ThemeScheme } from "./colors";
export {
    appIcons,
    hexToRgbTriplet,
    motion,
    radius,
    semanticColors,
    shadows,
    spacing,
    typography
};
export type { ThemeMode };

export const themeVars = {
  light: vars(toNativeWindVariables(semanticColors.light)),
  dark: vars(toNativeWindVariables(semanticColors.dark)),
} as const;

export const defaultThemeScheme: ThemeScheme = "light";

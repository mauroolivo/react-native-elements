import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SystemUI from "expo-system-ui";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { StyleSheet, useColorScheme, View } from "react-native";

import { semanticColors, themeVars, type ThemeScheme } from "./index";

export type ThemeMode = ThemeScheme | "system";

type ThemeContextValue = {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  resolvedTheme: ThemeScheme;
  scheme: ThemeScheme;
  colors: (typeof semanticColors)[ThemeScheme];
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const THEME_MODE_STORAGE_KEY = "app:theme-mode";

type ThemeProviderProps = {
  children: ReactNode;
  onThemeReady?: () => void;
};

function isThemeMode(value: string | null): value is ThemeMode {
  return value === "light" || value === "dark" || value === "system";
}

export function ThemeProvider({ children, onThemeReady }: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");
  const [isHydrated, setIsHydrated] = useState(false);

  const resolvedScheme: ThemeScheme =
    themeMode === "system"
      ? systemScheme === "dark"
        ? "dark"
        : "light"
      : themeMode;
  const colors = semanticColors[resolvedScheme];

  useEffect(() => {
    let isMounted = true;

    async function hydrateThemeMode() {
      try {
        const storedMode = await AsyncStorage.getItem(THEME_MODE_STORAGE_KEY);

        if (isMounted && isThemeMode(storedMode)) {
          setThemeMode(storedMode);
        }
      } finally {
        if (isMounted) {
          setIsHydrated(true);
        }
      }
    }

    void hydrateThemeMode();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    void AsyncStorage.setItem(THEME_MODE_STORAGE_KEY, themeMode);
  }, [isHydrated, themeMode]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    void SystemUI.setBackgroundColorAsync(colors.background);
  }, [colors.background, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      onThemeReady?.();
    }
  }, [isHydrated, onThemeReady]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      themeMode,
      setThemeMode,
      resolvedTheme: resolvedScheme,
      scheme: resolvedScheme,
      colors,
    }),
    [colors, resolvedScheme, themeMode],
  );

  if (!isHydrated) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>
      <View style={[styles.root, themeVars[resolvedScheme]]}>{children}</View>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

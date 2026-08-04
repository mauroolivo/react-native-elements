import "../../global.css";

import { ThemeProvider, useTheme } from "@/theme/ThemeProvider";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";

void SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { colors, resolvedTheme } = useTheme();

  return (
    <>
      <StatusBar style={resolvedTheme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          // contentStyle: { backgroundColor: colors.background },
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { color: colors.text },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.text,
            headerTitleStyle: { color: colors.text },
          }}
        />
      </Stack>
      {/* <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { color: colors.text },
        }}
      /> */}
    </>
  );
}

export default function RootLayout() {
  const handleThemeReady = useCallback(() => {
    void SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider onThemeReady={handleThemeReady}>
      <RootNavigator />
    </ThemeProvider>
  );
}

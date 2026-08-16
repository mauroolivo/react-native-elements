import "../../global.css";

import { LoadingOverlayProvider } from "@/components/ui";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { ThemeProvider, useTheme } from "@/theme/ThemeProvider";
import { NavigationLogger } from "./navigation/NavigationLogger";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useNavigationContainerRef } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";

void SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 30_000,
      gcTime: 5 * 60_000,
    },
  },
});

function RootNavigator() {
  const { colors, resolvedTheme } = useTheme();

  return (
    <>
      <StatusBar style={resolvedTheme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { color: colors.text },
        }}
      />
    </>
  );
}

export default function RootLayout() {
  const navigationRef = useNavigationContainerRef();

  const handleAppReady = useCallback(() => {
    void SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider onLanguageReady={handleAppReady}>
          <RootNavigator />
          <NavigationLogger navigationRef={navigationRef} />
          <LoadingOverlayProvider />
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

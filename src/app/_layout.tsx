import "../../global.css";

import { ThemeProvider, useTheme } from "@/theme/ThemeProvider";

import { Stack, useNavigationContainerRef } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useRef } from "react";

void SplashScreen.preventAutoHideAsync();

type NavigationLikeState = {
  type?: string;
  index?: number;
  routes?: {
    name?: string;
    state?: NavigationLikeState;
  }[];
};

function getSafeIndex(state: NavigationLikeState): number {
  if (!state.routes || state.routes.length === 0) {
    return -1;
  }

  if (
    typeof state.index === "number" &&
    state.index >= 0 &&
    state.index < state.routes.length
  ) {
    return state.index;
  }

  return 0;
}

function getActiveStateLineage(
  state: NavigationLikeState | undefined,
): NavigationLikeState[] {
  if (!state) {
    return [];
  }

  const lineage: NavigationLikeState[] = [state];
  let cursor: NavigationLikeState | undefined = state;

  while (cursor?.routes && cursor.routes.length > 0) {
    const safeIndex = getSafeIndex(cursor);
    if (safeIndex < 0) {
      break;
    }

    const next: NavigationLikeState | undefined =
      cursor.routes[safeIndex]?.state;
    if (!next) {
      break;
    }

    lineage.push(next);
    cursor = next;
  }

  return lineage;
}

function getActiveStackState(
  state: NavigationLikeState | undefined,
): NavigationLikeState | undefined {
  const lineage = getActiveStateLineage(state);
  const stackStates = lineage.filter((item) => item.type === "stack");

  if (stackStates.length > 0) {
    return stackStates[stackStates.length - 1];
  }

  return lineage[lineage.length - 1];
}

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
        <Stack.Screen
          name="legal"
          options={{
            headerShown: true,
            title: "Legal",
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
  const navigationRef = useNavigationContainerRef();
  const previousLogRef = useRef("");

  const handleThemeReady = useCallback(() => {
    void SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    const logCurrentStack = () => {
      const rootState = navigationRef.getRootState();
      const stackState = getActiveStackState(
        rootState as NavigationLikeState | undefined,
      );
      const stackRoutes = stackState?.routes ?? [];
      const stackIndex = stackState ? getSafeIndex(stackState) : -1;

      const stackEntries = stackRoutes
        .map((route, index) => {
          const routeName = route.name ?? "<unknown>";
          const isActive = index === stackIndex;
          return isActive ? `*${routeName}` : routeName;
        })
        .join(" > ");

      const payload = JSON.stringify({ stackEntries, stackIndex });

      if (payload !== previousLogRef.current) {
        console.log("[navigation stack] ->", stackEntries);
        previousLogRef.current = payload;
      }
    };

    logCurrentStack();

    const unsubscribe = navigationRef.addListener("state", logCurrentStack);

    return unsubscribe;
  }, [navigationRef]);

  return (
    <ThemeProvider onThemeReady={handleThemeReady}>
      <RootNavigator />
    </ThemeProvider>
  );
}

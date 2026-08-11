import "../../global.css";

import { LoadingOverlayProvider } from "@/components/ui";
import { ThemeProvider, useTheme } from "@/theme/ThemeProvider";

import { Stack, useNavigationContainerRef } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";

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

function getActiveRouteChain(state: NavigationLikeState | undefined): string[] {
  const chain: string[] = [];
  let cursor: NavigationLikeState | undefined = state;

  while (cursor?.routes && cursor.routes.length > 0) {
    const safeIndex = getSafeIndex(cursor);
    if (safeIndex < 0) {
      break;
    }

    const activeRoute = cursor.routes[safeIndex];
    const routeName = activeRoute?.name;

    if (routeName && routeName !== "__root") {
      chain.push(routeName);
    }

    cursor = activeRoute?.state;
  }

  return chain;
}

function isRootWrapperStack(state: NavigationLikeState): boolean {
  const routes = state.routes ?? [];
  return routes.length === 1 && routes[0]?.name === "__root";
}

function getAppRootStackState(
  state: NavigationLikeState | undefined,
): NavigationLikeState | undefined {
  const lineage = getActiveStateLineage(state);
  const stackStates = lineage.filter((item) => item.type === "stack");

  const meaningfulStack = stackStates.find((item) => !isRootWrapperStack(item));
  if (meaningfulStack) {
    return meaningfulStack;
  }

  return stackStates[0];
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
        <Stack.Screen
          name="loaderSheet"
          options={{
            headerShown: false,
            presentation: "formSheet",
            sheetAllowedDetents: [0.35, 0.6],
            sheetInitialDetentIndex: 0,
            sheetGrabberVisible: true,
            sheetCornerRadius: 24,
            contentStyle: { backgroundColor: colors.background },
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

  const handleThemeReady = useCallback(() => {
    void SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    const logCurrentStack = () => {
      const rootState = navigationRef.getRootState();
      const stackState = getAppRootStackState(
        rootState as NavigationLikeState | undefined,
      );
      const activeRouteChain = getActiveRouteChain(
        rootState as NavigationLikeState | undefined,
      );
      const activeLeaf =
        activeRouteChain.length > 0
          ? activeRouteChain[activeRouteChain.length - 1]
          : "";

      if (!stackState) {
        console.log(
          "[navigation stack] -> <unavailable>",
          activeLeaf ? `| active: ${activeLeaf}` : "",
        );
        return;
      }

      const stackRoutes = stackState.routes ?? [];
      const stackIndex = getSafeIndex(stackState);
      const activeRootRouteName =
        stackIndex >= 0 ? (stackRoutes[stackIndex]?.name ?? "") : "";

      const stackEntries = stackRoutes
        .map((route, index) => {
          const routeName = route.name ?? "<unknown>";
          const isActive = index === stackIndex;
          return isActive ? `*${routeName}` : routeName;
        })
        .join(" > ");

      console.log(
        "[navigation stack] ->",
        activeLeaf && activeLeaf !== activeRootRouteName
          ? `${stackEntries} | active: ${activeLeaf}`
          : stackEntries,
      );
    };

    logCurrentStack();

    const unsubscribe = navigationRef.addListener("state", logCurrentStack);

    return unsubscribe;
  }, [navigationRef]);

  return (
    <ThemeProvider onThemeReady={handleThemeReady}>
      <RootNavigator />
      <LoadingOverlayProvider />
    </ThemeProvider>
  );
}

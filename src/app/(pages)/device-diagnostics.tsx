import { Stack } from "expo-router";
import { Platform, View } from "react-native";

import type { DevicePlatformName } from "../../../modules/device-diagnostics/src/DeviceDiagnostics.types";
import DeviceDiagnosticsModule from "../../../modules/device-diagnostics/src/DeviceDiagnosticsModule";
import { Screen, Text } from "../../components/ui";

export default function DeviceDiagnosticsScreen() {
  let nativePlatformName: DevicePlatformName | "unavailable" = "unavailable";

  try {
    nativePlatformName = DeviceDiagnosticsModule.getPlatformName();
  } catch {
    nativePlatformName = "unavailable";
  }

  return (
    <Screen edges={["left", "right", "bottom"]}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Device Diagnostics",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <View className="gap-sm px-lg py-lg">
        <Text variant="headlineLg">Device Diagnostics</Text>
        <Text tone="muted">
          Stage 1 adds a synchronous native call from JavaScript to
          Swift/Kotlin.
        </Text>
        <Text>Module: {DeviceDiagnosticsModule ? "loaded" : "missing"}</Text>
        <Text>React Native Platform.OS: {Platform.OS}</Text>
        <Text>Native getPlatformName(): {nativePlatformName}</Text>
      </View>
    </Screen>
  );
}

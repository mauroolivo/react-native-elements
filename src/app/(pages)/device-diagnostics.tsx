import { Stack } from "expo-router";
import { Platform, View } from "react-native";

import type {
  DeviceInfo,
  DevicePlatformName,
} from "../../../modules/device-diagnostics/src/DeviceDiagnostics.types";
import DeviceDiagnosticsModule from "../../../modules/device-diagnostics/src/DeviceDiagnosticsModule";
import { Screen, Text } from "../../components/ui";

export default function DeviceDiagnosticsScreen() {
  let nativePlatformName: DevicePlatformName | "unavailable" = "unavailable";
  let nativeDeviceInfo: DeviceInfo | null = null;

  try {
    nativePlatformName = DeviceDiagnosticsModule.getPlatformName();
    nativeDeviceInfo = DeviceDiagnosticsModule.getDeviceInfo();
  } catch {
    nativePlatformName = "unavailable";
    nativeDeviceInfo = null;
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
          Stage 2 returns structured native data from Swift/Kotlin to
          JavaScript.
        </Text>
        <Text>Module: {DeviceDiagnosticsModule ? "loaded" : "missing"}</Text>
        <Text>React Native Platform.OS: {Platform.OS}</Text>
        <Text>Native getPlatformName(): {nativePlatformName}</Text>
        <Text>
          Native getDeviceInfo():{" "}
          {nativeDeviceInfo
            ? `${nativeDeviceInfo.platform} | ${nativeDeviceInfo.model} | ${nativeDeviceInfo.systemVersion}`
            : "unavailable"}
        </Text>
      </View>
    </Screen>
  );
}

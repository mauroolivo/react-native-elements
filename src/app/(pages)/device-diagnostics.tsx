import { Stack } from "expo-router";
import { useState } from "react";
import { Platform, View } from "react-native";

import type {
  DeviceInfo,
  DevicePlatformName,
} from "../../../modules/device-diagnostics/src/DeviceDiagnostics.types";
import DeviceDiagnosticsModule from "../../../modules/device-diagnostics/src/DeviceDiagnosticsModule";
import { Button, Screen, Text } from "../../components/ui";

export default function DeviceDiagnosticsScreen() {
  const [vibrationStatus, setVibrationStatus] = useState<
    "idle" | "ok" | "error"
  >("idle");

  let nativePlatformName: DevicePlatformName | "unavailable" = "unavailable";
  let nativeDeviceInfo: DeviceInfo | null = null;

  const triggerVibration = (duration: number, intensity: number) => {
    try {
      DeviceDiagnosticsModule.vibrate({ duration, intensity });
      setVibrationStatus("ok");
    } catch {
      setVibrationStatus("error");
    }
  };

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
          Stage 3 sends typed options from JavaScript to Swift/Kotlin.
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
        <Button size="sm" onPress={() => triggerVibration(500, 0.8)}>
          Trigger Native Vibration
        </Button>
        <Text>Native vibrate(): {vibrationStatus}</Text>
      </View>
    </Screen>
  );
}

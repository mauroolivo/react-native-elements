import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, View } from "react-native";

import type {
  BatteryStateChangedEvent,
  DeviceInfo,
  DevicePlatformName,
  DiskSpaceInfo,
} from "../../../modules/device-diagnostics/src/DeviceDiagnostics.types";
import DeviceDiagnosticsModule from "../../../modules/device-diagnostics/src/DeviceDiagnosticsModule";
import DeviceDiagnosticsView from "../../../modules/device-diagnostics/src/DeviceDiagnosticsView";
import { Button, Screen, Text } from "../../components/ui";

export default function DeviceDiagnosticsScreen() {
  const [vibrationStatus, setVibrationStatus] = useState<
    "idle" | "ok" | "error"
  >("idle");
  const [diskSpaceStatus, setDiskSpaceStatus] = useState<
    "idle" | "loading" | "ok" | "error"
  >("idle");
  const [diskSpaceInfo, setDiskSpaceInfo] = useState<DiskSpaceInfo | null>(
    null,
  );
  const [batteryEvent, setBatteryEvent] =
    useState<BatteryStateChangedEvent | null>(null);
  const [monitoringStatus, setMonitoringStatus] = useState<
    "idle" | "monitoring" | "stopped"
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

  const loadAvailableDiskSpace = async () => {
    setDiskSpaceStatus("loading");
    try {
      const info = await DeviceDiagnosticsModule.getAvailableDiskSpace();
      setDiskSpaceInfo(info);
      setDiskSpaceStatus("ok");
    } catch {
      setDiskSpaceInfo(null);
      setDiskSpaceStatus("error");
    }
  };

  useEffect(() => {
    const subscription = DeviceDiagnosticsModule.addListener(
      "batteryStateChanged",
      (event) => {
        setBatteryEvent(event);
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const toggleMonitoring = () => {
    try {
      if (monitoringStatus === "monitoring") {
        DeviceDiagnosticsModule.stopMonitoring();
        setMonitoringStatus("stopped");
      } else {
        DeviceDiagnosticsModule.startMonitoring();
        setMonitoringStatus("monitoring");
      }
    } catch {
      setMonitoringStatus("idle");
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
          Stage 6 adds explicit lifecycle control with
          startMonitoring/stopMonitoring.
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
        <Button size="sm" onPress={loadAvailableDiskSpace}>
          Load Available Disk Space
        </Button>
        <Text>Native getAvailableDiskSpace(): {diskSpaceStatus}</Text>
        <Text>
          Available bytes:{" "}
          {diskSpaceInfo ? String(diskSpaceInfo.availableBytes) : "unavailable"}
        </Text>
        <Text>
          Native batteryStateChanged():{" "}
          {batteryEvent
            ? `level=${batteryEvent.level.toFixed(2)} charging=${batteryEvent.isCharging ? "true" : "false"}`
            : "waiting for event"}
        </Text>
        <Button
          size="sm"
          variant={monitoringStatus === "monitoring" ? "secondary" : "primary"}
          onPress={toggleMonitoring}
        >
          {`${monitoringStatus === "monitoring" ? "Stop" : "Start"} Battery Monitoring`}
        </Button>
        <Text>Monitoring status: {monitoringStatus}</Text>

        <DeviceDiagnosticsView
          showBattery
          showMemory
          showDisk
          refreshInterval={1000}
          onBatteryPress={(event) => {
            setBatteryEvent({
              level: event.nativeEvent.level,
              isCharging: event.nativeEvent.isCharging,
            });
          }}
          style={{ height: 140 }}
        />
      </View>
    </Screen>
  );
}

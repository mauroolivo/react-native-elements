import { requireNativeViewManager } from "expo-modules-core";
import type { ReactElement } from "react";
import type { StyleProp, ViewProps, ViewStyle } from "react-native";

export type DeviceDiagnosticsViewProps = ViewProps & {
  showBattery?: boolean;
  showMemory?: boolean;
  showDisk?: boolean;
  refreshInterval?: number;
  onBatteryPress?: (event: { nativeEvent: BatteryStateEvent }) => void;
};

export type BatteryStateEvent = {
  level: number;
  isCharging: boolean;
};

type NativeDeviceDiagnosticsViewProps = DeviceDiagnosticsViewProps & {
  style?: StyleProp<ViewStyle>;
};

const NativeDeviceDiagnosticsView =
  requireNativeViewManager<NativeDeviceDiagnosticsViewProps>(
    "DeviceDiagnostics",
    "DeviceDiagnosticsView",
  );

export default function DeviceDiagnosticsView(
  props: DeviceDiagnosticsViewProps,
): ReactElement {
  return <NativeDeviceDiagnosticsView {...props} />;
}

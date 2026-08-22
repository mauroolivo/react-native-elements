export type DevicePlatformName = "ios" | "android";

export type DeviceInfo = {
  platform: DevicePlatformName;
  model: string;
  systemVersion: string;
};

export type VibrationOptions = {
  duration: number;
  intensity: number;
};

export type DiskSpaceInfo = {
  availableBytes: number;
};

export type BatteryStateChangedEvent = {
  level: number;
  isCharging: boolean;
};

export type DeviceDiagnosticsEvents = {
  batteryStateChanged: (event: BatteryStateChangedEvent) => void;
};

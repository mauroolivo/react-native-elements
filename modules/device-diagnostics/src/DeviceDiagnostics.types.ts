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

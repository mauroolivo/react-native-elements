export type DevicePlatformName = "ios" | "android";

export type DeviceInfo = {
  platform: DevicePlatformName;
  model: string;
  systemVersion: string;
};

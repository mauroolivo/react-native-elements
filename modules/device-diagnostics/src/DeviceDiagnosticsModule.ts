import { NativeModule, requireNativeModule } from "expo";

import type {
    DeviceDiagnosticsEvents,
    DeviceInfo,
    DevicePlatformName,
    DiskSpaceInfo,
    VibrationOptions,
} from "./DeviceDiagnostics.types";

declare class DeviceDiagnosticsModule extends NativeModule<DeviceDiagnosticsEvents> {
  getPlatformName(): DevicePlatformName;
  getDeviceInfo(): DeviceInfo;
  vibrate(options: VibrationOptions): void;
  getAvailableDiskSpace(): Promise<DiskSpaceInfo>;
}

export default requireNativeModule<DeviceDiagnosticsModule>(
  "DeviceDiagnostics",
);

import { NativeModule, requireNativeModule } from "expo";

import type {
    DeviceInfo,
    DevicePlatformName,
    DiskSpaceInfo,
    VibrationOptions,
} from "./DeviceDiagnostics.types";

declare class DeviceDiagnosticsModule extends NativeModule {
  getPlatformName(): DevicePlatformName;
  getDeviceInfo(): DeviceInfo;
  vibrate(options: VibrationOptions): void;
  getAvailableDiskSpace(): Promise<DiskSpaceInfo>;
}

export default requireNativeModule<DeviceDiagnosticsModule>(
  "DeviceDiagnostics",
);

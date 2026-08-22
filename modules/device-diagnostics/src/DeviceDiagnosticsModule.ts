import { NativeModule, requireNativeModule } from "expo";

import type {
    DeviceInfo,
    DevicePlatformName,
    VibrationOptions,
} from "./DeviceDiagnostics.types";

declare class DeviceDiagnosticsModule extends NativeModule {
  getPlatformName(): DevicePlatformName;
  getDeviceInfo(): DeviceInfo;
  vibrate(options: VibrationOptions): void;
}

export default requireNativeModule<DeviceDiagnosticsModule>(
  "DeviceDiagnostics",
);

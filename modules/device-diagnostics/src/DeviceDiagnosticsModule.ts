import { NativeModule, requireNativeModule } from "expo";

import type { DeviceInfo, DevicePlatformName } from "./DeviceDiagnostics.types";

declare class DeviceDiagnosticsModule extends NativeModule {
  getPlatformName(): DevicePlatformName;
  getDeviceInfo(): DeviceInfo;
}

export default requireNativeModule<DeviceDiagnosticsModule>(
  "DeviceDiagnostics",
);

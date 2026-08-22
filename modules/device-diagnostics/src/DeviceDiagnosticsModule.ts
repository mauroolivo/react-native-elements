import { NativeModule, requireNativeModule } from 'expo';

import type { DevicePlatformName } from './DeviceDiagnostics.types';

declare class DeviceDiagnosticsModule extends NativeModule {
	getPlatformName(): DevicePlatformName;
}

export default requireNativeModule<DeviceDiagnosticsModule>('DeviceDiagnostics');

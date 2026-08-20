import { NativeModule, requireNativeModule } from 'expo';

declare class DeviceDiagnosticsModule extends NativeModule<{}> {}

export default requireNativeModule<DeviceDiagnosticsModule>('DeviceDiagnostics');

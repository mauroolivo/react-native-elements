import ExpoModulesCore
import UIKit

public class DeviceDiagnosticsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("DeviceDiagnostics")

    Function("getPlatformName") {
      "ios"
    }

    Function("getDeviceInfo") {
      let device = UIDevice.current
      return [
        "platform": "ios",
        "model": device.model,
        "systemVersion": device.systemVersion
      ]
    }
  }
}

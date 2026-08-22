import ExpoModulesCore

public class DeviceDiagnosticsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("DeviceDiagnostics")

    Function("getPlatformName") {
      "ios"
    }
  }
}

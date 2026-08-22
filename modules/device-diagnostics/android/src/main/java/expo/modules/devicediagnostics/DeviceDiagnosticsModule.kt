package expo.modules.devicediagnostics

import android.os.Build
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class DeviceDiagnosticsModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("DeviceDiagnostics")

        Function("getPlatformName") {
            "android"
        }

        Function("getDeviceInfo") {
            mapOf(
                "platform" to "android",
                "model" to Build.MODEL,
                "systemVersion" to Build.VERSION.RELEASE
            )
        }
    }
}

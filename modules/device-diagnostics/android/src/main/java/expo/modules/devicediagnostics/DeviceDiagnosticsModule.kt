package expo.modules.devicediagnostics

import android.content.Context
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

class VibrationOptions : Record {
    @Field
    var duration: Long = 500

    @Field
    var intensity: Double = 1.0
}

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

        Function("vibrate") { options: VibrationOptions ->
            if (options.duration <= 0) {
                throw IllegalArgumentException("`duration` must be greater than 0.")
            }
            if (options.intensity < 0.0 || options.intensity > 1.0) {
                throw IllegalArgumentException("`intensity` must be between 0 and 1.")
            }

            val context = appContext.reactContext
                ?: throw IllegalStateException("React context is unavailable.")

            val vibrator = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                context.getSystemService(VibratorManager::class.java)?.defaultVibrator
            } else {
                @Suppress("DEPRECATION")
                context.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
            }

            if (vibrator == null || !vibrator.hasVibrator()) {
                throw IllegalStateException("Vibrator service is unavailable on this device.")
            }

            val amplitude = (options.intensity * 255).toInt().coerceIn(1, 255)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                vibrator.vibrate(VibrationEffect.createOneShot(options.duration, amplitude))
            } else {
                @Suppress("DEPRECATION")
                vibrator.vibrate(options.duration)
            }
        }
    }
}

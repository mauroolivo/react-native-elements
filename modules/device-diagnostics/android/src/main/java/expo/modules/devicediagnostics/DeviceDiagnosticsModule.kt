package expo.modules.devicediagnostics

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import android.os.Build
import android.os.Environment
import android.os.StatFs
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
    private var batteryReceiver: BroadcastReceiver? = null

    override fun definition() = ModuleDefinition {
        Name("DeviceDiagnostics")

        Events("batteryStateChanged")

        OnStartObserving("batteryStateChanged") {
            startBatteryMonitoring()
        }

        OnStopObserving("batteryStateChanged") {
            stopBatteryMonitoring()
        }

        OnDestroy {
            stopBatteryMonitoring()
        }

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

        AsyncFunction("getAvailableDiskSpace") {
            val statFs = StatFs(Environment.getDataDirectory().path)
            val availableBytes = statFs.availableBytes
            if (availableBytes <= 0L) {
                throw IllegalStateException("Available disk space is unavailable.")
            }

            mapOf("availableBytes" to availableBytes)
        }
    }

    private fun startBatteryMonitoring() {
        val context = appContext.reactContext ?: return
        if (batteryReceiver != null) {
            initialBatteryIntent(context)?.let { emitBatteryStateFromIntent(it) }
            return
        }

        val receiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context?, intent: Intent?) {
                intent?.let { emitBatteryStateFromIntent(it) }
            }
        }

        val filter = IntentFilter(Intent.ACTION_BATTERY_CHANGED)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            context.registerReceiver(receiver, filter, Context.RECEIVER_NOT_EXPORTED)
        } else {
            @Suppress("DEPRECATION")
            context.registerReceiver(receiver, filter)
        }

        batteryReceiver = receiver
        initialBatteryIntent(context)?.let { emitBatteryStateFromIntent(it) }
    }

    private fun stopBatteryMonitoring() {
        val context = appContext.reactContext
        val receiver = batteryReceiver
        if (context != null && receiver != null) {
            try {
                context.unregisterReceiver(receiver)
            } catch (_: IllegalArgumentException) {
            }
        }
        batteryReceiver = null
    }

    private fun initialBatteryIntent(context: Context): Intent? {
        val filter = IntentFilter(Intent.ACTION_BATTERY_CHANGED)
        return context.registerReceiver(null, filter)
    }

    private fun emitBatteryStateFromIntent(intent: Intent) {
        val level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1)
        val scale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1)
        if (level < 0 || scale <= 0) {
            return
        }

        val status = intent.getIntExtra(BatteryManager.EXTRA_STATUS, -1)
        val isCharging =
            status == BatteryManager.BATTERY_STATUS_CHARGING || status == BatteryManager.BATTERY_STATUS_FULL

        val normalizedLevel = (level.toDouble() / scale.toDouble()).coerceIn(0.0, 1.0)
        sendEvent(
            "batteryStateChanged",
            mapOf(
                "level" to normalizedLevel,
                "isCharging" to isCharging
            )
        )
    }
}

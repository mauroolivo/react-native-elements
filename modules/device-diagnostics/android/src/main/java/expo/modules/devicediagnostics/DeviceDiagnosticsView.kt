package expo.modules.devicediagnostics

import android.content.Context
import android.graphics.Color
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.os.StatFs
import android.view.Gravity
import android.view.View
import android.widget.LinearLayout
import android.widget.TextView
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView

class DeviceDiagnosticsView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
    private val onBatteryPress by EventDispatcher()

    private val container = LinearLayout(context).apply {
        orientation = LinearLayout.VERTICAL
        gravity = Gravity.CENTER_VERTICAL
        setBackgroundColor(Color.argb(255, 36, 36, 40))
        setPadding(20, 20, 20, 20)
    }

    private val batteryText = TextView(context).apply {
        setTextColor(Color.WHITE)
        textSize = 14f
    }

    private val memoryText = TextView(context).apply {
        setTextColor(Color.WHITE)
        textSize = 14f
    }

    private val diskText = TextView(context).apply {
        setTextColor(Color.WHITE)
        textSize = 14f
    }

    private var showBattery = true
    private var showMemory = true
    private var showDisk = true
    private var refreshInterval = 1000L
    private val handler = Handler(Looper.getMainLooper())

    private val refreshRunnable = object : Runnable {
        override fun run() {
            updateMetrics()
            handler.postDelayed(this, refreshInterval)
        }
    }

    init {
        container.addView(batteryText)
        container.addView(memoryText)
        container.addView(diskText)
        addView(container)

        setOnClickListener {
            val level = getBatteryLevel()
            val isCharging = isCharging()
            onBatteryPress(
                mapOf(
                    "level" to level,
                    "isCharging" to isCharging
                )
            )
        }

        updateMetrics()
        handler.postDelayed(refreshRunnable, refreshInterval)
    }

    fun setShowBattery(value: Boolean) {
        showBattery = value
        updateMetrics()
    }

    fun setShowMemory(value: Boolean) {
        showMemory = value
        updateMetrics()
    }

    fun setShowDisk(value: Boolean) {
        showDisk = value
        updateMetrics()
    }

    fun setRefreshInterval(value: Double?) {
        refreshInterval = (value ?: 1.0).coerceAtLeast(0.25).toLong() * 1000L
        handler.removeCallbacks(refreshRunnable)
        handler.postDelayed(refreshRunnable, refreshInterval)
    }

    private fun getBatteryLevel(): Double {
        val batteryIntent =
            context.registerReceiver(null, android.content.IntentFilter(android.content.Intent.ACTION_BATTERY_CHANGED))
        val level = batteryIntent?.getIntExtra(android.os.BatteryManager.EXTRA_LEVEL, -1) ?: -1
        val scale = batteryIntent?.getIntExtra(android.os.BatteryManager.EXTRA_SCALE, -1) ?: -1
        if (level < 0 || scale <= 0) return 0.0
        return (level.toDouble() / scale.toDouble()).coerceIn(0.0, 1.0)
    }

    private fun isCharging(): Boolean {
        val batteryIntent =
            context.registerReceiver(null, android.content.IntentFilter(android.content.Intent.ACTION_BATTERY_CHANGED))
        val status = batteryIntent?.getIntExtra(android.os.BatteryManager.EXTRA_STATUS, -1) ?: -1
        return status == android.os.BatteryManager.BATTERY_STATUS_CHARGING || status == android.os.BatteryManager.BATTERY_STATUS_FULL
    }

    private fun updateMetrics() {
        batteryText.visibility = if (showBattery) View.VISIBLE else View.GONE
        memoryText.visibility = if (showMemory) View.VISIBLE else View.GONE
        diskText.visibility = if (showDisk) View.VISIBLE else View.GONE

        val level = getBatteryLevel()
        val charging = isCharging()
        batteryText.text =
            if (showBattery) "Battery: ${"%.0f".format(level * 100)}% ${if (charging) "charging" else "discharging"}" else ""

        val totalMemoryGb = (Runtime.getRuntime().maxMemory() / 1024.0 / 1024.0 / 1024.0)
        memoryText.text = if (showMemory) "Memory: ${"%.1f".format(totalMemoryGb)} GB" else ""

        val statFs = StatFs("/data")
        val availableBytes = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
            statFs.availableBytes
        } else {
            statFs.blockSize.toLong() * statFs.availableBlocks.toLong()
        }
        val freeGb = availableBytes.toDouble() / 1024.0 / 1024.0 / 1024.0
        diskText.text = if (showDisk) "Disk: ${"%.1f".format(freeGb)} GB free" else ""
    }
}

package expo.modules.nativelinechart

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class NativeLineChartModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("NativeLineChart")

        View(NativeLineChartView::class) {
            Events("onPointSelected")

            Prop("data") { view: NativeLineChartView, value: List<Map<String, Double>> ->
                view.setData(value)
            }

            Prop("lineWidth") { view: NativeLineChartView, value: Double ->
                view.setLineWidth(value.toFloat())
            }

            Prop("showGrid") { view: NativeLineChartView, value: Boolean ->
                view.setShowGrid(value)
            }
        }
    }
}

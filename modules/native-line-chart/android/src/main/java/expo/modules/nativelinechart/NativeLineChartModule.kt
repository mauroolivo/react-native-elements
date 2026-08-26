package expo.modules.nativelinechart

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class NativeLineChartModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("NativeLineChart")

        View(NativeLineChartView::class) {}
    }
}

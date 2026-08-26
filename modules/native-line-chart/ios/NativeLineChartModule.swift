import DGCharts
import ExpoModulesCore

public class NativeLineChartModule: Module {
  public func definition() -> ModuleDefinition {
    Name("NativeLineChart")

    View(NativeLineChartView.self) {}
  }
}

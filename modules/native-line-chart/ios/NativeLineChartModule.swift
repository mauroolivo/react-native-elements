import DGCharts
import ExpoModulesCore

public class NativeLineChartModule: Module {
  public func definition() -> ModuleDefinition {
    Name("NativeLineChart")

    View(NativeLineChartView.self) {
      Prop("data") { (view: NativeLineChartView, value: [[String: Double]]) in
        view.setData(value)
      }

      Prop("lineWidth") { (view: NativeLineChartView, value: Double) in
        view.setLineWidth(value)
      }

      Prop("showGrid") { (view: NativeLineChartView, value: Bool) in
        view.setShowGrid(value)
      }
    }
  }
}

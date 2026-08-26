import DGCharts
import ExpoModulesCore
import UIKit

public final class NativeLineChartView: ExpoView {
  private let chartView = LineChartView()

  required public init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)

    chartView.chartDescription.enabled = false
    chartView.legend.enabled = false
    chartView.rightAxis.enabled = false
    chartView.xAxis.labelPosition = .bottom
    chartView.data = makeChartData()
    addSubview(chartView)
  }

  override public func layoutSubviews() {
    super.layoutSubviews()
    chartView.frame = bounds
  }

  private func makeChartData() -> LineChartData {
    let entries = [
      ChartDataEntry(x: 0, y: 10),
      ChartDataEntry(x: 1, y: 14),
      ChartDataEntry(x: 2, y: 9),
      ChartDataEntry(x: 3, y: 17),
    ]
    let dataSet = LineChartDataSet(entries: entries, label: "Sample")
    dataSet.lineWidth = 2
    dataSet.circleRadius = 4
    dataSet.drawValuesEnabled = false
    return LineChartData(dataSet: dataSet)
  }
}

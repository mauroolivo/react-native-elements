import DGCharts
import ExpoModulesCore
import UIKit

public final class NativeLineChartView: ExpoView {
  private let chartView = LineChartView()
  private var lineWidth: CGFloat = 2
  private var showGrid = true

  required public init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)

    chartView.chartDescription.enabled = false
    chartView.legend.enabled = false
    chartView.rightAxis.enabled = false
    chartView.xAxis.labelPosition = .bottom
    chartView.data = makeChartData()
    applyChartAppearance()
    addSubview(chartView)
  }

  override public func layoutSubviews() {
    super.layoutSubviews()
    chartView.frame = bounds
  }

  func setLineWidth(_ value: Double) {
    lineWidth = CGFloat(value)
    if let dataSet = chartView.data?.dataSets.first as? LineChartDataSet {
      dataSet.lineWidth = lineWidth
      chartView.data?.notifyDataChanged()
      chartView.notifyDataSetChanged()
    }
  }

  func setShowGrid(_ value: Bool) {
    showGrid = value
    chartView.xAxis.drawGridLinesEnabled = showGrid
    chartView.leftAxis.drawGridLinesEnabled = showGrid
    chartView.rightAxis.drawGridLinesEnabled = showGrid
    chartView.xAxis.drawAxisLineEnabled = showGrid
    chartView.leftAxis.drawAxisLineEnabled = showGrid
    chartView.rightAxis.drawAxisLineEnabled = showGrid
  }

  private func applyChartAppearance() {
    chartView.xAxis.drawGridLinesEnabled = showGrid
    chartView.leftAxis.drawGridLinesEnabled = showGrid
    chartView.rightAxis.drawGridLinesEnabled = showGrid
    chartView.xAxis.drawAxisLineEnabled = showGrid
    chartView.leftAxis.drawAxisLineEnabled = showGrid
    chartView.rightAxis.drawAxisLineEnabled = showGrid

    if let dataSet = chartView.data?.dataSets.first as? LineChartDataSet {
      dataSet.lineWidth = lineWidth
    }
  }

  private func makeChartData() -> LineChartData {
    let entries = [
      ChartDataEntry(x: 0, y: 10),
      ChartDataEntry(x: 1, y: 14),
      ChartDataEntry(x: 2, y: 9),
      ChartDataEntry(x: 3, y: 17),
    ]
    let dataSet = LineChartDataSet(entries: entries, label: "Sample")
    dataSet.lineWidth = lineWidth
    dataSet.circleRadius = 4
    dataSet.drawValuesEnabled = false
    return LineChartData(dataSet: dataSet)
  }
}

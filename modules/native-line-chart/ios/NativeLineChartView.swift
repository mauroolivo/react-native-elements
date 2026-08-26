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
    chartView.data = makeChartData(from: [
      ["x": 0.0, "y": 10.0],
      ["x": 1.0, "y": 14.0],
      ["x": 2.0, "y": 9.0],
      ["x": 3.0, "y": 17.0],
    ])
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

  func setData(_ value: [[String: Double]]) {
    chartView.data = makeChartData(from: value)
    applyChartAppearance()
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

  private func makeChartData(from points: [[String: Double]]) -> LineChartData {
    let entries = points.compactMap { point in
      guard let x = point["x"], let y = point["y"] else {
        return nil
      }
      return ChartDataEntry(x: x, y: y)
    }

    let dataSet = LineChartDataSet(entries: entries, label: "Sample")
    dataSet.lineWidth = lineWidth
    dataSet.circleRadius = 4
    dataSet.drawValuesEnabled = false
    return LineChartData(dataSet: dataSet)
  }
}

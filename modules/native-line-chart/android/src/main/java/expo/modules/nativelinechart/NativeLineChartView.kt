package expo.modules.nativelinechart

import android.content.Context
import com.github.mikephil.charting.charts.LineChart
import com.github.mikephil.charting.data.Entry
import com.github.mikephil.charting.data.LineData
import com.github.mikephil.charting.data.LineDataSet
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView

class NativeLineChartView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
    private val chartView = LineChart(context)
    private var lineWidth = 2f
    private var showGrid = true

    init {
        chartView.description.isEnabled = false
        chartView.legend.isEnabled = false
        chartView.axisRight.isEnabled = false
        chartView.xAxis.position = com.github.mikephil.charting.components.XAxis.XAxisPosition.BOTTOM
        chartView.data = makeChartData()
        applyChartAppearance()
        addView(chartView)
    }

    override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
        super.onLayout(changed, left, top, right, bottom)
        chartView.layout(0, 0, width, height)
    }

    fun setLineWidth(value: Float) {
        lineWidth = value
        chartView.data?.dataSets?.forEach { dataSet ->
            if (dataSet is LineDataSet) {
                dataSet.lineWidth = value
            }
        }
        chartView.data?.notifyDataChanged()
        chartView.notifyDataSetChanged()
        chartView.postInvalidate()
        chartView.invalidate()
    }

    fun setShowGrid(value: Boolean) {
        showGrid = value
        chartView.xAxis.setDrawGridLines(value)
        chartView.axisLeft.setDrawGridLines(value)
        chartView.axisRight.setDrawGridLines(value)
        chartView.xAxis.setDrawAxisLine(value)
        chartView.axisLeft.setDrawAxisLine(value)
        chartView.axisRight.setDrawAxisLine(value)
        chartView.postInvalidate()
        chartView.invalidate()
    }

    private fun applyChartAppearance() {
        chartView.xAxis.setDrawGridLines(showGrid)
        chartView.axisLeft.setDrawGridLines(showGrid)
        chartView.axisRight.setDrawGridLines(showGrid)
        chartView.xAxis.setDrawAxisLine(showGrid)
        chartView.axisLeft.setDrawAxisLine(showGrid)
        chartView.axisRight.setDrawAxisLine(showGrid)

        chartView.data?.dataSets?.forEach { dataSet ->
            if (dataSet is LineDataSet) {
                dataSet.lineWidth = lineWidth
            }
        }
    }

    private fun makeChartData(): LineData {
        val entries = listOf(
            Entry(0f, 10f),
            Entry(1f, 14f),
            Entry(2f, 9f),
            Entry(3f, 17f),
        )
        val dataSet = LineDataSet(entries, "Sample").apply {
            lineWidth = this@NativeLineChartView.lineWidth
            circleRadius = 4f
            setDrawValues(false)
        }
        return LineData(dataSet)
    }
}

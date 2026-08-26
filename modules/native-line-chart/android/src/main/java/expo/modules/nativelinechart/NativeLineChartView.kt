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

    init {
        chartView.description.isEnabled = false
        chartView.legend.isEnabled = false
        chartView.axisRight.isEnabled = false
        chartView.xAxis.position = com.github.mikephil.charting.components.XAxis.XAxisPosition.BOTTOM
        chartView.data = makeChartData()
        addView(chartView)
    }

    override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
        super.onLayout(changed, left, top, right, bottom)
        chartView.layout(0, 0, width, height)
    }

    private fun makeChartData(): LineData {
        val entries = listOf(
            Entry(0f, 10f),
            Entry(1f, 14f),
            Entry(2f, 9f),
            Entry(3f, 17f),
        )
        val dataSet = LineDataSet(entries, "Sample").apply {
            lineWidth = 2f
            circleRadius = 4f
            setDrawValues(false)
        }
        return LineData(dataSet)
    }
}

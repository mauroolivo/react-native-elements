package expo.modules.nativelinechart

import android.content.Context
import com.github.mikephil.charting.charts.LineChart
import com.github.mikephil.charting.data.Entry
import com.github.mikephil.charting.data.LineData
import com.github.mikephil.charting.data.LineDataSet
import com.github.mikephil.charting.highlight.Highlight
import com.github.mikephil.charting.listener.OnChartValueSelectedListener
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView

class NativeLineChartView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
    private val chartView = LineChart(context)
    private val onPointSelected by EventDispatcher()
    private var lineWidth = 2f
    private var showGrid = true

    init {
        android.util.Log.d("NativeLineChartView", "Native view created")
        chartView.description.isEnabled = false
        chartView.legend.isEnabled = false
        chartView.axisRight.isEnabled = false
        chartView.setTouchEnabled(true)
        chartView.setHighlightPerTapEnabled(true)
        chartView.xAxis.position = com.github.mikephil.charting.components.XAxis.XAxisPosition.BOTTOM
        chartView.setOnChartValueSelectedListener(object : OnChartValueSelectedListener {
            override fun onValueSelected(e: Entry?, h: Highlight?) {
                val entry = e ?: return
                val index = chartView.data?.dataSets
                    ?.firstOrNull()
                    ?.let { dataSet ->
                        if (dataSet is LineDataSet) {
                            dataSet.values.indexOf(entry)
                        } else {
                            0
                        }
                    } ?: 0

                android.util.Log.d("NativeLineChartView", "Point selected: index=$index, x=${entry.x}, y=${entry.y}")
                onPointSelected(
                    mapOf(
                        "index" to index,
                        "x" to entry.x.toDouble(),
                        "y" to entry.y.toDouble(),
                    )
                )
            }

            override fun onNothingSelected() = Unit
        })
        android.util.Log.d("NativeLineChartView", "Listener attached (OnChartValueSelectedListener registered)")
        chartView.data = makeChartData(
            listOf(
                mapOf("x" to 0.0, "y" to 10.0),
                mapOf("x" to 1.0, "y" to 14.0),
                mapOf("x" to 2.0, "y" to 9.0),
                mapOf("x" to 3.0, "y" to 17.0),
            )
        )
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

    fun setData(value: List<Map<String, Double>>) {
        android.util.Log.d("NativeLineChartView", "Data updated with ${value.size} points")
        chartView.data = makeChartData(value)
        applyChartAppearance()
        chartView.notifyDataSetChanged()
        chartView.postInvalidate()
        chartView.invalidate()
    }

    fun resetZoom() {
        chartView.fitScreen()
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

    private fun makeChartData(points: List<Map<String, Double>>): LineData {
        val entries = points.mapNotNull { point ->
            val x = point["x"] ?: return@mapNotNull null
            val y = point["y"] ?: return@mapNotNull null
            Entry(x.toFloat(), y.toFloat())
        }

        val dataSet = LineDataSet(entries, "Sample").apply {
            lineWidth = this@NativeLineChartView.lineWidth
            circleRadius = 4f
            setDrawValues(false)
        }

        return LineData(dataSet)
    }

    override fun onDetachedFromWindow() {
        android.util.Log.d("NativeLineChartView", "Native view destroyed, listener detached")
        chartView.setOnChartValueSelectedListener(null)
        super.onDetachedFromWindow()
    }
}

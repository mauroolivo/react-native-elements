import { requireNativeViewManager } from "expo-modules-core";
import type { ReactElement } from "react";

import type { NativeLineChartProps } from "./NativeLineChart.types";

const NativeLineChartView = requireNativeViewManager<NativeLineChartProps>(
  "NativeLineChart",
  "NativeLineChartView",
);

export default function NativeLineChart(
  props: NativeLineChartProps,
): ReactElement {
  return <NativeLineChartView {...props} />;
}

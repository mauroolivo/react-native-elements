import { requireNativeViewManager } from "expo-modules-core";
import type { ReactElement, Ref } from "react";

import type {
  NativeLineChartProps,
  NativeLineChartRef,
} from "./NativeLineChart.types";

type NativeLineChartViewProps = NativeLineChartProps & {
  ref?: Ref<NativeLineChartRef>;
};

const NativeLineChartView = requireNativeViewManager<NativeLineChartViewProps>(
  "NativeLineChart",
  "NativeLineChartView",
);

export default function NativeLineChart(
  props: NativeLineChartProps & { ref?: Ref<NativeLineChartRef> },
): ReactElement {
  return <NativeLineChartView {...props} />;
}

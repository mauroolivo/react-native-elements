import type { ViewProps } from "react-native";

export type ChartPoint = {
  x: number;
  y: number;
};

export type NativeLineChartProps = ViewProps & {
  data?: ChartPoint[];
  lineWidth?: number;
  showGrid?: boolean;
};

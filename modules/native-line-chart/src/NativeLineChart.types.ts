import type { NativeSyntheticEvent, ViewProps } from "react-native";

export type ChartPoint = {
  x: number;
  y: number;
};

export type PointSelectedEvent = {
  index: number;
  x: number;
  y: number;
};

export type NativeLineChartProps = ViewProps & {
  data?: ChartPoint[];
  lineWidth?: number;
  showGrid?: boolean;
  onPointSelected?: (event: NativeSyntheticEvent<PointSelectedEvent>) => void;
};

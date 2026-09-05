import { Stack } from "expo-router";
import { useRef } from "react";
import { View } from "react-native";

import {
  NativeLineChart,
  type NativeLineChartRef,
} from "../../../modules/native-line-chart/src";
import { Button, Screen, Text } from "../../components/ui";

const generateSampleChartData = () =>
  Array.from({ length: 150 }, (_, index) => ({
    x: index,
    y: Math.floor((Math.sin(index * 0.4) + 1) * 50),
  }));

export default function NativeLineChartScreen() {
  const chartRef = useRef<NativeLineChartRef>(null);

  return (
    <Screen edges={["left", "right", "bottom"]}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Native Line Chart",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <View className="gap-sm px-lg py-lg">
        <Text variant="headlineLg">Native Line Chart</Text>
        <Text tone="muted">Stage 6: JS can call the native chart ref.</Text>
        <NativeLineChart
          style={{ height: 300 }}
          data={generateSampleChartData()}
          lineWidth={3}
          showGrid={false}
          ref={chartRef}
          onPointSelected={(event) => {
            console.log(event.nativeEvent);
          }}
        />
        <Button
          fullWidth={true}
          size="lg"
          onPress={() => {
            void chartRef.current?.resetZoom();
          }}
        >
          Reset zoom
        </Button>
      </View>
    </Screen>
  );
}

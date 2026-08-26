import { Stack } from "expo-router";
import { View } from "react-native";

import { NativeLineChart } from "../../../modules/native-line-chart/src";
import { Screen, Text } from "../../components/ui";

export default function NativeLineChartScreen() {
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
        <Text tone="muted">Stage 3: JS props update the native chart.</Text>
        <NativeLineChart
          style={{ height: 300 }}
          lineWidth={3}
          showGrid={false}
        />
      </View>
    </Screen>
  );
}

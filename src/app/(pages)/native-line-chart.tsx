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
        <Text tone="muted">Stage 4: JS data flows into the native chart.</Text>
        <NativeLineChart
          style={{ height: 300 }}
          data={[
            { x: 0, y: 10 },
            { x: 1, y: 14 },
            { x: 2, y: 9 },
            { x: 3, y: 17 },
          ]}
          lineWidth={3}
          showGrid={false}
          onPointSelected={(event) => {
            console.log(event.nativeEvent);
          }}
        />
      </View>
    </Screen>
  );
}

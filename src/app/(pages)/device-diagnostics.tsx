import { Stack } from "expo-router";
import { Platform, View } from "react-native";

import DeviceDiagnosticsModule from "../../../modules/device-diagnostics/src/DeviceDiagnosticsModule";
import { Screen, Text } from "../../components/ui";

export default function DeviceDiagnosticsScreen() {
  return (
    <Screen edges={["left", "right", "bottom"]}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Device Diagnostics",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <View className="gap-sm px-lg py-lg">
        <Text variant="headlineLg">Device Diagnostics</Text>
        <Text tone="muted">
          Stage 0 confirms that the local Expo module is available to the app.
        </Text>
        <Text>Module: {DeviceDiagnosticsModule ? "loaded" : "missing"}</Text>
        <Text>Platform: {Platform.OS}</Text>
        <Text tone="muted">Native functions will be added in Stage 1.</Text>
      </View>
    </Screen>
  );
}

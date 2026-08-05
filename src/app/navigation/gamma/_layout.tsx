import { Button, Screen, Text } from "@/components/ui";
import { Slot, useRouter } from "expo-router";
import { View } from "react-native";

export default function GammaLayout() {
  const router = useRouter();
  return (
    <Screen>
      <View className="flex-1 px-lg py-lg gap-md">
        <Text variant="headlineMd" tone="primary">
          Gamma: Slot + Relative Navigation
        </Text>
        <Text tone="muted">
          The layout below renders child routes via the Slot component.
        </Text>

        <View className="flex-1 rounded-card border border-border bg-surface p-md">
          <Slot />
        </View>
        <Button
          fullWidth={true}
          size="md"
          variant="ghost"
          onPress={() => router.dismissTo("/navigation")}
        >
          Back to Navigation Showcase (back)
        </Button>
      </View>
    </Screen>
  );
}

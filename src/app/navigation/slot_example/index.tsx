import { Button, Text } from "@/components/ui";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function GammaIndex() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center gap-md">
      <Text variant="titleLg">Gamma Home</Text>
      <Text tone="muted">
        This is the index child rendered inside the parent Slot.
      </Text>

      <Button
        fullWidth={true}
        size="md"
        onPress={() => router.push("/navigation/slot_example/details")}
      >
        Go to ./details
      </Button>
      <Button
        fullWidth={true}
        size="md"
        variant="secondary"
        onPress={() => router.push("/navigation/slot_example/settings")}
      >
        Go to ./settings
      </Button>
    </View>
  );
}

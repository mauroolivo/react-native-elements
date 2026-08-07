import { Button, Text } from "@/components/ui";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function GammaSettings() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center gap-md">
      <Text variant="titleLg">Settings Screen</Text>
      <Text tone="muted">This route is also rendered in the same Slot.</Text>

      <Button fullWidth={true} size="md" onPress={() => router.push("./")}>
        Go to ./ (index)
      </Button>
      <Button
        fullWidth={true}
        size="md"
        variant="secondary"
        onPress={() => router.push("./details")}
      >
        Go to ./details
      </Button>
    </View>
  );
}

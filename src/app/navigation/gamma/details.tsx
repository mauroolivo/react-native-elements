import { Button, Text } from "@/components/ui";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function GammaDetails() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center gap-md">
      <Text variant="titleLg">Details Screen</Text>
      <Text tone="muted">
        Relative navigation can jump to sibling routes from here.
      </Text>

      <Button
        fullWidth={true}
        size="md"
        onPress={() => router.push("./settings")}
      >
        Go to ./settings
      </Button>
      <Button
        fullWidth={true}
        size="md"
        variant="secondary"
        onPress={() => router.push("./")}
      >
        Go to ./ (index)
      </Button>
    </View>
  );
}

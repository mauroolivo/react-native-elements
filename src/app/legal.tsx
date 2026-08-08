import { Button, Screen, Text } from "@/components/ui";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function LegalScreen() {
  const router = useRouter();

  return (
    <Screen>
      <View className="flex-1 items-center justify-center px-lg gap-md">
        <Text variant="headlineMd" tone="primary">
          Legal
        </Text>
        <Text tone="muted" className="text-center">
          Global legal information and policies available from multiple app
          sections.
        </Text>
        <Button
          fullWidth={true}
          size="md"
          onPress={() => {
            router.back();
          }}
        >
          Back
        </Button>
      </View>
    </Screen>
  );
}

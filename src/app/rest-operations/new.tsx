import { useRouter } from "expo-router";
import { View } from "react-native";

import { Button, Screen, Text } from "@/components/ui";

export default function NewArticleScreen() {
  const router = useRouter();

  return (
    <Screen>
      <View className="flex-1 items-center justify-center px-lg">
        <Text variant="titleMd">New article</Text>
        <Text className="mt-sm text-center" tone="muted">
          The article form will be added in the next step.
        </Text>
        <Button className="mt-lg" variant="secondary" onPress={() => router.back()}>
          Back to articles
        </Button>
      </View>
    </Screen>
  );
}
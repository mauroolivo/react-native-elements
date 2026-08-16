import { Button, Screen, Text } from "@/components/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";

export default function LegalScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    source?: string;
    section?: string;
    mode?: string;
  }>();

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
        <View className="w-full rounded-card border border-border bg-surface p-lg gap-xs">
          <Text variant="titleMd">Route Params</Text>
          <Text tone="muted">source: {params.source ?? "-"}</Text>
          <Text tone="muted">section: {params.section ?? "-"}</Text>
          <Text tone="muted">mode: {params.mode ?? "-"}</Text>
        </View>
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

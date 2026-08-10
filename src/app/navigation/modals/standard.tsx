import { Button, Screen, Text } from "@/components/ui";
import { useRouter } from "expo-router";

export default function StandardModal() {
  const router = useRouter();

  return (
    <Screen className="p-lg justify-top gap-md">
      <Text variant="headlineMd" tone="primary">
        Standard Modal
      </Text>
      <Text tone="muted">
        This is the default modal presentation for focused actions such as
        confirmations or quick forms.
      </Text>
      <Button fullWidth={true} size="lg" onPress={() => router.back()}>
        Close modal
      </Button>
    </Screen>
  );
}

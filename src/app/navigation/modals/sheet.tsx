import { Button, Screen, Text } from "@/components/ui";
import { useRouter } from "expo-router";

export default function SheetModal() {
  const router = useRouter();

  return (
    <Screen className="p-lg gap-md">
      <Text variant="headlineMd" tone="primary">
        Form Sheet
      </Text>
      <Text tone="muted">
        This presentation opens as a bottom sheet and can snap between different
        detents.
      </Text>
      <Button fullWidth={true} size="lg" onPress={() => router.back()}>
        Close sheet
      </Button>
    </Screen>
  );
}

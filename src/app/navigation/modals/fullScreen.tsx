import { Button, Screen, Text } from "@/components/ui";
import { useRouter } from "expo-router";

export default function FullScreenModal() {
  const router = useRouter();

  return (
    <Screen className="p-lg justify-center gap-md">
      <Text variant="headlineMd" tone="primary">
        Full-screen Modal
      </Text>
      <Text tone="muted">
        Use this for immersive experiences that need the entire screen to focus
        the user on one task.
      </Text>
      <Button fullWidth={true} size="lg" onPress={() => router.back()}>
        Close modal
      </Button>
    </Screen>
  );
}

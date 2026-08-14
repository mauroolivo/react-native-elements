import { Screen, Text } from "@/components/ui";

export default function Page() {
  return (
    <Screen className="p-lg gap-md">
      <Text variant="headlineMd" tone="primary">
        Drawer Navigation
      </Text>
      <Text tone="muted">
        This is a simple example of a drawer navigation using Expo Router.
      </Text>
    </Screen>
  );
}

import { Screen, Text } from "@/components/ui";

export default function Page() {
  return (
    <Screen className="p-lg gap-md">
      <Text variant="headlineMd" tone="primary">
        Drawer Navigation Settings
      </Text>
      <Text tone="muted">
        This is the settings page for the drawer navigation.
      </Text>
    </Screen>
  );
}

import { Button, Screen, Text } from "@/components/ui";
import { useRouter } from "expo-router";

const modalPresets = [
  {
    id: "standard",
    label: "Standard modal presentation",
    href: "/navigation/modals/standard",
  },
  {
    id: "sheet",
    label: "Form sheet",
    href: "/navigation/modals/sheet",
  },
  {
    id: "fullScreen",
    label: "Full-screen modal",
    href: "/navigation/modals/fullScreen",
  },
] as const;

export default function Modals() {
  const router = useRouter();

  return (
    <Screen className="p-lg gap-md">
      <Text variant="headlineMd" tone="primary">
        Modal Showcase
      </Text>
      <Text tone="muted">
        Pick a presentation to preview how Expo Router can present a modal or
        sheet from the current navigation stack.
      </Text>

      {modalPresets.map((preset) => (
        <Button
          key={preset.id}
          fullWidth={true}
          size="lg"
          variant="secondary"
          onPress={() => router.push(preset.href)}
        >
          {preset.label}
        </Button>
      ))}
    </Screen>
  );
}

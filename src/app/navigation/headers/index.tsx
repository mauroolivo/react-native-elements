import { Button, Screen, Text } from "@/components/ui";
import { useRouter } from "expo-router";

const headerPresets = [
  {
    id: "brand",
    label: "Brand Colors",
  },
  {
    id: "actions",
    label: "Left + Right Actions",
  },
  {
    id: "minimal",
    label: "Minimal Back Button",
  },
] as const;

export default function Headers() {
  const router = useRouter();

  return (
    <Screen className="p-lg gap-md">
      <Text variant="headlineMd" tone="primary">
        Headers Showcase
      </Text>
      <Text tone="muted">
        Pick a preset to open an inner stack screen that configures header
        options dynamically.
      </Text>

      {headerPresets.map((preset) => (
        <Button
          key={preset.id}
          fullWidth={true}
          size="lg"
          variant="secondary"
          onPress={() =>
            router.push({
              pathname: "/navigation/headers/preview",
              params: {
                preset: preset.id,
              },
            })
          }
        >
          {preset.label}
        </Button>
      ))}
    </Screen>
  );
}

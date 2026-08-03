import { Stack } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, View } from "react-native";

import { Button, Card, Divider, Screen, Text } from "../../components/ui";
import {
    buttonShowcaseIcons,
    type AppSymbolName,
} from "../../theme/icons/AppIcons";

type ButtonIconProps = {
  size?: number;
  tintColor?: string;
  color?: string;
};

function ShowcaseIcon({
  name,
  size = 16,
  tintColor,
  color,
}: ButtonIconProps & { name: AppSymbolName }) {
  return (
    <SymbolView
      name={name}
      size={size}
      tintColor={color ?? tintColor}
      resizeMode="scaleAspectFit"
    />
  );
}

function SpinnerIcon({ size = 16, tintColor, color }: ButtonIconProps) {
  return (
    <ActivityIndicator
      size={Math.max(12, size - 2)}
      color={color ?? tintColor}
    />
  );
}

function showPressed(label: string) {
  Alert.alert("Button pressed", label);
}

export default function ButtonComponentShowcase() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingPress = () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Saved", "Composed loading demo completed.");
    }, 1400);
  };

  return (
    <Screen edges={["left", "right", "bottom"]}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Button Component",
          headerBackButtonDisplayMode: "minimal",
        }}
      />

      <ScrollView contentContainerClassName="gap-md px-lg py-lg">
        <View className="gap-xs pb-sm">
          <Text variant="headlineLg" tone="primary">
            Button Component
          </Text>
          <Text variant="bodySm" tone="muted">
            Exhaustive button states and composition patterns for the current
            primitive API.
          </Text>
        </View>

        <Card className="gap-md">
          <Text variant="titleMd">Variants</Text>

          <Button variant="primary" onPress={() => showPressed("Primary")}>
            Primary
          </Button>

          <Button variant="secondary" onPress={() => showPressed("Secondary")}>
            Secondary
          </Button>

          <Button variant="ghost" onPress={() => showPressed("Ghost")}>
            Ghost
          </Button>

          <Button variant="danger" onPress={() => showPressed("Danger")}>
            Danger
          </Button>
        </Card>

        <Card className="gap-md">
          <Text variant="titleMd">Sizes</Text>

          <Button size="sm" onPress={() => showPressed("Small")}>
            Small
          </Button>

          <Button size="md" onPress={() => showPressed("Medium")}>
            Medium
          </Button>

          <Button size="lg" onPress={() => showPressed("Large")}>
            Large
          </Button>
        </Card>

        <Card className="gap-md">
          <Text variant="titleMd">Width Behavior</Text>

          <Button fullWidth={true} onPress={() => showPressed("Full width")}>
            Full Width Button
          </Button>

          <Button onPress={() => showPressed("Intrinsic width")}>
            Intrinsic Width Button
          </Button>
        </Card>

        <Card className="gap-md">
          <Text variant="titleMd">Disabled and Composition</Text>

          <Button disabled={true}>Disabled Primary</Button>

          <Button variant="secondary" disabled={true}>
            Disabled Secondary
          </Button>

          <Divider />

          <Button onPress={() => showPressed("Custom content")}>
            <Text variant="labelMd" tone="inverse" className="font-semibold">
              Custom Child Content
            </Text>
          </Button>

          <Button
            variant="secondary"
            leadingIcon={<ShowcaseIcon name={buttonShowcaseIcons.favorite} />}
            trailingIcon={
              <ShowcaseIcon name={buttonShowcaseIcons.disclosure} />
            }
            onPress={() => showPressed("Custom icon content")}
          >
            Custom Content With Icons
          </Button>

          <Text variant="caption" tone="muted">
            Custom children keep full control while still inheriting
            variant-aware icon coloring and sizing.
          </Text>
        </Card>

        <Card className="gap-md">
          <Text variant="titleMd">Icon Placement</Text>

          <Button
            variant="primary"
            leadingIcon={<ShowcaseIcon name={buttonShowcaseIcons.download} />}
            onPress={() => showPressed("Leading icon")}
          >
            Download Report
          </Button>

          <Button
            variant="secondary"
            trailingIcon={<ShowcaseIcon name={buttonShowcaseIcons.continue} />}
            onPress={() => showPressed("Trailing icon")}
          >
            Continue
          </Button>

          <Button
            variant="ghost"
            leadingIcon={<ShowcaseIcon name={buttonShowcaseIcons.edit} />}
            trailingIcon={
              <ShowcaseIcon name={buttonShowcaseIcons.disclosure} />
            }
            onPress={() => showPressed("Dual icons")}
          >
            Edit Profile
          </Button>
        </Card>

        <Card className="gap-md">
          <Text variant="titleMd">Loading Pattern (Composed)</Text>

          <Button
            variant="primary"
            disabled={isLoading}
            leadingIcon={isLoading ? <SpinnerIcon /> : undefined}
            onPress={handleLoadingPress}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>

          <Text variant="caption" tone="muted">
            The primitive has no dedicated loading prop yet. Compose loading by
            toggling disabled state, leading icon, and label content together.
          </Text>

          <Text variant="caption" tone="muted">
            Press the button to trigger a short simulated async cycle.
          </Text>
        </Card>
      </ScrollView>
    </Screen>
  );
}

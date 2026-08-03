import { Stack } from "expo-router";
import { Alert, ScrollView, View } from "react-native";

import { Button, Card, Divider, Screen, Text } from "../../components/ui";

function showPressed(label: string) {
  Alert.alert("Button pressed", label);
}

export default function ButtonComponentShowcase() {
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
            <Text
              variant="labelMd"
              tone="primaryForeground"
              className="font-semibold"
            >
              Custom Child Content
            </Text>
          </Button>

          <Text variant="caption" tone="muted">
            Loading and icon-placement examples are not shown yet because this
            primitive currently has no loading prop and no icon tokens wired in
            this project.
          </Text>
        </Card>
      </ScrollView>
    </Screen>
  );
}

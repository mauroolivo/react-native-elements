import { Stack } from "expo-router";
import { ScrollView, View } from "react-native";

import { Card, Screen, Text } from "../../components/ui";
import { brandScale, neutralScale, semanticColors } from "../../theme/colors";

type TokenMap = Record<string, string>;

type TokenSectionProps = {
  title: string;
  description: string;
  tokens: TokenMap;
};

function getReadableTextColor(hex: string) {
  const normalized = hex.replace("#", "").trim();
  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);

  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

  return luminance < 0.55 ? "#ffffff" : "#0f172a";
}

function TokenSection({ title, description, tokens }: TokenSectionProps) {
  return (
    <Card className="gap-sm">
      <View className="gap-xxs">
        <Text variant="titleMd">{title}</Text>
        <Text tone="muted">{description}</Text>
      </View>

      {Object.entries(tokens).map(([name, value]) => (
        <View
          key={`${title}-${name}`}
          className="gap-xs rounded-control border border-border p-sm"
        >
          <View
            className="h-14 items-start justify-end rounded-control border border-border p-sm"
            style={{ backgroundColor: value }}
          >
            <Text
              style={{ color: getReadableTextColor(value) }}
              className="font-semibold"
            >
              {value}
            </Text>
          </View>
          <View className="flex-row items-center justify-between gap-sm">
            <Text variant="caption" tone="muted">
              {name}
            </Text>
            <Text variant="caption">{value}</Text>
          </View>
        </View>
      ))}
    </Card>
  );
}

export default function ColorTokensShowcase() {
  return (
    <Screen edges={["left", "right", "bottom"]}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Color Tokens",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <ScrollView contentContainerClassName="gap-md px-lg py-lg">
        <View className="gap-xs pb-sm">
          <Text variant="headlineLg" tone="primary">
            Color Tokens
          </Text>
          <Text tone="muted">
            Comprehensive inventory of scale and semantic tokens used by the
            design system.
          </Text>
        </View>

        <TokenSection
          title="Neutral Scale"
          description="Base slate scale used for surfaces, borders, and text hierarchy."
          tokens={neutralScale}
        />

        <TokenSection
          title="Brand Scale"
          description="Primary blue scale used for emphasis and action affordances."
          tokens={brandScale}
        />

        <TokenSection
          title="Semantic Colors - Light"
          description="All semantic tokens resolved for light theme contexts."
          tokens={semanticColors.light}
        />

        <TokenSection
          title="Semantic Colors - Dark"
          description="All semantic tokens resolved for dark theme contexts."
          tokens={semanticColors.dark}
        />
      </ScrollView>
    </Screen>
  );
}

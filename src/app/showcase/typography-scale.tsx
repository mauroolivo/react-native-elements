import { Stack } from "expo-router";
import { ScrollView, View } from "react-native";

import { Card, Divider, Screen, Text } from "../../components/ui";
import { typography, type TypographyToken } from "../../theme/typography";

const tokenOrder: TypographyToken[] = [
  "headlineLg",
  "headlineMd",
  "titleLg",
  "titleMd",
  "bodyLg",
  "bodyMd",
  "bodySm",
  "labelMd",
  "labelSm",
  "caption",
  "footnote",
  "overline",
];

const tokenSampleText: Record<TypographyToken, string> = {
  headlineLg: "Large headline for top-level page impact",
  headlineMd: "Medium headline for section-leading moments",
  titleLg: "Large title for card and panel headings",
  titleMd: "Medium title for compact section labels",
  bodyLg: "Large body for reading-first screens and onboarding paragraphs.",
  bodyMd: "Primary body style for most paragraphs and app copy.",
  bodySm: "Dense body style for supportive explanation and compact layouts.",
  labelMd: "Form labels, button labels, and tabs",
  labelSm: "Small control labels and metadata chips",
  caption: "Secondary metadata and compact helper context",
  footnote: "Fine print, validation details, and legal disclaimers",
  overline: "OVERLINE CATEGORY",
};

const toneOrder = [
  "default",
  "muted",
  "primary",
  "success",
  "warning",
  "danger",
] as const;

type ToneName = (typeof toneOrder)[number];

const toneSampleText: Record<ToneName, string> = {
  default: "Default tone for standard UI communication.",
  muted: "Muted tone for lower-priority support copy.",
  primary: "Primary tone for emphasis and highlighted actions.",
  success: "Success tone for positive completion feedback.",
  warning: "Warning tone for caution and edge-case messaging.",
  danger: "Danger tone for destructive or critical alerts.",
};

function TypeSpecimen({ tokenName }: { tokenName: TypographyToken }) {
  const token = typography[tokenName];

  return (
    <View className="gap-sm rounded-control border border-border bg-surfaceAlt p-md">
      <View className="flex-row items-center justify-between">
        <Text variant="overline" tone="muted">
          {tokenName}
        </Text>
        <Text variant="caption" tone="muted">
          {token.fontSize}px / {token.lineHeight}px
        </Text>
      </View>

      <Text variant={tokenName}>{tokenSampleText[tokenName]}</Text>

      <View className="flex-row flex-wrap gap-sm">
        <Text variant="footnote" tone="muted">
          weight: {token.fontWeight}
        </Text>
        {"letterSpacing" in token && typeof token.letterSpacing === "number" ? (
          <Text variant="footnote" tone="muted">
            letterSpacing: {token.letterSpacing}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

export default function TypographyScaleShowcase() {
  return (
    <Screen edges={["left", "right", "bottom"]}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Typography Scale",
          headerBackButtonDisplayMode: "minimal",
        }}
      />

      <ScrollView contentContainerClassName="gap-md px-lg py-lg">
        <View className="gap-xs pb-sm">
          <Text variant="headlineLg" tone="primary">
            Typography Scale
          </Text>
          <Text variant="bodySm" tone="muted">
            Expanded role-based typography tokens for headings, body copy,
            labels, metadata, and dense UI moments.
          </Text>
        </View>

        <Card className="gap-md">
          <View className="gap-xxs">
            <Text variant="titleMd">Token Specimens</Text>
            <Text variant="bodySm" tone="muted">
              Every token rendered with real copy and token metadata.
            </Text>
          </View>

          {tokenOrder.map((tokenName, index) => (
            <View key={tokenName} className="gap-sm">
              <TypeSpecimen tokenName={tokenName} />
              {index < tokenOrder.length - 1 ? <Divider /> : null}
            </View>
          ))}
        </Card>

        <Card className="gap-md">
          <View className="gap-xxs">
            <Text variant="titleMd">Tone Matrix</Text>
            <Text variant="bodySm" tone="muted">
              Common semantic tones on the `bodyMd` role.
            </Text>
          </View>

          {toneOrder.map((tone, index) => (
            <View key={tone} className="gap-sm">
              <View className="gap-xxs rounded-control border border-border bg-surfaceAlt p-md">
                <Text variant="labelSm" tone="muted">
                  {tone}
                </Text>
                <Text variant="bodyMd" tone={tone}>
                  {toneSampleText[tone]}
                </Text>
              </View>
              {index < toneOrder.length - 1 ? <Divider /> : null}
            </View>
          ))}
        </Card>

        <Card className="gap-md">
          <View className="gap-xxs">
            <Text variant="titleMd">App Content Stack</Text>
            <Text variant="bodySm" tone="muted">
              Example hierarchy in a realistic feed card layout.
            </Text>
          </View>

          <Text variant="overline" tone="primary">
            Release Notes
          </Text>
          <Text variant="titleLg">
            Better hierarchy now improves scanning, speed, and retention.
          </Text>
          <Text variant="bodyMd">
            This update introduces explicit text roles for headings, content,
            labels, and metadata. Teams can apply a consistent rhythm across
            forms, cards, lists, and detail screens without manually tuning
            sizes each time.
          </Text>
          <View className="flex-row items-center justify-between gap-sm">
            <Text variant="caption" tone="muted">
              Updated 2 hours ago
            </Text>
            <Text variant="footnote" tone="muted">
              4 min read
            </Text>
          </View>
        </Card>
      </ScrollView>
    </Screen>
  );
}

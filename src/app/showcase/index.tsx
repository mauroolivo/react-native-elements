import { Stack, useRouter, type Href } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";

import { Button, Card, Cell, HStack, Screen, Text } from "../../components/ui";
import { type ThemeMode } from "../../theme";
import { useTheme } from "../../theme/ThemeProvider";

type ShowcaseItem = {
  title: string;
  hint: string;
  href?: Href;
};

const showcaseItems: ShowcaseItem[] = [
  {
    title: "Color Tokens",
    hint: "Semantic colors, status roles, and state variants in light/dark.",
    href: "./showcase/color-tokens",
  },
  {
    title: "Typography Scale",
    hint: "Display, title, body, caption, overline hierarchy and readability.",
    href: "./showcase/typography-scale",
  },
  {
    title: "Spacing System",
    hint: "Layout rhythm, inset spacing, and stack consistency.",
  },
  {
    title: "Radius and Shape",
    hint: "Control, card, panel, pill, and shape language consistency.",
  },
  {
    title: "Shadows and Elevation",
    hint: "Depth levels, contrast, and elevation behavior across themes.",
    href: "./showcase/shadows-elevation",
  },
  {
    title: "Motion Tokens",
    hint: "Duration, easing, and interaction timing guidelines.",
  },
  {
    title: "Text Component",
    hint: "All text variants, tones, truncation, and accessibility checks.",
  },
  {
    title: "Button Component",
    hint: "Variants, sizes, disabled/loading states, and icon placements.",
  },
  {
    title: "Input Component",
    hint: "Label, hint, error, focus, and validation feedback states.",
  },
  {
    title: "Switch Component",
    hint: "On/off states, labels, hints, and disabled behavior.",
  },
  {
    title: "Badge Component",
    hint: "Semantic statuses, compact sizing, and inline usage patterns.",
  },
  {
    title: "Alert Component",
    hint: "Info, success, warning, danger messaging and call-to-action slots.",
  },
  {
    title: "Card and Surface",
    hint: "Container composition, elevation tiers, and content grouping.",
  },
  {
    title: "Cell and List Rows",
    hint: "Navigation rows, metadata rows, and disclosure behavior.",
  },
  {
    title: "Layout Primitives",
    hint: "Screen, Box, Stack, HStack, and Divider composition patterns.",
  },
  {
    title: "Loading States",
    hint: "Skeleton patterns and perceived performance strategies.",
  },
  {
    title: "Feedback Patterns",
    hint: "Toasts, banners, inline errors, and success confirmations.",
  },
  {
    title: "Navigation Patterns",
    hint: "Top bars, tabs, back behavior, and route transition consistency.",
  },
  {
    title: "Accessibility Audit",
    hint: "Contrast, touch targets, semantic roles, and screen reader support.",
  },
  {
    title: "Dark Mode Review",
    hint: "Visual parity, contrast tuning, and readability in dark environments.",
  },
];

const themeModeOptions: { mode: ThemeMode; label: string }[] = [
  { mode: "light", label: "Light" },
  { mode: "dark", label: "Dark" },
  { mode: "system", label: "System" },
];

export default function ShowcaseIndex() {
  const router = useRouter();
  const { resolvedTheme, setThemeMode, themeMode } = useTheme();

  return (
    <Screen edges={["left", "right", "bottom"]}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Showcase",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <ScrollView contentContainerClassName="gap-sm px-lg py-lg">
        <View className="gap-xs pb-sm">
          <Text variant="headlineLg" tone="primary">
            Showcase Index
          </Text>
          <Text tone="muted">
            Complete roadmap of design system showcase screens.
          </Text>
        </View>

        <Card className="gap-md">
          <View className="gap-xs">
            <Text variant="titleMd">Theme</Text>
            <Text tone="muted">
              Switch between Light, Dark, or System. Resolved: {resolvedTheme}.
            </Text>
          </View>

          <HStack className="flex-wrap gap-sm">
            {themeModeOptions.map(({ mode, label }) => (
              <Button
                key={mode}
                variant={themeMode === mode ? "primary" : "secondary"}
                size="sm"
                onPress={() => setThemeMode(mode)}
              >
                {label}
              </Button>
            ))}
          </HStack>
        </Card>

        {showcaseItems.map((item) => {
          const href = item.href;
          const content = (
            <Cell>
              <Cell.Content
                title={item.title}
                hint={item.hint}
                hasDisclosure={Boolean(href)}
                hasIcon={false}
              />
            </Cell>
          );

          if (!href) {
            return <View key={item.title}>{content}</View>;
          }

          return (
            <Pressable
              key={item.title}
              accessibilityRole="button"
              onPress={() => router.push(href)}
              className="active:opacity-85"
            >
              {content}
            </Pressable>
          );
        })}
      </ScrollView>
    </Screen>
  );
}

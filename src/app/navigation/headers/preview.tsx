import { Text } from "@/components/ui";
import { useTheme } from "@/theme/ThemeProvider";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Platform, Pressable, ScrollView, View } from "react-native";

type HeaderPreset = "brand" | "actions" | "minimal";

const defaultPreset: HeaderPreset = "brand";

const presetCopy: Record<
  HeaderPreset,
  {
    title: string;
    description: string;
    options: string[];
  }
> = {
  brand: {
    title: "Brand Colors",
    description:
      "Uses a branded background with custom tint and title style colors.",
    options: ["headerStyle", "headerTintColor", "headerTitleStyle", "title"],
  },
  actions: {
    title: "Header Actions",
    description:
      "Adds custom left and right header actions while keeping the back button visible.",
    options: ["headerLeft", "headerRight", "headerBackVisible", "title"],
  },
  minimal: {
    title: "Minimal Back Button",
    description:
      "Uses icon-only back button mode on iOS and hides the header shadow.",
    options: ["headerBackButtonDisplayMode", "headerShadowVisible", "title"],
  },
};

function toPreset(value: string | string[] | undefined): HeaderPreset {
  if (typeof value !== "string") {
    return defaultPreset;
  }

  if (value === "brand" || value === "actions" || value === "minimal") {
    return value;
  }

  return defaultPreset;
}

export default function HeaderPreviewScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ preset?: string }>();
  const preset = toPreset(params.preset);
  const current = presetCopy[preset];

  return (
    <>
      <Stack.Screen
        options={{
          ...(preset === "brand"
            ? {
                title: "Brand Header",
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.primaryForeground,
                headerTitleStyle: {
                  color: colors.primaryForeground,
                  fontWeight: "700",
                },
              }
            : {}),
          ...(preset === "actions"
            ? {
                title: "Header Actions",
                headerBackVisible: true,
                headerLeft: () => (
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => router.dismissTo("/navigation/headers")}
                  >
                    <Text variant="labelSm" tone="primary">
                      Menu
                    </Text>
                  </Pressable>
                ),
                headerRight: () => (
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => router.setParams({ preset: "minimal" })}
                  >
                    <Text variant="labelSm" tone="primary">
                      Edit
                    </Text>
                  </Pressable>
                ),
              }
            : {}),
          ...(preset === "minimal"
            ? {
                title: "Minimal Back",
                headerShadowVisible: false,
                ...(Platform.OS === "ios"
                  ? { headerBackButtonDisplayMode: "minimal" as const }
                  : {}),
              }
            : {}),
        }}
      />

      <ScrollView
        className="flex-1"
        contentInsetAdjustmentBehavior="automatic"
        contentContainerClassName="gap-md px-lg py-lg"
      >
        <View className="rounded-card border border-border bg-surface p-lg">
          <Text variant="titleLg" tone="primary">
            {current.title}
          </Text>
          <Text className="mt-xs" tone="muted">
            {current.description}
          </Text>
        </View>

        <View className="rounded-card border border-border bg-surface p-lg gap-sm">
          <Text variant="titleMd">Active options</Text>
          {current.options.map((optionName) => (
            <Text key={optionName} tone="muted">
              - {optionName}
            </Text>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

import { Text } from "@/components/ui";
import { AppSymbolIcon } from "@/theme/icons/AppIcons";
import { useTheme } from "@/theme/ThemeProvider";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Platform, Pressable, ScrollView, View } from "react-native";

type HeaderPreset = "brand" | "actions" | "minimal" | "minimal_actions";

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
  minimal_actions: {
    title: "Minimal Back + Actions",
    description:
      "Uses minimal back button plus two icon actions in the right header area.",
    options: [
      "headerBackButtonDisplayMode",
      "headerShadowVisible",
      "headerRight",
      "title",
    ],
  },
};

function toPreset(value: string | string[] | undefined): HeaderPreset {
  if (typeof value !== "string") {
    return defaultPreset;
  }

  if (
    value === "brand" ||
    value === "actions" ||
    value === "minimal" ||
    value === "minimal_actions"
  ) {
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
          ...(preset === "minimal_actions"
            ? {
                title: "Minimal + Actions",
                headerShadowVisible: false,
                ...(Platform.OS === "ios"
                  ? { headerBackButtonDisplayMode: "minimal" as const }
                  : {}),
                headerRight: () => (
                  <View className="flex-row items-center">
                    <Pressable
                      accessibilityRole="button"
                      hitSlop={10}
                      style={{
                        width: 40,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 20,
                      }}
                      onPress={() => console.log("Camera action pressed")}
                    >
                      <AppSymbolIcon
                        name={{
                          ios: "camera",
                          android: "photo_camera",
                          web: "photo_camera",
                        }}
                        size={22}
                        tintColor={colors.text}
                      />
                    </Pressable>
                    <Pressable
                      accessibilityRole="button"
                      hitSlop={10}
                      style={{
                        width: 40,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 20,
                        marginLeft: 8,
                      }}
                      onPress={() => console.log("Mic action pressed")}
                    >
                      <AppSymbolIcon
                        name={{
                          ios: "mic",
                          android: "mic",
                          web: "mic",
                        }}
                        size={22}
                        tintColor={colors.text}
                      />
                    </Pressable>
                  </View>
                ),
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

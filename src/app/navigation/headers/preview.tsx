import { Text } from "@/components/ui";
import { AppSymbolIcon } from "@/theme/icons/AppIcons";
import { useTheme } from "@/theme/ThemeProvider";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Modal, Platform, Pressable, ScrollView, View } from "react-native";

type HeaderPreset =
  | "brand"
  | "actions"
  | "minimal"
  | "minimal_actions"
  | "overflow_menu"
  | "logo_title";

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
  overflow_menu: {
    title: "Minimal Back + Overflow",
    description:
      "Uses a 3-dots action that opens a submenu with icon + label actions.",
    options: [
      "headerBackButtonDisplayMode",
      "headerShadowVisible",
      "headerRight",
      "title",
    ],
  },
  logo_title: {
    title: "Image Logo Title",
    description:
      "Replaces the text title with a brand-style header image logo.",
    options: ["headerTitle", "headerStyle", "headerTintColor"],
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
    value === "minimal_actions" ||
    value === "overflow_menu" ||
    value === "logo_title"
  ) {
    return value;
  }

  return defaultPreset;
}

export default function HeaderPreviewScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [isOverflowMenuOpen, setIsOverflowMenuOpen] = useState(false);
  const params = useLocalSearchParams<{ preset?: string }>();
  const preset = toPreset(params.preset);
  const current = presetCopy[preset];

  const closeOverflowMenu = () => {
    setIsOverflowMenuOpen(false);
  };

  const handleOverflowAction = (label: string) => {
    console.log(`Overflow action pressed: ${label}`);
    closeOverflowMenu();
  };

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
          ...(preset === "overflow_menu"
            ? {
                title: "Minimal + Overflow",
                headerShadowVisible: false,
                ...(Platform.OS === "ios"
                  ? { headerBackButtonDisplayMode: "minimal" as const }
                  : {}),
                headerRight: () => (
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
                    onPress={() => setIsOverflowMenuOpen(true)}
                  >
                    <AppSymbolIcon
                      name={{
                        ios: "ellipsis",
                        android: "more_vert",
                        web: "more_horiz",
                      }}
                      size={22}
                      tintColor={colors.text}
                    />
                  </Pressable>
                ),
              }
            : {}),
          ...(preset === "logo_title"
            ? {
                headerBackVisible: false,
                headerLeft: () => (
                  <Pressable
                    accessibilityRole="button"
                    hitSlop={10}
                    style={{
                      minWidth: 56,
                      height: 36,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 18,
                      marginLeft: 4,
                      paddingHorizontal: 6,
                    }}
                    onPress={() => {
                      if (router.canGoBack()) {
                        router.back();
                        return;
                      }

                      router.dismissTo("/navigation/headers");
                    }}
                  >
                    <AppSymbolIcon
                      name={{
                        ios: "chevron.left",
                        android: "arrow_back",
                        web: "arrow_back",
                      }}
                      size={18}
                      tintColor={colors.text}
                    />
                    <AppSymbolIcon
                      name={{
                        ios: "briefcase.fill",
                        android: "work",
                        web: "work",
                      }}
                      size={18}
                      tintColor={colors.text}
                    />
                  </Pressable>
                ),
                headerTitle: () => (
                  <Image
                    source={require("../../../../assets/images/brand-cola-logo.svg")}
                    style={{ width: 128, height: 36 }}
                    contentFit="contain"
                  />
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

      <Modal
        visible={preset === "overflow_menu" && isOverflowMenuOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={closeOverflowMenu}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            paddingTop: 96,
            paddingRight: 16,
          }}
          onPress={closeOverflowMenu}
        >
          <Pressable
            accessibilityRole="menu"
            style={{
              width: 220,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.surface,
              paddingVertical: 8,
            }}
            onPress={() => {}}
          >
            <Pressable
              accessibilityRole="menuitem"
              onPress={() => handleOverflowAction("select chat")}
              style={{
                minHeight: 44,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 12,
              }}
            >
              <AppSymbolIcon
                name={{
                  ios: "bubble.left.and.bubble.right",
                  android: "chat",
                  web: "chat",
                }}
                size={18}
                tintColor={colors.text}
              />
              <Text className="ml-sm">Select chat</Text>
            </Pressable>

            <Pressable
              accessibilityRole="menuitem"
              onPress={() => handleOverflowAction("select all")}
              style={{
                minHeight: 44,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 12,
              }}
            >
              <AppSymbolIcon
                name={{
                  ios: "checklist",
                  android: "select_all",
                  web: "select_all",
                }}
                size={18}
                tintColor={colors.text}
              />
              <Text className="ml-sm">Select all</Text>
            </Pressable>

            <Pressable
              accessibilityRole="menuitem"
              onPress={() => handleOverflowAction("create new")}
              style={{
                minHeight: 44,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 12,
              }}
            >
              <AppSymbolIcon
                name={{
                  ios: "square.and.pencil",
                  android: "note_add",
                  web: "edit_note",
                }}
                size={18}
                tintColor={colors.text}
              />
              <Text className="ml-sm">Create new</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

import { AppSymbolIcon, appIcons } from "@/theme/icons/AppIcons";
import { useTheme } from "@/theme/ThemeProvider";
import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function RestOperationsLayout() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        contentStyle: { backgroundColor: colors.background },
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { color: colors.text },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Articles",
          headerBackVisible: false,
          headerLeft: () => (
            <Pressable
              accessibilityLabel="Go back"
              accessibilityRole="button"
              hitSlop={8}
              onPress={() => router.back()}
            >
              <AppSymbolIcon
                name={appIcons.back}
                size={18}
                tintColor={colors.text}
              />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              accessibilityLabel="Add article"
              accessibilityRole="button"
              hitSlop={8}
              onPress={() => router.push("/rest-operations/edit")}
            >
              <AppSymbolIcon
                name={appIcons.plus}
                size={22}
                tintColor={colors.text}
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          title: "Article details",
        }}
      />
    </Stack>
  );
}

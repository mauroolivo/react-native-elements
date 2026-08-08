import { AppSymbolIcon, appIcons } from "@/theme/icons/AppIcons";
import { useTheme } from "@/theme/ThemeProvider";
import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function HeadersLayout() {
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
          title: "Stack Headers",
          headerBackVisible: false,
          headerLeft: () => (
            <Pressable
              accessibilityRole="button"
              hitSlop={8}
              onPress={() => router.dismissTo("/navigation")}
            >
              <AppSymbolIcon
                name={appIcons.back}
                size={18}
                tintColor={colors.text}
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="preview"
        options={{
          title: "Header Preview",
        }}
      />
    </Stack>
  );
}

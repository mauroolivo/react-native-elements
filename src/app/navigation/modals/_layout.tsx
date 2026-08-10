import { AppSymbolIcon, appIcons } from "@/theme/icons/AppIcons";
import { useTheme } from "@/theme/ThemeProvider";
import { Stack, router } from "expo-router";
import { Pressable } from "react-native";
export default function ModalsLayout() {
  const { colors } = useTheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Modal Showcase",
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
        name="standard"
        options={{
          headerShown: true,
          title: "Standard Modal",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="sheet"
        options={{
          headerShown: false,
          presentation: "formSheet",
          sheetAllowedDetents: [0.25, 0.5, 1],
          sheetInitialDetentIndex: 0,
          sheetGrabberVisible: true,
          sheetCornerRadius: 24,
        }}
      />
      <Stack.Screen
        name="sheetIntrinsic"
        options={{
          headerShown: false,
          presentation: "formSheet",
          gestureEnabled: true,
          contentStyle: {
            backgroundColor: colors.background,
          },
          sheetAllowedDetents: "fitToContents",
          sheetGrabberVisible: true,
          sheetCornerRadius: 24,
        }}
      />
      <Stack.Screen
        name="fullScreen"
        options={{
          title: "Full-screen Modal",
          presentation: "fullScreenModal",
        }}
      />
    </Stack>
  );
}

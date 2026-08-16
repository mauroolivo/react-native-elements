import { useTheme } from "@/theme/ThemeProvider";
import { Stack } from "expo-router";

export default function PagesLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { color: colors.text },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
      <Stack.Screen
        name="legal"
        options={{
          headerShown: true,
          title: "Legal",
          contentStyle: { backgroundColor: colors.background },
        }}
      />
      <Stack.Screen
        name="language"
        options={{
          headerShown: true,
          title: "Language",
          contentStyle: { backgroundColor: colors.background },
        }}
      />
      <Stack.Screen
        name="loaderSheet"
        options={{
          headerShown: false,
          presentation: "formSheet",
          sheetAllowedDetents: [0.35, 0.6],
          sheetInitialDetentIndex: 0,
          sheetGrabberVisible: true,
          sheetCornerRadius: 24,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
    </Stack>
  );
}

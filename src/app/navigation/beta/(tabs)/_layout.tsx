import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";

import { appIcons } from "@/theme";
import { useTheme } from "@/theme/ThemeProvider";

export default function TabLayout() {
  const { colors, resolvedTheme } = useTheme();

  return (
    <ThemeProvider value={resolvedTheme === "dark" ? DarkTheme : DefaultTheme}>
      <NativeTabs
        backgroundColor={colors.surface}
        iconColor={{
          default: colors.textMuted,
          selected: colors.primary,
        }}
        labelStyle={{
          default: {
            color: colors.textMuted,
          },
          selected: {
            color: colors.primary,
          },
        }}
        indicatorColor={colors.primary}
        rippleColor={colors.primaryHover}
      >
        <NativeTabs.Trigger name="index">
          <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            sf={appIcons.home.ios}
            md={appIcons.home.android}
          />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="settings">
          <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            sf={appIcons.settings.ios}
            md={appIcons.settings.android}
          />
        </NativeTabs.Trigger>
      </NativeTabs>
    </ThemeProvider>
  );
}

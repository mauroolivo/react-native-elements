import { Tabs } from "expo-router";
import { Platform, StyleSheet, Text, View } from "react-native";

import { AppSymbolIcon, appIcons } from "@/theme/icons/AppIcons";
import { useTheme } from "@/theme/ThemeProvider";

import {
  NotificationsCountProvider,
  useNotificationsCount,
} from "../NotificationsCountContext";

export default function TabLayout() {
  return (
    <NotificationsCountProvider>
      <TabsContent />
    </NotificationsCountProvider>
  );
}

function TabsContent() {
  const { colors } = useTheme();
  const { notificationsCount } = useNotificationsCount();
  const hasNotifications = notificationsCount > 0;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: { color: colors.text },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <AppSymbolIcon name={appIcons.home} size={28} tintColor={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <AppSymbolIcon
              name={appIcons.settings}
              size={28}
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarAccessibilityLabel: hasNotifications
            ? "Notifications"
            : "Notifications disabled",
          tabBarButton: hasNotifications
            ? undefined
            : (props: any) => (
                <View pointerEvents="none" style={styles.disabledTabButton}>
                  {props.children}
                </View>
              ),
          tabBarIcon: ({ color }) => (
            <View>
              <AppSymbolIcon
                size={28}
                name={appIcons.notifications}
                tintColor={hasNotifications ? color : colors.textMuted}
              />
              {hasNotifications ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{notificationsCount}</Text>
                </View>
              ) : null}
            </View>
          ),
          tabBarLabelStyle: {
            color: hasNotifications ? colors.text : colors.textMuted,
            opacity: hasNotifications ? 1 : 0.6,
          },
          tabBarItemStyle: {
            opacity: hasNotifications ? 1 : 0.6,
          },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  disabledTabButton: {
    opacity: 0.6,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Platform.OS === "ios" ? 4 : 0,
  },
  badge: {
    position: "absolute",
    right: -10,
    top: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#DC2626",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
});

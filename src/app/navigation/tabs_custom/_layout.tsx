import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { StyleSheet, Text } from "react-native";

import { useTheme } from "@/theme/ThemeProvider";

// Defining the layout of the custom tab navigator
export default function Layout() {
  const { colors } = useTheme();

  return (
    <Tabs>
      <TabSlot />
      <TabList style={[styles.tabList, { backgroundColor: colors.background }]}>
        <TabTrigger
          name="home"
          href="/navigation/tabs_custom"
          style={[
            styles.tab,
            styles.tabLeft,
            { backgroundColor: colors.surfaceAlt },
          ]}
        >
          <Text style={[styles.tabText, { color: colors.text }]}>Home</Text>
        </TabTrigger>
        <TabTrigger
          name="new_article"
          href="/navigation/tabs_custom/new_article"
          style={[
            styles.tab,
            styles.centerTab,
            { backgroundColor: colors.primary },
          ]}
        >
          <Text
            style={[styles.centerText, { color: colors.primaryForeground }]}
          >
            +
          </Text>
        </TabTrigger>
        <TabTrigger
          name="article"
          href="/navigation/tabs_custom/article"
          style={[
            styles.tab,
            styles.tabRight,
            { backgroundColor: colors.surfaceAlt },
          ]}
        >
          <Text style={[styles.tabText, { color: colors.text }]}>Article</Text>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabList: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "transparent",
    borderTopWidth: 0,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    minWidth: 88,
    alignItems: "center",
    justifyContent: "center",
  },
  tabLeft: {
    backgroundColor: "#f3f4f6",
  },
  tabRight: {
    backgroundColor: "#f3f4f6",
  },
  centerTab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2563eb",
    marginBottom: 8,
    shadowColor: "#000000",
    shadowOpacity: 0.16,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  tabText: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "600",
  },
  centerText: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 28,
  },
});

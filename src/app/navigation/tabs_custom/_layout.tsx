import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/theme/ThemeProvider";

// Defining the layout of the custom tab navigator
export default function Layout() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [isComposerOpen, setComposerOpen] = useState(false);

  return (
    <>
      <Tabs>
        <TabSlot />
        <TabList
          style={[styles.tabList, { backgroundColor: colors.background }]}
        >
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

          <Pressable
            accessibilityRole="button"
            onPress={() => setComposerOpen(true)}
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
          </Pressable>

          <TabTrigger
            name="article"
            href="/navigation/tabs_custom/article"
            style={[
              styles.tab,
              styles.tabRight,
              { backgroundColor: colors.surfaceAlt },
            ]}
          >
            <Text style={[styles.tabText, { color: colors.text }]}>
              Article
            </Text>
          </TabTrigger>
        </TabList>
      </Tabs>

      <Modal
        animationType="slide"
        onRequestClose={() => setComposerOpen(false)}
        transparent={true}
        visible={isComposerOpen}
      >
        <View style={styles.modalRoot}>
          <Pressable
            style={styles.backdrop}
            onPress={() => setComposerOpen(false)}
          />
          <View
            style={[
              styles.modalSheet,
              {
                backgroundColor: colors.background,
                paddingBottom: Math.max(insets.bottom, 12),
              },
            ]}
          >
            <View style={styles.modalGrabber} />
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Create Article
            </Text>
            <Text style={[styles.modalBody, { color: colors.textMuted }]}>
              This modal opens from the center tab action. The new_article tab
              is no longer used for navigation.
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => setComposerOpen(false)}
              style={[styles.modalButton, { backgroundColor: colors.primary }]}
            >
              <Text
                style={[
                  styles.modalButtonText,
                  { color: colors.primaryForeground },
                ]}
              >
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
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
  modalRoot: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(2, 6, 23, 0.45)",
  },
  modalSheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 10,
  },
  modalGrabber: {
    alignSelf: "center",
    width: 44,
    height: 6,
    borderRadius: 999,
    backgroundColor: "rgba(100, 116, 139, 0.45)",
    marginBottom: 6,
  },
  modalTitle: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "700",
  },
  modalBody: {
    fontSize: 16,
    lineHeight: 24,
  },
  modalButton: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginTop: 4,
  },
  modalButtonText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
  },
});

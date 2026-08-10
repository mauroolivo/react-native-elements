import { Button, Text } from "@/components/ui";
import { useTheme } from "@/theme/ThemeProvider";
import { useRouter } from "expo-router";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    useWindowDimensions,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PARAGRAPHS = [
  "This is a custom transparent overlay that simulates a form sheet.",
  "It grows with content until it reaches a maximum height, then only the body scrolls.",
  "Paragraph 1: The quick brown fox jumps over the lazy dog.",
  "Paragraph 2: The quick brown fox jumps over the lazy dog.",
  "Paragraph 3: The quick brown fox jumps over the lazy dog.",
  "Paragraph 4: The quick brown fox jumps over the lazy dog.",
  "Paragraph 5: The quick brown fox jumps over the lazy dog.",
  "Paragraph 6: The quick brown fox jumps over the lazy dog.",
  "Paragraph 7: The quick brown fox jumps over the lazy dog.",
] as const;

export default function OverlaySheetModal() {
  const router = useRouter();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const maxSheetHeight = Math.max(260, Math.floor(height * 0.9));
  const maxBodyHeight = Math.max(180, maxSheetHeight - 190);

  return (
    <View style={styles.overlayRoot}>
      <Pressable style={styles.backdrop} onPress={() => router.back()} />

      <View style={styles.bottomHost} pointerEvents="box-none">
        <View
          style={[
            styles.sheet,
            {
              backgroundColor: colors.background,
              maxHeight: maxSheetHeight,
              marginBottom: Math.max(insets.bottom, 10),
            },
          ]}
        >
          <View style={styles.grabberWrap}>
            <View style={styles.grabber} />
          </View>

          <View style={styles.headerArea}>
            <Text variant="headlineMd" tone="primary">
              Overlay Form Sheet
            </Text>
            <Text tone="muted">
              Transparent full-screen overlay + custom growing sheet behavior.
            </Text>
          </View>

          <View style={[styles.bodyViewport, { maxHeight: maxBodyHeight }]}>
            <ScrollView
              alwaysBounceVertical={false}
              bounces={false}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={true}
              contentInsetAdjustmentBehavior="never"
              automaticallyAdjustContentInsets={false}
              contentContainerStyle={[
                styles.bodyContent,
                { paddingBottom: Math.max(insets.bottom, 12) },
              ]}
            >
              {PARAGRAPHS.map((paragraph) => (
                <Text key={paragraph} tone="muted">
                  {paragraph}
                </Text>
              ))}
            </ScrollView>
          </View>

          <View style={styles.footerArea}>
            <Button fullWidth={true} size="lg" onPress={() => router.back()}>
              Close overlay
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayRoot: {
    flex: 1,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(2, 6, 23, 0.45)",
  },
  bottomHost: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 12,
  },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },
  grabberWrap: {
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 6,
  },
  grabber: {
    width: 44,
    height: 6,
    borderRadius: 999,
    backgroundColor: "rgba(100, 116, 139, 0.35)",
  },
  headerArea: {
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(15,23,42,0.08)",
  },
  bodyViewport: {
    overflow: "hidden",
  },
  bodyContent: {
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  footerArea: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(15,23,42,0.08)",
  },
});

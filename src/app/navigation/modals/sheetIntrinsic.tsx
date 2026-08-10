import { Button, Text } from "@/components/ui";
import { useTheme } from "@/theme/ThemeProvider";
import { useRouter } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    useWindowDimensions,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PARAGRAPHS = [
  "This sheet uses fitToContents and grows naturally from its intrinsic content size.",
  "When the content gets too long, only the body area scrolls while the sheet keeps a sensible maximum size.",
  "Paragraph 1: The quick brown fox jumps over the lazy dog.",
  "Paragraph 2: The quick brown fox jumps over the lazy dog.",
  "Paragraph 3: The quick brown fox jumps over the lazy dog.",
  "Paragraph 4: The quick brown fox jumps over the lazy dog.",
  "Paragraph 5: The quick brown fox jumps over the lazy dog.",
  "Paragraph 6: The quick brown fox jumps over the lazy dog.",
  "Paragraph 7: The quick brown fox jumps over the lazy dog.",
  "Paragraph 8: The quick brown fox jumps over the lazy dog.",
  "Paragraph 9: The quick brown fox jumps over the lazy dog.",
  "Paragraph 10: The quick brown fox jumps over the lazy dog.",
  "Paragraph 11: The quick brown fox jumps over the lazy dog.",
  "Paragraph 12: The quick brown fox jumps over the lazy dog.",
  "Paragraph 13: The quick brown fox jumps over the lazy dog.",
  "Paragraph 14: The quick brown fox jumps over the lazy dog.",
  "Paragraph 15: The quick brown fox jumps over the lazy dog.",
] as const;

export default function IntrinsicSheetModal() {
  const router = useRouter();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  // Sheet grows with content until this cap, then internal scrolling takes over.
  const maxSheetHeight = Math.max(220, Math.floor(height * 0.8));
  const maxBodyHeight = Math.max(160, maxSheetHeight - 100);

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.sheet,
          { backgroundColor: colors.background, maxHeight: maxSheetHeight },
        ]}
      >
        <View style={styles.headerArea}>
          <Text variant="headlineMd" tone="primary">
            Intrinsic Height Sheet
          </Text>
        </View>

        <View style={[styles.bodyViewport, { maxHeight: maxBodyHeight }]}>
          <ScrollView
            automaticallyAdjustContentInsets={false}
            contentInset={{ top: 0, left: 0, bottom: 0, right: 0 }}
            contentInsetAdjustmentBehavior="never"
            alwaysBounceVertical={false}
            bounces={false}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={true}
            scrollIndicatorInsets={{
              top: 0,
              left: 0,
              bottom: insets.bottom + 12,
              right: 0,
            }}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: insets.bottom + 24 },
            ]}
          >
            <Text tone="muted">
              This sheet grows with content until it reaches available space,
              then the body becomes scrollable.
            </Text>

            {PARAGRAPHS.map((paragraph) => (
              <Text key={paragraph} tone="muted">
                {paragraph}
              </Text>
            ))}

            <Button fullWidth={true} size="lg" onPress={() => router.back()}>
              Close sheet
            </Button>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  sheet: {
    borderRadius: 24,
  },
  headerArea: {
    paddingHorizontal: 16,
    paddingTop: 28,
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(15,23,42,0.08)",
    zIndex: 2,
  },
  bodyViewport: {
    overflow: "hidden",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 12,
  },
});

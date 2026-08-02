import { Stack } from "expo-router";
import { ScrollView, View } from "react-native";

import { Card, Divider, Screen, Text } from "../../components/ui";
import { type ThemeScheme } from "../../theme";
import { useTheme } from "../../theme/ThemeProvider";
import { shadowThemes, type ShadowToken } from "../../theme/shadows";

const shadowOrder: ShadowToken[] = ["none", "soft", "card", "lift"];

const previewSchemes: ThemeScheme[] = ["light", "dark"];

const usageGuide: Record<ShadowToken, { useFor: string; avoidFor: string }> = {
  none: {
    useFor: "Flat groups, inset sections, and rows where depth adds noise.",
    avoidFor: "Floating surfaces that should separate from the background.",
  },
  soft: {
    useFor: "Inline controls, quiet cards, and low-emphasis containers.",
    avoidFor: "Primary callouts that must read as elevated.",
  },
  card: {
    useFor: "Default panels, standard cards, and grouped content blocks.",
    avoidFor: "Transient overlays that need stronger depth separation.",
  },
  lift: {
    useFor: "Focused layers, sticky surfaces, and modal-like callouts.",
    avoidFor: "Dense lists where repeated heavy depth hurts readability.",
  },
};

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function ShadowTokenCard({ token }: { token: ShadowToken }) {
  const { useFor, avoidFor } = usageGuide[token];

  return (
    <Card className="gap-sm" shadow="none">
      <View className="gap-xxs">
        <Text variant="titleMd">{capitalize(token)}</Text>
        <Text variant="bodySm" tone="muted">
          Token guidance and platform values for {token}.
        </Text>
      </View>

      <View className="gap-sm rounded-control bg-surfaceAlt p-md">
        {previewSchemes.map((scheme) => {
          const shadow = shadowThemes[scheme][token];

          return (
            <View key={`${token}-${scheme}`} className="gap-xs">
              <Text variant="labelSm" tone="muted">
                {capitalize(scheme)}
              </Text>
              <View
                className="rounded-control border border-border bg-surfaceElevated p-lg"
                style={shadow}
              >
                <Text variant="labelMd">Preview surface</Text>
                <Text variant="bodySm" tone="muted">
                  Consistent depth target for the {scheme} scheme.
                </Text>
              </View>
              <Text variant="caption" tone="muted">
                color: {shadow.shadowColor ?? "none"} | opacity:{" "}
                {shadow.shadowOpacity ?? 0} | radius: {shadow.shadowRadius ?? 0}
                | offset: {shadow.shadowOffset?.width ?? 0},{" "}
                {shadow.shadowOffset?.height ?? 0} | elevation:{" "}
                {shadow.elevation ?? 0}
              </Text>
            </View>
          );
        })}
      </View>

      <View className="gap-xxs rounded-control border border-border bg-surfaceAlt p-sm">
        <Text variant="caption" tone="muted">
          Use for: {useFor}
        </Text>
        <Text variant="caption" tone="muted">
          Avoid for: {avoidFor}
        </Text>
      </View>
    </Card>
  );
}

function PrimitiveAudit() {
  const { scheme } = useTheme();

  return (
    <Card className="gap-md" shadow="none">
      <View className="gap-xxs">
        <Text variant="titleMd">Primitive Audit</Text>
        <Text variant="bodySm" tone="muted">
          The `Card` primitive now resolves its depth from theme tokens.
        </Text>
      </View>

      {(["soft", "card", "lift"] as const).map((token, index) => (
        <View key={token} className="gap-sm">
          <Card shadow={token} className="gap-xxs">
            <Text variant="labelMd">Card shadow: {token}</Text>
            <Text variant="bodySm" tone="muted">
              {`Applied via getShadowStyle("${token}", "${scheme}").`}
            </Text>
          </Card>
          {index < 2 ? <Divider /> : null}
        </View>
      ))}

      <View className="rounded-control border border-border bg-surfaceAlt p-sm">
        <Text variant="caption" tone="muted">
          Active scheme: {scheme}
        </Text>
        <Text variant="caption" tone="muted">
          Current card token values are read from `shadowThemes[{scheme}]`.
        </Text>
      </View>
    </Card>
  );
}

export default function ShadowsElevationShowcase() {
  const { resolvedTheme } = useTheme();

  return (
    <Screen edges={["left", "right", "bottom"]}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Shadows and Elevation",
          headerBackButtonDisplayMode: "minimal",
        }}
      />

      <ScrollView contentContainerClassName="gap-md px-lg py-lg">
        <View className="gap-xs pb-sm">
          <Text variant="headlineLg" tone="primary">
            Shadows and Elevation
          </Text>
          <Text variant="bodySm" tone="muted">
            Depth system audit across theme tokens, primitives, and platform
            behavior. Resolved theme: {resolvedTheme}.
          </Text>
        </View>

        <PrimitiveAudit />

        {shadowOrder.map((token) => (
          <ShadowTokenCard key={token} token={token} />
        ))}
      </ScrollView>
    </Screen>
  );
}

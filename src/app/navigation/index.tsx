import { Button, Screen, Text } from "@/components/ui";
import { AppSymbolIcon, appIcons } from "@/theme/icons/AppIcons";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <Screen>
      <View className="flex-1 items-center justify-center px-lg">
        <Text variant="headlineLg" tone="primary">
          Navigation Showcase
        </Text>
        <Text tone="muted" className="text-center">
          This is the navigation showcase for the React Native Elements design
          system.
        </Text>
        <Button
          className="mt-lg"
          fullWidth={true}
          size="lg"
          leadingIcon={<AppSymbolIcon name={appIcons.back} />}
          onPress={() => {
            router.back();
          }}
        >
          Back to Home
        </Button>
        <Button
          className="mt-md"
          fullWidth={true}
          size="lg"
          onPress={() => router.push("/navigation/tabs_js")}
        >
          Open Tabs Navigation (js)
        </Button>
        <Button
          className="mt-md"
          fullWidth={true}
          size="lg"
          onPress={() => router.push("/navigation/tabs_native")}
        >
          Open Tabs Navigation (native)
        </Button>
        <Button
          className="mt-md"
          fullWidth={true}
          size="lg"
          onPress={() => router.push("/navigation/tabs_custom")}
        >
          Open Tabs Navigation (custom)
        </Button>
        <Button
          className="mt-md"
          fullWidth={true}
          size="lg"
          onPress={() => router.push("/navigation/slot_example")}
        >
          Open Slot + Relative Navigation
        </Button>
      </View>
    </Screen>
  );
}

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
          leadingIcon={<AppSymbolIcon name={appIcons.back} />}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
              return;
            }
            router.replace("/");
          }}
        >
          Back to Home
        </Button>
      </View>
    </Screen>
  );
}

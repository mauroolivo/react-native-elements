import { useRouter } from "expo-router";
import { View } from "react-native";

import { Button, Screen } from "@/components/ui";

export default function Index() {
  const router = useRouter();

  return (
    <Screen>
      <View className="flex-1 items-center justify-center px-lg gap-4">
        <Button
          fullWidth={true}
          size="lg"
          onPress={() => router.push("./showcase")}
        >
          Open Design System Showcase
        </Button>
        <Button
          fullWidth={true}
          size="lg"
          onPress={() => router.push("./navigation")}
        >
          Open Navigation Showcase
        </Button>
      </View>
    </Screen>
  );
}

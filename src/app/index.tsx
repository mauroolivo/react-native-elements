import { useRouter } from "expo-router";
import { View } from "react-native";

import { Button, Screen } from "../components/ui";

export default function Index() {
  const router = useRouter();

  return (
    <Screen>
      <View className="flex-1 items-center justify-center px-lg">
        <Button fullWidth={true} onPress={() => router.push("./showcase")}>
          Open Design System Showcase
        </Button>
      </View>
    </Screen>
  );
}

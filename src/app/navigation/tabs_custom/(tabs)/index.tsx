import { Button, Screen, Text } from "@/components/ui";
import { useRouter } from "expo-router";
export default function Tab() {
  const router = useRouter();
  return (
    <Screen style={{ justifyContent: "center", alignItems: "center" }}>
      <Text>Tab Home</Text>
      <Button
        className="mt-lg"
        fullWidth={false}
        size="md"
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
            return;
          }
          router.replace("/");
        }}
      >
        Exit this tab
      </Button>
    </Screen>
  );
}

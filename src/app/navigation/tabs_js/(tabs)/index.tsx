import { Button, Screen, Text } from "@/components/ui";
import { useRouter } from "expo-router";

import { useNotificationsCount } from "../NotificationsCountContext";

export default function Tab() {
  const router = useRouter();
  const { notificationsCount, incrementNotifications } =
    useNotificationsCount();

  return (
    <Screen style={{ justifyContent: "center", alignItems: "center" }}>
      <Text>Tab Home</Text>
      <Text className="mt-sm">Notifications count: {notificationsCount}</Text>
      <Button
        className="mt-md"
        fullWidth={false}
        size="md"
        onPress={incrementNotifications}
      >
        Add Notification
      </Button>
      <Button
        className="mt-md"
        fullWidth={false}
        size="md"
        onPress={() => router.navigate("/legal")}
      >
        Open Legal (navigate)
      </Button>
      <Button
        className="mt-lg"
        fullWidth={false}
        size="md"
        onPress={() => {
          router.back();
        }}
      >
        Exit this tab
      </Button>
      <Button
        className="mt-md"
        fullWidth={false}
        size="md"
        onPress={() => router.dismissTo("/")}
      >
        Dismiss to home
      </Button>
    </Screen>
  );
}

import {
    Button,
    LoadingOverlayProvider,
    Screen,
    Text,
    withLoader,
} from "@/components/ui";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";

export default function LoaderSheet() {
  const router = useRouter();
  const [running, setRunning] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleLaunchLoader = () => {
    if (running) {
      return;
    }

    setRunning(true);

    void withLoader("Processing request...", async () => {
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 5000);
      });

      if (mountedRef.current) {
        setRunning(false);
        router.back();
      }
    });
  };

  return (
    <Screen className="p-lg gap-md">
      <Text variant="headlineMd" tone="primary">
        Loader Demo Sheet
      </Text>
      <Text tone="muted">
        Tap the button to show the global loader. After 5 seconds the loader
        hides and this sheet dismisses automatically.
      </Text>

      <Button fullWidth={true} size="lg" onPress={handleLaunchLoader}>
        {running ? "Loading..." : "Start 5s Loader"}
      </Button>

      <Button
        fullWidth={true}
        size="lg"
        variant="ghost"
        onPress={() => router.back()}
      >
        Close
      </Button>
      <LoadingOverlayProvider />
    </Screen>
  );
}

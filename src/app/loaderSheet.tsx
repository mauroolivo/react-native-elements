import {
    Button,
    LoadingOverlayProvider,
    Screen,
    Text,
    loadingOverlay,
} from "@/components/ui";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";

export default function LoaderSheet() {
  const router = useRouter();
  const [running, setRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      loadingOverlay.hide();
    };
  }, []);

  const handleLaunchLoader = () => {
    if (running) {
      return;
    }

    setRunning(true);
    loadingOverlay.show("Processing request...");

    timerRef.current = setTimeout(() => {
      loadingOverlay.hide();
      setRunning(false);
      timerRef.current = null;
      router.back();
    }, 5000);
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

import { Button, loadingOverlay } from "@/components/ui";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
export default function Tab() {
  const router = useRouter();
  const [runningLoader, setRunningLoader] = useState(false);
  const loaderTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (loaderTimerRef.current) {
        clearTimeout(loaderTimerRef.current);
        loaderTimerRef.current = null;
      }

      loadingOverlay.hide();
    };
  }, []);

  const handleOpenLoader = () => {
    if (runningLoader) {
      return;
    }

    setRunningLoader(true);
    loadingOverlay.show("Processing request...");

    loaderTimerRef.current = setTimeout(() => {
      loadingOverlay.hide();
      loaderTimerRef.current = null;
      setRunningLoader(false);
    }, 5000);
  };

  return (
    <View style={styles.container}>
      <Text>Tab Home</Text>
      <Button
        className="mt-md"
        fullWidth={false}
        size="md"
        onPress={() =>
          router.navigate({
            pathname: "/legal",
            params: {
              source: "tabs_native",
              section: "home",
              mode: "navigate",
            },
          })
        }
      >
        Open Legal (navigate)
      </Button>
      <Button
        className="mt-md"
        fullWidth={false}
        size="md"
        variant="secondary"
        onPress={handleOpenLoader}
      >
        {runningLoader ? "Loading..." : "Open Loader"}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

import { Button } from "@/components/ui";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
export default function Tab() {
  const router = useRouter();
  return (
    <View style={styles.container}>
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

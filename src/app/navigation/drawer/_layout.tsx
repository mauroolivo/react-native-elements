import { AppSymbolIcon, appIcons } from "@/theme/icons/AppIcons";
import { useTheme } from "@/theme/ThemeProvider";
import { useRouter } from "expo-router";
import {
  Drawer,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  type DrawerContentComponentProps,
} from "expo-router/drawer";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function ThemedDrawerContent(props: DrawerContentComponentProps) {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.surface }}
      edges={["top", "bottom"]}
    >
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingHorizontal: 12,
          paddingTop: 8,
          paddingBottom: 12,
        }}
      >
        <DrawerItem
          label="Exit"
          onPress={() => router.dismiss()}
          icon={({ color, size }) => (
            <AppSymbolIcon
              name={appIcons.close}
              size={size}
              tintColor={typeof color === "string" ? color : colors.text}
            />
          )}
          inactiveTintColor={colors.text}
          pressColor={colors.secondary}
        />
      </View>
    </SafeAreaView>
  );
}

export default function Layout() {
  const { colors } = useTheme();

  return (
    <Drawer
      drawerContent={(props) => <ThemedDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { color: colors.text },
        drawerStyle: { backgroundColor: colors.surface },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textMuted,
        drawerActiveBackgroundColor: colors.secondary,
      }}
    >
      <Drawer.Screen
        name="index" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Home",
          title: "Overview",
        }}
      />
      <Drawer.Screen
        name="settings" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Settings",
          title: "Settings",
        }}
      />
    </Drawer>
  );
}

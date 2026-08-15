import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Button, Screen } from "@/components/ui";
import { appIcons, AppSymbolIcon } from "@/theme/icons/AppIcons";

export default function Index() {
  const router = useRouter();
  const { t } = useTranslation("settings");

  return (
    <Screen>
      <View className="flex-1 items-center justify-center px-lg gap-4">
        <Button
          fullWidth={true}
          size="lg"
          onPress={() => router.push("/language")}
          leadingIcon={<AppSymbolIcon name={appIcons.language} />}
        >
          {t("language.title")}
        </Button>
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
          onPress={() => router.push("./showcase/internationalization")}
        >
          Open Internationalization Showcase
        </Button>
        <Button
          fullWidth={true}
          size="lg"
          onPress={() => router.push("./navigation")}
        >
          Open Navigation Showcase
        </Button>
        <Button
          fullWidth={true}
          size="lg"
          variant="secondary"
          onPress={() => router.push("/loaderSheet")}
        >
          Open Loader Form Sheet
        </Button>
        <Button
          fullWidth={true}
          size="lg"
          onPress={() =>
            router.push({
              pathname: "/legal",
              params: {
                source: "home",
                section: "policies",
                mode: "push",
              },
            })
          }
        >
          Open Legal (push)
        </Button>
      </View>
    </Screen>
  );
}

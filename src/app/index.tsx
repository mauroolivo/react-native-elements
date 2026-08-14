import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Button, HStack, Screen, Text } from "@/components/ui";
import { languageFlags } from "@/i18n";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useTheme } from "@/theme/ThemeProvider";

export default function Index() {
  const router = useRouter();
  const { t } = useTranslation("settings");
  const { language } = useLanguage();
  const { colors } = useTheme();

  return (
    <Screen>
      <View className="flex-1 items-center justify-center px-lg gap-4">
        <Button
          fullWidth={true}
          size="lg"
          onPress={() => router.push("/language")}
        >
          <HStack className="gap-sm">
            <Text>{languageFlags[language]}</Text>
            <Text style={{ color: colors.primaryForeground }}>
              {t("language.title")}
            </Text>
          </HStack>
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

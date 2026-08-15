import { Button, Screen, Stack, Text } from "@/components/ui";
import { languageFlags, type SupportedLanguage } from "@/i18n";
import { useLanguage } from "@/i18n/LanguageProvider";
import { appIcons, AppSymbolIcon } from "@/theme/icons/AppIcons";

import { useTranslation } from "react-i18next";

const languageOptions: SupportedLanguage[] = ["en", "it", "es"];

export default function Language() {
  const { t } = useTranslation("settings");
  const { languagePreference, resetToSystemLanguage, setLanguage } =
    useLanguage();

  return (
    <Screen className="p-lg">
      <Stack className="gap-lg">
        <Text variant="headlineMd" tone="primary">
          {t("language.title")}
        </Text>
        <Text tone="muted">{t("language.systemDefault")}</Text>

        <Stack className="gap-sm">
          <Button
            accessibilityState={{ selected: languagePreference === null }}
            fullWidth={true}
            variant={languagePreference === null ? "primary" : "secondary"}
            onPress={() => void resetToSystemLanguage()}
            leadingIcon={<AppSymbolIcon name={appIcons.language} />}
          >
            {t("language.systemDefault")}
          </Button>

          {languageOptions.map((option) => {
            const isSelected = languagePreference === option;

            return (
              <Button
                key={option}
                accessibilityState={{ selected: isSelected }}
                fullWidth={true}
                variant={isSelected ? "primary" : "secondary"}
                onPress={() => void setLanguage(option)}
                leadingIcon={<Text>{languageFlags[option]}</Text>}
              >
                {t(`language.options.${option}`)}
              </Button>
            );
          })}
        </Stack>
      </Stack>
    </Screen>
  );
}

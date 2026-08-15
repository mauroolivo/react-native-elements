import { ScrollView, View } from "react-native";

import { Button, Screen, Stack, Text } from "@/components/ui";
import { localeFlags, type SupportedLocale } from "@/i18n";
import { useLanguage } from "@/i18n/LanguageProvider";
import { appIcons, AppSymbolIcon } from "@/theme/icons/AppIcons";

import { useTranslation } from "react-i18next";

const localeOptions: SupportedLocale[] = [
  "en-US",
  "it-IT",
  "es-ES",
  "ru-RU",
  "sv-SE",
  "fi-FI",
];
const currencyByLocale: Record<SupportedLocale, string> = {
  "en-US": "USD",
  "it-IT": "EUR",
  "es-ES": "EUR",
  "ru-RU": "RUB",
  "sv-SE": "SEK",
  "fi-FI": "EUR",
};

function getNumberPart(
  locale: SupportedLocale,
  value: number,
  type: "group" | "decimal",
) {
  try {
    const formatter = new Intl.NumberFormat(locale);

    if (typeof formatter.formatToParts === "function") {
      const part = formatter
        .formatToParts(value)
        .find((item) => item.type === type);
      if (part?.value) {
        return part.value;
      }
    }
  } catch {
    // fallback below
  }

  if (type === "group") {
    return " ";
  }

  return ",";
}

function getCurrencySymbol(locale: SupportedLocale, currency: string) {
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
    });

    if (typeof formatter.formatToParts === "function") {
      const part = formatter
        .formatToParts(1)
        .find((item) => item.type === "currency");
      if (part?.value) {
        return part.value;
      }
    }
  } catch {
    // fallback below
  }

  const fallbackSymbols: Record<string, string> = {
    EUR: "€",
    RUB: "₽",
    USD: "$",
    SEK: "kr",
  };

  return fallbackSymbols[currency] ?? currency;
}

export default function Language() {
  const { t } = useTranslation("settings");
  const { locale, localePreference, resetToSystemLanguage, setLocale } =
    useLanguage();
  const currencyCode = currencyByLocale[locale];

  const localeData = {
    languageTag: locale,
    languageCode: locale.split("-")[0],
    textDirection: "ltr",
    digitGroupingSeparator: getNumberPart(locale, 1234567.89, "group"),
    decimalSeparator: getNumberPart(locale, 1.23, "decimal"),
    measurementSystem: "metric",
    currencyCode,
    currencySymbol: getCurrencySymbol(locale, currencyCode),
    regionCode: locale.split("-")[1] ?? "US",
    temperatureUnit: "celsius",
  };

  const localeRows = Object.entries(localeData).map(([label, value]) => ({
    label,
    value,
  }));

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="p-lg pb-2xl"
      >
        <Stack className="gap-lg">
          <Text variant="headlineMd" tone="primary">
            {t("language.title")}
          </Text>
          <Text tone="muted">{t("language.systemDefault")}</Text>

          <Stack className="gap-sm">
            <Button
              accessibilityState={{ selected: localePreference === null }}
              fullWidth={true}
              variant={localePreference === null ? "primary" : "secondary"}
              onPress={() => void resetToSystemLanguage()}
              leadingIcon={<AppSymbolIcon name={appIcons.language} />}
            >
              {t("language.systemDefault")}
            </Button>

            {localeOptions.map((option) => {
              const isSelected = localePreference === option;

              return (
                <Button
                  key={option}
                  accessibilityState={{ selected: isSelected }}
                  fullWidth={true}
                  variant={isSelected ? "primary" : "secondary"}
                  onPress={() => void setLocale(option)}
                  leadingIcon={<Text>{localeFlags[option]}</Text>}
                >
                  {t(`language.options.${option}`)}
                </Button>
              );
            })}
          </Stack>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="pb-sm"
          >
            <View className="min-w-full rounded-control border border-border bg-background p-sm">
              <Text variant="titleMd">Current locale data</Text>

              <View className="mt-sm gap-1">
                {localeRows.map(({ label, value }) => (
                  <View
                    key={label}
                    className="flex-row items-start gap-sm py-1"
                  >
                    <Text variant="bodySm" tone="muted" className="w-40">
                      {`${label}:`}
                    </Text>
                    <Text variant="bodySm" className="flex-1">
                      {String(value)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </Stack>
      </ScrollView>
    </Screen>
  );
}

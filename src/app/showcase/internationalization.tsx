import { Stack as RouterStack } from "expo-router";
import { ScrollView, View } from "react-native";

import { Card, Screen, Text } from "@/components/ui";
import { useLanguage } from "@/i18n/LanguageProvider";

const sampleNumber = 1234567.89;
const sampleCurrency = 4999.99;
const sampleDate = new Date("2026-08-14T18:45:00Z");
const people = ["Ada", "Lin", "Milo"];

const localeSamples = [
  { locale: "en-US", label: "English (US)" },
  { locale: "en-GB", label: "English (UK)" },
  { locale: "it-IT", label: "Italian" },
  { locale: "fr-FR", label: "French" },
  { locale: "de-DE", label: "German" },
  { locale: "ja-JP", label: "Japanese" },
  { locale: "ar-EG", label: "Arabic (Egypt)" },
] as const;

function formatRelativeTime(
  locale: string,
  value: number,
  unit: Intl.RelativeTimeFormatUnit,
) {
  const RelativeTimeFormatCtor =
    typeof Intl !== "undefined" ? Intl.RelativeTimeFormat : undefined;

  if (typeof RelativeTimeFormatCtor === "function") {
    return new RelativeTimeFormatCtor(locale, { numeric: "auto" }).format(
      value,
      unit,
    );
  }

  return `${value} ${unit}`;
}

function formatList(locale: string, values: string[]) {
  const ListFormatCtor =
    typeof Intl !== "undefined" ? Intl.ListFormat : undefined;

  if (typeof ListFormatCtor === "function") {
    return new ListFormatCtor(locale, {
      style: "long",
      type: "conjunction",
    }).format(values);
  }

  return values.join(", ");
}

function formatExamples(locale: string) {
  return [
    {
      label: "Number",
      value: new Intl.NumberFormat(locale).format(sampleNumber),
      detail: "Default decimal and grouping rules",
    },
    {
      label: "Currency",
      value: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
      }).format(sampleCurrency),
      detail: "Currency symbol placement and separators",
    },
    {
      label: "Percent",
      value: new Intl.NumberFormat(locale, {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 2,
      }).format(0.245),
      detail: "Different percent conventions",
    },
    {
      label: "Date",
      value: new Intl.DateTimeFormat(locale, {
        dateStyle: "full",
        timeStyle: "short",
      }).format(sampleDate),
      detail: "Date and time ordering",
    },
    {
      label: "Relative time",
      value: formatRelativeTime(locale, -2, "day"),
      detail: "Human-readable time shifts",
    },
    {
      label: "List",
      value: formatList(locale, people),
      detail: "Phrases and conjunctions vary by locale",
    },
  ];
}

export default function InternationalizationShowcase() {
  const { language } = useLanguage();

  const currentLocaleExamples = formatExamples(language);

  return (
    <Screen edges={["left", "right", "bottom"]}>
      <RouterStack.Screen
        options={{
          headerShown: true,
          title: "Internationalization",
        }}
      />

      <ScrollView contentContainerClassName="gap-md px-lg py-lg">
        <View className="gap-xs">
          <Text variant="headlineLg">Internationalization</Text>
          <Text tone="muted">
            Locale-aware formatting for numbers, currency, dates, and lists.
          </Text>
        </View>

        <Card className="gap-sm">
          <Text variant="titleMd">Current app locale</Text>
          <Text tone="muted">Active language: {language}</Text>

          {currentLocaleExamples.map(({ label, value, detail }) => (
            <View
              key={label}
              className="border border-border rounded-control p-sm gap-1"
            >
              <Text variant="labelMd">{label}</Text>
              <Text variant="bodyLg">{value}</Text>
              <Text tone="muted">{detail}</Text>
            </View>
          ))}
        </Card>

        <Card className="gap-sm">
          <Text variant="titleMd">Cross-locale comparison</Text>

          {localeSamples.map(({ locale, label }) => {
            const examples = formatExamples(locale);

            return (
              <View
                key={locale}
                className="border border-border rounded-control p-sm gap-1"
              >
                <Text variant="labelMd">{label}</Text>
                <Text tone="muted">{locale}</Text>
                {examples.slice(0, 3).map(({ label: exampleLabel, value }) => (
                  <Text key={`${locale}-${exampleLabel}`}>
                    {exampleLabel}: {value}
                  </Text>
                ))}
              </View>
            );
          })}
        </Card>

        <Card className="gap-sm">
          <Text variant="titleMd">Typical locale problems</Text>
          <Text tone="muted">
            The same value can be rendered with different decimal separators,
            currency placement, numbering systems, and text ordering depending
            on the locale. Arabic and Japanese examples are especially useful
            for checking right-to-left text and narrow digit spacing.
          </Text>
        </Card>
      </ScrollView>
    </Screen>
  );
}

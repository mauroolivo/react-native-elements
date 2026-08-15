import { Stack as RouterStack } from "expo-router";
import { ScrollView, View } from "react-native";

import { Card, Screen, Text } from "@/components/ui";

const sampleNumber = 1234567.89;
const people = ["Ada", "Lin", "Milo"];
const sampleDates = [
  new Date("2026-08-14T18:45:00Z"),
  new Date("2026-01-15T09:30:00Z"),
  new Date("2027-12-31T23:59:00Z"),
];
const sampleCurrencies = [
  { code: "EUR", amount: 4999.99 },
  { code: "USD", amount: 4999.99 },
  { code: "JPY", amount: 4999.99 },
  { code: "INR", amount: 4999.99 },
  { code: "CHF", amount: 4999.99 },
] as const;

const localeSamples = [
  { locale: "en-US", label: "English (US)" },
  { locale: "en-GB", label: "English (UK)" },
  { locale: "it-IT", label: "Italian" },
  { locale: "fr-FR", label: "French" },
  { locale: "de-DE", label: "German" },
  { locale: "ja-JP", label: "Japanese" },
  { locale: "ar-EG", label: "Arabic (Egypt)" },
] as const;

function formatPercent(locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(0.245);
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

function formatCurrencyExamples(locale: string) {
  return sampleCurrencies
    .map(({ code, amount }) =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: code,
      }).format(amount),
    )
    .join(" • ");
}

function formatDateExamples(locale: string) {
  return sampleDates
    .map((date) =>
      new Intl.DateTimeFormat(locale, {
        dateStyle: "full",
        timeStyle: "short",
      }).format(date),
    )
    .join(" | ");
}

function getLocaleComparison(locale: string) {
  return [
    {
      label: "Default decimal and grouping rules",
      value: new Intl.NumberFormat(locale).format(sampleNumber),
    },
    {
      label: "Currency symbol placement and separators",
      value: formatCurrencyExamples(locale),
    },
    {
      label: "Different percent conversion",
      value: formatPercent(locale),
    },
    {
      label: "Date and time ordering",
      value: formatDateExamples(locale),
    },
    {
      label: "Phrases and conjunctions",
      value: formatList(locale, people),
    },
  ];
}

export default function InternationalizationShowcase() {
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
          <Text variant="titleMd">Cross-locale comparison</Text>
          <Text tone="muted">
            Read each locale as a full example set to compare formatting
            patterns.
          </Text>

          {localeSamples.map(({ locale, label }) => {
            const comparison = getLocaleComparison(locale);

            return (
              <View
                key={locale}
                className="gap-sm rounded-card border border-border bg-surface p-sm"
              >
                <View className="gap-1">
                  <Text variant="titleMd">{label}</Text>
                  <Text tone="muted">{locale}</Text>
                </View>

                {comparison.map(({ label: metricLabel, value }) => (
                  <View
                    key={`${locale}-${metricLabel}`}
                    className="rounded-control border border-border bg-background p-sm gap-1"
                  >
                    <Text variant="labelSm">{metricLabel}</Text>
                    <Text variant="bodySm">{value}</Text>
                  </View>
                ))}
              </View>
            );
          })}
        </Card>

        <Card className="gap-sm">
          <Text variant="titleMd">Typical locale problems</Text>
          <Text tone="muted">
            The same value can be rendered with different decimal separators,
            currency placement, numbering systems, text ordering, and list
            conjunctions depending on the locale. Arabic and Japanese examples
            are especially useful for checking right-to-left text and narrow
            digit spacing.
          </Text>
        </Card>
      </ScrollView>
    </Screen>
  );
}

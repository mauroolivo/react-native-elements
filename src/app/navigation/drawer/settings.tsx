import { Screen, Text } from "@/components/ui";
import { useTranslation } from "react-i18next";

export default function Page() {
  const { t } = useTranslation("settings");

  return (
    <Screen className="p-lg">
      <Text variant="headlineMd" tone="primary">
        {t("title")}
      </Text>
      <Text tone="muted">{t("description")}</Text>
    </Screen>
  );
}

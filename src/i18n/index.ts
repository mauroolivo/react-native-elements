import { getLocales } from "expo-localization";
import i18nextInstance, {
  changeLanguage,
  init,
  use as registerI18nPlugin,
} from "i18next";
import { initReactI18next } from "react-i18next";

import enErrors from "./locales/en-US/errors.json";
import enSettings from "./locales/en-US/settings.json";
import enShared from "./locales/en-US/shared.json";
import esErrors from "./locales/es-ES/errors.json";
import esSettings from "./locales/es-ES/settings.json";
import esShared from "./locales/es-ES/shared.json";
import fiErrors from "./locales/fi-FI/errors.json";
import fiSettings from "./locales/fi-FI/settings.json";
import fiShared from "./locales/fi-FI/shared.json";
import itErrors from "./locales/it-IT/errors.json";
import itSettings from "./locales/it-IT/settings.json";
import itShared from "./locales/it-IT/shared.json";
import ruErrors from "./locales/ru-RU/errors.json";
import ruSettings from "./locales/ru-RU/settings.json";
import ruShared from "./locales/ru-RU/shared.json";
import svErrors from "./locales/sv-SE/errors.json";
import svSettings from "./locales/sv-SE/settings.json";
import svShared from "./locales/sv-SE/shared.json";

export const supportedLocales = [
  "en-US",
  "it-IT",
  "es-ES",
  "ru-RU",
  "sv-SE",
  "fi-FI",
] as const;
export type SupportedLocale = (typeof supportedLocales)[number];
export const localeFlags: Record<SupportedLocale, string> = {
  "en-US": "🇺🇸",
  "it-IT": "🇮🇹",
  "es-ES": "🇪🇸",
  "ru-RU": "🇷🇺",
  "sv-SE": "🇸🇪",
  "fi-FI": "🇫🇮",
};

const defaultLocale: SupportedLocale = "en-US";

const resources = {
  "en-US": {
    shared: enShared,
    settings: enSettings,
    errors: enErrors,
  },
  "it-IT": {
    shared: itShared,
    settings: itSettings,
    errors: itErrors,
  },
  "es-ES": {
    shared: esShared,
    settings: esSettings,
    errors: esErrors,
  },
  "ru-RU": {
    shared: ruShared,
    settings: ruSettings,
    errors: ruErrors,
  },
  "sv-SE": {
    shared: svShared,
    settings: svSettings,
    errors: svErrors,
  },
  "fi-FI": {
    shared: fiShared,
    settings: fiSettings,
    errors: fiErrors,
  },
} as const;

export function isSupportedLocale(
  language: string | null | undefined,
): language is SupportedLocale {
  return supportedLocales.some(
    (supportedLocale) => supportedLocale === language,
  );
}

export function getDeviceLocale(): SupportedLocale {
  const deviceLocale = getLocales()[0];
  const languageTag = deviceLocale?.languageTag;

  if (isSupportedLocale(languageTag)) {
    return languageTag;
  }

  const languageCode = deviceLocale?.languageCode;
  return (
    supportedLocales.find((supportedLocale) =>
      supportedLocale.startsWith(`${languageCode}-`),
    ) ?? defaultLocale
  );
}

registerI18nPlugin(initReactI18next);
void init({
  compatibilityJSON: "v4",
  lng: getDeviceLocale(),
  fallbackLng: defaultLocale,
  supportedLngs: supportedLocales,
  defaultNS: "shared",
  ns: ["shared", "settings", "errors"],
  resources,
  interpolation: {
    escapeValue: false,
  },
});

i18nextInstance.services.formatter?.add("number", (value, lng) =>
  new Intl.NumberFormat(lng).format(value as number),
);

export function changeAppLanguage(locale: SupportedLocale): Promise<unknown> {
  return changeLanguage(locale);
}

export default i18nextInstance;

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "shared";
    resources: (typeof resources)["en-US"];
  }
}

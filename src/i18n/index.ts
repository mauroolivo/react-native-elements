import { getLocales } from "expo-localization";
import i18nextInstance, {
    changeLanguage,
    init,
    use as registerI18nPlugin,
} from "i18next";
import { initReactI18next } from "react-i18next";

import enErrors from "./locales/en/errors.json";
import enSettings from "./locales/en/settings.json";
import enShared from "./locales/en/shared.json";
import esErrors from "./locales/es/errors.json";
import esSettings from "./locales/es/settings.json";
import esShared from "./locales/es/shared.json";
import itErrors from "./locales/it/errors.json";
import itSettings from "./locales/it/settings.json";
import itShared from "./locales/it/shared.json";

export const supportedLanguages = ["en", "it", "es"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];
export const languageFlags: Record<SupportedLanguage, string> = {
  en: "🇬🇧",
  it: "🇮🇹",
  es: "🇪🇸",
};

const defaultLanguage: SupportedLanguage = "en";

const resources = {
  en: {
    shared: enShared,
    settings: enSettings,
    errors: enErrors,
  },
  it: {
    shared: itShared,
    settings: itSettings,
    errors: itErrors,
  },
  es: {
    shared: esShared,
    settings: esSettings,
    errors: esErrors,
  },
} as const;

function isSupportedLanguage(
  language: string | null | undefined,
): language is SupportedLanguage {
  return supportedLanguages.some(
    (supportedLanguage) => supportedLanguage === language,
  );
}

export function getDeviceLanguage(): SupportedLanguage {
  const languageCode = getLocales()[0]?.languageCode;
  return isSupportedLanguage(languageCode) ? languageCode : defaultLanguage;
}

registerI18nPlugin(initReactI18next);
void init({
  compatibilityJSON: "v4",
  lng: getDeviceLanguage(),
  fallbackLng: defaultLanguage,
  supportedLngs: supportedLanguages,
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

export function changeAppLanguage(
  language: SupportedLanguage,
): Promise<unknown> {
  return changeLanguage(language);
}

export default i18nextInstance;

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "shared";
    resources: (typeof resources)["en"];
  }
}

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { I18nextProvider } from "react-i18next";

import i18nextInstance, {
  changeAppLanguage,
  getDeviceLocale,
  isSupportedLocale,
  type SupportedLocale,
} from "./index";

const LANGUAGE_STORAGE_KEY = "app:language";

type LanguageContextValue = {
  locale: SupportedLocale;
  localePreference: SupportedLocale | null;
  setLocale: (locale: SupportedLocale) => Promise<void>;
  resetToSystemLanguage: () => Promise<void>;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

type LanguageProviderProps = {
  children: ReactNode;
  onLanguageReady?: () => void;
};

export function LanguageProvider({
  children,
  onLanguageReady,
}: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<SupportedLocale>(getDeviceLocale());
  const [localePreference, setLocalePreference] =
    useState<SupportedLocale | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function hydrateLanguage() {
      try {
        const storedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);

        if (isMounted && isSupportedLocale(storedLanguage)) {
          await changeAppLanguage(storedLanguage);
          setLocaleState(storedLanguage);
          setLocalePreference(storedLanguage);
        }
      } finally {
        if (isMounted) {
          setIsHydrated(true);
        }
      }
    }

    void hydrateLanguage();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isHydrated) {
      onLanguageReady?.();
    }
  }, [isHydrated, onLanguageReady]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      localePreference,
      setLocale: async (nextLocale) => {
        await changeAppLanguage(nextLocale);
        await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, nextLocale);
        setLocaleState(nextLocale);
        setLocalePreference(nextLocale);
      },
      resetToSystemLanguage: async () => {
        const deviceLocale = getDeviceLocale();
        await changeAppLanguage(deviceLocale);
        await AsyncStorage.removeItem(LANGUAGE_STORAGE_KEY);
        setLocaleState(deviceLocale);
        setLocalePreference(null);
      },
    }),
    [locale, localePreference],
  );

  if (!isHydrated) {
    return null;
  }

  return (
    <LanguageContext.Provider value={value}>
      <I18nextProvider i18n={i18nextInstance}>{children}</I18nextProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}

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
    getDeviceLanguage,
    type SupportedLanguage,
} from "./index";

const LANGUAGE_STORAGE_KEY = "app:language";

type LanguageContextValue = {
  language: SupportedLanguage;
  languagePreference: SupportedLanguage | null;
  setLanguage: (language: SupportedLanguage) => Promise<void>;
  resetToSystemLanguage: () => Promise<void>;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

type LanguageProviderProps = {
  children: ReactNode;
  onLanguageReady?: () => void;
};

function isSupportedLanguage(value: string | null): value is SupportedLanguage {
  return value === "en" || value === "it" || value === "es";
}

export function LanguageProvider({
  children,
  onLanguageReady,
}: LanguageProviderProps) {
  const [language, setLanguageState] =
    useState<SupportedLanguage>(getDeviceLanguage());
  const [languagePreference, setLanguagePreference] =
    useState<SupportedLanguage | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function hydrateLanguage() {
      try {
        const storedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);

        if (isMounted && isSupportedLanguage(storedLanguage)) {
          await changeAppLanguage(storedLanguage);
          setLanguageState(storedLanguage);
          setLanguagePreference(storedLanguage);
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
      language,
      languagePreference,
      setLanguage: async (nextLanguage) => {
        await changeAppLanguage(nextLanguage);
        await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
        setLanguageState(nextLanguage);
        setLanguagePreference(nextLanguage);
      },
      resetToSystemLanguage: async () => {
        const deviceLanguage = getDeviceLanguage();
        await changeAppLanguage(deviceLanguage);
        await AsyncStorage.removeItem(LANGUAGE_STORAGE_KEY);
        setLanguageState(deviceLanguage);
        setLanguagePreference(null);
      },
    }),
    [language, languagePreference],
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

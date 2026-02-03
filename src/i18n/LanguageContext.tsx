import { createContext, useContext, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Language, Translations, translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'eisenhower-language';

const SUPPORTED_LANGUAGES: Language[] = ['en', 'zh', 'hi', 'es', 'fr', 'ar', 'bn', 'de', 'it', 'pt', 'nl', 'pl', 'ru', 'uk'];

function getBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const browserLang = navigator.language.split('-')[0] as Language;
  return SUPPORTED_LANGUAGES.includes(browserLang) ? browserLang : 'en';
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useLocalStorage<Language>(STORAGE_KEY, getBrowserLanguage());

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, [setLanguageState]);

  useEffect(() => {
    // Update html lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextType>(() => ({
    language,
    setLanguage,
    t: translations[language],
  }), [language, setLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

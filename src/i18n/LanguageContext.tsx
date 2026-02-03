import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
  const browserLang = navigator.language.split('-')[0] as Language;
  return SUPPORTED_LANGUAGES.includes(browserLang) ? browserLang : 'en';
}

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  const stored = localStorage.getItem(STORAGE_KEY) as Language;
  if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
    return stored;
  }

  return getBrowserLanguage();
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  useEffect(() => {
    // Update html lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

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

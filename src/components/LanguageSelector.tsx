import { useLanguage, Language } from '@/i18n';
import { Button } from './ui/button';

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const currentIndex = LANGUAGES.findIndex((l) => l.code === language);
  const nextLanguage = LANGUAGES[(currentIndex + 1) % LANGUAGES.length];

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setLanguage(nextLanguage.code)}
      className="border-white/60 bg-white/70 backdrop-blur-md transition-all duration-200 hover:bg-white/90 hover:shadow-lg hover:shadow-black/5 dark:border-slate-700/60 dark:bg-slate-800/70 dark:hover:bg-slate-800/90"
      title={nextLanguage.label}
    >
      <span className="text-base">{LANGUAGES.find((l) => l.code === language)?.flag}</span>
      <span className="sr-only">
        Switch to {nextLanguage.label}
      </span>
    </Button>
  );
}

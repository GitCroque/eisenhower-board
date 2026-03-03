import { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage, Language } from '@/i18n';
import { Button } from './ui/button';

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'bn', label: 'বাংলা', flag: '🇧🇩' },
];

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const currentLanguage = LANGUAGES.find((l) => l.code === language);

  // Close on outside click (only when open)
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Focus management when opening/closing
  useEffect(() => {
    if (isOpen) {
      const currentIndex = LANGUAGES.findIndex((l) => l.code === language);
      setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
      requestAnimationFrame(() => {
        optionRefs.current[currentIndex >= 0 ? currentIndex : 0]?.focus();
      });
    } else {
      setFocusedIndex(-1);
    }
  }, [isOpen, language]);

  const handleSelect = useCallback((code: Language) => {
    setLanguage(code);
    setIsOpen(false);
    buttonRef.current?.focus();
  }, [setLanguage]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const next = (focusedIndex + 1) % LANGUAGES.length;
        setFocusedIndex(next);
        optionRefs.current[next]?.focus();
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const prev = (focusedIndex - 1 + LANGUAGES.length) % LANGUAGES.length;
        setFocusedIndex(prev);
        optionRefs.current[prev]?.focus();
        break;
      }
      case 'Home': {
        e.preventDefault();
        setFocusedIndex(0);
        optionRefs.current[0]?.focus();
        break;
      }
      case 'End': {
        e.preventDefault();
        const last = LANGUAGES.length - 1;
        setFocusedIndex(last);
        optionRefs.current[last]?.focus();
        break;
      }
      case 'Escape': {
        e.preventDefault();
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      }
      case 'Enter':
      case ' ': {
        e.preventDefault();
        if (focusedIndex >= 0) {
          handleSelect(LANGUAGES[focusedIndex].code);
        }
        break;
      }
    }
  }, [isOpen, focusedIndex, handleSelect]);

  return (
    <div className="relative" ref={menuRef} onKeyDown={handleKeyDown}>
      <Button
        ref={buttonRef}
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="border-white/60 bg-white/70 backdrop-blur-md transition-all duration-200 hover:bg-white/90 hover:shadow-lg hover:shadow-black/5 dark:border-slate-700/60 dark:bg-slate-800/70 dark:hover:bg-slate-800/90"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-base">{currentLanguage?.flag}</span>
        <span className="sr-only">{t.accessibility.selectLanguage}</span>
      </Button>

      {isOpen && (
        <div
          className="absolute right-0 top-full z-50 mt-2 min-w-[140px] overflow-hidden rounded-lg border border-white/60 bg-white/90 shadow-lg backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-800/90"
          role="listbox"
          aria-label={t.accessibility.selectLanguage}
          aria-activedescendant={focusedIndex >= 0 ? `lang-option-${LANGUAGES[focusedIndex].code}` : undefined}
        >
          {LANGUAGES.map((lang, index) => (
            <button
              key={lang.code}
              id={`lang-option-${lang.code}`}
              ref={(el) => { optionRefs.current[index] = el; }}
              onClick={() => handleSelect(lang.code)}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10 ${
                lang.code === language ? 'bg-black/10 dark:bg-white/20' : ''
              } ${index === focusedIndex ? 'outline-none ring-2 ring-inset ring-blue-500' : ''}`}
              role="option"
              aria-selected={lang.code === language}
              tabIndex={index === focusedIndex ? 0 : -1}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

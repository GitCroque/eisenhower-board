import type { Language } from '@/i18n';

type DateStyle = 'date' | 'dateTime' | 'dateTimeLong';

const STYLE_OPTIONS: Record<DateStyle, Intl.DateTimeFormatOptions> = {
  date: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
  dateTime: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  },
  dateTimeLong: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  },
};

export function formatDate(timestamp: number, language: Language, style: DateStyle = 'date'): string {
  return new Date(timestamp).toLocaleString(language, STYLE_OPTIONS[style]);
}

export type Language = 'en' | 'zh' | 'hi' | 'es' | 'fr' | 'ar' | 'bn' | 'de' | 'it' | 'pt' | 'nl' | 'pl' | 'ru' | 'uk';

export interface Translations {
  // Header
  title: string;
  subtitle: string;

  // Quadrants
  quadrants: {
    urgentImportant: {
      title: string;
      description: string;
    };
    notUrgentImportant: {
      title: string;
      description: string;
    };
    urgentNotImportant: {
      title: string;
      description: string;
    };
    notUrgentNotImportant: {
      title: string;
      description: string;
    };
  };

  // Axes
  axes: {
    important: string;
    notImportant: string;
    urgent: string;
    notUrgent: string;
  };

  // Tasks
  tasks: {
    noTasks: string;
    addTask: string;
    enterTask: string;
    add: string;
    cancel: string;
    editTask: string;
    deleteTask: string;
    completeTask: string;
  };

  // Theme
  theme: {
    toggle: string;
  };

  // Dialogs
  dialogs: {
    deleteConfirmTitle: string;
    deleteConfirmDescription: string;
    confirm: string;
    cancel: string;
  };

  // Toasts
  toasts: {
    taskAdded: string;
    taskDeleted: string;
    taskMoved: string;
    taskCompleted: string;
    error: string;
  };

  // Error Boundary
  errorBoundary: {
    title: string;
    description: string;
    retry: string;
  };

  // States
  states: {
    loading: string;
    error: string;
    retry: string;
  };

  // Archive
  archive: {
    title: string;
    noTasks: string;
    completedOn: string;
    deleteForever: string;
    backToMatrix: string;
    openArchive: string;
  };

  // Accessibility
  accessibility: {
    selectLanguage: string;
    dismissNotification: string;
  };

  // Auth / Login
  auth: {
    signInTitle: string;
    signInSubtitle: string;
    emailLabel: string;
    sendMagicLink: string;
    sendingLink: string;
    checkInbox: string;
    checkInboxDescription: string;
    linkExpiresIn: string;
    signOut: string;
    signedInAs: string;
  };

  // Landing page
  landing: {
    description: string;
    quadrantsTitle: string;
  };
}

export const en: Translations = {
  title: 'Eisenhower Matrix',
  subtitle: 'Organize your tasks by priority and urgency',

  quadrants: {
    urgentImportant: {
      title: 'Urgent & Important',
      description: 'Do immediately',
    },
    notUrgentImportant: {
      title: 'Important but Not Urgent',
      description: 'Schedule',
    },
    urgentNotImportant: {
      title: 'Urgent but Not Important',
      description: 'Delegate',
    },
    notUrgentNotImportant: {
      title: 'Neither Urgent nor Important',
      description: 'Eliminate',
    },
  },

  axes: {
    important: 'IMPORTANT',
    notImportant: 'NOT IMPORTANT',
    urgent: 'URGENT',
    notUrgent: 'NOT URGENT',
  },

  tasks: {
    noTasks: 'No tasks',
    addTask: 'Add a task',
    enterTask: 'Enter a task...',
    add: 'Add',
    cancel: 'Cancel',
    editTask: 'Edit task',
    deleteTask: 'Delete task',
    completeTask: 'Complete task',
  },

  theme: {
    toggle: 'Toggle theme',
  },

  dialogs: {
    deleteConfirmTitle: 'Delete task?',
    deleteConfirmDescription: 'This action cannot be undone.',
    confirm: 'Delete',
    cancel: 'Cancel',
  },

  toasts: {
    taskAdded: 'Task added',
    taskDeleted: 'Task deleted',
    taskMoved: 'Task moved',
    taskCompleted: 'Task completed',
    error: 'An error occurred',
  },

  errorBoundary: {
    title: 'Something went wrong',
    description: 'An unexpected error occurred',
    retry: 'Try again',
  },

  states: {
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
  },

  archive: {
    title: 'Archived Tasks',
    noTasks: 'No archived tasks',
    completedOn: 'Completed on',
    deleteForever: 'Delete permanently',
    backToMatrix: 'Back to matrix',
    openArchive: 'Open archive',
  },

  accessibility: {
    selectLanguage: 'Select language',
    dismissNotification: 'Dismiss notification',
  },

  auth: {
    signInTitle: 'Sign in to Eisenhower Board',
    signInSubtitle: "Enter your email and we'll send you a secure one-time sign-in link.",
    emailLabel: 'Email',
    sendMagicLink: 'Send magic link',
    sendingLink: 'Sending link...',
    checkInbox: 'Check your inbox',
    checkInboxDescription: 'We sent a sign-in link to',
    linkExpiresIn: 'The link expires in 15 minutes.',
    signOut: 'Sign out',
    signedInAs: 'Signed in as',
  },

  landing: {
    description: 'The Eisenhower Matrix is a productivity method that helps you organize and prioritize tasks by sorting them into four quadrants based on their urgency and importance. Focus on what truly matters and stop wasting time on distractions.',
    quadrantsTitle: 'Four quadrants to organize your priorities',
  },
};

const localeLoaders: Record<string, () => Promise<{ default: Translations }>> = {
  fr: () => import('./locales/fr'),
  zh: () => import('./locales/zh'),
  hi: () => import('./locales/hi'),
  es: () => import('./locales/es'),
  ar: () => import('./locales/ar'),
  bn: () => import('./locales/bn'),
  de: () => import('./locales/de'),
  it: () => import('./locales/it'),
  pt: () => import('./locales/pt'),
  nl: () => import('./locales/nl'),
  pl: () => import('./locales/pl'),
  ru: () => import('./locales/ru'),
  uk: () => import('./locales/uk'),
};

const loadedTranslations = new Map<Language, Translations>();
loadedTranslations.set('en', en);

export async function loadTranslation(lang: Language): Promise<Translations> {
  const cached = loadedTranslations.get(lang);
  if (cached) return cached;

  const loader = localeLoaders[lang];
  if (!loader) return en;

  try {
    const mod = await loader();
    loadedTranslations.set(lang, mod.default);
    return mod.default;
  } catch {
    return en;
  }
}

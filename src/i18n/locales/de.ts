import type { Translations } from '../translations';

const de: Translations = {
  title: 'Eisenhower-Matrix',
  subtitle: 'Organisiere deine Aufgaben nach Priorität und Dringlichkeit',

  quadrants: {
    urgentImportant: {
      title: 'Dringend & Wichtig',
      description: 'Sofort erledigen',
    },
    notUrgentImportant: {
      title: 'Wichtig, aber nicht dringend',
      description: 'Planen',
    },
    urgentNotImportant: {
      title: 'Dringend, aber nicht wichtig',
      description: 'Delegieren',
    },
    notUrgentNotImportant: {
      title: 'Weder dringend noch wichtig',
      description: 'Eliminieren',
    },
  },

  axes: {
    important: 'WICHTIG',
    notImportant: 'NICHT WICHTIG',
    urgent: 'DRINGEND',
    notUrgent: 'NICHT DRINGEND',
  },

  tasks: {
    noTasks: 'Keine Aufgaben',
    addTask: 'Aufgabe hinzufügen',
    enterTask: 'Aufgabe eingeben...',
    add: 'Hinzufügen',
    cancel: 'Abbrechen',
    editTask: 'Aufgabe bearbeiten',
    deleteTask: 'Aufgabe löschen',
    completeTask: 'Aufgabe abschließen',
  },

  theme: {
    toggle: 'Design wechseln',
  },

  dialogs: {
    deleteConfirmTitle: 'Aufgabe löschen?',
    deleteConfirmDescription: 'Diese Aktion kann nicht rückgängig gemacht werden.',
    confirm: 'Löschen',
    cancel: 'Abbrechen',
  },

  toasts: {
    taskAdded: 'Aufgabe hinzugefügt',
    taskDeleted: 'Aufgabe gelöscht',
    taskMoved: 'Aufgabe verschoben',
    taskCompleted: 'Aufgabe abgeschlossen',
    error: 'Ein Fehler ist aufgetreten',
  },

  errorBoundary: {
    title: 'Etwas ist schiefgelaufen',
    description: 'Ein unerwarteter Fehler ist aufgetreten',
    retry: 'Erneut versuchen',
  },

  states: {
    loading: 'Laden...',
    error: 'Fehler',
    retry: 'Erneut versuchen',
  },

  archive: {
    title: 'Archivierte Aufgaben',
    noTasks: 'Keine archivierten Aufgaben',
    completedOn: 'Abgeschlossen am',
    deleteForever: 'Endgültig löschen',
    backToMatrix: 'Zurück zur Matrix',
    openArchive: 'Archiv öffnen',
  },

  accessibility: {
    selectLanguage: 'Sprache auswählen',
    dismissNotification: 'Benachrichtigung schließen',
  },

  auth: {
    signInTitle: 'Bei Eisenhower Board anmelden',
    signInSubtitle: 'Gib deine E-Mail ein und wir senden dir einen sicheren Anmeldelink.',
    emailLabel: 'E-Mail',
    sendMagicLink: 'Magic Link senden',
    sendingLink: 'Link wird gesendet...',
    checkInbox: 'Prüfe dein Postfach',
    checkInboxDescription: 'Wir haben einen Anmeldelink gesendet an',
    linkExpiresIn: 'Der Link läuft in 15 Minuten ab.',
    signOut: 'Abmelden',
    signedInAs: 'Angemeldet als',
  },

  landing: {
    description: 'Die Eisenhower-Matrix ist eine Produktivitätsmethode, die dir hilft, Aufgaben nach Dringlichkeit und Wichtigkeit in vier Quadranten einzuteilen und zu priorisieren. Konzentriere dich auf das, was wirklich zählt, und verschwende keine Zeit mit Ablenkungen.',
    quadrantsTitle: 'Vier Quadranten für deine Prioritäten',
  },
};

export default de;

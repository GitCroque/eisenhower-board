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
    searchPlaceholder: 'Archivierte Aufgaben durchsuchen',
    allQuadrants: 'Alle Quadranten',
    applyFilters: 'Anwenden',
    restoreTask: 'Aufgabe wiederherstellen',
    previousPage: 'Vorherige Seite',
    nextPage: 'Nächste Seite',
    pagePlaceholder: 'Seite',
    goToPage: 'Los',
  },

  sessions: {
    title: 'Aktive Sitzungen',
    openSessions: 'Sitzungen öffnen',
    loading: 'Sitzungen werden geladen...',
    backToMatrix: 'Zurück zur Matrix',
    revokeOtherSessions: 'Andere Sitzungen abmelden',
    revokingOthers: 'Widerrufe...',
    noSessions: 'Keine aktiven Sitzungen.',
    unknownDevice: 'Unbekanntes Gerät',
    unknownIp: 'Unbekannt',
    current: 'Aktuell',
    createdAt: 'Erstellt',
    lastSeenAt: 'Zuletzt gesehen',
    revokeSession: 'Sitzung widerrufen',
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
    sessionCheckFailedTitle: 'Deine Sitzung konnte nicht geprüft werden',
    sessionCheckFailedDescription: 'Prüfe deine Verbindung und versuche es erneut, bevor du dich anmeldest.',
    retrySessionCheck: 'Erneut versuchen',
  },

  landing: {
    description: 'Die Eisenhower-Matrix ist eine Produktivitätsmethode, die dir hilft, Aufgaben nach Dringlichkeit und Wichtigkeit in vier Quadranten einzuteilen und zu priorisieren. Konzentriere dich auf das, was wirklich zählt, und verschwende keine Zeit mit Ablenkungen.',
    quadrantsTitle: 'Vier Quadranten für deine Prioritäten',
  },

  admin: {
    title: 'Verwaltung',
    stats: 'Statistiken',
    totalUsers: 'Benutzer insgesamt',
    activeUsers30d: 'Aktive Benutzer (30 Tage)',
    users: 'Benutzer',
    email: 'E-Mail',
    createdAt: 'Erstellt',
    lastLoginAt: 'Letzte Anmeldung',
    taskCount: 'Aufgaben',
    never: 'Nie',
    deleteUser: 'Benutzer löschen',
    deleteUserConfirmTitle: 'Benutzer löschen?',
    deleteUserConfirmDescription: 'Alle Daten von {email} werden unwiderruflich gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.',
    cannotDeleteSelf: 'Sie können Ihr eigenes Konto nicht von dieser Seite löschen',
    userDeleted: 'Benutzer gelöscht',
  },

  account: {
    title: 'Konto',
    currentEmail: 'Aktuelle E-Mail',
    newEmail: 'Neue E-Mail',
    changeEmail: 'E-Mail ändern',
    changingEmail: 'Änderung...',
    emailChangeRequested: 'Bestätigungs-E-Mail gesendet',
    emailChangeRequestedDescription: 'Prüfe den Posteingang deiner neuen E-Mail-Adresse, um die Änderung zu bestätigen.',
    emailChanged: 'E-Mail geändert',
    emailChangedDescription: 'Deine E-Mail-Adresse wurde erfolgreich aktualisiert.',
    dangerZone: 'Gefahrenzone',
    deleteAccount: 'Mein Konto löschen',
    deleteAccountConfirmTitle: 'Konto löschen?',
    deleteAccountConfirmDescription: 'Alle deine Aufgaben und Daten werden unwiderruflich gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.',
    deleteAccountTypeEmail: 'Gib deine E-Mail zur Bestätigung ein',
    deletingAccount: 'Löschung...',
    accountDeleted: 'Konto gelöscht',
  },
};

export default de;

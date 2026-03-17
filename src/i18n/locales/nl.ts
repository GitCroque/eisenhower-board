import type { Translations } from '../translations';

const nl: Translations = {
  title: 'Eisenhower-matrix',
  subtitle: 'Organiseer je taken op prioriteit en urgentie',

  quadrants: {
    urgentImportant: {
      title: 'Urgent & Belangrijk',
      description: 'Direct doen',
    },
    notUrgentImportant: {
      title: 'Belangrijk maar Niet Urgent',
      description: 'Plannen',
    },
    urgentNotImportant: {
      title: 'Urgent maar Niet Belangrijk',
      description: 'Delegeren',
    },
    notUrgentNotImportant: {
      title: 'Niet Urgent en Niet Belangrijk',
      description: 'Elimineren',
    },
  },

  axes: {
    important: 'BELANGRIJK',
    notImportant: 'NIET BELANGRIJK',
    urgent: 'URGENT',
    notUrgent: 'NIET URGENT',
  },

  tasks: {
    noTasks: 'Geen taken',
    addTask: 'Taak toevoegen',
    enterTask: 'Voer een taak in...',
    add: 'Toevoegen',
    cancel: 'Annuleren',
    editTask: 'Taak bewerken',
    deleteTask: 'Taak verwijderen',
    completeTask: 'Taak voltooien',
  },

  theme: {
    toggle: 'Thema wisselen',
  },

  dialogs: {
    deleteConfirmTitle: 'Taak verwijderen?',
    deleteConfirmDescription: 'Deze actie kan niet ongedaan worden gemaakt.',
    confirm: 'Verwijderen',
    cancel: 'Annuleren',
  },

  toasts: {
    taskAdded: 'Taak toegevoegd',
    taskDeleted: 'Taak verwijderd',
    taskMoved: 'Taak verplaatst',
    taskCompleted: 'Taak voltooid',
    error: 'Er is een fout opgetreden',
  },

  errorBoundary: {
    title: 'Er ging iets mis',
    description: 'Er is een onverwachte fout opgetreden',
    retry: 'Opnieuw proberen',
  },

  states: {
    loading: 'Laden...',
    error: 'Fout',
    retry: 'Opnieuw proberen',
  },

  archive: {
    title: 'Gearchiveerde taken',
    noTasks: 'Geen gearchiveerde taken',
    completedOn: 'Voltooid op',
    deleteForever: 'Permanent verwijderen',
    backToMatrix: 'Terug naar matrix',
    openArchive: 'Archief openen',
    searchPlaceholder: 'Zoek in gearchiveerde taken',
    allQuadrants: 'Alle kwadranten',
    applyFilters: 'Toepassen',
    restoreTask: 'Taak herstellen',
    previousPage: 'Vorige pagina',
    nextPage: 'Volgende pagina',
    pagePlaceholder: 'Pagina',
    goToPage: 'Ga',
  },

  sessions: {
    title: 'Actieve sessies',
    openSessions: 'Sessies openen',
    loading: 'Sessies laden...',
    backToMatrix: 'Terug naar matrix',
    revokeOtherSessions: 'Andere sessies intrekken',
    revokingOthers: 'Bezig met intrekken...',
    noSessions: 'Geen actieve sessies.',
    unknownDevice: 'Onbekend apparaat',
    unknownIp: 'Onbekend',
    current: 'Huidig',
    createdAt: 'Aangemaakt',
    lastSeenAt: 'Laatst gezien',
    revokeSession: 'Sessie intrekken',
  },

  accessibility: {
    selectLanguage: 'Taal selecteren',
    dismissNotification: 'Melding sluiten',
  },

  auth: {
    signInTitle: 'Inloggen bij Eisenhower Board',
    signInSubtitle: 'Voer je e-mail in en we sturen je een veilige inloglink.',
    emailLabel: 'E-mail',
    sendMagicLink: 'Magic link verzenden',
    sendingLink: 'Link verzenden...',
    checkInbox: 'Controleer je inbox',
    checkInboxDescription: 'We hebben een inloglink gestuurd naar',
    linkExpiresIn: 'De link verloopt over 15 minuten.',
    signOut: 'Uitloggen',
    signedInAs: 'Ingelogd als',
    sessionCheckFailedTitle: 'Je sessie kon niet worden gecontroleerd',
    sessionCheckFailedDescription: 'Controleer je verbinding en probeer het opnieuw voordat je inlogt.',
    retrySessionCheck: 'Opnieuw proberen',
  },

  landing: {
    description: 'De Eisenhower-matrix is een productiviteitsmethode die je helpt taken te organiseren en prioriteren door ze in vier kwadranten in te delen op basis van urgentie en belang. Focus op wat echt belangrijk is en verspil geen tijd aan afleidingen.',
    quadrantsTitle: 'Vier kwadranten om je prioriteiten te organiseren',
  },
};

export default nl;

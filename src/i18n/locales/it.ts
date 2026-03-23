import type { Translations } from '../translations';

const it: Translations = {
  title: 'Matrice di Eisenhower',
  subtitle: 'Organizza le tue attività per priorità e urgenza',

  quadrants: {
    urgentImportant: {
      title: 'Urgente e Importante',
      description: 'Fai subito',
    },
    notUrgentImportant: {
      title: 'Importante ma Non Urgente',
      description: 'Pianifica',
    },
    urgentNotImportant: {
      title: 'Urgente ma Non Importante',
      description: 'Delega',
    },
    notUrgentNotImportant: {
      title: 'Né Urgente né Importante',
      description: 'Elimina',
    },
  },

  axes: {
    important: 'IMPORTANTE',
    notImportant: 'NON IMPORTANTE',
    urgent: 'URGENTE',
    notUrgent: 'NON URGENTE',
  },

  tasks: {
    noTasks: 'Nessuna attività',
    addTask: 'Aggiungi attività',
    enterTask: "Inserisci un'attività...",
    add: 'Aggiungi',
    cancel: 'Annulla',
    editTask: 'Modifica attività',
    deleteTask: 'Elimina attività',
    completeTask: 'Completa attività',
  },

  theme: {
    toggle: 'Cambia tema',
  },

  dialogs: {
    deleteConfirmTitle: 'Eliminare attività?',
    deleteConfirmDescription: 'Questa azione non può essere annullata.',
    confirm: 'Elimina',
    cancel: 'Annulla',
  },

  toasts: {
    taskAdded: 'Attività aggiunta',
    taskDeleted: 'Attività eliminata',
    taskMoved: 'Attività spostata',
    taskCompleted: 'Attività completata',
    error: "Si è verificato un errore",
  },

  errorBoundary: {
    title: 'Qualcosa è andato storto',
    description: 'Si è verificato un errore imprevisto',
    retry: 'Riprova',
  },

  states: {
    loading: 'Caricamento...',
    error: 'Errore',
    retry: 'Riprova',
  },

  archive: {
    title: 'Attività archiviate',
    noTasks: 'Nessuna attività archiviata',
    completedOn: 'Completata il',
    deleteForever: 'Elimina definitivamente',
    backToMatrix: 'Torna alla matrice',
    openArchive: 'Apri archivio',
    searchPlaceholder: 'Cerca nelle attività archiviate',
    allQuadrants: 'Tutti i quadranti',
    applyFilters: 'Applica',
    restoreTask: 'Ripristina attività',
    previousPage: 'Pagina precedente',
    nextPage: 'Pagina successiva',
    pagePlaceholder: 'Pagina',
    goToPage: 'Vai',
  },

  sessions: {
    title: 'Sessioni attive',
    openSessions: 'Apri sessioni',
    loading: 'Caricamento sessioni...',
    backToMatrix: 'Torna alla matrice',
    revokeOtherSessions: 'Revoca le altre sessioni',
    revokingOthers: 'Revoca in corso...',
    noSessions: 'Nessuna sessione attiva.',
    unknownDevice: 'Dispositivo sconosciuto',
    unknownIp: 'Sconosciuto',
    current: 'Corrente',
    createdAt: 'Creata',
    lastSeenAt: 'Ultima attività',
    revokeSession: 'Revoca sessione',
  },

  accessibility: {
    selectLanguage: 'Seleziona lingua',
    dismissNotification: 'Chiudi notifica',
  },

  auth: {
    signInTitle: 'Accedi a Eisenhower Board',
    signInSubtitle: 'Inserisci la tua email e ti invieremo un link di accesso sicuro.',
    emailLabel: 'Email',
    sendMagicLink: 'Invia magic link',
    sendingLink: 'Invio in corso...',
    checkInbox: 'Controlla la posta',
    checkInboxDescription: 'Abbiamo inviato un link di accesso a',
    linkExpiresIn: 'Il link scade tra 15 minuti.',
    signOut: 'Esci',
    signedInAs: 'Connesso come',
    sessionCheckFailedTitle: 'Impossibile verificare la tua sessione',
    sessionCheckFailedDescription: 'Controlla la connessione e riprova prima di accedere.',
    retrySessionCheck: 'Riprova',
  },

  landing: {
    description: "La Matrice di Eisenhower è un metodo di produttività che ti aiuta a organizzare e dare priorità alle attività classificandole in quattro quadranti in base alla loro urgenza e importanza. Concentrati su ciò che conta davvero e smetti di perdere tempo con le distrazioni.",
    quadrantsTitle: 'Quattro quadranti per organizzare le tue priorità',
  },

  admin: {
    title: 'Amministrazione',
    stats: 'Statistiche',
    totalUsers: 'Utenti totali',
    activeUsers30d: 'Utenti attivi (30 giorni)',
    users: 'Utenti',
    email: 'Email',
    createdAt: 'Creato',
    lastLoginAt: 'Ultimo accesso',
    taskCount: 'Attività',
    never: 'Mai',
    deleteUser: "Elimina l'utente",
    deleteUserConfirmTitle: "Eliminare l'utente?",
    deleteUserConfirmDescription: 'Tutti i dati di {email} saranno eliminati definitivamente. Questa azione è irreversibile.',
    cannotDeleteSelf: 'Non puoi eliminare il tuo account da questa pagina',
    userDeleted: 'Utente eliminato',
  },

  account: {
    title: 'Account',
    currentEmail: 'Email attuale',
    newEmail: 'Nuova email',
    changeEmail: 'Cambia email',
    changingEmail: 'Modifica in corso...',
    emailChangeRequested: 'Email di verifica inviata',
    emailChangeRequestedDescription: 'Controlla la casella di posta del tuo nuovo indirizzo email per confermare la modifica.',
    emailChanged: 'Email modificata',
    emailChangedDescription: 'Il tuo indirizzo email è stato aggiornato con successo.',
    dangerZone: 'Zona pericolosa',
    deleteAccount: 'Elimina il mio account',
    deleteAccountConfirmTitle: 'Eliminare il tuo account?',
    deleteAccountConfirmDescription: 'Tutte le tue attività e i tuoi dati saranno eliminati definitivamente. Questa azione è irreversibile.',
    deleteAccountTypeEmail: 'Digita la tua email per confermare',
    deletingAccount: 'Eliminazione...',
    accountDeleted: 'Account eliminato',
  },
};

export default it;

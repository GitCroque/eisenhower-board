import type { Translations } from '../translations';

const fr: Translations = {
  title: "Matrice d'Eisenhower",
  subtitle: 'Organisez vos tâches par priorité et urgence',

  quadrants: {
    urgentImportant: {
      title: 'Urgent et Important',
      description: 'À faire immédiatement',
    },
    notUrgentImportant: {
      title: 'Important mais Non-urgent',
      description: 'À planifier',
    },
    urgentNotImportant: {
      title: 'Urgent mais Non-important',
      description: 'À déléguer',
    },
    notUrgentNotImportant: {
      title: 'Ni urgent ni important',
      description: 'À éliminer',
    },
  },

  axes: {
    important: 'IMPORTANT',
    notImportant: 'NON-IMPORTANT',
    urgent: 'URGENT',
    notUrgent: 'NON-URGENT',
  },

  tasks: {
    noTasks: 'Aucune tâche',
    addTask: 'Ajouter une tâche',
    enterTask: 'Entrez une tâche...',
    add: 'Ajouter',
    cancel: 'Annuler',
    editTask: 'Modifier la tâche',
    deleteTask: 'Supprimer la tâche',
    completeTask: 'Terminer la tâche',
  },

  theme: {
    toggle: 'Changer le thème',
  },

  dialogs: {
    deleteConfirmTitle: 'Supprimer la tâche ?',
    deleteConfirmDescription: 'Cette action est irréversible.',
    confirm: 'Supprimer',
    cancel: 'Annuler',
  },

  toasts: {
    taskAdded: 'Tâche ajoutée',
    taskDeleted: 'Tâche supprimée',
    taskMoved: 'Tâche déplacée',
    taskCompleted: 'Tâche terminée',
    error: 'Une erreur est survenue',
  },

  errorBoundary: {
    title: 'Une erreur est survenue',
    description: "Une erreur inattendue s'est produite",
    retry: 'Réessayer',
  },

  states: {
    loading: 'Chargement...',
    error: 'Erreur',
    retry: 'Réessayer',
  },

  archive: {
    title: 'Tâches archivées',
    noTasks: 'Aucune tâche archivée',
    completedOn: 'Terminée le',
    deleteForever: 'Supprimer définitivement',
    backToMatrix: 'Retour à la matrice',
    openArchive: 'Ouvrir les archives',
    searchPlaceholder: 'Rechercher dans les tâches archivées',
    allQuadrants: 'Tous les quadrants',
    applyFilters: 'Appliquer',
    restoreTask: 'Restaurer la tâche',
    previousPage: 'Page précédente',
    nextPage: 'Page suivante',
    pagePlaceholder: 'Page',
    goToPage: 'Aller',
  },

  sessions: {
    title: 'Sessions actives',
    openSessions: 'Ouvrir les sessions',
    loading: 'Chargement des sessions...',
    backToMatrix: 'Retour à la matrice',
    revokeOtherSessions: 'Révoquer les autres sessions',
    revokingOthers: 'Révocation...',
    noSessions: 'Aucune session active.',
    unknownDevice: 'Appareil inconnu',
    unknownIp: 'Inconnue',
    current: 'Actuelle',
    createdAt: 'Créée',
    lastSeenAt: 'Dernière activité',
    revokeSession: 'Révoquer la session',
  },

  accessibility: {
    selectLanguage: 'Sélectionner la langue',
    dismissNotification: 'Fermer la notification',
  },

  auth: {
    signInTitle: 'Connexion à Eisenhower Board',
    signInSubtitle: 'Entrez votre email et nous vous enverrons un lien de connexion sécurisé.',
    emailLabel: 'Email',
    sendMagicLink: 'Envoyer le lien magique',
    sendingLink: 'Envoi en cours...',
    checkInbox: 'Vérifiez votre boîte mail',
    checkInboxDescription: 'Nous avons envoyé un lien de connexion à',
    linkExpiresIn: 'Le lien expire dans 15 minutes.',
    signOut: 'Se déconnecter',
    signedInAs: 'Connecté en tant que',
    sessionCheckFailedTitle: 'Impossible de vérifier votre session',
    sessionCheckFailedDescription: 'Vérifiez votre connexion puis réessayez avant de vous connecter.',
    retrySessionCheck: 'Réessayer',
  },

  landing: {
    description: "La matrice d'Eisenhower est une méthode de productivité qui vous aide à organiser et prioriser vos tâches en les classant dans quatre quadrants selon leur urgence et leur importance. Concentrez-vous sur ce qui compte vraiment et cessez de perdre du temps sur les distractions.",
    quadrantsTitle: 'Quatre quadrants pour organiser vos priorités',
  },

  admin: {
    title: 'Administration',
    stats: 'Statistiques',
    totalUsers: 'Utilisateurs au total',
    activeUsers30d: 'Utilisateurs actifs (30 jours)',
    users: 'Utilisateurs',
    email: 'Email',
    createdAt: 'Créé',
    lastLoginAt: 'Dernière connexion',
    taskCount: 'Tâches',
    never: 'Jamais',
    deleteUser: "Supprimer l'utilisateur",
    deleteUserConfirmTitle: "Supprimer l'utilisateur ?",
    deleteUserConfirmDescription: 'Toutes les données de {email} seront définitivement supprimées. Cette action est irréversible.',
    cannotDeleteSelf: "Vous ne pouvez pas supprimer votre propre compte depuis cette page",
    userDeleted: 'Utilisateur supprimé',
  },

  account: {
    title: 'Compte',
    currentEmail: 'Email actuel',
    newEmail: 'Nouvel email',
    changeEmail: "Changer d'email",
    changingEmail: 'Modification...',
    emailChangeRequested: 'Email de vérification envoyé',
    emailChangeRequestedDescription: 'Consultez la boîte de réception de votre nouvel email pour confirmer le changement.',
    emailChanged: 'Email modifié',
    emailChangedDescription: 'Votre email a été mis à jour avec succès.',
    dangerZone: 'Zone de danger',
    deleteAccount: 'Supprimer mon compte',
    deleteAccountConfirmTitle: 'Supprimer votre compte ?',
    deleteAccountConfirmDescription: 'Toutes vos tâches et données seront définitivement supprimées. Cette action est irréversible.',
    deleteAccountTypeEmail: 'Saisissez votre email pour confirmer',
    deletingAccount: 'Suppression...',
    accountDeleted: 'Compte supprimé',
  },
};

export default fr;

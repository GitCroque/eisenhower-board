export type Language = 'en' | 'fr';

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
  };

  // States
  states: {
    loading: string;
    error: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
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
    },

    states: {
      loading: 'Loading...',
      error: 'Error',
    },
  },

  fr: {
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
    },

    states: {
      loading: 'Chargement...',
      error: 'Erreur',
    },
  },
};
